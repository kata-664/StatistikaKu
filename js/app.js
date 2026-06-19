/**
 * js/app.js
 * ------------------------------------------------------
 * Logika utama aplikasi StatistikaKu:
 * - Memuat file materi secara dinamis berdasarkan materi/index.js
 * - Merender Markdown + LaTeX (KaTeX)
 * - Sidebar otomatis, pencarian, navigasi prev/next
 * - Daftar isi otomatis, progress membaca, salin rumus
 * - Dark / light mode
 * ------------------------------------------------------
 */

(() => {
  "use strict";

  // ===================================================
  // STATE
  // ===================================================
  const state = {
    materiData: {},     // { id: { id, judul, kategori, isi } }
    materiOrder: [],    // urutan id sesuai MATERI_LIST
    loaded: false,
    currentId: null,
  };

  // ===================================================
  // DOM REFS
  // ===================================================
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const refs = {
    sidebar: $("#sidebar"),
    sidebarToggle: $("#sidebarToggle"),
    sidebarOverlay: $("#sidebarOverlay"),
    materiList: $("#materiList"),
    searchEmpty: $("#searchEmpty"),
    searchInput: $("#searchInput"),
    searchInputMobile: $("#searchInputMobile"),
    themeToggle: $("#themeToggle"),
    themeIcon: $("#themeIcon"),

    viewHome: $("#view-home"),
    viewMateri: $("#view-materi"),
    viewNotFound: $("#view-notfound"),
    homeGrid: $("#homeGrid"),

    breadcrumb: $("#breadcrumb"),
    materiKategori: $("#materiKategori"),
    materiJudul: $("#materiJudul"),
    materiBody: $("#materiBody"),
    btnPrev: $("#btnPrev"),
    btnNext: $("#btnNext"),
    readingProgress: $("#readingProgress"),
    tocPanel: $("#tocPanel"),
    tocList: $("#tocList"),
    copyToast: $("#copyToast"),
  };

  // ===================================================
  // MARKDOWN-IT SETUP (dengan placeholder utk LaTeX)
  // ===================================================
  const md = window.markdownit({
    html: false,
    linkify: true,
    typographer: true,
    breaks: false,
  });

  // Simpan rumus LaTeX sementara agar tidak diparsing markdown-it sebagai teks biasa
  let mathStore = [];

  function stashMath(raw) {
    // Tangkap blok $$ ... $$ dan inline $ ... $ lalu simpan ke array,
    // gantikan dengan token unik supaya markdown-it tidak mengubah karakter di dalamnya.
    let result = raw;

    // Blok $$ ... $$ (multiline)
    result = result.replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => {
      const idx = mathStore.push({ type: "block", expr: expr.trim() }) - 1;
      return `\n\n@@MATH_BLOCK_${idx}@@\n\n`;
    });

    // Inline $ ... $ (tidak menangkap $$ karena sudah diganti di atas)
    result = result.replace(/\$([^\$\n]+?)\$/g, (_, expr) => {
      const idx = mathStore.push({ type: "inline", expr: expr.trim() }) - 1;
      return `@@MATH_INLINE_${idx}@@`;
    });

    return result;
  }

  function renderMathPlaceholders(html) {
    // Ganti placeholder block
    html = html.replace(/@@MATH_BLOCK_(\d+)@@/g, (_, i) => {
      const item = mathStore[parseInt(i, 10)];
      if (!item) return "";
      let rendered = "";
      try {
        rendered = window.katex.renderToString(item.expr, { displayMode: true, throwOnError: false });
      } catch (e) {
        rendered = `<span class="katex-error">${escapeHtml(item.expr)}</span>`;
      }
      return `<div class="formula-block" data-formula="${escapeAttr(item.expr)}">
        <button class="copy-formula-btn" title="Salin rumus" aria-label="Salin rumus">
          <svg viewBox="0 0 24 24" width="15" height="15"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="2" fill="none"/><path d="M5 15V5a2 2 0 0 1 2-2h10" stroke="currentColor" stroke-width="2" fill="none"/></svg>
        </button>
        ${rendered}
      </div>`;
    });

    // Ganti placeholder inline (bisa muncul di dalam <p> hasil markdown-it, terbungkus <p>@@..@@</p> juga mungkin)
    html = html.replace(/@@MATH_INLINE_(\d+)@@/g, (_, i) => {
      const item = mathStore[parseInt(i, 10)];
      if (!item) return "";
      try {
        return window.katex.renderToString(item.expr, { displayMode: false, throwOnError: false });
      } catch (e) {
        return `<span class="katex-error">${escapeHtml(item.expr)}</span>`;
      }
    });

    return html;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }
  function escapeAttr(str) {
    return str.replace(/"/g, "&quot;");
  }

  function renderMarkdownWithMath(rawText) {
    mathStore = [];
    const stashed = stashMath(rawText);
    let html = md.render(stashed);
    html = renderMathPlaceholders(html);
    return html;
  }

  // ===================================================
  // LOADING MATERI (dinamis via <script> injection)
  // ===================================================
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Gagal memuat: " + src));
      document.body.appendChild(script);
    });
  }

  async function loadAllMateri() {
    const list = window.MATERI_LIST || [];
    state.materiOrder = list.slice();

    for (const id of list) {
      try {
        // Setiap file materi mendefinisikan ulang window.MATERI,
        // jadi kita tangkap nilainya tepat setelah script dimuat.
        await loadScript(`materi/${id}.js`);
        if (window.MATERI && window.MATERI.id) {
          state.materiData[window.MATERI.id] = {
            id: window.MATERI.id,
            judul: window.MATERI.judul || window.MATERI.id,
            kategori: window.MATERI.kategori || "Umum",
            isi: window.MATERI.isi || "",
          };
        }
      } catch (err) {
        console.error(`[StatistikaKu] Gagal memuat materi "${id}":`, err);
      }
    }
    state.loaded = true;
  }

  // ===================================================
  // SIDEBAR RENDER
  // ===================================================
  function renderSidebar(filterText = "") {
    const filter = filterText.trim().toLowerCase();
    refs.materiList.innerHTML = "";

    // Kelompokkan berdasarkan kategori, tapi tetap mengikuti urutan MATERI_LIST
    const grouped = {};
    state.materiOrder.forEach((id) => {
      const m = state.materiData[id];
      if (!m) return;

      const matchSearch =
        !filter ||
        m.judul.toLowerCase().includes(filter) ||
        m.isi.toLowerCase().includes(filter) ||
        m.kategori.toLowerCase().includes(filter);

      if (!matchSearch) return;

      if (!grouped[m.kategori]) grouped[m.kategori] = [];
      grouped[m.kategori].push(m);
    });

    const categories = Object.keys(grouped);

    if (categories.length === 0) {
      refs.searchEmpty.hidden = false;
      return;
    }
    refs.searchEmpty.hidden = true;

    categories.forEach((cat) => {
      const label = document.createElement("div");
      label.className = "materi-group-label";
      label.textContent = cat;
      refs.materiList.appendChild(label);

      grouped[cat].forEach((m) => {
        const link = document.createElement("a");
        link.href = `#/materi/${m.id}`;
        link.className = "materi-link" + (state.currentId === m.id ? " active" : "");
        link.innerHTML = `<span class="dot"></span><span>${escapeHtml(m.judul)}</span>`;
        link.addEventListener("click", () => closeMobileSidebar());
        refs.materiList.appendChild(link);
      });
    });
  }

  function renderHomeGrid() {
    refs.homeGrid.innerHTML = "";
    state.materiOrder.forEach((id) => {
      const m = state.materiData[id];
      if (!m) return;
      const plainText = m.isi.replace(/[#*`$>\-]/g, "").replace(/\n+/g, " ").trim();
      const card = document.createElement("a");
      card.href = `#/materi/${m.id}`;
      card.className = "materi-card";
      card.innerHTML = `
        <span class="cat">${escapeHtml(m.kategori)}</span>
        <h3>${escapeHtml(m.judul)}</h3>
        <p>${escapeHtml(plainText.slice(0, 110))}...</p>
      `;
      refs.homeGrid.appendChild(card);
    });
  }

  // ===================================================
  // VIEW SWITCHING
  // ===================================================
  function showView(viewName) {
    refs.viewHome.hidden = viewName !== "home";
    refs.viewMateri.hidden = viewName !== "materi";
    refs.viewNotFound.hidden = viewName !== "notfound";
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  // ===================================================
  // RENDER HALAMAN MATERI
  // ===================================================
  function renderMateriPage(id) {
    const m = state.materiData[id];
    if (!m) {
      showView("notfound");
      state.currentId = null;
      renderSidebar(refs.searchInput.value);
      return;
    }

    state.currentId = id;
    showView("materi");

    // Breadcrumb
    refs.breadcrumb.innerHTML = `
      <a href="#/">Beranda</a>
      <span class="sep">/</span>
      <span>${escapeHtml(m.kategori)}</span>
      <span class="sep">/</span>
      <span class="current">${escapeHtml(m.judul)}</span>
    `;

    refs.materiKategori.textContent = m.kategori;
    refs.materiJudul.textContent = m.judul;
    refs.materiBody.innerHTML = renderMarkdownWithMath(m.isi);

    // Highlight code blocks
    if (window.hljs) {
      refs.materiBody.querySelectorAll("pre code").forEach((block) => {
        window.hljs.highlightElement(block);
      });
    }

    buildTOC();
    attachCopyFormulaHandlers();
    setupPrevNext(id);
    renderSidebar(refs.searchInput.value);
    updateReadingProgress();
    document.title = `${m.judul} — StatistikaKu`;
  }

  // ===================================================
  // DAFTAR ISI (TOC) OTOMATIS
  // ===================================================
  function buildTOC() {
    const headings = refs.materiBody.querySelectorAll("h2, h3");
    refs.tocList.innerHTML = "";

    if (headings.length === 0) {
      refs.tocPanel.style.display = "none";
      return;
    }
    refs.tocPanel.style.display = "";

    headings.forEach((h, i) => {
      const slug = `sec-${i}-` + h.textContent.toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      h.id = slug;

      const a = document.createElement("a");
      a.href = `#${slug}`;
      a.textContent = h.textContent;
      a.className = h.tagName.toLowerCase() === "h3" ? "h3" : "h2";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        h.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#/materi/${state.currentId}`);
      });
      refs.tocList.appendChild(a);
    });

    observeTOCHighlight(headings);
  }

  let tocObserver = null;
  function observeTOCHighlight(headings) {
    if (tocObserver) tocObserver.disconnect();
    tocObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            $$(".toc-list a").forEach((a) => a.classList.remove("active"));
            const activeLink = refs.tocList.querySelector(`a[href="#${id}"]`);
            if (activeLink) activeLink.classList.add("active");
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    headings.forEach((h) => tocObserver.observe(h));
  }

  // ===================================================
  // TOMBOL SALIN RUMUS
  // ===================================================
  function attachCopyFormulaHandlers() {
    refs.materiBody.querySelectorAll(".copy-formula-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const formula = btn.closest(".formula-block").dataset.formula;
        copyToClipboard(formula);
      });
    });
  }

  function copyToClipboard(text) {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      showToast();
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showToast).catch(fallback);
    } else {
      fallback();
    }
  }

  let toastTimer = null;
  function showToast() {
    refs.copyToast.hidden = false;
    requestAnimationFrame(() => refs.copyToast.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      refs.copyToast.classList.remove("show");
      setTimeout(() => { refs.copyToast.hidden = true; }, 200);
    }, 1600);
  }

  // ===================================================
  // NAVIGASI PREV / NEXT
  // ===================================================
  function setupPrevNext(id) {
    const idx = state.materiOrder.indexOf(id);
    const prevId = idx > 0 ? state.materiOrder[idx - 1] : null;
    const nextId = idx >= 0 && idx < state.materiOrder.length - 1 ? state.materiOrder[idx + 1] : null;

    if (prevId && state.materiData[prevId]) {
      refs.btnPrev.disabled = false;
      refs.btnPrev.textContent = `← ${state.materiData[prevId].judul}`;
      refs.btnPrev.onclick = () => Router.navigate(`/materi/${prevId}`);
    } else {
      refs.btnPrev.disabled = true;
      refs.btnPrev.textContent = "← Materi Sebelumnya";
      refs.btnPrev.onclick = null;
    }

    if (nextId && state.materiData[nextId]) {
      refs.btnNext.disabled = false;
      refs.btnNext.textContent = `${state.materiData[nextId].judul} →`;
      refs.btnNext.onclick = () => Router.navigate(`/materi/${nextId}`);
    } else {
      refs.btnNext.disabled = true;
      refs.btnNext.textContent = "Materi Berikutnya →";
      refs.btnNext.onclick = null;
    }
  }

  // ===================================================
  // PROGRESS MEMBACA
  // ===================================================
  function updateReadingProgress() {
    const article = $(".materi-article");
    if (!article) return;
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = article.offsetHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      refs.readingProgress.style.width = pct + "%";
    };
    window.removeEventListener("scroll", window.__scrollHandlerStatistikaKu || (() => {}));
    window.__scrollHandlerStatistikaKu = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ===================================================
  // PENCARIAN
  // ===================================================
  function setupSearch() {
    const handler = (e) => {
      const val = e.target.value;
      refs.searchInput.value = val;
      refs.searchInputMobile.value = val;
      renderSidebar(val);
    };
    refs.searchInput.addEventListener("input", handler);
    refs.searchInputMobile.addEventListener("input", handler);
  }

  // ===================================================
  // SIDEBAR MOBILE TOGGLE
  // ===================================================
  function openMobileSidebar() {
    refs.sidebar.classList.add("open");
    refs.sidebarOverlay.classList.add("show");
  }
  function closeMobileSidebar() {
    refs.sidebar.classList.remove("open");
    refs.sidebarOverlay.classList.remove("show");
  }
  function setupSidebarToggle() {
    refs.sidebarToggle.addEventListener("click", () => {
      refs.sidebar.classList.contains("open") ? closeMobileSidebar() : openMobileSidebar();
    });
    refs.sidebarOverlay.addEventListener("click", closeMobileSidebar);
  }

  // ===================================================
  // DARK / LIGHT MODE
  // ===================================================
  const THEME_KEY = "statistikaku-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    refs.themeIcon.innerHTML =
      theme === "dark"
        ? '<path d="M12 3a9 9 0 109 9 7 7 0 01-9-9z" fill="currentColor"/>'
        : '<path d="M12 18a6 6 0 100-12 6 6 0 000 12z" fill="currentColor"/>';
    const hljsTheme = $("#hljs-theme");
    if (hljsTheme) {
      hljsTheme.href = theme === "dark"
        ? "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css"
        : "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css";
    }
  }

  function setupTheme() {
    let saved = localStorage.getItem(THEME_KEY);
    if (!saved) {
      saved = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    applyTheme(saved);

    refs.themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // ===================================================
  // ROUTING SETUP
  // ===================================================
  function setupRoutes() {
    Router.on(/^\/$/, () => {
      showView("home");
      state.currentId = null;
      renderHomeGrid();
      renderSidebar(refs.searchInput.value);
      document.title = "StatistikaKu — Belajar Statistika";
    });

    Router.on(/^\/materi\/([a-zA-Z0-9_\-]+)$/, (match) => {
      const id = match[1];
      renderMateriPage(id);
    });

    Router.on(/^\/materi$/, () => {
      if (state.materiOrder.length > 0) {
        Router.navigate(`/materi/${state.materiOrder[0]}`);
      } else {
        Router.navigate("/");
      }
    });

    Router.notFound(() => {
      showView("notfound");
      document.title = "Materi tidak ditemukan — StatistikaKu";
    });
  }

  // ===================================================
  // PENGAMAN: TUNGGU LIBRARY CDN SIAP
  // ===================================================
  // Mencegah error "window.markdownit is not a function" / "katex is not defined"
  // jika CDN sedikit lambat dimuat (terutama di koneksi lambat / mobile).
  function waitForLibraries(maxWaitMs = 8000) {
    return new Promise((resolve) => {
      const start = Date.now();
      const check = () => {
        const ready =
          typeof window.markdownit === "function" &&
          typeof window.katex !== "undefined";
        if (ready) {
          resolve(true);
        } else if (Date.now() - start > maxWaitMs) {
          console.error("[StatistikaKu] Library CDN (markdown-it/KaTeX) gagal dimuat dalam waktu yang wajar. Periksa koneksi internet atau apakah CDN diblokir.");
          resolve(false);
        } else {
          setTimeout(check, 100);
        }
      };
      check();
    });
  }

  // ===================================================
  // INIT
  // ===================================================
  async function init() {
    setupTheme();
    setupSearch();
    setupSidebarToggle();
    setupRoutes();

    const librariesReady = await waitForLibraries();
    if (!librariesReady) {
      refs.homeGrid.innerHTML = `
        <div class="empty-state" style="grid-column:1/-1;">
          <h2>Gagal memuat library</h2>
          <p>Markdown/KaTeX dari CDN tidak berhasil dimuat. Periksa koneksi internet kamu, lalu refresh halaman ini.</p>
          <button class="btn btn-primary" onclick="location.reload()">Coba Lagi</button>
        </div>`;
      return;
    }

    await loadAllMateri();

    renderSidebar();
    renderHomeGrid();
    Router.resolve();
  }

  document.addEventListener("DOMContentLoaded", init);
})();

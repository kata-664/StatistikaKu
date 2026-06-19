/**
 * js/router.js
 * ------------------------------------------------------
 * Router sederhana berbasis hash (#).
 * Mendukung URL seperti:
 *   index.html#/             -> Home
 *   index.html#/materi/regresi -> Halaman materi "regresi"
 *
 * Router ini tidak bergantung pada framework apapun,
 * murni vanilla JS, sehingga aman dipakai di GitHub Pages.
 */

const Router = (() => {
  let routes = [];
  let notFoundHandler = () => {};

  /**
   * Daftarkan route.
   * @param {RegExp} pattern - pola regex untuk path (tanpa '#')
   * @param {Function} handler - dipanggil dengan (match) saat route cocok
   */
  function on(pattern, handler) {
    routes.push({ pattern, handler });
    return Router;
  }

  function notFound(handler) {
    notFoundHandler = handler;
    return Router;
  }

  function getCurrentPath() {
    const hash = window.location.hash || "#/";
    // Buang '#' di awal
    let path = hash.slice(1);
    if (path === "") path = "/";
    return path;
  }

  function resolve() {
    const path = getCurrentPath();
    for (const route of routes) {
      const match = path.match(route.pattern);
      if (match) {
        route.handler(match);
        return;
      }
    }
    notFoundHandler();
  }

  function navigate(path) {
    window.location.hash = path;
  }

  function init() {
    window.addEventListener("hashchange", resolve);
    window.addEventListener("DOMContentLoaded", resolve);
    // Jika DOM sudah siap saat script ini load di akhir body:
    if (document.readyState === "complete" || document.readyState === "interactive") {
      // resolve dipanggil dari app.js setelah semua materi termuat
    }
  }

  return { on, notFound, navigate, resolve, getCurrentPath, init };
})();

Router.init();

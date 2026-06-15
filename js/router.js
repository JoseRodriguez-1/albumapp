/**
 * router.js — Navegación entre pantallas basada en hash.
 * Rutas:
 *   #/home            → Resumen
 *   #/teams           → Lista de equipos
 *   #/team/MEX        → Detalle de equipo
 *   #/lists           → Listas de intercambio
 *   #/stats           → Estadísticas
 */

const Router = (() => {
  const handlers = [];

  function parse() {
    const hash = location.hash.replace(/^#\/?/, '') || 'home';
    const parts = hash.split('/').filter(Boolean);
    return { name: parts[0] || 'home', params: parts.slice(1) };
  }

  function go(path) {
    if (location.hash !== '#/' + path) location.hash = '#/' + path;
    else dispatch();
  }

  function back() {
    history.back();
  }

  function onChange(fn) {
    handlers.push(fn);
  }

  function dispatch() {
    const route = parse();
    handlers.forEach((fn) => {
      try { fn(route); } catch (e) { console.error(e); }
    });
  }

  window.addEventListener('hashchange', dispatch);

  return { go, back, onChange, parse, dispatch };
})();

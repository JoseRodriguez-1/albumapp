/**
 * state.js — Manejo de estado del álbum y persistencia en localStorage.
 *
 * Formato persistido: { "MEX1": 1, "ARG5": 3, ... }  (clave = código, valor = cantidad)
 * Una entrada con valor 0 o ausente significa "no tengo".
 * Valor 1 = tengo una, 2+ = tengo repetidas (valor-1 = cantidad para intercambio).
 */

const STORAGE_KEY = 'wc2026_state_v1';
const RECENT_KEY = 'wc2026_recent_v1';

const State = (() => {
  let counts = {};
  let recent = []; // últimas secciones abiertas (códigos de equipo)
  const listeners = new Set();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          counts = migrate(parsed);
        }
      }
      const rawR = localStorage.getItem(RECENT_KEY);
      if (rawR) {
        const r = JSON.parse(rawR);
        if (Array.isArray(r)) recent = r.slice(0, 5);
      }
    } catch (e) {
      console.warn('No se pudo leer localStorage:', e);
      counts = {};
      recent = [];
    }
  }

  /** Migración silenciosa de formatos previos. */
  function migrate(data) {
    const out = {};
    for (const k in data) {
      const v = data[k];
      if (typeof v === 'number' && v > 0) out[k] = v | 0;
      else if (v === true) out[k] = 1;
    }
    return out;
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(counts));
    } catch (e) {
      // cuota llena o modo privado
      console.warn('No se pudo guardar:', e);
      toast('No se pudo guardar (¿modo privado o sin espacio?)');
    }
  }

  function persistRecent() {
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
    } catch (e) { /* ignorar */ }
  }

  function notify() {
    listeners.forEach((fn) => {
      try { fn(); } catch (e) { console.error(e); }
    });
  }

  // ===== API pública =====

  function get(code) {
    return counts[code] || 0;
  }

  function set(code, value) {
    const v = Math.max(0, value | 0);
    if (v === 0) delete counts[code];
    else counts[code] = v;
    persist();
    notify();
  }

  /** Ciclo: 0 → 1 → 2 → 3 → ... → reinicia a 0 después de 9 (límite razonable). */
  function cycle(code) {
    const cur = get(code);
    const next = cur >= 9 ? 0 : cur + 1;
    set(code, next);
    return next;
  }

  function remove(code) {
    set(code, 0);
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  /** Totales globales. */
  function totals() {
    let owned = 0, dupes = 0;
    for (const code of DATA.allCodes) {
      const c = counts[code] || 0;
      if (c >= 1) owned++;
      if (c >= 2) dupes += (c - 1);
    }
    const total = DATA.allCodes.length;
    return {
      owned,
      dupes,
      missing: total - owned,
      total,
      pct: total ? (owned / total) * 100 : 0
    };
  }

  /** Totales para una sección (FWC o un equipo). */
  function sectionTotals(sectionCode) {
    const section = DATA.sections.find((s) => s.code === sectionCode);
    if (!section) return { owned: 0, total: 0, pct: 0 };
    let owned = 0;
    for (const c of section.codes) if ((counts[c] || 0) >= 1) owned++;
    return {
      owned,
      total: section.codes.length,
      pct: section.codes.length ? (owned / section.codes.length) * 100 : 0
    };
  }

  /** Totales por grupo (A..L y FWC). */
  function groupTotals(groupCode) {
    let owned = 0, total = 0;
    for (const s of DATA.sections) {
      if (s.group !== groupCode) continue;
      total += s.codes.length;
      for (const c of s.codes) if ((counts[c] || 0) >= 1) owned++;
    }
    return { owned, total, pct: total ? (owned / total) * 100 : 0 };
  }

  /** Lista de faltantes agrupada por sección. */
  function missingBySection() {
    const out = [];
    for (const s of DATA.sections) {
      const miss = s.codes.filter((c) => (counts[c] || 0) === 0);
      if (miss.length) out.push({ section: s, codes: miss });
    }
    return out;
  }

  /** Lista de repetidas agrupada por sección, con cantidad. */
  function dupesBySection() {
    const out = [];
    for (const s of DATA.sections) {
      const list = [];
      for (const c of s.codes) {
        const n = counts[c] || 0;
        if (n >= 2) list.push({ code: c, qty: n - 1 });
      }
      if (list.length) out.push({ section: s, items: list });
    }
    return out;
  }

  function reset() {
    counts = {};
    recent = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(RECENT_KEY);
    } catch (e) { /* ignorar */ }
    notify();
  }

  function pushRecent(sectionCode) {
    recent = [sectionCode, ...recent.filter((c) => c !== sectionCode)].slice(0, 5);
    persistRecent();
  }

  function getRecent() {
    return recent.slice();
  }

  // Inicializar
  load();

  return {
    get, set, cycle, remove,
    subscribe,
    totals, sectionTotals, groupTotals,
    missingBySection, dupesBySection,
    reset, pushRecent, getRecent
  };
})();

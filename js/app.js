/**
 * app.js — Lógica de UI y render de cada pantalla.
 * Cada pantalla devuelve su HTML como string y luego adjunta sus listeners.
 */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const screen = $('#screen');
const appTitle = $('#appTitle');
const backBtn = $('#backBtn');
const toastEl = $('#toast');
const modalRoot = $('#modalRoot');

// ===== UI helpers =====

let toastTimer = null;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1800);
}
window.toast = toast; // expuesto para state.js

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function progressBar(pct, lg = false) {
  const w = Math.max(0, Math.min(100, pct));
  return `<div class="progress${lg ? ' lg' : ''}"><div class="progress-fill" style="width:${w.toFixed(1)}%"></div></div>`;
}

function confirmModal({ title, text, confirmLabel = 'Confirmar', danger = false }) {
  return new Promise((resolve) => {
    modalRoot.innerHTML = `
      <div class="modal-overlay" role="dialog" aria-modal="true">
        <div class="modal">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(text)}</p>
          <div class="action-row">
            <button class="btn" data-act="cancel" type="button">Cancelar</button>
            <button class="btn ${danger ? 'danger' : 'primary'}" data-act="ok" type="button">${escapeHtml(confirmLabel)}</button>
          </div>
        </div>
      </div>`;
    const close = (v) => {
      modalRoot.innerHTML = '';
      resolve(v);
    };
    modalRoot.addEventListener('click', (e) => {
      const t = e.target;
      if (t.dataset.act === 'ok') close(true);
      else if (t.dataset.act === 'cancel' || t.classList.contains('modal-overlay')) close(false);
    }, { once: false });
  });
}

// ===== Render: header & nav =====

function updateHeader(route) {
  const showBack = route.name === 'team';
  backBtn.hidden = !showBack;
  if (route.name === 'home') appTitle.textContent = 'Mundial 2026';
  else if (route.name === 'teams') appTitle.textContent = 'Equipos';
  else if (route.name === 'team') {
    const code = route.params[0];
    const s = DATA.sections.find((x) => x.code === code);
    appTitle.textContent = s ? s.name : 'Equipo';
  }
  else if (route.name === 'lists') appTitle.textContent = 'Listas';
  else if (route.name === 'stats') appTitle.textContent = 'Estadísticas';
}

function updateNav(route) {
  let active = route.name;
  if (route.name === 'team') active = 'teams';
  if (route.name === 'home') active = 'home';
  $$('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.route === active));
}

backBtn.addEventListener('click', () => Router.back());
$$('.nav-btn').forEach((b) => {
  b.addEventListener('click', () => Router.go(b.dataset.route));
});

// ===== Pantalla: Resumen (Home) =====

function renderHome() {
  const t = State.totals();
  const recent = State.getRecent();

  let recentHtml = '';
  if (recent.length) {
    const items = recent.map((code) => {
      const s = DATA.sections.find((x) => x.code === code);
      if (!s) return '';
      const st = State.sectionTotals(code);
      return `
        <div class="team-row" data-go="team/${s.code}">
          <div class="team-flag">${s.flag}</div>
          <div class="team-info">
            <div class="team-name">${escapeHtml(s.name)}</div>
            <div class="team-meta">${s.group === 'FWC' ? 'Especiales' : 'Grupo ' + s.group}</div>
          </div>
          <div class="team-progress-wrap">
            ${progressBar(st.pct)}
            <div class="count"><strong>${st.owned}</strong>/${st.total}</div>
          </div>
        </div>`;
    }).join('');
    recentHtml = `
      <div class="section-title">Recientes</div>
      ${items}`;
  }

  screen.innerHTML = `
    <div class="hero-card">
      <div class="hero-percent">${t.pct.toFixed(1)}%</div>
      <div class="hero-sub">${t.owned} de ${t.total} estampas</div>
      ${progressBar(t.pct, true)}
    </div>

    <div class="grid-2">
      <div class="stat-card blue">
        <div class="label">Tengo</div>
        <div class="value">${t.owned}</div>
      </div>
      <div class="stat-card">
        <div class="label">Faltan</div>
        <div class="value">${t.missing}</div>
      </div>
      <div class="stat-card gold">
        <div class="label">Repetidas</div>
        <div class="value">${t.dupes}</div>
      </div>
      <div class="stat-card">
        <div class="label">Completado</div>
        <div class="value">${t.pct.toFixed(0)}%</div>
      </div>
    </div>

    ${recentHtml}

    <div class="section-title">Empieza</div>
    <div class="card" data-go="teams" style="text-align:center; cursor:pointer;">
      <strong style="color:var(--gold)">Ver todos los equipos →</strong>
    </div>
  `;

  // Navegación
  $$('[data-go]', screen).forEach((el) => {
    el.addEventListener('click', () => Router.go(el.dataset.go));
  });
}

// ===== Pantalla: Equipos =====

let teamsFilter = { group: 'ALL', q: '' };

function renderTeams() {
  const groups = ['ALL', 'FWC', ...GROUPS];
  const groupHtml = groups.map((g) => {
    const label = g === 'ALL' ? 'Todos' : g === 'FWC' ? 'FWC' : g;
    return `<button class="chip ${teamsFilter.group === g ? 'active' : ''}" data-group="${g}">${label}</button>`;
  }).join('');

  const q = teamsFilter.q.toLowerCase().trim();
  const visible = DATA.sections.filter((s) => {
    if (teamsFilter.group !== 'ALL' && s.group !== teamsFilter.group) return false;
    if (q && !s.name.toLowerCase().includes(q) && !s.code.toLowerCase().includes(q)) return false;
    return true;
  });

  const rowsHtml = visible.map((s) => {
    const st = State.sectionTotals(s.code);
    const complete = st.owned === st.total;
    return `
      <div class="team-row" data-go="team/${s.code}" role="button">
        <div class="team-flag">${s.flag}</div>
        <div class="team-info">
          <div class="team-name">
            ${escapeHtml(s.name)}
            ${complete ? '<span class="badge-complete">✓ Completo</span>' : ''}
          </div>
          <div class="team-meta">
            <span class="group-tag">${s.group === 'FWC' ? 'FWC' : 'Grupo ' + s.group}</span>
          </div>
        </div>
        <div class="team-progress-wrap">
          ${progressBar(st.pct)}
          <div class="count"><strong>${st.owned}</strong>/${st.total}</div>
        </div>
      </div>`;
  }).join('') || '<div class="empty-msg">Sin resultados.</div>';

  screen.innerHTML = `
    <div class="filter-row">
      <input class="search-input" id="searchInput" type="search" placeholder="Buscar equipo…" value="${escapeHtml(teamsFilter.q)}" />
    </div>
    <div class="group-filter">${groupHtml}</div>
    ${rowsHtml}
  `;

  $$('.chip', screen).forEach((c) => {
    c.addEventListener('click', () => {
      teamsFilter.group = c.dataset.group;
      renderTeams();
    });
  });
  const input = $('#searchInput', screen);
  input.addEventListener('input', (e) => {
    teamsFilter.q = e.target.value;
    renderTeams();
    // mantener foco
    const newInput = $('#searchInput', screen);
    if (newInput) {
      newInput.focus();
      newInput.setSelectionRange(newInput.value.length, newInput.value.length);
    }
  });
  $$('[data-go]', screen).forEach((el) => {
    el.addEventListener('click', () => Router.go(el.dataset.go));
  });
}

// ===== Pantalla: Detalle de equipo =====

function renderTeam(sectionCode) {
  const s = DATA.sections.find((x) => x.code === sectionCode);
  if (!s) { Router.go('teams'); return; }

  State.pushRecent(sectionCode);
  const st = State.sectionTotals(sectionCode);

  const stickersHtml = s.codes.map((code) => {
    const meta = DATA.stickers[code];
    const qty = State.get(code);
    let cls = 'sticker';
    if (meta.foil) cls += ' foil';
    if (qty === 1) cls += ' have';
    else if (qty >= 2) cls += ' dupe';
    const dupeBadge = qty >= 2 ? `<span class="dupe-badge">×${qty}</span>` : '';
    const foilMark = meta.foil ? '<span class="foil-mark">★</span>' : '';
    return `
      <button class="${cls}" data-code="${code}" type="button" aria-label="${escapeHtml(meta.code)} ${escapeHtml(meta.label)}">
        ${foilMark}
        ${dupeBadge}
        <span class="code">${meta.code}</span>
        <span class="label-mini">${escapeHtml(meta.label)}</span>
      </button>`;
  }).join('');

  screen.innerHTML = `
    <div class="team-detail-header">
      <div class="team-detail-flag">${s.flag}</div>
      <div class="team-detail-name">${escapeHtml(s.name)}</div>
      <div class="team-detail-meta">${s.group === 'FWC' ? 'Sección especial' : 'Grupo ' + s.group} · ${st.owned}/${st.total}</div>
    </div>
    ${progressBar(st.pct, true)}
    <div class="progress-text"><strong>${st.owned}</strong> / ${st.total}<span>${st.pct.toFixed(1)}%</span></div>

    <div class="stickers-grid" id="stickersGrid">${stickersHtml}</div>

    <div class="hint-row">Tap: tengo → repetida ×2 → ×3 …  ·  Long press: quitar</div>
  `;

  // Listeners de sticker
  const grid = $('#stickersGrid', screen);
  let longPressTimer = null;
  let longPressFired = false;

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.sticker');
    if (!btn) return;
    if (longPressFired) { longPressFired = false; return; }
    const code = btn.dataset.code;
    State.cycle(code);
    renderTeam(sectionCode); // re-render
  });

  const startLongPress = (e) => {
    const btn = e.target.closest('.sticker');
    if (!btn) return;
    longPressFired = false;
    clearTimeout(longPressTimer);
    longPressTimer = setTimeout(() => {
      longPressFired = true;
      const code = btn.dataset.code;
      if (State.get(code) > 0) {
        State.remove(code);
        toast(`${code} quitado`);
        renderTeam(sectionCode);
      }
    }, 500);
  };
  const cancelLongPress = () => clearTimeout(longPressTimer);

  grid.addEventListener('touchstart', startLongPress, { passive: true });
  grid.addEventListener('touchend', cancelLongPress);
  grid.addEventListener('touchmove', cancelLongPress);
  grid.addEventListener('mousedown', startLongPress);
  grid.addEventListener('mouseup', cancelLongPress);
  grid.addEventListener('mouseleave', cancelLongPress);
}

// ===== Pantalla: Listas =====

function buildShareMessage(missing, dupes) {
  const missingFlat = [];
  missing.forEach((g) => g.codes.forEach((c) => missingFlat.push(c)));
  const dupesFlat = [];
  dupes.forEach((g) => g.items.forEach((it) => {
    dupesFlat.push(it.qty > 1 ? `${it.code} ×${it.qty}` : it.code);
  }));

  let txt = '⚽ Álbum Mundial Panini 2026\n';
  txt += `🔍 Me faltan (${missingFlat.length}): ${missingFlat.join(' ')}\n`;
  txt += `🔄 Ofrezco (${dupesFlat.length}): ${dupesFlat.join(', ')}`;
  return txt;
}

function renderLists() {
  const missing = State.missingBySection();
  const dupes = State.dupesBySection();
  const totalMissing = missing.reduce((a, g) => a + g.codes.length, 0);
  const totalDupes = dupes.reduce((a, g) => a + g.items.length, 0);

  const missingHtml = missing.length ? missing.map((g) => `
    <div class="list-group">
      <div class="list-group-header">
        <span style="font-size:18px">${g.section.flag}</span>
        <span>${escapeHtml(g.section.name)}</span>
        <span style="color:var(--text-dim); font-size:12px; margin-left:auto">${g.codes.length}</span>
      </div>
      <div class="list-codes">${g.codes.join(' ')}</div>
    </div>
  `).join('') : '<div class="empty-msg">¡No te falta ninguna! 🎉</div>';

  const dupesHtml = dupes.length ? dupes.map((g) => `
    <div class="list-group">
      <div class="list-group-header">
        <span style="font-size:18px">${g.section.flag}</span>
        <span>${escapeHtml(g.section.name)}</span>
        <span style="color:var(--text-dim); font-size:12px; margin-left:auto">${g.items.length}</span>
      </div>
      <div class="list-codes">${g.items.map((it) => it.qty > 1 ? `${it.code} ×${it.qty}` : it.code).join(', ')}</div>
    </div>
  `).join('') : '<div class="empty-msg">Aún no tienes repetidas.</div>';

  screen.innerHTML = `
    <div class="action-row">
      <button class="btn whatsapp" id="btnWhats" type="button">📱 WhatsApp</button>
      <button class="btn primary" id="btnCopy" type="button">📋 Copiar</button>
    </div>

    <div class="section-title">🔍 Me faltan (${totalMissing})</div>
    ${missingHtml}

    <div class="section-title">🔄 Ofrezco (${totalDupes})</div>
    ${dupesHtml}
  `;

  const msg = buildShareMessage(missing, dupes);

  $('#btnWhats', screen).addEventListener('click', () => {
    const url = 'https://wa.me/?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
  });

  $('#btnCopy', screen).addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(msg);
      } else {
        const ta = document.createElement('textarea');
        ta.value = msg;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      toast('Copiado al portapapeles');
    } catch (e) {
      toast('No se pudo copiar');
    }
  });
}

// ===== Pantalla: Estadísticas =====

function renderStats() {
  const t = State.totals();
  const groupRows = ['FWC', ...GROUPS].map((g) => {
    const gt = State.groupTotals(g);
    const label = g === 'FWC' ? 'FWC' : 'Grupo ' + g;
    return `
      <div class="group-bar-row">
        <div class="group-bar-label">${label}</div>
        <div class="group-bar-progress">${progressBar(gt.pct)}</div>
        <div class="group-bar-count">${gt.owned}/${gt.total}</div>
      </div>`;
  }).join('');

  const sectionsWithPct = DATA.sections.map((s) => {
    const st = State.sectionTotals(s.code);
    return { s, pct: st.pct, owned: st.owned, total: st.total };
  });
  const top = [...sectionsWithPct].sort((a, b) => b.pct - a.pct).slice(0, 5);
  const bottom = [...sectionsWithPct].sort((a, b) => a.pct - b.pct).slice(0, 5);

  const topHtml = top.map((x) => `
    <li>
      <span class="flag">${x.s.flag}</span>
      <span class="name">${escapeHtml(x.s.name)}</span>
      <span class="pct">${x.pct.toFixed(0)}%</span>
    </li>
  `).join('');
  const bottomHtml = bottom.map((x) => `
    <li>
      <span class="flag">${x.s.flag}</span>
      <span class="name">${escapeHtml(x.s.name)}</span>
      <span class="pct">${x.pct.toFixed(0)}%</span>
    </li>
  `).join('');

  // Estimación de sobres: cada sobre = 7 estampas. Asumimos sin repetidas ideales,
  // pero como ya hay repetidas reales, mostramos el caso "ideal" (mínimo teórico).
  const packsIdeal = Math.ceil(t.missing / 7);

  screen.innerHTML = `
    <div class="hero-card">
      <div class="hero-percent">${t.pct.toFixed(1)}%</div>
      <div class="hero-sub">${t.owned} / ${t.total}</div>
      ${progressBar(t.pct, true)}
    </div>

    <div class="section-title">Progreso por grupo</div>
    <div class="card">${groupRows}</div>

    <div class="section-title">Top 5 más avanzados</div>
    <div class="card"><ul class="top-list">${topHtml}</ul></div>

    <div class="section-title">Top 5 menos avanzados</div>
    <div class="card"><ul class="top-list">${bottomHtml}</ul></div>

    <div class="section-title">Estimación</div>
    <div class="card">
      <p style="margin:0; color:var(--text-dim); font-size:14px;">
        Te faltan <strong style="color:var(--text)">${t.missing}</strong> estampas.
        En condiciones ideales (sin repetidas), necesitarías al menos
        <strong style="color:var(--gold)">${packsIdeal}</strong> sobres (7 estampas c/u).
      </p>
    </div>

    <div class="section-title">Mantenimiento</div>
    <button class="btn danger" id="btnReset" type="button">Reiniciar álbum</button>
  `;

  $('#btnReset', screen).addEventListener('click', async () => {
    const ok = await confirmModal({
      title: '¿Reiniciar álbum?',
      text: 'Se borrarán todas las estampas marcadas. Esta acción no se puede deshacer.',
      confirmLabel: 'Sí, reiniciar',
      danger: true
    });
    if (ok) {
      State.reset();
      toast('Álbum reiniciado');
      Router.go('home');
    }
  });
}

// ===== Bootstrap del router =====

Router.onChange((route) => {
  updateHeader(route);
  updateNav(route);
  window.scrollTo(0, 0);

  switch (route.name) {
    case 'home': return renderHome();
    case 'teams': return renderTeams();
    case 'team': return renderTeam(route.params[0]);
    case 'lists': return renderLists();
    case 'stats': return renderStats();
    default: return renderHome();
  }
});

Router.dispatch();

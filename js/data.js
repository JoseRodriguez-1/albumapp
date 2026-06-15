/**
 * data.js — Dataset estático del álbum Panini FIFA World Cup 2026.
 * 980 estampas totales:
 *   - 1 estampa Panini ("00", foil)
 *   - 19 estampas FWC (FWC1–FWC19)
 *   - 48 selecciones × 20 estampas (1 escudo foil + 11 jugadores + 1 foto grupal + 7 jugadores)
 *
 * Cada estampa: { code, label, foil, team, group, idx }
 * - foil: true solo para "00" y el escudo (estampa 1) de cada equipo.
 */

const TEAMS = [
  // Grupo A
  { code: 'CZE', name: 'República Checa', group: 'A', flag: '🇨🇿' },
  { code: 'MEX', name: 'México',          group: 'A', flag: '🇲🇽' },
  { code: 'RSA', name: 'Sudáfrica',       group: 'A', flag: '🇿🇦' },
  { code: 'KOR', name: 'Corea del Sur',   group: 'A', flag: '🇰🇷' },
  // Grupo B
  { code: 'BIH', name: 'Bosnia y Herz.',  group: 'B', flag: '🇧🇦' },
  { code: 'CAN', name: 'Canadá',          group: 'B', flag: '🇨🇦' },
  { code: 'QAT', name: 'Catar',           group: 'B', flag: '🇶🇦' },
  { code: 'SUI', name: 'Suiza',           group: 'B', flag: '🇨🇭' },
  // Grupo C
  { code: 'BRA', name: 'Brasil',          group: 'C', flag: '🇧🇷' },
  { code: 'HAI', name: 'Haití',           group: 'C', flag: '🇭🇹' },
  { code: 'MAR', name: 'Marruecos',       group: 'C', flag: '🇲🇦' },
  { code: 'POR', name: 'Portugal',        group: 'C', flag: '🇵🇹' },
  // Grupo D
  { code: 'ARG', name: 'Argentina',       group: 'D', flag: '🇦🇷' },
  { code: 'CHI', name: 'Chile',           group: 'D', flag: '🇨🇱' },
  { code: 'NZL', name: 'Nueva Zelanda',   group: 'D', flag: '🇳🇿' },
  { code: 'SEN', name: 'Senegal',         group: 'D', flag: '🇸🇳' },
  // Grupo E
  { code: 'ESP', name: 'España',          group: 'E', flag: '🇪🇸' },
  { code: 'FIN', name: 'Finlandia',       group: 'E', flag: '🇫🇮' },
  { code: 'NGA', name: 'Nigeria',         group: 'E', flag: '🇳🇬' },
  { code: 'THA', name: 'Tailandia',       group: 'E', flag: '🇹🇭' },
  // Grupo F
  { code: 'CRO', name: 'Croacia',         group: 'F', flag: '🇭🇷' },
  { code: 'GHA', name: 'Ghana',           group: 'F', flag: '🇬🇭' },
  { code: 'JPN', name: 'Japón',           group: 'F', flag: '🇯🇵' },
  { code: 'USA', name: 'Estados Unidos',  group: 'F', flag: '🇺🇸' },
  // Grupo G
  { code: 'AUS', name: 'Australia',       group: 'G', flag: '🇦🇺' },
  { code: 'EGY', name: 'Egipto',          group: 'G', flag: '🇪🇬' },
  { code: 'FRA', name: 'Francia',         group: 'G', flag: '🇫🇷' },
  { code: 'KSA', name: 'Arabia Saudita',  group: 'G', flag: '🇸🇦' },
  // Grupo H
  { code: 'ALB', name: 'Albania',         group: 'H', flag: '🇦🇱' },
  { code: 'COL', name: 'Colombia',        group: 'H', flag: '🇨🇴' },
  { code: 'GER', name: 'Alemania',        group: 'H', flag: '🇩🇪' },
  { code: 'PAR', name: 'Paraguay',        group: 'H', flag: '🇵🇾' },
  // Grupo I
  { code: 'AUT', name: 'Austria',         group: 'I', flag: '🇦🇹' },
  { code: 'IRL', name: 'Irlanda',         group: 'I', flag: '🇮🇪' },
  { code: 'IRN', name: 'Irán',            group: 'I', flag: '🇮🇷' },
  { code: 'NED', name: 'Países Bajos',    group: 'I', flag: '🇳🇱' },
  // Grupo J
  { code: 'BEL', name: 'Bélgica',         group: 'J', flag: '🇧🇪' },
  { code: 'PAN', name: 'Panamá',          group: 'J', flag: '🇵🇦' },
  { code: 'TUN', name: 'Túnez',           group: 'J', flag: '🇹🇳' },
  { code: 'URU', name: 'Uruguay',         group: 'J', flag: '🇺🇾' },
  // Grupo K
  { code: 'DEN', name: 'Dinamarca',       group: 'K', flag: '🇩🇰' },
  { code: 'ECU', name: 'Ecuador',         group: 'K', flag: '🇪🇨' },
  { code: 'ENG', name: 'Inglaterra',      group: 'K', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'VEN', name: 'Venezuela',       group: 'K', flag: '🇻🇪' },
  // Grupo L
  { code: 'CMR', name: 'Camerún',         group: 'L', flag: '🇨🇲' },
  { code: 'CRI', name: 'Costa Rica',      group: 'L', flag: '🇨🇷' },
  { code: 'ITA', name: 'Italia',          group: 'L', flag: '🇮🇹' },
  { code: 'UZB', name: 'Uzbekistán',      group: 'L', flag: '🇺🇿' }
];

const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

/**
 * Colores temáticos por selección (basados en bandera/camiseta).
 * Cuando un equipo no está aquí, el render usa el color por defecto (--blue).
 */
const TEAM_COLORS = {
  MEX: { primary: '#006847', secondary: '#CE1126' },
  ARG: { primary: '#74ACDF', secondary: '#FFFFFF' },
  BRA: { primary: '#009C3B', secondary: '#FFDF00' },
  FRA: { primary: '#002395', secondary: '#ED2939' },
  ESP: { primary: '#AA151B', secondary: '#F1BF00' },
  ENG: { primary: '#CF081F', secondary: '#FFFFFF' },
  GER: { primary: '#000000', secondary: '#DD0000' },
  POR: { primary: '#006600', secondary: '#FF0000' },
  ITA: { primary: '#003399', secondary: '#009246' },
  USA: { primary: '#002868', secondary: '#BF0A30' },
  COL: { primary: '#FCD116', secondary: '#003087' },
  URU: { primary: '#5EB6E4', secondary: '#FFFFFF' },
  CAN: { primary: '#FF0000', secondary: '#FFFFFF' },
  CRO: { primary: '#FF0000', secondary: '#FFFFFF' },
  NED: { primary: '#FF6600', secondary: '#003DA5' },
  MAR: { primary: '#C1272D', secondary: '#006233' },
  SEN: { primary: '#00853F', secondary: '#FDEF42' },
  JPN: { primary: '#BC002D', secondary: '#FFFFFF' },
  KOR: { primary: '#CD2E3A', secondary: '#003478' },
  CZE: { primary: '#D7141A', secondary: '#11457E' },
  RSA: { primary: '#007A4D', secondary: '#FFB81C' },
  BIH: { primary: '#002395', secondary: '#FCCA00' },
  QAT: { primary: '#8D1B3D', secondary: '#FFFFFF' },
  SUI: { primary: '#FF0000', secondary: '#FFFFFF' },
  HAI: { primary: '#00209F', secondary: '#D21034' },
  NZL: { primary: '#000000', secondary: '#FFFFFF' },
  CHI: { primary: '#D52B1E', secondary: '#003087' },
  FIN: { primary: '#003580', secondary: '#FFFFFF' },
  NGA: { primary: '#008751', secondary: '#FFFFFF' },
  THA: { primary: '#A51931', secondary: '#2D2A4A' },
  GHA: { primary: '#006B3F', secondary: '#FCD116' },
  AUS: { primary: '#00843D', secondary: '#FFD700' },
  EGY: { primary: '#CE1126', secondary: '#000000' },
  KSA: { primary: '#006C35', secondary: '#FFFFFF' },
  ALB: { primary: '#E41E20', secondary: '#000000' },
  PAR: { primary: '#D52B1E', secondary: '#0038A8' },
  AUT: { primary: '#ED2939', secondary: '#FFFFFF' },
  IRL: { primary: '#169B62', secondary: '#FF883E' },
  IRN: { primary: '#239F40', secondary: '#DA0000' },
  BEL: { primary: '#000000', secondary: '#EF3340' },
  PAN: { primary: '#DB1E36', secondary: '#003A70' },
  TUN: { primary: '#E70013', secondary: '#FFFFFF' },
  DEN: { primary: '#C60C30', secondary: '#FFFFFF' },
  ECU: { primary: '#FFD100', secondary: '#003087' },
  VEN: { primary: '#CF142B', secondary: '#00247D' },
  CMR: { primary: '#007A5E', secondary: '#CE1126' },
  CRI: { primary: '#002B7F', secondary: '#CE1126' },
  UZB: { primary: '#1EB53A', secondary: '#0099B5' },
  FWC: { primary: '#D4A843', secondary: '#FFFFFF' }
};

const DEFAULT_TEAM_COLOR = { primary: '#3b6fd4', secondary: '#d4a843' };

function getTeamColors(code) {
  return TEAM_COLORS[code] || DEFAULT_TEAM_COLOR;
}

// Sección FWC (especial): 20 estampas, todas foil/especiales
const FWC_SECTION = {
  code: 'FWC',
  name: 'FIFA World Cup',
  group: 'FWC',
  flag: '🏆',
  isSpecial: true
};

// 19 estampas FWC (FWC1–FWC19). La "00" Panini se añade aparte.
const FWC_LABELS = [
  'Logo FIFA WC',
  'Trofeo',
  'Mascota',
  'Mascota',
  'Mascota',
  'Balón oficial',
  'Póster oficial',
  'Anfitrión: Canadá',
  'Anfitrión: México',
  'Anfitrión: USA',
  'Sede emblema',
  'Sede emblema',
  'Sede emblema',
  'Sede emblema',
  'Sede emblema',
  'FIFA Museum',
  'FIFA Museum',
  'FIFA Museum',
  'FIFA Museum'
];

/**
 * Genera la lista completa de estampas.
 * Devuelve { sections: [...], stickers: {code: meta}, allCodes: [...] }
 */
function buildDataset() {
  const sections = [];
  const stickers = {};
  const allCodes = [];

  // Sección FWC: estampa Panini "00" + FWC1..FWC19 (20 estampas en total)
  const fwcSection = { ...FWC_SECTION, codes: [] };

  // Estampa Panini global (foil, código "00") — primera del álbum
  stickers['00'] = {
    code: '00',
    label: 'Estampa Panini',
    foil: true,
    special: true,
    team: 'FWC',
    group: 'FWC',
    idx: 0
  };
  fwcSection.codes.push('00');
  allCodes.push('00');

  // FWC1..FWC19 (foil/especiales)
  for (let i = 1; i <= 19; i++) {
    const code = `FWC${i}`;
    const meta = {
      code,
      label: FWC_LABELS[i - 1] || `Especial ${i}`,
      foil: true,
      team: 'FWC',
      group: 'FWC',
      idx: i
    };
    stickers[code] = meta;
    fwcSection.codes.push(code);
    allCodes.push(code);
  }
  sections.push(fwcSection);

  // 48 equipos × 20 estampas:
  //   1     → escudo (foil)
  //   2-12  → 11 jugadores
  //   13    → foto grupal
  //   14-20 → 7 jugadores
  for (const t of TEAMS) {
    const section = { ...t, codes: [] };
    let playerNum = 0;
    for (let i = 1; i <= 20; i++) {
      const code = `${t.code}${i}`;
      const foil = (i === 1);
      let label;
      if (i === 1) label = 'Escudo';
      else if (i === 13) label = 'Foto del equipo';
      else {
        playerNum++;
        label = `Jugador ${playerNum}`;
      }
      const meta = {
        code,
        label,
        foil,
        team: t.code,
        group: t.group,
        idx: i
      };
      stickers[code] = meta;
      section.codes.push(code);
      allCodes.push(code);
    }
    sections.push(section);
  }

  return { sections, stickers, allCodes };
}

const DATA = buildDataset();
const TOTAL_STICKERS = DATA.allCodes.length; // 980

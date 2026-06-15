/**
 * data.js — Dataset estático del álbum Panini FIFA World Cup 2026.
 * 980 estampas totales:
 *   - 1 estampa Panini ("00", foil)
 *   - 19 estampas FWC (FWC1–FWC19, todas foil)
 *   - 48 selecciones × 20 estampas (1 escudo foil + 11 jugadores + 1 foto grupal + 7 jugadores)
 *
 * Cada estampa: { code, label, foil, team, group, idx }
 * - foil: true solo para "00", todas las FWC y el escudo (estampa 1) de cada equipo.
 */

const TEAMS = [
  // Grupo A
  { code: 'MEX', name: 'México',          group: 'A', flag: '🇲🇽' },
  { code: 'RSA', name: 'Sudáfrica',       group: 'A', flag: '🇿🇦' },
  { code: 'KOR', name: 'Corea del Sur',   group: 'A', flag: '🇰🇷' },
  { code: 'CZE', name: 'República Checa', group: 'A', flag: '🇨🇿' },
  // Grupo B
  { code: 'CAN', name: 'Canadá',          group: 'B', flag: '🇨🇦' },
  { code: 'BIH', name: 'Bosnia y Herz.',  group: 'B', flag: '🇧🇦' },
  { code: 'QAT', name: 'Catar',           group: 'B', flag: '🇶🇦' },
  { code: 'SUI', name: 'Suiza',           group: 'B', flag: '🇨🇭' },
  // Grupo C
  { code: 'BRA', name: 'Brasil',          group: 'C', flag: '🇧🇷' },
  { code: 'MAR', name: 'Marruecos',       group: 'C', flag: '🇲🇦' },
  { code: 'HAI', name: 'Haití',           group: 'C', flag: '🇭🇹' },
  { code: 'SCO', name: 'Escocia',         group: 'C', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  // Grupo D
  { code: 'USA', name: 'Estados Unidos',  group: 'D', flag: '🇺🇸' },
  { code: 'PAR', name: 'Paraguay',        group: 'D', flag: '🇵🇾' },
  { code: 'AUS', name: 'Australia',       group: 'D', flag: '🇦🇺' },
  { code: 'TUR', name: 'Turquía',         group: 'D', flag: '🇹🇷' },
  // Grupo E
  { code: 'GER', name: 'Alemania',        group: 'E', flag: '🇩🇪' },
  { code: 'CUW', name: 'Curazao',         group: 'E', flag: '🇨🇼' },
  { code: 'CIV', name: 'Costa de Marfil', group: 'E', flag: '🇨🇮' },
  { code: 'ECU', name: 'Ecuador',         group: 'E', flag: '🇪🇨' },
  // Grupo F
  { code: 'NED', name: 'Países Bajos',    group: 'F', flag: '🇳🇱' },
  { code: 'JPN', name: 'Japón',           group: 'F', flag: '🇯🇵' },
  { code: 'SWE', name: 'Suecia',          group: 'F', flag: '🇸🇪' },
  { code: 'TUN', name: 'Túnez',           group: 'F', flag: '🇹🇳' },
  // Grupo G
  { code: 'BEL', name: 'Bélgica',         group: 'G', flag: '🇧🇪' },
  { code: 'EGY', name: 'Egipto',          group: 'G', flag: '🇪🇬' },
  { code: 'IRN', name: 'Irán',            group: 'G', flag: '🇮🇷' },
  { code: 'NZL', name: 'Nueva Zelanda',   group: 'G', flag: '🇳🇿' },
  // Grupo H
  { code: 'ESP', name: 'España',          group: 'H', flag: '🇪🇸' },
  { code: 'CPV', name: 'Cabo Verde',      group: 'H', flag: '🇨🇻' },
  { code: 'KSA', name: 'Arabia Saudita',  group: 'H', flag: '🇸🇦' },
  { code: 'URU', name: 'Uruguay',         group: 'H', flag: '🇺🇾' },
  // Grupo I
  { code: 'FRA', name: 'Francia',         group: 'I', flag: '🇫🇷' },
  { code: 'SEN', name: 'Senegal',         group: 'I', flag: '🇸🇳' },
  { code: 'IRQ', name: 'Irak',            group: 'I', flag: '🇮🇶' },
  { code: 'NOR', name: 'Noruega',         group: 'I', flag: '🇳🇴' },
  // Grupo J
  { code: 'ARG', name: 'Argentina',       group: 'J', flag: '🇦🇷' },
  { code: 'ALG', name: 'Argelia',         group: 'J', flag: '🇩🇿' },
  { code: 'AUT', name: 'Austria',         group: 'J', flag: '🇦🇹' },
  { code: 'JOR', name: 'Jordania',        group: 'J', flag: '🇯🇴' },
  // Grupo K
  { code: 'POR', name: 'Portugal',        group: 'K', flag: '🇵🇹' },
  { code: 'COD', name: 'Congo RD',        group: 'K', flag: '🇨🇩' },
  { code: 'UZB', name: 'Uzbekistán',      group: 'K', flag: '🇺🇿' },
  { code: 'COL', name: 'Colombia',        group: 'K', flag: '🇨🇴' },
  // Grupo L
  { code: 'ENG', name: 'Inglaterra',      group: 'L', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'CRO', name: 'Croacia',         group: 'L', flag: '🇭🇷' },
  { code: 'GHA', name: 'Ghana',           group: 'L', flag: '🇬🇭' },
  { code: 'PAN', name: 'Panamá',          group: 'L', flag: '🇵🇦' }
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
  // Equipos clasificados FIFA WC 2026 — nuevos
  SCO: { primary: '#003DA5', secondary: '#FFFFFF' },
  TUR: { primary: '#E30A17', secondary: '#FFFFFF' },
  CUW: { primary: '#002B7F', secondary: '#F9E814' },
  CIV: { primary: '#F77F00', secondary: '#009A44' },
  SWE: { primary: '#006AA7', secondary: '#FECC02' },
  IRQ: { primary: '#007A3D', secondary: '#CE1126' },
  NOR: { primary: '#EF2B2D', secondary: '#003087' },
  ALG: { primary: '#006233', secondary: '#D21034' },
  JOR: { primary: '#007A3D', secondary: '#CE1126' },
  COD: { primary: '#007FFF', secondary: '#F7D618' },
  CPV: { primary: '#003893', secondary: '#CF2027' },
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
  'Trofeo Copa del Mundo',
  'Trofeo Copa del Mundo (variante)',
  'Mascotas del torneo',
  'Póster oficial',
  'Balón oficial',
  'Sede / ciudad anfitriona 1',
  'Sede / ciudad anfitriona 2',
  'Sede / ciudad anfitriona 3',
  'Campeón histórico 1',
  'Campeón histórico 2',
  'Campeón histórico 3',
  'Campeón histórico 4',
  'Campeón histórico 5',
  'Campeón histórico 6',
  'Campeón histórico 7',
  'Campeón histórico 8',
  'Campeón histórico 9',
  'Campeón histórico 10',
  'Campeón histórico 11'
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

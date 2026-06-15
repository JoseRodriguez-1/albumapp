/**
 * data.js — Dataset estático del álbum Panini FIFA World Cup 2026.
 * 980 estampas totales: 20 FWC (especiales) + 48 selecciones × 20 estampas.
 *
 * Cada estampa: { code, label, foil, team, group, idx }
 * - foil: true para escudos (estampa 1 y 2 de cada equipo) y todas las FWC.
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

// Sección FWC (especial): 20 estampas, todas foil/especiales
const FWC_SECTION = {
  code: 'FWC',
  name: 'FIFA World Cup',
  group: 'FWC',
  flag: '🏆',
  isSpecial: true
};

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

  // FWC primero
  const fwcSection = { ...FWC_SECTION, codes: [] };
  for (let i = 1; i <= 20; i++) {
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

  // 48 equipos
  for (const t of TEAMS) {
    const section = { ...t, codes: [] };
    for (let i = 1; i <= 20; i++) {
      const code = `${t.code}${i}`;
      // Estampas 1 y 2 son escudos foil
      const foil = (i === 1 || i === 2);
      let label;
      if (i === 1) label = 'Escudo';
      else if (i === 2) label = 'Escudo';
      else if (i === 13) label = 'Equipo';
      else label = `Jugador ${i - 2}`;
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

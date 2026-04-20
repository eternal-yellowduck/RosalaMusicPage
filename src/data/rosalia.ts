export type Track = {
  id: string
  title: string
  artist: string
  duration: string
  albumId: string
  previewUrl?: string
  coverUrl?: string
  searchTerm?: string
}

export type Album = {
  id: string
  slug: string
  title: string
  year: string
  era: string
  introTag: string
  chapterTitle: string
  description: string
  paletteLabel: string
  accent: string
  secondaryAccent: string
  heroImageUrl?: string
  coverUrl?: string
  layoutPreset: 'left' | 'right' | 'stacked'
  visualNotes: string[]
  tracks: Track[]
}

const artist = 'Rosalía'

export const rosaliaAlbums: Album[] = [
  {
    id: 'los-angeles',
    slug: 'los-angeles',
    title: 'Los Ángeles',
    year: '2017',
    era: 'Ritual Origin',
    introTag: '祈祷 / Ash / Acoustic gravity',
    chapterTitle: 'The archive of shadows',
    description:
      '以极简 flamenco 与冷冽留白开场，像在空旷教堂里听到一条声线逐渐靠近。网站里这一章偏向神圣、静默、黑与象牙白的对峙。',
    paletteLabel: 'Ivory, coal, chapel blue',
    accent: '#e6dfd1',
    secondaryAccent: '#5878d9',
    heroImageUrl: '/lux.jpg',
    layoutPreset: 'left',
    visualNotes: [
      'Sparse acoustics, almost liturgical pauses',
      'Portrait lighting with devotional stillness',
      'The beginning of Rosalía as ritual author',
    ],
    tracks: [
      {
        id: 'los-angeles-si-tu-supieras',
        title: 'Si tú supieras compañero',
        artist,
        duration: '3:15',
        albumId: 'los-angeles',
        searchTerm: 'Rosalia Si tu supieras companero',
      },
      {
        id: 'los-angeles-de-plate',
        title: 'De Plata',
        artist,
        duration: '3:28',
        albumId: 'los-angeles',
        searchTerm: 'Rosalia De Plata',
      },
      {
        id: 'los-angeles-catalina',
        title: 'Catalina',
        artist,
        duration: '3:42',
        albumId: 'los-angeles',
        searchTerm: 'Rosalia Catalina',
      },
      {
        id: 'los-angeles-dia-14',
        title: 'Día 14 de abril',
        artist,
        duration: '3:22',
        albumId: 'los-angeles',
        searchTerm: 'Rosalia Dia 14 de abril',
      },
    ],
  },
  {
    id: 'el-mal-querer',
    slug: 'el-mal-querer',
    title: 'El Mal Querer',
    year: '2018',
    era: 'Chapter Opera',
    introTag: 'Chapter / Blood / Gold leaf',
    chapterTitle: 'Love staged as myth',
    description:
      '这一章更像一部被切成章节的戏剧：权力、欲望、嫉妒、献祭感并置。视觉需要像金箔圣像和现代时尚摄影碰撞后的结果，危险而华丽。',
    paletteLabel: 'Crimson, antique gold, night lacquer',
    accent: '#d42830',
    secondaryAccent: '#c7a563',
    heroImageUrl: '/lux.jpg',
    layoutPreset: 'right',
    visualNotes: [
      'Narrative broken into chapter-like tableaux',
      'Flamenco handclaps cut through glossy modern production',
      'Red as wound, gold as halo, black as control',
    ],
    tracks: [
      {
        id: 'el-mal-querer-malamente',
        title: 'Malamente',
        artist,
        duration: '2:30',
        albumId: 'el-mal-querer',
        searchTerm: 'Rosalia Malamente',
      },
      {
        id: 'el-mal-querer-pienso-en-tu-mira',
        title: 'Pienso en tu mirá',
        artist,
        duration: '3:13',
        albumId: 'el-mal-querer',
        searchTerm: 'Rosalia Pienso en tu mira',
      },
      {
        id: 'el-mal-querer-bagre',
        title: 'Bagdad',
        artist,
        duration: '2:56',
        albumId: 'el-mal-querer',
        searchTerm: 'Rosalia Bagdad',
      },
      {
        id: 'el-mal-querer-di-mi-nombre',
        title: 'Di Mi Nombre',
        artist,
        duration: '2:43',
        albumId: 'el-mal-querer',
        searchTerm: 'Rosalia Di Mi Nombre',
      },
    ],
  },
  {
    id: 'motomami',
    slug: 'motomami',
    title: 'MOTOMAMI',
    year: '2022',
    era: 'Velocity Manifesto',
    introTag: 'Chrome / engine / body language',
    chapterTitle: 'A speed ritual in public',
    description:
      '把车速、互联网、身体、脆弱和夸张表演揉成一个超高速剪辑现场。版面应该更锋利、更实验，也更有杂志封面和 runway backroom 的力量。',
    paletteLabel: 'Chrome blue, signal red, carbon black',
    accent: '#316cff',
    secondaryAccent: '#ff4438',
    heroImageUrl: '/lux.jpg',
    layoutPreset: 'stacked',
    visualNotes: [
      'Hyper-pop velocity balanced by intimate voice notes',
      'Red lettering as declaration, chrome surfaces as armor',
      'A world of motorcycles, mirrors, and sudden confession',
    ],
    tracks: [
      {
        id: 'motomami-saoko',
        title: 'Saoko',
        artist,
        duration: '2:18',
        albumId: 'motomami',
        searchTerm: 'Rosalia Saoko',
      },
      {
        id: 'motomami-hentai',
        title: 'HENTAI',
        artist,
        duration: '2:42',
        albumId: 'motomami',
        searchTerm: 'Rosalia HENTAI',
      },
      {
        id: 'motomami-la-fama',
        title: 'LA FAMA',
        artist,
        duration: '3:08',
        albumId: 'motomami',
        searchTerm: 'Rosalia LA FAMA',
      },
      {
        id: 'motomami-chicken-teriyaki',
        title: 'CHICKEN TERIYAKI',
        artist,
        duration: '2:03',
        albumId: 'motomami',
        searchTerm: 'Rosalia CHICKEN TERIYAKI',
      },
    ],
  },
]

export const homeManifesto = [
  'Not a landing page. A chamber for sound, fashion, and iconography.',
  '不是功能模块拼接，而是以专辑章节、速度、情绪和质感来组织浏览。',
  'Every section behaves like an exhibit label, a sleeve note, or a stage entrance.',
]

export const allTracks = rosaliaAlbums.flatMap((album) => album.tracks)

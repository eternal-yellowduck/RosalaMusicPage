export type Track = {
  id: string
  title: string
  artist: string
  duration: string
  albumId: string
  previewUrl?: string
  coverUrl?: string
  searchTerm?: string
  appleMusicAlbumId?: string
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
  atmosphere: string
  atmosphereGlow: string
  surface: string
  light: string
  shadow: string
  textContrast: string
  appleMusicAlbumId: string
  appleMusicCompleteWorksId?: string
  visualDirection: string
  heroImageUrl?: string
  coverUrl?: string
  layoutPreset: 'left' | 'right' | 'stacked'
  visualNotes: string[]
  tracks: Track[]
}

const artist = 'ROSALIA'

export const rosaliaAlbums: Album[] = [
  {
    id: 'los-angeles',
    slug: 'los-angeles',
    title: 'Los Angeles',
    year: '2017',
    era: 'Ritual Origin',
    introTag: 'Prayer / ash / acoustic gravity',
    chapterTitle: 'The archive of shadows',
    description:
      '像一间空旷石室里的低声吟唱。吉他被压得很近，呼吸、停顿和嗓音纹理都被放到最前面，让悲伤显得既古老又亲密。',
    paletteLabel: 'Ivory, ash, muted chapel blue',
    accent: '#efe4d1',
    secondaryAccent: '#7f95c9',
    atmosphere: '#d8d2c8',
    atmosphereGlow: 'rgba(148, 162, 203, 0.34)',
    surface: '#f0e7d8',
    light: '#fff8ec',
    shadow: '#202331',
    textContrast: '#171a20',
    appleMusicAlbumId: '1440865143',
    visualDirection:
      'Pale devotional austerity, close acoustic space, ash-colored silence, and old-world portrait stillness.',
    layoutPreset: 'left',
    visualNotes: [
      'Sparse acoustics, almost liturgical pauses',
      'Portrait lighting with devotional stillness',
      'An origin story written as ritual instead of debut spectacle',
    ],
    tracks: [
      {
        id: 'los-angeles-si-tu-supieras',
        title: 'Si tu supieras companero',
        artist,
        duration: '3:15',
        albumId: 'los-angeles',
        searchTerm: 'Rosalia Si tu supieras companero',
      },
      {
        id: 'los-angeles-de-plata',
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
        title: 'Dia 14 de Abril',
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
    title: 'EL MAL QUERER',
    year: '2018',
    era: 'Chapter Opera',
    introTag: 'Manuscript / crimson / gold leaf',
    chapterTitle: 'Love staged as myth',
    description:
      '这不是温柔情歌，而是一部关于占有、凝视与失控的明亮戏剧。鼓点像命令，拍手像警报，金色和猩红把爱情推成了带有圣像感的章回故事。',
    paletteLabel: 'Ivory, illuminated gold, ceremonial crimson',
    accent: '#cf1f2c',
    secondaryAccent: '#d8aa52',
    atmosphere: '#f0d8a6',
    atmosphereGlow: 'rgba(255, 229, 160, 0.55)',
    surface: '#f7ead0',
    light: '#fff4d8',
    shadow: '#4b1415',
    textContrast: '#23100d',
    appleMusicAlbumId: '1436309944',
    visualDirection:
      'Illuminated manuscript energy, warm ivory light, medieval gold, crimson warning signs, and chapter-opera drama.',
    layoutPreset: 'right',
    visualNotes: [
      'Narrative broken into chapter-like tableaux',
      'Flamenco handclaps cut through glossy modern production',
      'Red as wound, gold as halo, ivory as sacred page',
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
        title: 'Pienso en tu mira',
        artist,
        duration: '3:13',
        albumId: 'el-mal-querer',
        searchTerm: 'Rosalia Pienso en tu mira',
      },
      {
        id: 'el-mal-querer-bagdad',
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
    introTag: 'Chrome / white space / red typography',
    chapterTitle: 'A speed ritual in public',
    description:
      '这里的 Rosalía 更像一台不断变形的引擎。她把挑衅、幽默、脆弱和自我神话焊在一起，让每一首歌都像急刹、甩尾、再突然静止。',
    paletteLabel: 'Flash white, chrome blue, signal red',
    accent: '#f23c2f',
    secondaryAccent: '#2e6dff',
    atmosphere: '#eceef2',
    atmosphereGlow: 'rgba(255, 70, 52, 0.34)',
    surface: '#f5f5f2',
    light: '#ffffff',
    shadow: '#111820',
    textContrast: '#121419',
    appleMusicAlbumId: '1607918350',
    visualDirection:
      'Stark white negative space, chrome reflections, red lettering, flash-lit editorial tension, and motorcycle speed.',
    layoutPreset: 'stacked',
    visualNotes: [
      'Hyper-pop velocity balanced by intimate voice notes',
      'Red lettering as declaration, chrome surfaces as armor',
      'A world of motorcycles, mirrors, and sudden confession',
    ],
    tracks: [
      {
        id: 'motomami-saoko',
        title: 'SAOKO',
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
  {
    id: 'lux',
    slug: 'lux',
    title: 'LUX',
    year: '2025',
    era: 'Sacred Maximalism',
    introTag: 'Blue sky / veil / operatic light',
    chapterTitle: 'A body held inside radiance',
    description:
      'LUX 不是夜店暗面，而是一场明亮、宏大、近乎歌剧化的圣光仪式。蓝天、白纱、银色、金色和宗教感并置，让她的声音像从空中落下的建筑。',
    paletteLabel: 'Sky blue, veil white, silver, sacred gold',
    accent: '#f4efe4',
    secondaryAccent: '#75a8ff',
    atmosphere: '#b9d4f6',
    atmosphereGlow: 'rgba(255, 245, 211, 0.62)',
    surface: '#f8f4ea',
    light: '#ffffff',
    shadow: '#32455f',
    textContrast: '#152136',
    appleMusicAlbumId: '1848167516',
    appleMusicCompleteWorksId: '1893474283',
    visualDirection:
      'Bright sacred blue and white maximalism, veil-like softness, silver highlights, gold devotional glow, and operatic scale.',
    heroImageUrl: '/lux.jpg',
    layoutPreset: 'right',
    visualNotes: [
      'Luminous, spiritual, and operatic rather than nightclub-dark',
      'Blue-sky white veil imagery with silver and gold devotional accents',
      'A maximal sacred pop world where voice, couture, and ritual merge',
    ],
    tracks: [
      {
        id: 'lux-berghain',
        title: 'Berghain',
        artist,
        duration: '3:41',
        albumId: 'lux',
        searchTerm: 'ROSALIA Berghain Lux',
        appleMusicAlbumId: '1848167516',
      },
      {
        id: 'lux-la-perla',
        title: 'La Perla',
        artist,
        duration: '3:19',
        albumId: 'lux',
        searchTerm: 'ROSALIA La Perla Lux',
        appleMusicAlbumId: '1848167516',
      },
      {
        id: 'lux-mio-cristo-piange-diamanti',
        title: 'Mio Cristo Piange Diamanti',
        artist,
        duration: '4:12',
        albumId: 'lux',
        searchTerm: 'ROSALIA Mio Cristo Piange Diamanti Lux',
        appleMusicAlbumId: '1848167516',
      },
      {
        id: 'lux-focuranni',
        title: "Focu 'Ranni",
        artist,
        duration: '3:06',
        albumId: 'lux',
        searchTerm: "ROSALIA Focu Ranni Lux",
        appleMusicAlbumId: '1893474283',
      },
      {
        id: 'lux-novia-robot',
        title: 'Novia Robot',
        artist,
        duration: '3:27',
        albumId: 'lux',
        searchTerm: 'ROSALIA Novia Robot Lux',
        appleMusicAlbumId: '1893474283',
      },
      {
        id: 'lux-jeanne',
        title: 'Jeanne',
        artist,
        duration: '4:01',
        albumId: 'lux',
        searchTerm: 'ROSALIA Jeanne Lux',
        appleMusicAlbumId: '1893474283',
      },
    ],
  },
]

export const homeManifesto = [
  'Not a landing page. A chamber for sound, fashion, and iconography.',
  '不是信息介绍页，而是一座会随专辑情绪与速度切换气压的听觉展厅。',
  'Every section behaves like an exhibit label, a sleeve note, or a stage entrance.',
]

export const allTracks = rosaliaAlbums.flatMap((album) => album.tracks)

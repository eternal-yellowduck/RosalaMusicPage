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

export type RosaliaEra = {
  id: string
  title: string
  years: string
  anchorAlbum: string
  visualLanguage: string
  soundLanguage: string
  bodyLanguage: string
  fashionCue: string
  summary: string
  keywords: string[]
  imageUrl?: string
  imageAlt: string
  mediaHref: string
  mediaLabel: string
  linkedAlbumId?: string
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

export const rosaliaEras: RosaliaEra[] = [
  {
    id: 'apprenticeship',
    title: 'Flamenco Apprenticeship',
    years: 'Pre-2017',
    anchorAlbum: 'Before the archive',
    visualLanguage: 'Rehearsal rooms, dark hair, bare voice, hands as percussion, discipline before iconography.',
    soundLanguage: 'Flamenco study, Catalan and Spanish roots, vocal control, live tension, and the shadow of Camaron.',
    bodyLanguage: 'Stillness first: the body listens before it performs, and the gesture is trained rather than decorative.',
    fashionCue: 'Black rehearsal minimalism, no excess styling, the musician before the star image.',
    summary:
      '在成名前的阶段，Rosalia 的核心不是流行包装，而是训练、聆听和身体记忆。她先把声音练成一种可以承受空白的力量，再进入专辑叙事。',
    keywords: ['training', 'flamenco', 'voice', 'discipline'],
    imageAlt: 'Rosalia and Raul Refree live flamenco performance in 2017',
    imageUrl: '${import.meta.env.BASE_URL}eras/flamenco-apprenticeship.jpg',
    mediaHref: 'https://www.youtube.com/results?search_query=Rosalia+De+Plata+directo+Sevilla',
    mediaLabel: 'Watch early live archive',
    linkedAlbumId: 'los-angeles',
  },
  {
    id: 'los-angeles-era',
    title: 'Los Angeles',
    years: '2017',
    anchorAlbum: 'Los Angeles',
    visualLanguage: 'Ash, ivory, chapel blue, old portrait light, a devotional room with almost no ornament.',
    soundLanguage: 'Sparse guitar and grief-led vocal phrasing; silence behaves like an instrument.',
    bodyLanguage: 'Contained, frontal, solemn; a singer holding the room without needing spectacle.',
    fashionCue: 'Pale skin light, austere fabric, devotional restraint, the voice placed before the outfit.',
    summary:
      '《Los Angeles》像一间只剩吉他、呼吸和哀伤回声的房间。它让 Rosalia 的声音先成为空间，再成为形象。',
    keywords: ['grief', 'guitar', 'silence', 'devotion'],
    imageAlt: 'Rosalia 2017 acoustic live close-up',
    imageUrl: '${import.meta.env.BASE_URL}eras/los-angeles-live.jpg',
    mediaHref: 'https://www.youtube.com/results?search_query=Rosalia+Los+Angeles+live+performance',
    mediaLabel: 'Open acoustic visual reference',
    linkedAlbumId: 'los-angeles',
  },
  {
    id: 'el-mal-querer-era',
    title: 'EL MAL QUERER',
    years: '2018-2019',
    anchorAlbum: 'EL MAL QUERER',
    visualLanguage: 'Illuminated manuscript, crimson warning, medieval gold, chapter titles, sacred page drama.',
    soundLanguage: 'Flamenco architecture colliding with pop production, handclaps, bass pressure, and conceptual sequencing.',
    bodyLanguage: 'Hands become symbols; the gaze becomes narrative; jealousy and control are staged like ritual.',
    fashionCue: 'Gold leaf, red fabric, sculptural hair, and saint-like framing with modern editorial sharpness.',
    summary:
      '这一阶段把爱情写成章回神话。她不再只是唱情绪，而是把嫉妒、权力和凝视做成一套明亮而危险的视觉语法。',
    keywords: ['chapters', 'gold', 'crimson', 'myth'],
    imageAlt: 'Rosalia EL MAL QUERER performance and tour visual archive',
    imageUrl: '${import.meta.env.BASE_URL}eras/el-mal-querer-live.jpg',
    mediaHref: 'https://www.youtube.com/results?search_query=Rosalia+El+Mal+Querer+Tour+Live+in+Paris',
    mediaLabel: 'Watch El Mal Querer live',
    linkedAlbumId: 'el-mal-querer',
  },
  {
    id: 'motomami-era',
    title: 'MOTOMAMI',
    years: '2022-2023',
    anchorAlbum: 'MOTOMAMI',
    visualLanguage: 'Flash white, chrome, red typography, motorcycles, mirrors, exposed skin, compression and speed.',
    soundLanguage: 'Reggaeton, bachata, electronic pop, hyper-fragmented vocals, sudden softness, and abrupt cuts.',
    bodyLanguage: 'A body in motion: acceleration, flex, joke, confession, impact, then a clean stop.',
    fashionCue: 'Helmet energy, white negative space, red lettering, chrome surfaces, runway mixed with garage heat.',
    summary:
      '《MOTOMAMI》让 Rosalia 变成高速拼贴。她把机车、欲望、幽默和脆弱放进同一个身体里，像每首歌都在换挡。',
    keywords: ['speed', 'chrome', 'red', 'body'],
    imageAlt: 'Rosalia MOTOMAMI World Tour performance visual',
    imageUrl: '${import.meta.env.BASE_URL}eras/motomami-tour.png',
    mediaHref: 'https://www.youtube.com/results?search_query=Rosalia+Motomami+World+Tour+live',
    mediaLabel: 'Watch MOTOMAMI tour',
    linkedAlbumId: 'motomami',
  },
  {
    id: 'lux-era',
    title: 'LUX',
    years: '2025-2026',
    anchorAlbum: 'LUX',
    visualLanguage: 'Blue sky, veil white, silver light, sacred gold, couture volume, and operatic radiance.',
    soundLanguage: 'Orchestral and multilingual pop maximalism, spiritual imagery, female saints, mysticism, and transformation.',
    bodyLanguage: 'The body is less machine and more apparition: lifted, veiled, ceremonial, and held inside light.',
    fashionCue: 'White veil, sculptural couture, luminous skin, ecclesiastical blue, silver and gold devotional accents.',
    summary:
      'LUX 把她的世界推向圣光与歌剧感。这里的力量不靠黑暗制造压迫，而是在蓝白色的明亮空间里显得更高、更远、更像仪式。',
    keywords: ['sacred', 'blue', 'veil', 'orchestral'],
    imageAlt: 'Rosalia LUX Berghain live performance reference',
    imageUrl: '${import.meta.env.BASE_URL}eras/lux-visual.jpg',
    mediaHref: 'https://www.youtube.com/watch?v=7fyufPkXLbs',
    mediaLabel: 'Watch LUX visual archive',
    linkedAlbumId: 'lux',
  },
]

export const allTracks = rosaliaAlbums.flatMap((album) => album.tracks)

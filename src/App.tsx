import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from 'framer-motion'
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
  useMatch,
  useNavigate,
} from 'react-router-dom'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { PlayerProvider, usePlayer } from './lib/player'
import { lookupAlbumMedia } from './lib/media'
import {
  homeManifesto,
  rosaliaAlbums,
  rosaliaEras,
  type Album,
  type RosaliaEra,
  type Track,
} from './data/rosalia'

function App() {
  const [albums, setAlbums] = useState(rosaliaAlbums)

  useEffect(() => {
    let ignore = false

    async function enrichArtwork() {
      const patches = await Promise.all(rosaliaAlbums.map((album) => lookupAlbumMedia(album)))
      if (ignore) return

      setAlbums(
        rosaliaAlbums.map((album, index) => ({
          ...album,
          ...patches[index],
        })),
      )
    }

    void enrichArtwork()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <BrowserRouter>
      <PlayerProvider albums={albums}>
        <Shell albums={albums} />
      </PlayerProvider>
    </BrowserRouter>
  )
}

function Shell({ albums }: { albums: Album[] }) {
  const location = useLocation()
  const match = useMatch('/album/:slug')
  const { currentAlbum } = usePlayer()
  const [spotlightAlbumId, setSpotlightAlbumId] = useState<string | null>(null)
  const selectedAlbum = useMemo(
    () => albums.find((album) => album.slug === match?.params.slug),
    [albums, match?.params.slug],
  )
  const atmosphereAlbum = selectedAlbum
    ?? albums.find((album) => album.id === spotlightAlbumId)
    ?? currentAlbum
    ?? albums[0]

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  return (
    <div className="app-shell">
      <BackdropAtmosphere album={atmosphereAlbum} />
      <StickyNav />
      <Routes>
        <Route
          path="/"
          element={<HomePage albums={albums} onSpotlightChange={setSpotlightAlbumId} />}
        />
        <Route
          path="/album/:slug"
          element={<HomePage albums={albums} onSpotlightChange={setSpotlightAlbumId} />}
        />
        <Route
          path="/eras"
          element={<ErasPage albums={albums} onSpotlightChange={setSpotlightAlbumId} />}
        />
        <Route path="/about" element={<AboutPage albums={albums} />} />
      </Routes>
      <AnimatePresence>
        {selectedAlbum ? <AlbumOverlayPlayer album={selectedAlbum} key={selectedAlbum.id} /> : null}
      </AnimatePresence>
      <GlobalPlayerBar albums={albums} />
    </div>
  )
}

function StickyNav() {
  const navigate = useNavigate()
  const location = useLocation()

  function goToSection(sectionId: string) {
    if (location.pathname === '/' || location.pathname.startsWith('/album/')) {
      navigate('/')
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 80)
      })
      return
    }

    navigate('/')
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  return (
    <header className="sticky-nav">
      <div className="sticky-nav__brand">
        <span className="sticky-nav__index">Archive 03</span>
        <span className="sticky-nav__title">ROSALÍA</span>
      </div>
      <nav className="sticky-nav__links" aria-label="Primary">
        <button type="button" onClick={() => goToSection('hero')}>
          Home
        </button>
        <button type="button" onClick={() => goToSection('albums')}>
          Albums
        </button>
        <button type="button" onClick={() => goToSection('music')}>
          Music
        </button>
        <NavLink to="/eras">Eras</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}

function HomePage({
  albums,
  onSpotlightChange,
}: {
  albums: Album[]
  onSpotlightChange: (albumId: string | null) => void
}) {
  return (
    <main className="page page--home">
      <HeroPoster album={albums[0]} />
      <AlbumExhibition albums={albums} onSpotlightChange={onSpotlightChange} />
      <MusicAxis albums={albums} />
      <AboutSection />
    </main>
  )
}

function HeroPoster({ album }: { album: Album }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero-poster" id="hero">
      <motion.div
        className="hero-poster__image"
        style={
          {
            '--hero-accent': album.accent,
            '--hero-secondary': album.secondaryAccent,
            '--hero-image': `url('${import.meta.env.BASE_URL}lux.jpg')`,
          } as CSSProperties
        }
        initial={reduceMotion ? undefined : { opacity: 0, scale: 1.06 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="hero-poster__content"
        initial={reduceMotion ? undefined : { opacity: 0, y: 36 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.95, delay: 0.2 }}
      >
        <p className="hero-poster__eyebrow">Singer · Producer · Icon</p>
        <h1>ROSALÍA</h1>
        <div className="hero-poster__manifesto">
          {homeManifesto.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </motion.div>
      <div className="hero-poster__footer">
        <span>{album.title} / {album.era}</span>
        <span>{album.chapterTitle}</span>
      </div>
    </section>
  )
}

function AlbumExhibition({
  albums,
  onSpotlightChange,
}: {
  albums: Album[]
  onSpotlightChange: (albumId: string | null) => void
}) {
  return (
    <section className="album-exhibition" id="albums">
      <div className="section-heading">
        <span className="section-heading__index">Exhibition</span>
        <h2>Album Chapters</h2>
      </div>
      <LayoutGroup>
        <div className="album-exhibition__stack">
          {albums.map((album, index) => (
            <AlbumChapter
              album={album}
              index={index}
              key={album.id}
              onSpotlightChange={onSpotlightChange}
            />
          ))}
        </div>
      </LayoutGroup>
    </section>
  )
}

function AlbumChapter({
  album,
  index,
  onSpotlightChange,
}: {
  album: Album
  index: number
  onSpotlightChange: (albumId: string | null) => void
}) {
  const navigate = useNavigate()
  const { playAlbum } = usePlayer()
  const reduceMotion = useReducedMotion()

  function enterAlbum(preferredTrackId?: string) {
    playAlbum(album.id, preferredTrackId)
    navigate(`/album/${album.slug}`)
  }

  return (
    <motion.article
      className={`album-chapter album-chapter--${album.layoutPreset}`}
      initial={reduceMotion ? undefined : { opacity: 0, y: 56 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      onViewportEnter={() => onSpotlightChange(album.id)}
      viewport={{ once: false, amount: 0.5 }}
      transition={{ duration: 0.9, delay: index * 0.08 }}
    >
      <button
        type="button"
        className="album-chapter__visual"
        style={
          {
            '--accent': album.accent,
            '--secondary': album.secondaryAccent,
            '--atmosphere': album.atmosphere,
            '--surface': album.surface,
            '--light': album.light,
            '--shadow-tone': album.shadow,
            '--text-contrast': album.textContrast,
          } as CSSProperties
        }
        onClick={() => enterAlbum()}
        onMouseEnter={() => onSpotlightChange(album.id)}
        onFocus={() => onSpotlightChange(album.id)}
      >
        <ArtworkFrame album={album} />
        <span className="album-chapter__hover">Enter playback ritual</span>
      </button>

      <div className="album-chapter__body">
        <div className="album-chapter__meta">
          <span>{album.era}</span>
          <span>{album.year}</span>
          <span>{album.paletteLabel}</span>
        </div>
        <p className="album-chapter__tag">{album.introTag}</p>
        <h3>{album.title}</h3>
        <p className="album-chapter__chapter-title">{album.chapterTitle}</p>
        <p className="album-chapter__description">{album.description}</p>
        <ul className="album-chapter__notes">
          {album.visualNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <div className="album-chapter__tracks">
          {album.tracks.map((track) => (
            <button type="button" key={track.id} onClick={() => enterAlbum(track.id)}>
              <span>{track.title}</span>
              <span>{track.duration}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function MusicAxis({ albums }: { albums: Album[] }) {
  const curatedTracks = albums.flatMap((album) => album.tracks.slice(0, 2))

  return (
    <section className="music-axis" id="music">
      <div className="section-heading section-heading--compact">
        <span className="section-heading__index">Listening Room</span>
        <h2>Speed, devotion, rupture.</h2>
      </div>
      <div className="music-axis__rail">
        {curatedTracks.map((track, index) => (
          <TrackCapsule track={track} index={index} key={track.id} />
        ))}
      </div>
      <div className="music-axis__essay">
        <p>
          ROSALÍA moves between chapel echo and engine noise, between the silence of a devotional
          pose and the velocity of a bike cutting through neon.
        </p>
        <p>
          她的作品里总有两种力量并行: 一种向内，像祈祷、独白、抚摸；另一种向外，像机车、镁光灯、
          身体突然向前的冲刺。
        </p>
      </div>
    </section>
  )
}

function TrackCapsule({ track, index }: { track: Track; index: number }) {
  const { playTrack, currentTrack, isPlaying } = usePlayer()
  const isActive = currentTrack?.id === track.id

  return (
    <motion.button
      type="button"
      className={`track-capsule ${isActive ? 'is-active' : ''}`}
      onClick={() => playTrack(track.id)}
      initial={{ opacity: 0, x: 28 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
    >
      <span className="track-capsule__index">{String(index + 1).padStart(2, '0')}</span>
      <span className="track-capsule__title">{track.title}</span>
      <span className="track-capsule__meta">{isActive && isPlaying ? 'Now spinning' : track.duration}</span>
    </motion.button>
  )
}

function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="section-heading">
        <span className="section-heading__index">Notes</span>
        <h2>Curated, not generated.</h2>
      </div>
      <div className="about-section__layout">
        <div className="about-section__image" />
        <div className="about-section__copy">
          <p>
            Built as a digital exhibition: image-led, typography-led, and paced like a setlist.
          </p>
          <p>
            从《Los Ángeles》的冷火，到《El Mal Querer》的猩红戏剧，再到《MOTOMAMI》的金属高速，
            每一章都像 Rosalía 把自己的身体和声音投向另一种形态。
          </p>
          <p>
            而 LUX 像一束从暗处升起的白光，让她的锋利暂时披上柔和外衣，却没有失去任何控制力。
          </p>
        </div>
      </div>
    </section>
  )
}

function AboutPage({ albums }: { albums: Album[] }) {
  return (
    <main className="page page--about">
      <section className="about-page-hero">
        <div className="section-heading">
          <span className="section-heading__index">About</span>
          <h2>Rosalía as image system, voice, and velocity.</h2>
        </div>
        <div className="about-page-hero__layout">
          <div className="about-page-hero__panel">
            <p>
              This site treats the discography as exhibition architecture: sacred stillness in{' '}
              <em>Los Ángeles</em>, mythic chapter drama in <em>El Mal Querer</em>, then chrome-speed
              confrontation in <em>MOTOMAMI</em>, and finally the luminous drift of <em>LUX</em>.
            </p>
            <p>
              她的世界观并不是单一风格，而是在神圣、危险、幽默、肉身感与高定时尚之间反复切换，
              像一位同时理解祭坛与 runway 的表演者。
            </p>
          </div>
          <div className="about-page-hero__inventory">
            {albums.map((album) => (
              <div key={album.id}>
                <span>{album.year}</span>
                <strong>{album.title}</strong>
                <small>{album.era}</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function ErasPage({
  albums,
  onSpotlightChange,
}: {
  albums: Album[]
  onSpotlightChange: (albumId: string | null) => void
}) {
  const primaryAlbum = albums.find((album) => album.id === 'lux') ?? albums[0]

  useEffect(() => {
    onSpotlightChange(primaryAlbum.id)
  }, [onSpotlightChange, primaryAlbum.id])

  return (
    <main className="page eras-page">
      <section className="eras-hero">
        <motion.div
          className="eras-hero__title"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85 }}
        >
          <span>Era Index</span>
          <h1>ERAS</h1>
        </motion.div>
        <div className="eras-hero__rail" aria-label="Era years">
          {rosaliaEras.map((era) => (
            <a href={`#${era.id}`} key={era.id}>
              {era.years}
            </a>
          ))}
        </div>
        <div className="eras-hero__image">
          <div />
        </div>
        <p className="eras-hero__copy">
          A career arc in five rooms: training, grief, myth, speed, and sacred light.
        </p>
      </section>

      <section className="era-timeline" aria-label="Rosalia eras">
        {rosaliaEras.map((era, index) => (
          <EraPanel
            albums={albums}
            era={era}
            index={index}
            key={era.id}
            onSpotlightChange={onSpotlightChange}
          />
        ))}
      </section>
    </main>
  )
}

function EraPanel({
  albums,
  era,
  index,
  onSpotlightChange,
}: {
  albums: Album[]
  era: RosaliaEra
  index: number
  onSpotlightChange: (albumId: string | null) => void
}) {
  const linkedAlbum = albums.find((album) => album.id === era.linkedAlbumId) ?? albums[0]
  const reduceMotion = useReducedMotion()

  function spotlightEra() {
    if (linkedAlbum) onSpotlightChange(linkedAlbum.id)
  }

  return (
    <motion.article
      className={`era-panel ${index % 2 === 1 ? 'era-panel--reverse' : ''}`}
      id={era.id}
      style={albumVisualVars(linkedAlbum)}
      initial={reduceMotion ? undefined : { opacity: 0, y: 54 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.42 }}
      transition={{ duration: 0.8, delay: index * 0.04 }}
      onViewportEnter={spotlightEra}
      onMouseEnter={spotlightEra}
      onFocus={spotlightEra}
    >
      <a
        className="era-panel__visual"
        href={era.mediaHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`${era.mediaLabel}: ${era.title}`}
      >
        <div className="era-panel__media">
          {era.imageUrl ? (
            <img
              src={era.imageUrl}
              alt={era.imageAlt}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.hidden = true
              }}
            />
          ) : null}
          <div className="era-panel__media-fallback">
            <span>{era.years}</span>
            <strong>{era.title}</strong>
          </div>
        </div>
        <small>Video / Live Archive</small>
        <span>{era.mediaLabel}</span>
      </a>

      <div className="era-panel__content">
        <div className="era-panel__index">
          <span>{String(index + 1).padStart(2, '0')}</span>
          <strong>{era.years}</strong>
        </div>
        <p className="era-panel__anchor">{era.anchorAlbum}</p>
        <h2>{era.title}</h2>
        <p className="era-panel__summary">{era.summary}</p>
        <div className="era-labels">
          <div>
            <span>Sound</span>
            <p>{era.soundLanguage}</p>
          </div>
          <div>
            <span>Body</span>
            <p>{era.bodyLanguage}</p>
          </div>
          <div>
            <span>Image</span>
            <p>{era.visualLanguage}</p>
          </div>
        </div>
        <div className="era-keywords" aria-label={`${era.title} keywords`}>
          {era.keywords.map((keyword) => (
            <span key={keyword}>{keyword}</span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function AlbumOverlayPlayer({ album }: { album: Album }) {
  const navigate = useNavigate()
  const {
    currentAlbum,
    currentTrack,
    currentTime,
    duration,
    error,
    isPlaying,
    playAlbum,
    playTrack,
    resolvedArtwork,
    seekTo,
    skipNext,
    skipPrevious,
    togglePlayback,
  } = usePlayer()

  useEffect(() => {
    if (currentAlbum?.id !== album.id) {
      playAlbum(album.id)
    }
  }, [album.id, currentAlbum?.id, playAlbum])

  return (
    <motion.aside
      className="album-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div
        className="album-overlay__backdrop"
        style={
          {
            '--accent': album.accent,
            '--secondary': album.secondaryAccent,
            '--atmosphere': album.atmosphere,
            '--atmosphere-glow': album.atmosphereGlow,
            '--surface': album.surface,
            '--light': album.light,
            '--shadow-tone': album.shadow,
            '--text-contrast': album.textContrast,
          } as CSSProperties
        }
      />
      <div className="album-overlay__inner">
        <button type="button" className="album-overlay__close" onClick={() => navigate('/')}>
          Close archive
        </button>

        <div className="album-overlay__visual">
          <div className={`vinyl-stage ${isPlaying ? 'is-spinning' : ''}`}>
            <div className="vinyl-stage__disc" />
            <div className="vinyl-stage__label">
              <ArtworkFrame album={album} artworkUrl={resolvedArtwork[currentTrack?.id ?? '']} />
            </div>
          </div>
        </div>

        <div className="album-overlay__info">
          <div className="album-overlay__header">
            <span>{album.year}</span>
            <span>{album.era}</span>
            <span>{album.paletteLabel}</span>
          </div>
          <h2>{album.title}</h2>
          <p>{album.description}</p>
          <div className="album-overlay__controls">
            <button type="button" onClick={skipPrevious}>
              Prev
            </button>
            <button type="button" onClick={togglePlayback}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button type="button" onClick={skipNext}>
              Next
            </button>
          </div>
          <label className="album-overlay__timeline">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 30}
              value={Math.min(currentTime, duration || 30)}
              onChange={(event) => seekTo(Number(event.target.value))}
            />
            <span>{formatTime(duration || 30)}</span>
          </label>
          {error ? <p className="album-overlay__error">{error}</p> : null}
          <div className="album-overlay__tracks">
            {album.tracks.map((track) => {
              const active = currentTrack?.id === track.id
              return (
                <button
                  type="button"
                  className={active ? 'is-active' : ''}
                  onClick={() => playTrack(track.id)}
                  key={track.id}
                >
                  <span>{track.title}</span>
                  <span>{active && isPlaying ? 'Spinning' : track.duration}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

function GlobalPlayerBar({ albums }: { albums: Album[] }) {
  const {
    currentAlbum,
    currentTime,
    currentTrack,
    duration,
    error,
    isPlaying,
    resolvedArtwork,
    seekTo,
    skipNext,
    skipPrevious,
    togglePlayback,
  } = usePlayer()

  const visualAlbum = currentAlbum ?? albums[0]
  const artworkUrl = currentTrack ? resolvedArtwork[currentTrack.id] : undefined

  return (
    <footer className="global-player">
      <div className="global-player__media">
        <ArtworkFrame album={visualAlbum} artworkUrl={artworkUrl} compact />
        <div>
          <strong>{currentTrack?.title ?? 'Choose an album chapter'}</strong>
          <span>{currentTrack?.artist ?? 'Rosalía immersive archive'}</span>
        </div>
      </div>

      <div className="global-player__transport">
        <div className="global-player__controls">
          <button type="button" onClick={skipPrevious}>
            Prev
          </button>
          <button type="button" onClick={togglePlayback}>
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button type="button" onClick={skipNext}>
            Next
          </button>
        </div>
        <label className="global-player__timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 30}
            value={Math.min(currentTime, duration || 30)}
            onChange={(event) => seekTo(Number(event.target.value))}
          />
          <span>{formatTime(duration || 30)}</span>
        </label>
      </div>

      <div className="global-player__status">
        <span>{currentAlbum?.title ?? 'Playback idle'}</span>
        <span>{error ?? 'Online preview resolver ready'}</span>
      </div>
    </footer>
  )
}

function albumVisualVars(album: Album): CSSProperties {
  return {
    '--accent': album.accent,
    '--secondary': album.secondaryAccent,
    '--atmosphere': album.atmosphere,
    '--atmosphere-glow': album.atmosphereGlow,
    '--surface': album.surface,
    '--light': album.light,
    '--shadow-tone': album.shadow,
    '--text-contrast': album.textContrast,
  } as CSSProperties
}

function BackdropAtmosphere({ album }: { album: Album }) {
  return (
    <div
      className="backdrop-atmosphere"
      style={albumVisualVars(album)}
    />
  )
}

function ArtworkFrame({
  album,
  artworkUrl,
  compact = false,
}: {
  album: Album
  artworkUrl?: string
  compact?: boolean
}) {
  const backgroundImage = artworkUrl || album.coverUrl
  return (
    <div
      className={`artwork-frame ${compact ? 'artwork-frame--compact' : ''}`}
      style={
        {
          '--accent': album.accent,
          '--secondary': album.secondaryAccent,
          '--surface': album.surface,
          '--light': album.light,
          '--shadow-tone': album.shadow,
          '--text-contrast': album.textContrast,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        } as CSSProperties
      }
    >
      {!backgroundImage ? (
        <div className="artwork-frame__fallback">
          <span>{album.year}</span>
          <strong>{album.title}</strong>
          <small>{album.era}</small>
        </div>
      ) : null}
      <div className="artwork-frame__grain" />
    </div>
  )
}

function formatTime(value: number) {
  if (!Number.isFinite(value)) return '0:00'
  const minutes = Math.floor(value / 60)
  const seconds = Math.floor(value % 60)
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export default App

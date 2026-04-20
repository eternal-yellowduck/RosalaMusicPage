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
  useParams,
} from 'react-router-dom'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { PlayerProvider, usePlayer } from './lib/player'
import { resolveAlbumArtwork } from './lib/media'
import { homeManifesto, rosaliaAlbums, type Album, type Track } from './data/rosalia'

function App() {
  const [albums, setAlbums] = useState(rosaliaAlbums)

  useEffect(() => {
    let ignore = false

    async function enrichArtwork() {
      const patches = await Promise.all(rosaliaAlbums.map((album) => resolveAlbumArtwork(album)))
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
  const selectedAlbum = useMemo(
    () => albums.find((album) => album.slug === match?.params.slug),
    [albums, match?.params.slug],
  )

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
    }
  }, [])

  useEffect(() => {
    if (!location.pathname.startsWith('/album/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname])

  return (
    <div className="app-shell">
      <BackdropAtmosphere albums={albums} />
      <StickyNav />
      <Routes>
        <Route path="/" element={<HomePage albums={albums} />} />
        <Route path="/album/:slug" element={<HomePage albums={albums} />} />
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
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  )
}

function HomePage({ albums }: { albums: Album[] }) {
  return (
    <main className="page page--home">
      <HeroPoster />
      <AlbumExhibition albums={albums} />
      <MusicAxis albums={albums} />
      <AboutSection />
    </main>
  )
}

function HeroPoster() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="hero-poster" id="hero">
      <motion.div
        className="hero-poster__image"
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
        <span>EL MAL QUERER / MOTOMAMI / LUX</span>
        <span>Editorial music experience</span>
      </div>
    </section>
  )
}

function AlbumExhibition({ albums }: { albums: Album[] }) {
  return (
    <section className="album-exhibition" id="albums">
      <div className="section-heading">
        <span className="section-heading__index">Exhibition</span>
        <h2>Album Chapters</h2>
      </div>
      <LayoutGroup>
        <div className="album-exhibition__stack">
          {albums.map((album, index) => (
            <AlbumChapter album={album} index={index} key={album.id} />
          ))}
        </div>
      </LayoutGroup>
    </section>
  )
}

function AlbumChapter({ album, index }: { album: Album; index: number }) {
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
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.9, delay: index * 0.08 }}
    >
      <button
        type="button"
        className="album-chapter__visual"
        style={
          {
            '--accent': album.accent,
            '--secondary': album.secondaryAccent,
          } as CSSProperties
        }
        onClick={() => enterAlbum()}
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
          这里的“Music”区不是表格式曲库，而更像展览里的听音线索，把声音、气味、颜色和身体动作
          编排成一条连续的轨道。
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
            它拒绝 SaaS 式功能块，也不把专辑做成一排统一卡片，而是把每张作品当成进入另一个视觉
            宇宙的入口。
          </p>
          <p>
            The player stays with you at every moment, like a low-lit mixing desk at the edge of the room.
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
              confrontation in <em>MOTOMAMI</em>.
            </p>
            <p>
              文案刻意克制，把空间让给图像、节奏、切换和底部播放器，让浏览更像走进一个音乐装置。
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
      <div className="album-overlay__backdrop" />
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

function BackdropAtmosphere({ albums }: { albums: Album[] }) {
  const featured = albums[1] ?? albums[0]
  return (
    <div
      className="backdrop-atmosphere"
      style={
        {
          '--accent': featured.accent,
          '--secondary': featured.secondaryAccent,
        } as CSSProperties
      }
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
  const backgroundImage = artworkUrl || album.coverUrl || album.heroImageUrl
  return (
    <div
      className={`artwork-frame ${compact ? 'artwork-frame--compact' : ''}`}
      style={
        {
          '--accent': album.accent,
          '--secondary': album.secondaryAccent,
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

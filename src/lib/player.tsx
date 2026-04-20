import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react'
import { allTracks, type Album, type Track } from '../data/rosalia'
import { resolveTrackMedia } from './media'

type PlayerState = {
  queue: string[]
  currentTrackId: string | null
  currentAlbumId: string | null
  isPlaying: boolean
  currentTime: number
  duration: number
  buffered: number
  error: string | null
}

type PlayerContextValue = PlayerState & {
  currentTrack: Track | null
  currentAlbum: Album | null
  playAlbum: (albumId: string, preferredTrackId?: string) => void
  playTrack: (trackId: string) => void
  togglePlayback: () => void
  seekTo: (seconds: number) => void
  skipNext: () => void
  skipPrevious: () => void
  resolvedArtwork: Record<string, string>
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

const INITIAL_STATE: PlayerState = {
  queue: [],
  currentTrackId: null,
  currentAlbumId: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  buffered: 0,
  error: null,
}

export function PlayerProvider({
  albums,
  children,
}: PropsWithChildren<{ albums: Album[] }>) {
  const [state, setState] = useState<PlayerState>(INITIAL_STATE)
  const [resolvedPreviewUrls, setResolvedPreviewUrls] = useState<Record<string, string>>({})
  const [resolvedArtwork, setResolvedArtwork] = useState<Record<string, string>>({})
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const trackMap = useMemo(
    () => new Map(allTracks.map((track) => [track.id, track])),
    [],
  )
  const albumMap = useMemo(() => new Map(albums.map((album) => [album.id, album])), [albums])
  const previewRequestMap = useRef(new Map<string, Promise<string | undefined>>())

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audioRef.current = audio

    const syncClock = () => {
      setState((current) => ({
        ...current,
        currentTime: audio.currentTime || 0,
        duration: Number.isFinite(audio.duration) ? audio.duration : current.duration,
        buffered:
          audio.buffered.length > 0 ? audio.buffered.end(audio.buffered.length - 1) : 0,
      }))
    }

    const handleEnded = () => {
      startTransition(() => {
        setState((current) => {
          const currentIndex = current.queue.findIndex((trackId) => trackId === current.currentTrackId)
          const nextTrackId = current.queue[currentIndex + 1]

          if (!nextTrackId) {
            return {
              ...current,
              isPlaying: false,
              currentTime: 0,
            }
          }

          return {
            ...current,
            currentTrackId: nextTrackId,
            currentTime: 0,
            duration: 0,
            buffered: 0,
            isPlaying: true,
          }
        })
      })
    }

    const handlePlay = () => {
      setState((current) => ({ ...current, isPlaying: true }))
    }

    const handlePause = () => {
      setState((current) => ({ ...current, isPlaying: false }))
    }

    const handleError = () => {
      setState((current) => ({
        ...current,
        error: 'Preview unavailable. Try another track.',
        isPlaying: false,
      }))
    }

    audio.addEventListener('timeupdate', syncClock)
    audio.addEventListener('loadedmetadata', syncClock)
    audio.addEventListener('durationchange', syncClock)
    audio.addEventListener('progress', syncClock)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('error', handleError)

    return () => {
      audio.pause()
      audio.src = ''
      audio.removeEventListener('timeupdate', syncClock)
      audio.removeEventListener('loadedmetadata', syncClock)
      audio.removeEventListener('durationchange', syncClock)
      audio.removeEventListener('progress', syncClock)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('error', handleError)
    }
  }, [])

  useEffect(() => {
    const activeTrack = state.currentTrackId ? trackMap.get(state.currentTrackId) ?? null : null
    const audio = audioRef.current

    if (!activeTrack || !audio) return

    let disposed = false

    async function syncSource() {
      const track: Track = activeTrack!
      const player: HTMLAudioElement = audio!
      const previewUrl = await getPreviewUrl(track)

      if (disposed || !audioRef.current) return

      if (!previewUrl) {
        const fallbackTrackId = await findNextPlayableTrackId(track.id, state.queue)
        if (!disposed && fallbackTrackId && fallbackTrackId !== track.id) {
          setState((current) => ({
            ...current,
            currentTrackId: fallbackTrackId,
            error: `${track.title} preview was unavailable. Switched to the next track.`,
            currentTime: 0,
            duration: 0,
            buffered: 0,
            isPlaying: true,
          }))
          return
        }

        player.pause()
        player.removeAttribute('src')
        player.load()
        setState((current) => ({
          ...current,
          error: 'No online preview was found for this album right now.',
          isPlaying: false,
          currentTime: 0,
          duration: 0,
          buffered: 0,
        }))
        return
      }

      if (player.src !== previewUrl) {
        player.src = previewUrl
        player.load()
      }

      if (state.isPlaying) {
        try {
          await player.play()
        } catch {
          if (disposed) return
          setState((current) => ({
            ...current,
            isPlaying: false,
            error: 'Autoplay was blocked. Press play again to start the preview.',
          }))
        }
      }
    }

    void syncSource()

    return () => {
      disposed = true
    }
  }, [state.currentTrackId, state.isPlaying, state.queue, trackMap, resolvedPreviewUrls])

  const currentTrack = state.currentTrackId ? trackMap.get(state.currentTrackId) ?? null : null
  const currentAlbum = state.currentAlbumId ? albumMap.get(state.currentAlbumId) ?? null : null

  async function getPreviewUrl(track: Track) {
    if (resolvedPreviewUrls[track.id]) return resolvedPreviewUrls[track.id]

    const inFlight = previewRequestMap.current.get(track.id)
    if (inFlight) return inFlight

    const request = resolveTrackMedia(track).then((resolved) => {
      if (resolved.previewUrl) {
        setResolvedPreviewUrls((current) => ({
          ...current,
          [track.id]: resolved.previewUrl as string,
        }))
      }

      if (resolved.artworkUrl) {
        setResolvedArtwork((current) => ({
          ...current,
          [track.id]: resolved.artworkUrl as string,
        }))
      }

      previewRequestMap.current.delete(track.id)
      return resolved.previewUrl
    })

    previewRequestMap.current.set(track.id, request)
    return request
  }

  async function findNextPlayableTrackId(trackId: string, queue: string[]) {
    const currentIndex = queue.findIndex((entry) => entry === trackId)
    const candidates = [...queue.slice(currentIndex + 1), ...queue.slice(0, currentIndex)]

    for (const candidateId of candidates) {
      const candidate = trackMap.get(candidateId)
      if (!candidate) continue
      const previewUrl = await getPreviewUrl(candidate)
      if (previewUrl) return candidate.id
    }

    return null
  }

  function playAlbum(albumId: string, preferredTrackId?: string) {
    const album = albumMap.get(albumId)
    if (!album) return

    const queue = album.tracks.map((track) => track.id)
    const nextTrackId = preferredTrackId && queue.includes(preferredTrackId) ? preferredTrackId : queue[0]

    setState((current) => ({
      ...current,
      currentAlbumId: albumId,
      currentTrackId: nextTrackId,
      queue,
      isPlaying: true,
      currentTime: 0,
      duration: 0,
      buffered: 0,
      error: null,
    }))
  }

  function playTrack(trackId: string) {
    const track = trackMap.get(trackId)
    if (!track) return

    const album = albumMap.get(track.albumId)
    const queue = album?.tracks.map((entry) => entry.id) ?? [trackId]

    setState((current) => ({
      ...current,
      currentAlbumId: track.albumId,
      currentTrackId: trackId,
      queue,
      isPlaying: true,
      currentTime: 0,
      duration: 0,
      buffered: 0,
      error: null,
    }))
  }

  function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return

    if (!state.currentTrackId) {
      const firstTrack = albums[0]?.tracks[0]
      if (firstTrack) {
        playAlbum(firstTrack.albumId, firstTrack.id)
      }
      return
    }

    if (state.isPlaying) {
      audio.pause()
      setState((current) => ({ ...current, isPlaying: false }))
      return
    }

    void audio
      .play()
      .then(() => {
        setState((current) => ({ ...current, isPlaying: true, error: null }))
      })
      .catch(() => {
        setState((current) => ({
          ...current,
          isPlaying: false,
          error: 'Unable to resume preview. Try another track.',
        }))
      })
  }

  function seekTo(seconds: number) {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = seconds
    setState((current) => ({ ...current, currentTime: seconds }))
  }

  function skipNext() {
    setState((current) => {
      if (!current.queue.length || !current.currentTrackId) return current
      const currentIndex = current.queue.findIndex((trackId) => trackId === current.currentTrackId)
      const nextTrackId = current.queue[(currentIndex + 1) % current.queue.length]

      return {
        ...current,
        currentTrackId: nextTrackId,
        currentTime: 0,
        duration: 0,
        buffered: 0,
        isPlaying: true,
        error: null,
      }
    })
  }

  function skipPrevious() {
    if (state.currentTime > 4) {
      seekTo(0)
      return
    }

    setState((current) => {
      if (!current.queue.length || !current.currentTrackId) return current
      const currentIndex = current.queue.findIndex((trackId) => trackId === current.currentTrackId)
      const previousTrackId =
        current.queue[(currentIndex - 1 + current.queue.length) % current.queue.length]

      return {
        ...current,
        currentTrackId: previousTrackId,
        currentTime: 0,
        duration: 0,
        buffered: 0,
        isPlaying: true,
        error: null,
      }
    })
  }

  const value = useMemo<PlayerContextValue>(
    () => ({
      ...state,
      currentTrack,
      currentAlbum,
      playAlbum,
      playTrack,
      togglePlayback,
      seekTo,
      skipNext,
      skipPrevious,
      resolvedArtwork,
    }),
    [state, currentTrack, currentAlbum, resolvedArtwork],
  )

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider')
  }

  return context
}

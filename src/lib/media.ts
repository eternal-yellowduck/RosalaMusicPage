import type { Album, Track } from '../data/rosalia'

const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search'

export type ResolvedTrackMedia = {
  previewUrl?: string
  artworkUrl?: string
}

export async function resolveAlbumArtwork(album: Album): Promise<Partial<Album>> {
  try {
    const url = new URL(ITUNES_SEARCH_URL)
    url.searchParams.set('term', `${album.title} Rosalia`)
    url.searchParams.set('entity', 'album')
    url.searchParams.set('limit', '1')

    const response = await fetch(url.toString())
    if (!response.ok) return {}
    const payload = (await response.json()) as {
      results?: Array<{ artworkUrl100?: string; artworkUrl60?: string }>
    }

    const artwork =
      payload.results?.[0]?.artworkUrl100 ?? payload.results?.[0]?.artworkUrl60

    if (!artwork) return {}

    return {
      coverUrl: upscaleArtwork(artwork),
    }
  } catch {
    return {}
  }
}

export async function resolveTrackMedia(track: Track): Promise<ResolvedTrackMedia> {
  if (track.previewUrl || track.coverUrl) {
    return {
      previewUrl: track.previewUrl,
      artworkUrl: track.coverUrl,
    }
  }

  try {
    const url = new URL(ITUNES_SEARCH_URL)
    url.searchParams.set('term', track.searchTerm ?? `${track.artist} ${track.title}`)
    url.searchParams.set('entity', 'song')
    url.searchParams.set('limit', '5')

    const response = await fetch(url.toString())
    if (!response.ok) return {}

    const payload = (await response.json()) as {
      results?: Array<{
        previewUrl?: string
        artworkUrl100?: string
        trackName?: string
        artistName?: string
      }>
    }

    const matched = payload.results?.find((entry) => {
      const trackName = entry.trackName?.toLowerCase() ?? ''
      const title = track.title.toLowerCase()
      return trackName.includes(title.slice(0, 5))
    }) ?? payload.results?.[0]

    if (!matched) return {}

    return {
      previewUrl: matched.previewUrl,
      artworkUrl: matched.artworkUrl100 ? upscaleArtwork(matched.artworkUrl100) : undefined,
    }
  } catch {
    return {}
  }
}

function upscaleArtwork(url: string) {
  return url.replace(/\/[0-9]+x[0-9]+bb\./, '/1200x1200bb.')
}

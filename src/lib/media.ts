import type { Album, Track } from '../data/rosalia'

const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search'

export type ResolvedTrackMedia = {
  previewUrl?: string
  artworkUrl?: string
}

export async function lookupAlbumMedia(album: Album): Promise<Partial<Album>> {
  const byCollectionId = await lookupAlbumByCollectionId(album.appleMusicAlbumId)
  if (byCollectionId.coverUrl) return byCollectionId

  if (album.appleMusicCompleteWorksId) {
    const byCompleteWorksId = await lookupAlbumByCollectionId(album.appleMusicCompleteWorksId)
    if (byCompleteWorksId.coverUrl) return byCompleteWorksId
  }

  return resolveAlbumArtworkBySearch(album)
}

async function lookupAlbumByCollectionId(collectionId: string): Promise<Partial<Album>> {
  try {
    const url = new URL('https://itunes.apple.com/lookup')
    url.searchParams.set('id', collectionId)
    url.searchParams.set('entity', 'album')

    const response = await fetch(url.toString())
    if (!response.ok) return {}

    const payload = (await response.json()) as {
      results?: Array<{ wrapperType?: string; artworkUrl100?: string; artworkUrl60?: string }>
    }

    const collection = payload.results?.find((result) => result.wrapperType === 'collection')
    const artwork = collection?.artworkUrl100 ?? collection?.artworkUrl60
    return artwork ? { coverUrl: upscaleArtwork(artwork) } : {}
  } catch {
    return {}
  }
}

async function resolveAlbumArtworkBySearch(album: Album): Promise<Partial<Album>> {
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
    if (track.appleMusicAlbumId) {
      url.searchParams.set('attribute', 'songTerm')
    }

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

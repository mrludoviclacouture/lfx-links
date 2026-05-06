// lib/socialDeepLinks.js
// Tries to open the native app, falls back to the web profile URL.

/**
 * Deep link config per platform.
 * Each entry has:
 *   - appScheme    : the custom URL scheme (ios/android)
 *   - androidIntent: Android intent URI (more reliable on Android)
 *   - webUrl       : fallback web URL
 *
 * ─── Music platform handle formats ────────────────────────────────────────────
 *
 *  spotify       → Spotify artist/user ID  (e.g. "0TnOYISbd1XYRBk9myaseg")
 *                  Pass type via the handle object: { id, type }
 *                  type = 'artist' | 'user' | 'playlist' | 'album' | 'track'
 *                  Example: openMusicProfile('spotify', { id: '0TnOYISbd1XYRBk9myaseg', type: 'artist' })
 *
 *  youtubeMusic  → YouTube channel handle or ID (same as the YouTube handle, e.g. "NASA")
 *                  Opens in the YouTube Music app which shares the same channel space.
 *
 *  appleMusic    → Apple Music artist/playlist numeric ID (e.g. "1423595340")
 *                  Pass type via the handle object: { id, storefront?, type? }
 *                  storefront defaults to 'us'. type = 'artist' | 'album' | 'playlist' | 'song'
 *                  Example: openMusicProfile('appleMusic', { id: '1423595340', type: 'artist' })
 */
const PLATFORM_CONFIG = {
  // ── Social ──────────────────────────────────────────────────────────────────
  facebook: {
    appScheme: handle => `fb://profile/${handle}`, // numeric id works best; handle is a fallback
    androidIntent: handle =>
      `intent://www.facebook.com/${handle}#Intent;package=com.facebook.katana;scheme=https;end`,
    webUrl: handle => `https://www.facebook.com/${handle}`
  },
  youtube: {
    appScheme: handle => `vnd.youtube://www.youtube.com/@${handle}`,
    androidIntent: handle =>
      `intent://www.youtube.com/@${handle}#Intent;package=com.google.android.youtube;scheme=https;end`,
    webUrl: handle => `https://www.youtube.com/@${handle}`
  },
  instagram: {
    appScheme: handle => `instagram://user?username=${handle}`,
    androidIntent: handle =>
      `intent://instagram.com/_u/${handle}#Intent;package=com.instagram.android;scheme=https;end`,
    webUrl: handle => `https://www.instagram.com/${handle}`
  },
  tiktok: {
    appScheme: handle => `snssdk1233://user/profile/${handle}`, // handle = numeric uid or username slug
    androidIntent: handle =>
      `intent://www.tiktok.com/@${handle}#Intent;package=com.zhiliaoapp.musically;scheme=https;end`,
    webUrl: handle => `https://www.tiktok.com/@${handle}`
  },
  snapchat: {
    appScheme: handle => `snapchat://add/${handle}`,
    androidIntent: handle =>
      `intent://snapchat.com/add/${handle}#Intent;package=com.snapchat.android;scheme=https;end`,
    webUrl: handle => `https://www.snapchat.com/add/${handle}`
  },
  x: {
    appScheme: handle => `twitter://user?screen_name=${handle}`,
    androidIntent: handle =>
      `intent://twitter.com/${handle}#Intent;package=com.twitter.android;scheme=https;end`,
    webUrl: handle => `https://x.com/${handle}`
  },
  threads: {
    appScheme: handle => `barcelona://user?username=${handle}`, // Threads internal scheme
    androidIntent: handle =>
      `intent://www.threads.net/@${handle}#Intent;package=com.instagram.barcelona;scheme=https;end`,
    webUrl: handle => `https://www.threads.net/@${handle}`
  },

  // ── Music ───────────────────────────────────────────────────────────────────

  /**
   * Spotify
   * handle: string ID  OR  { id: string, type?: 'artist'|'user'|'album'|'playlist'|'track' }
   * Defaults to type='artist' when a plain string is passed.
   */
  spotify: {
    appScheme: handle => {
      const { id, type = 'artist' } =
        typeof handle === 'string' ? { id: handle } : handle
      return `spotify://${type}/${id}`
    },
    androidIntent: handle => {
      const { id, type = 'artist' } =
        typeof handle === 'string' ? { id: handle } : handle
      return `intent://open.spotify.com/${type}/${id}#Intent;package=com.spotify.music;scheme=https;end`
    },
    webUrl: handle => {
      const { id, type = 'artist' } =
        typeof handle === 'string' ? { id: handle } : handle
      return `https://open.spotify.com/${type}/${id}`
    }
  },

  /**
   * YouTube Music
   * handle: YouTube channel handle or ID (e.g. "NASA" or "UCB8-60-b_ya5qgmqiHDtm3A")
   * The YTMusic app shares channel identities with YouTube; channel IDs are most reliable.
   */
  youtubeMusic: {
    appScheme: handle => {
      // Channel handles use @, raw IDs (UC…) don't
      const path = handle.startsWith('UC') ? `channel/${handle}` : `@${handle}`
      return `youtubemusic://music.youtube.com/${path}`
    },
    androidIntent: handle => {
      const path = handle.startsWith('UC') ? `channel/${handle}` : `@${handle}`
      return `intent://music.youtube.com/${path}#Intent;package=com.google.android.apps.youtube.music;scheme=https;end`
    },
    webUrl: handle => {
      const path = handle.startsWith('UC') ? `channel/${handle}` : `@${handle}`
      return `https://music.youtube.com/${path}`
    }
  },

  /**
   * Apple Music
   * handle: numeric Apple Music ID  OR  { id: string, type?: 'artist'|'album'|'playlist'|'song', storefront?: string }
   * storefront defaults to 'us' (affects catalog availability, not app opening).
   * Playlists have IDs like "pl.abc123" — pass those as the id.
   */
  appleMusic: {
    appScheme: handle => {
      const {
        id,
        type = 'artist',
        storefront = 'us'
      } = typeof handle === 'string' ? { id: handle } : handle
      // Universal links work as custom schemes on iOS via music:// redirect
      return `music://music.apple.com/${storefront}/${type}/${id}`
    },
    androidIntent: handle => {
      const {
        id,
        type = 'artist',
        storefront = 'us'
      } = typeof handle === 'string' ? { id: handle } : handle
      return `intent://music.apple.com/${storefront}/${type}/${id}#Intent;package=com.apple.android.music;scheme=https;end`
    },
    webUrl: handle => {
      const {
        id,
        type = 'artist',
        storefront = 'us'
      } = typeof handle === 'string' ? { id: handle } : handle
      return `https://music.apple.com/${storefront}/${type}/${id}`
    }
  }
}

/**
 * Detect if the user is on Android.
 */
function isAndroid() {
  if (typeof navigator === 'undefined') return false
  return /android/i.test(navigator.userAgent)
}

/**
 * Detect if the user is on iOS.
 */
function isIOS() {
  if (typeof navigator === 'undefined') return false
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

/**
 * Open a social profile in the native app, falling back to the browser.
 *
 * @param {'facebook'|'youtube'|'instagram'|'tiktok'|'snapchat'|'x'|'threads'|'spotify'|'youtubeMusic'|'appleMusic'} platform
 * @param {string} handle  - username / screen name / numeric id depending on platform
 * @param {object} [opts]
 * @param {number} [opts.fallbackDelay=1500]  - ms to wait before opening web fallback
 */
export function openSocialProfile(platform, handle, opts = {}) {
  const { fallbackDelay = 1500 } = opts
  const config = PLATFORM_CONFIG[platform]

  if (!config) {
    console.warn(`[openSocialProfile] Unknown platform: "${platform}"`)
    return
  }

  const webUrl = config.webUrl(handle)

  // --- Android: use Intent URI (most reliable) ---
  if (isAndroid()) {
    window.location.href = config.androidIntent(handle)
    // Intent URIs that fail silently won't redirect; open web as safety net after delay
    setTimeout(() => {
      window.open(webUrl, '_blank', 'noopener,noreferrer')
    }, fallbackDelay)
    return
  }

  // --- iOS / Desktop: use custom scheme with iframe trick ---
  if (isIOS()) {
    // Hidden iframe avoids navigation away from current page on scheme failure
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = config.appScheme(handle)
    document.body.appendChild(iframe)

    // Clean up iframe after attempt
    const cleanup = setTimeout(() => {
      document.body.removeChild(iframe)
    }, 2000)

    // If the app didn't open (page stays visible), fall back to web after delay
    const fallback = setTimeout(() => {
      window.open(webUrl, '_blank', 'noopener,noreferrer')
    }, fallbackDelay)

    // If user left the page (app opened), cancel the web fallback
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(fallback)
        clearTimeout(cleanup)
        document.body.removeChild(iframe)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return
  }

  // --- Desktop: just open the web URL ---
  window.open(webUrl, '_blank', 'noopener,noreferrer')
}

/**
 * React hook — returns a stable callback for each platform.
 *
 * Usage:
 *   const open = useSocialDeepLink();
 *   <button onClick={() => open('instagram', 'nasa')}>Open Instagram</button>
 */
export function useSocialDeepLink(opts = {}) {
  return (platform, handle) => openSocialProfile(platform, handle, opts)
}

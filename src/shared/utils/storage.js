export const SOLDIERS_CACHE_TOKEN = 'soldier_cache'

export const save = state => {
  try {
    localStorage.setItem(SOLDIERS_CACHE_TOKEN, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save state to local storage')
  }
}

export const load = () => {
  try {
    const cache = localStorage.getItem(SOLDIERS_CACHE_TOKEN)
    return !!cache ? JSON.parse(cache) : undefined
  } catch (e) {
    return undefined
  }
}

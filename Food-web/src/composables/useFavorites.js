import { ref, computed, onMounted } from 'vue'
import { useToast } from './useToast'
import { useLanguage } from './useLanguage'

// Global ref preserves state across component instances
const favorites = ref([])
let isInitialized = false

export function useFavorites() {
  const getToast = () => {
    try {
      return useToast()
    } catch (e) {
      return { showToast: () => {} }
    }
  }

  const getLanguage = () => {
    try {
      return useLanguage()
    } catch (e) {
      return { t: null }
    }
  }

  // Extract uniform ID from meal item
  const getItemId = (item) => item?.idMeal || item?.id || null

  const loadFavorites = () => {
    if (typeof localStorage === 'undefined') return
    
    try {
      const saved = localStorage.getItem('favorites')
      if (saved) {
        favorites.value = JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to parse favorites from localStorage:', e)
      favorites.value = []
    }
  }

  const saveFavorites = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(favorites.value))
    }
  }

  const isFavorite = (item) => {
    const id = getItemId(item)
    if (!id) return false
    return favorites.value.some(f => getItemId(f) === id)
  }

  const toggleFavorite = (item) => {
    const id = getItemId(item)
    if (!id) return

    const { showToast } = getToast()
    const { t } = getLanguage()
    const translations = t?.value || t

    const index = favorites.value.findIndex(f => getItemId(f) === id)
    
    if (index > -1) {
      favorites.value.splice(index, 1)
      const message = translations?.toast?.favoriteRemoved || 'Removed from favorites'
      showToast(message, 'info')
    } else {
      favorites.value.push(item)
      const message = translations?.toast?.favoriteAdded || 'Added to favorites'
      showToast(message, 'success')
    }

    saveFavorites()
  }

  const favoriteCount = computed(() => favorites.value.length)

  // Safe Lifecycle Hook & Cross-Tab Synchronization
  onMounted(() => {
    if (!isInitialized) {
      loadFavorites()
      isInitialized = true

      if (typeof window !== 'undefined') {
        window.addEventListener('storage', (e) => {
          if (e.key === 'favorites') {
            loadFavorites()
          }
        })
      }
    }
  })

  return {
    favorites,
    favoriteCount,
    toggleFavorite,
    isFavorite,
    loadFavorites
  }
}
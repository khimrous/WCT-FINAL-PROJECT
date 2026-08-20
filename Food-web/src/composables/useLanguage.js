import { ref, computed, onMounted } from 'vue'
import { translations } from '../utils/translations'

const currentLanguage = ref('en')
const showLanguageMenu = ref(false)
let isInitialized = false

export function useLanguage() {
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      currentLanguage.value = lang
      
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', lang)
      }
      
      showLanguageMenu.value = false
      
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang
        document.documentElement.dir = 'ltr'
      }
    }
  }

  const initLanguage = () => {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem('language')
    if (saved && translations[saved]) {
      currentLanguage.value = saved
    } else if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language?.split('-')[0]
      currentLanguage.value = translations[browserLang] ? browserLang : 'en'
    }

    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLanguage.value
    }

    if (!isInitialized) {
      isInitialized = true
      
      // Sync language across open tabs/windows
      window.addEventListener('storage', (e) => {
        if (e.key === 'language' && e.newValue && translations[e.newValue]) {
          currentLanguage.value = e.newValue
          if (typeof document !== 'undefined') {
            document.documentElement.lang = e.newValue
          }
        }
      })
    }
  }

  // Reactive object combining target language with English fallback logic
  const t = computed(() => {
    const activeDict = translations[currentLanguage.value] || translations.en || {}
    const fallbackDict = translations.en || {}

    // Deep merge active dictionary with fallback dictionary
    return {
      home: 'Home',
      ...fallbackDict,
      ...activeDict
    }
  })

  onMounted(() => {
    initLanguage()
  })

  return {
    currentLanguage,
    showLanguageMenu,
    t,
    changeLanguage,
    initLanguage
  }
}
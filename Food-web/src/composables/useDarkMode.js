import { ref, onMounted } from 'vue'

const isDark = ref(false)
let isInitialized = false

export function useDarkMode() {
  const updateDOM = () => {
    if (typeof document === 'undefined') return
    
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    updateDOM()
    
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', isDark.value.toString())
    }
  }

  const initTheme = () => {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem('darkMode')
    
    if (saved !== null) {
      isDark.value = saved === 'true'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    
    updateDOM()

    // Prevent attaching duplicate listeners if initTheme is called multiple times
    if (!isInitialized) {
      isInitialized = true

      // 1. Sync across browser tabs/windows
      window.addEventListener('storage', (e) => {
        if (e.key === 'darkMode') {
          isDark.value = e.newValue === 'true'
          updateDOM()
        }
      })

      // 2. Sync automatically if system preference changes (only if no manual override set)
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('darkMode') === null) {
          isDark.value = e.matches
          updateDOM()
        }
      })
    }
  }

  // Automatically initialize when mounted in a component lifecycle
  onMounted(() => {
    initTheme()
  })

  return {
    isDark,
    toggleDarkMode,
    initTheme
  }
}
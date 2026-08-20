import { ref } from 'vue'

// Module-level array retains toast items across all components
const toasts = ref([])
const activeTimers = new Map()

export function useToast() {
  const removeToast = (id) => {
    // Clear the active timer if the toast is removed manually
    if (activeTimers.has(id)) {
      clearTimeout(activeTimers.get(id))
      activeTimers.delete(id)
    }

    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const showToast = (message, type = 'info', duration = 3000) => {
    if (!message) return

    // 1. Deduplication: Avoid stacking identical messages repeatedly
    const existing = toasts.value.find(
      t => t.message === message && t.type === type
    )
    if (existing) {
      // Reset the timer for the existing toast instead of spawning a duplicate
      if (activeTimers.has(existing.id)) {
        clearTimeout(activeTimers.get(existing.id))
      }
      const newTimer = setTimeout(() => removeToast(existing.id), duration)
      activeTimers.set(existing.id, newTimer)
      return
    }

    // 2. Queue Limit: Keep maximum 5 toasts visible at once to avoid overflow
    if (toasts.value.length >= 5) {
      removeToast(toasts.value[0].id)
    }

    // 3. Unique ID via Crypto or Timestamp fallback
    const id = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : `${Date.now()}-${Math.random()}`

    toasts.value.push({ id, message, type })

    // 4. Auto-dismiss timer tracking
    if (duration > 0) {
      const timer = setTimeout(() => {
        removeToast(id)
      }, duration)
      
      activeTimers.set(id, timer)
    }
  }

  const clearAllToasts = () => {
    activeTimers.forEach(timer => clearTimeout(timer))
    activeTimers.clear()
    toasts.value = []
  }

  return {
    toasts,
    showToast,
    removeToast,
    clearAllToasts
  }
}
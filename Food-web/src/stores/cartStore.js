import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useToast } from '../composables/useToast'
import { useOrderStore } from './orderStore'
import { useLanguage } from '../composables/useLanguage'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isOpen = ref(false)

  const addItem = (item) => {
    const existing = items.value.find(i => i.idMeal === item.idMeal)
    if (existing) {
      existing.qty += 1
    } else {
      items.value.push({ ...item, qty: 1 })
    }
  }

  const removeItem = (itemId) => {
    const index = items.value.findIndex(i => i.idMeal === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  const increaseQty = (itemId) => {
    const item = items.value.find(i => i.idMeal === itemId)
    if (item) {
      item.qty += 1
    }
  }

  const decreaseQty = (itemId) => {
    const item = items.value.find(i => i.idMeal === itemId)
    if (item) {
      if (item.qty > 1) {
        item.qty -= 1
      } else {
        removeItem(itemId)
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  const toggleCart = () => {
    isOpen.value = !isOpen.value
  }

  const checkout = (customMessage) => {
    if (items.value.length === 0) return
    
    // 1. Save the order to history before clearing the cart
    const orderStore = useOrderStore()
    orderStore.addOrder(items.value, total.value)

    // 2. Guard against event objects being accidentally passed as arguments
    const isValidStringMessage = typeof customMessage === 'string' && customMessage.trim().length > 0

    let successMessage = ''

    if (isValidStringMessage) {
      successMessage = customMessage
    } else {
      // Fallback: evaluate language state directly inside the store
      const lang = useLanguage()
      const t = lang.t?.value || lang.t || {}
      const currentLang = lang.currentLanguage?.value || lang.currentLanguage || lang.locale?.value || lang.locale || ''
      const isKhmer = String(currentLang).toLowerCase() === 'km' || String(currentLang).toLowerCase() === 'khmer'

      successMessage = 
        t?.toast?.success || 
        t?.orderSuccess || 
        (isKhmer 
          ? 'ការបញ្ជាទិញបានជោគជ័យ! សូមអរគុណសម្រាប់ការជាវរបស់អ្នក។' 
          : 'Order placed successfully! Thank you for your purchase.')
    }

    // 3. Initialize useToast safely and display the message
    const { showToast } = useToast()
    showToast(successMessage, 'success')

    // 4. Clear items and close the cart drawer cleanly
    clearCart()
    isOpen.value = false
  }

  const total = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (parseFloat(item.price) || 12.99) * item.qty
    }, 0)
  })

  const itemCount = computed(() => {
    return items.value.reduce((sum, item) => sum + item.qty, 0)
  })

  return {
    items,
    isOpen,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
    toggleCart,
    checkout,
    total,
    itemCount
  }
})
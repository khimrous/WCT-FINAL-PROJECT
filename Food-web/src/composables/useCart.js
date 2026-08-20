import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useToast } from './useToast'
import { useLanguage } from './useLanguage'

export function useCart() {
  const getCartStore = () => {
    try {
      return useCartStore()
    } catch (e) {
      console.warn('Cart store access attempted before Pinia initialization.')
      return null
    }
  }

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

  const addToCart = (item) => {
    if (!item) return
    const store = getCartStore()
    const { showToast } = getToast()
    const { t } = getLanguage()

    if (store?.addItem) {
      store.addItem(item)
      const translations = t?.value || t
      const message = translations?.toast?.added || `${item.strMeal || 'Item'} added to cart!`
      showToast(message, 'success')
    }
  }

  const removeFromCart = (itemId) => {
    const store = getCartStore()
    const { showToast } = getToast()
    const { t } = getLanguage()

    if (store?.removeItem) {
      store.removeItem(itemId)
      const translations = t?.value || t
      const message = translations?.toast?.removed || 'Item removed from cart'
      showToast(message, 'info')
    }
  }

  const clearCart = () => {
    const store = getCartStore()
    const { showToast } = getToast()
    const { t } = getLanguage()

    if (store?.clearCart) {
      store.clearCart()
      const translations = t?.value || t
      const message = translations?.toast?.cleared || 'Cart cleared'
      showToast(message, 'warning')
    }
  }

  const cartCount = computed(() => {
    const store = getCartStore()
    return store?.itemCount ?? store?.items?.length ?? 0
  })

  const cartTotal = computed(() => {
    const store = getCartStore()
    return store?.total ?? 0
  })

  const cartItems = computed(() => {
    const store = getCartStore()
    return store?.items ?? []
  })

  return {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    clearCart
  }
}
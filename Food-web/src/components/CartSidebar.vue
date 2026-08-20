<template>
  <Teleport to="body">
    <Transition name="cart-drawer">
      <div 
        v-if="cartStore.isOpen" 
        class="fixed inset-0 z-50 overflow-hidden"
      >
        <!-- Dark Overlay Backdrop -->
        <div 
          @click="closeCart" 
          class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
        ></div>

        <!-- Slide-over Drawer -->
        <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div class="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col border-l border-gray-200/50 dark:border-gray-800">
            
            <!-- Header -->
            <div class="p-5 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 shrink-0">
              <div class="flex items-center gap-3">
                <div class="p-2.5 rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-orange-500 shadow-sm">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-base font-extrabold text-gray-900 dark:text-white">
                      {{ isKhmerLang ? 'កន្ត្រករបស់អ្នក' : 'Your Cart' }}
                    </h2>
                    <span 
                      v-if="cartStore.itemCount > 0" 
                      class="text-xs bg-orange-500 text-white font-black px-2 py-0.5 rounded-full shadow-sm shadow-orange-500/30"
                    >
                      {{ cartStore.itemCount }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-400">
                    {{ isKhmerLang ? 'ពិនិត្យមើលព័ត៌មានលម្អិតនៃការបញ្ជាទិញរបស់អ្នក' : 'Review your order details' }}
                  </p>
                </div>
              </div>

              <button 
                @click="closeCart" 
                class="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Close Cart"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Content Area -->
            <div class="flex-1 overflow-y-auto p-5">
              
              <!-- Empty State -->
              <div v-if="cartStore.items.length === 0" class="h-full flex flex-col items-center justify-center text-center p-6">
                <div class="w-16 h-16 rounded-3xl bg-orange-50 dark:bg-gray-800 flex items-center justify-center mb-4 text-orange-400 dark:text-orange-500/80">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 class="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {{ isKhmerLang ? 'កន្ត្រករបស់អ្នកទទេ' : 'Your cart is empty' }}
                </h3>
                <p class="text-xs text-gray-400 max-w-[220px] mb-6">
                  {{ isKhmerLang ? 'មើលទៅអ្នកមិនទាន់បានបន្ថែមមុខម្ហូបឆ្ងាញ់ៗទៅក្នុងកន្ត្រករបស់អ្នកនៅឡើយទេ។' : "Looks like you haven't added any delicious items to your cart yet." }}
                </p>
                <button 
                  @click="closeCart" 
                  class="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 text-xs font-extrabold text-gray-700 dark:text-gray-200 transition-all duration-200"
                >
                  {{ isKhmerLang ? 'មើលម៉ឺនុយ' : 'Browse Menu' }}
                </button>
              </div>

              <!-- Cart Items List -->
              <TransitionGroup v-else name="cart-list" tag="div" class="space-y-3">
                <div 
                  v-for="item in cartStore.items" 
                  :key="item.idMeal" 
                  class="flex items-center gap-3.5 p-3 rounded-2xl bg-gray-50/80 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-200"
                >
                  <img 
                    :src="item.strMealThumb" 
                    class="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm" 
                    :alt="item.strMeal"
                  >
                  
                  <div class="flex-1 min-w-0">
                    <h4 class="font-bold text-gray-900 dark:text-white text-sm truncate mb-1">
                      {{ isKhmerLang && item.strKhmerMeal ? item.strKhmerMeal : item.strMeal }}
                    </h4>
                    <p class="font-black text-orange-500 dark:text-orange-400 text-sm">
                      ${{ ((item.price || 12.99) * item.qty).toFixed(2) }}
                    </p>
                  </div>

                  <div class="flex items-center gap-1.5 bg-white dark:bg-gray-900 border border-gray-200/60 dark:border-gray-700/60 rounded-xl p-1 shadow-sm shrink-0">
                    <button 
                      @click="cartStore.decreaseQty(item.idMeal)" 
                      class="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all"
                      aria-label="Decrease quantity"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4" />
                      </svg>
                    </button>
                    
                    <span class="w-5 text-center font-extrabold text-xs text-gray-900 dark:text-white">
                      {{ item.qty }}
                    </span>
                    
                    <button 
                      @click="cartStore.increaseQty(item.idMeal)" 
                      class="w-6 h-6 rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-95 text-white flex items-center justify-center transition-all shadow-xs shadow-orange-500/30"
                      aria-label="Increase quantity"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </TransitionGroup>

            </div>

            <!-- Fixed Footer Summary -->
            <div 
              v-if="cartStore.items.length > 0" 
              class="p-5 border-t border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shrink-0 space-y-3"
            >
              <div class="space-y-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400">
                <div class="flex justify-between">
                  <span>{{ isKhmerLang ? 'សរុបរង' : 'Subtotal' }}</span>
                  <span class="text-gray-800 dark:text-gray-200">${{ cartStore.total.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between">
                  <span>{{ isKhmerLang ? 'ពន្ធ និងសេវាកម្ម' : 'Taxes & Fees' }}</span>
                  <span class="text-emerald-500 font-bold">{{ isKhmerLang ? 'គិតប្រាក់នៅពេលបង់ប្រាក់' : 'Calculated at checkout' }}</span>
                </div>
              </div>

              <div class="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-baseline">
                <span class="text-sm font-extrabold text-gray-900 dark:text-white">{{ isKhmerLang ? 'សរុប' : 'Total' }}</span>
                <span class="text-xl font-black text-orange-500 dark:text-orange-400">
                  ${{ cartStore.total.toFixed(2) }}
                </span>
              </div>

              <button 
                @click="openPaymentModal"
                class="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {{ isKhmerLang ? 'បង់ប្រាក់ជាមួយ QR' : 'Pay with Bank QR' }}
              </button>
            </div>

          </div>
        </div>

        <!-- QR Code Payment Modal -->
        <QrPaymentModal 
          :is-visible="showQrModal" 
          :order-id="orderId" 
          :amount="cartStore.total"
          @close="showQrModal = false" 
          @success="handlePaymentSuccess" 
        />

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore' 
import { useLanguage } from '../composables/useLanguage' 
import QrPaymentModal from './QrPaymentModal.vue'

const cartStore = useCartStore()
const orderStore = useOrderStore() 
const { currentLanguage } = useLanguage()

const isKhmerLang = computed(() => {
  return (currentLanguage?.value || currentLanguage) === 'km'
})

const closeCart = () => {
  cartStore.isOpen = false
}

// --- QR PAYMENT LOGIC ---
const showQrModal = ref(false)
const orderId = computed(() => 'ORD-' + Date.now())

const openPaymentModal = () => {
  if (cartStore.total > 0) {
    showQrModal.value = true
  }
}

const handlePaymentSuccess = () => {
  // 1. Save to YOUR orderStore before clearing the cart
  orderStore.addOrder(cartStore.items, cartStore.total)
  
  // 2. Wait 2.5 seconds so the user can see the green "Success!" message
  setTimeout(() => {
    showQrModal.value = false
    cartStore.clearCart() 
    closeCart()
  }, 2500)
}
</script>

<style scoped>
/* Drawer Slide Animation */
.cart-drawer-enter-active,
.cart-drawer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.cart-drawer-enter-active > div:last-child,
.cart-drawer-leave-active > div:last-child {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.cart-drawer-enter-from,
.cart-drawer-leave-to {
  opacity: 0;
}
.cart-drawer-enter-from > div:last-child,
.cart-drawer-leave-to > div:last-child {
  transform: translateX(100%);
}

/* Item removal smooth transitions */
.cart-list-enter-active,
.cart-list-leave-active {
  transition: all 0.25s ease;
}
.cart-list-enter-from,
.cart-list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.cart-list-leave-active {
  position: absolute;
  width: calc(100% - 2.5rem);
}
</style>
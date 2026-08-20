<template>
  <nav class="fx-nav sticky top-0 z-50 bg-[#FBF5E9]/95 dark:bg-[#1B140F]/95 backdrop-blur-md transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-[72px]">

        <!-- Wordmark: Seal-style Icon + Display Type -->
        <a href="#" class="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C79A3C] rounded-lg p-1">
          <div class="fx-seal relative flex items-center justify-center w-11 h-11 rounded-full
                    bg-[#B8391C] dark:bg-[#B8391C] shadow-[0_2px_10px_rgba(184,57,28,0.35)]
                    ring-2 ring-[#C79A3C] ring-offset-2 ring-offset-[#FBF5E9] dark:ring-offset-[#1B140F]
                    transition-transform duration-500 group-hover:rotate-[18deg]">
            <i class="fas fa-bowl-rice text-white text-base" aria-hidden="true"></i>
          </div>
          <div class="flex flex-col leading-none">
            <span class="fx-wordmark text-2xl text-[#241A14] dark:text-[#FBF5E9]">
              Food<em class="text-[#B8391C]">Explorer</em>
            </span>
            <span class="fx-eyebrow text-[10px] tracking-[0.22em] uppercase text-[#3E6152] dark:text-[#8FB09E] mt-0.5">
              {{ t.eyebrow }}
            </span>
          </div>
        </a>

        <!-- Primary Desktop Links -->
        <div class="hidden md:flex items-center gap-8 text-sm">
          <a href="#" class="fx-link group flex items-center gap-2 text-[#241A14] dark:text-[#F1E7D6]">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C79A3C] group-hover:scale-150 transition-transform"></span>
            {{ t.home }}
          </a>
          <button @click="showFavorites = !showFavorites"
                  :aria-expanded="showFavorites"
                  class="fx-link group relative flex items-center gap-2 text-[#241A14] dark:text-[#F1E7D6] focus:outline-none">
            <span class="w-1.5 h-1.5 rounded-full bg-[#C79A3C] group-hover:scale-150 transition-transform"></span>
            {{ t.favorites }}
            <span v-if="favoriteCount > 0" class="fx-badge">{{ favoriteCount }}</span>
          </button>
        </div>

        <!-- Desktop Controls -->
        <div class="hidden md:flex items-center gap-2.5">
          <!-- Language Switcher -->
          <div class="fx-segment flex items-center rounded-full p-1 bg-[#F1E7D6] dark:bg-[#241A14]
                    border border-[#241A14]/10 dark:border-[#FBF5E9]/10"
               role="group" aria-label="Language Selector">
            <button @click="changeLanguage('en')"
                    :class="currentLanguage === 'en' ? 'fx-segment-active' : 'opacity-60 hover:opacity-100'"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all focus:outline-none"
                    aria-label="Switch to English">
              🇺🇸
            </button>
            <button @click="changeLanguage('km')"
                    :class="currentLanguage === 'km' ? 'fx-segment-active' : 'opacity-60 hover:opacity-100'"
                    class="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all focus:outline-none"
                    aria-label="Switch to Khmer">
              🇰🇭
            </button>
          </div>

          <!-- Dark Mode Button -->
          <button @click="toggleDarkMode"
                  class="w-10 h-10 rounded-full flex items-center justify-center
                         text-[#241A14] dark:text-[#F1E7D6]
                         bg-[#F1E7D6] dark:bg-[#1B140F]
                         border border-[#241A14]/10 dark:border-[#FBF5E9]/10
                         hover:border-[#C79A3C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C79A3C]"
                  :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'" class="text-sm" aria-hidden="true"></i>
          </button>

          <!-- Order History Button -->
          <button @click="showOrderHistory = true"
                  class="relative w-10 h-10 rounded-full flex items-center justify-center
                         text-[#241A14] dark:text-[#F1E7D6]
                         bg-[#F1E7D6] dark:bg-[#1B140F]
                         border border-[#241A14]/10 dark:border-[#FBF5E9]/10
                         hover:border-[#C79A3C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C79A3C]"
                  :aria-label="t.orderHistory">
            <i class="fas fa-receipt text-sm" aria-hidden="true"></i>
            <span v-if="orderStore.orders.length > 0" class="fx-badge fx-badge-corner">{{ orderStore.orders.length }}</span>
          </button>

          <!-- Cart Button -->
          <button @click="toggleCart"
                  class="relative w-10 h-10 rounded-full flex items-center justify-center
                         text-[#241A14] dark:text-[#F1E7D6]
                         bg-[#F1E7D6] dark:bg-[#1B140F]
                         border border-[#241A14]/10 dark:border-[#FBF5E9]/10
                         hover:border-[#C79A3C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C79A3C]"
                  :aria-label="t.basket">
            <i class="fas fa-basket-shopping text-sm" aria-hidden="true"></i>
            <span v-if="itemCount > 0" class="fx-badge fx-badge-corner">{{ itemCount }}</span>
          </button>

          <!-- User Account / Auth Button -->
          <button @click="handleAuthClick"
                  class="relative flex items-center gap-2 px-3.5 h-10 rounded-full
                         text-[#241A14] dark:text-[#F1E7D6]
                         bg-[#F1E7D6] dark:bg-[#1B140F]
                         border border-[#241A14]/10 dark:border-[#FBF5E9]/10
                         hover:border-[#C79A3C] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C79A3C]"
                  :aria-label="authStore.user ? t.accountSettings : t.signIn">
            <span class="w-6 h-6 rounded-full bg-[#B8391C] text-white flex items-center justify-center text-xs font-bold">
              <i :class="authStore.user ? 'fas fa-user-check' : 'fas fa-user'" class="text-[10px]" aria-hidden="true"></i>
            </span>
            <span class="text-xs font-semibold max-w-[90px] truncate">
              {{ authStore.user ? authStore.user.name : t.signIn }}
            </span>
          </button>
        </div>

        <!-- Mobile Menu Controls -->
        <div class="flex items-center gap-2 md:hidden">
          <button @click="showOrderHistory = true"
                  class="relative w-9 h-9 rounded-full flex items-center justify-center
                         text-[#241A14] dark:text-[#F1E7D6] bg-[#F1E7D6] dark:bg-[#1B140F]
                         border border-[#241A14]/10 dark:border-[#FBF5E9]/10"
                  :aria-label="t.orderHistory">
            <i class="fas fa-receipt text-xs" aria-hidden="true"></i>
            <span v-if="orderStore.orders.length > 0" class="fx-badge fx-badge-corner">{{ orderStore.orders.length }}</span>
          </button>

          <button @click="toggleCart"
                  class="relative w-9 h-9 rounded-full flex items-center justify-center
                         text-[#241A14] dark:text-[#F1E7D6] bg-[#F1E7D6] dark:bg-[#1B140F]
                         border border-[#241A14]/10 dark:border-[#FBF5E9]/10"
                  :aria-label="t.basket">
            <i class="fas fa-basket-shopping text-xs" aria-hidden="true"></i>
            <span v-if="itemCount > 0" class="fx-badge fx-badge-corner">{{ itemCount }}</span>
          </button>

          <button @click="handleAuthClick"
                  class="relative w-9 h-9 rounded-full flex items-center justify-center
                         text-[#241A14] dark:text-[#F1E7D6] bg-[#F1E7D6] dark:bg-[#1B140F]
                         border border-[#241A14]/10 dark:border-[#FBF5E9]/10"
                  :aria-label="t.userAccount">
            <i :class="authStore.user ? 'fas fa-user-check' : 'fas fa-user'" class="text-xs" aria-hidden="true"></i>
          </button>

          <button @click="showMobileMenu = !showMobileMenu"
                  :aria-expanded="showMobileMenu"
                  class="w-9 h-9 rounded-full flex items-center justify-center
                         text-[#241A14] dark:text-[#F1E7D6] bg-[#F1E7D6] dark:bg-[#1B140F]
                         border border-[#241A14]/10 dark:border-[#FBF5E9]/10"
                  aria-label="Toggle Navigation Menu">
            <i :class="showMobileMenu ? 'fas fa-xmark' : 'fas fa-bars'" class="text-sm" aria-hidden="true"></i>
          </button>
        </div>

      </div>
    </div>

    <!-- Lacquerware-trim double rule -->
    <div class="h-px bg-[#B8391C]/40" aria-hidden="true"></div>
    <div class="h-px bg-[#C79A3C]/60" aria-hidden="true"></div>

    <!-- Mobile Navigation Drawer Dropdown -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="showMobileMenu" class="md:hidden bg-[#FBF5E9] dark:bg-[#1B140F] border-b border-[#241A14]/10 dark:border-[#FBF5E9]/10 p-4 space-y-4 shadow-lg">
        <div class="flex flex-col gap-3 font-medium text-[#241A14] dark:text-[#F1E7D6]">
          <a href="#" @click="showMobileMenu = false" class="hover:text-[#B8391C] transition-colors">{{ t.home }}</a>
          <button @click="showFavorites = true; showMobileMenu = false" class="flex items-center justify-between hover:text-[#B8391C] transition-colors">
            <span>{{ t.favorites }}</span>
            <span v-if="favoriteCount > 0" class="fx-badge">{{ favoriteCount }}</span>
          </button>
        </div>

        <div class="pt-3 border-t border-[#241A14]/10 dark:border-[#FBF5E9]/10 flex items-center justify-between">
          <div class="fx-segment flex items-center rounded-full p-1 bg-[#F1E7D6] dark:bg-[#1B140F]" role="group" aria-label="Mobile Language Selector">
            <button @click="changeLanguage('en')" :class="currentLanguage === 'en' ? 'fx-segment-active' : 'opacity-60'" class="w-8 h-8 rounded-full text-xs transition-opacity" aria-label="English">🇺🇸</button>
            <button @click="changeLanguage('km')" :class="currentLanguage === 'km' ? 'fx-segment-active' : 'opacity-60'" class="w-8 h-8 rounded-full text-xs transition-opacity" aria-label="Khmer">🇰🇭</button>
          </div>

          <button @click="toggleDarkMode" class="w-9 h-9 rounded-full flex items-center justify-center bg-[#F1E7D6] dark:bg-[#1B140F] text-[#241A14] dark:text-[#F1E7D6]" aria-label="Toggle Dark Mode">
            <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'" class="text-xs" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Favorites Overlay Drawer -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showFavorites" @click.self="showFavorites = false"
           class="fixed inset-0 bg-[#1B140F]/60 backdrop-blur-sm z-50 flex justify-end">
        
        <div class="h-screen w-full max-w-md bg-[#FBF5E9] dark:bg-[#1B140F] shadow-2xl p-6 flex flex-col">
          
          <div class="flex items-center justify-between border-b border-[#241A14]/10 dark:border-[#FBF5E9]/10 pb-4 shrink-0">
            <h2 class="fx-wordmark text-xl text-[#241A14] dark:text-[#FBF5E9] flex items-center gap-2">
              <span class="w-8 h-8 rounded-full bg-[#B8391C] flex items-center justify-center">
                <i class="fas fa-heart text-white text-xs" aria-hidden="true"></i>
              </span>
              {{ t.favorites }}
            </h2>
            <button @click="showFavorites = false"
                    class="text-[#241A14]/40 dark:text-[#FBF5E9]/40 hover:text-[#B8391C] text-2xl leading-none transition-colors p-1"
                    aria-label="Close Favorites">&times;</button>
          </div>

          <div v-if="favorites.length === 0" class="py-16 text-center text-[#241A14]/40 dark:text-[#FBF5E9]/40 my-auto">
            <i class="fas fa-bowl-rice text-6xl mb-4 opacity-40" aria-hidden="true"></i>
            <p class="fx-wordmark text-lg">{{ t.noFavoritesTitle }}</p>
            <p class="text-xs mt-1">{{ t.noFavoritesSub }}</p>
          </div>

          <div v-else class="mt-4 space-y-3 flex-1 min-h-0 overflow-y-auto pr-1">
            <div v-for="item in favorites" :key="item.idMeal"
                 class="flex items-center gap-3 bg-[#F1E7D6] dark:bg-[#241A14] p-3 rounded-2xl
                        border border-[#241A14]/5 dark:border-[#FBF5E9]/5 transition-all hover:border-[#C79A3C]/40">
              <img :src="item.strMealThumb" :alt="item.strMeal"
                   class="w-14 h-14 rounded-full object-cover ring-2 ring-[#C79A3C]" loading="lazy">
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-[#241A14] dark:text-white text-sm truncate">{{ item.strMeal }}</h4>
                <p class="fx-eyebrow text-[10px] tracking-[0.15em] uppercase text-[#3E6152] dark:text-[#8FB09E] mt-0.5 truncate">
                  {{ item.strCategory }}
                </p>
              </div>
              <button @click="toggleFavorite(item)"
                      class="w-9 h-9 rounded-full flex items-center justify-center text-[#B8391C] hover:bg-[#B8391C]/10 transition-colors"
                      :aria-label="`Remove ${item.strMeal} from favorites`">
                <i class="fas fa-heart" aria-hidden="true"></i>
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>

    <!-- Order History Overlay Drawer -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showOrderHistory" @click.self="showOrderHistory = false"
           class="fixed inset-0 bg-[#1B140F]/60 backdrop-blur-sm z-50 flex justify-end">
        
        <div class="h-screen w-full max-w-md bg-[#FBF5E9] dark:bg-[#1B140F] shadow-2xl p-6 flex flex-col">
          
          <div class="border-b border-[#241A14]/10 dark:border-[#FBF5E9]/10 pb-4 shrink-0 space-y-3">
            <div class="flex items-center justify-between">
              <h2 class="fx-wordmark text-xl text-[#241A14] dark:text-[#FBF5E9] flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-[#B8391C] flex items-center justify-center">
                  <i class="fas fa-receipt text-white text-xs" aria-hidden="true"></i>
                </span>
                {{ t.orderHistory }}
              </h2>
              
              <div class="flex items-center gap-2">
                <button v-if="orderStore.orders.length > 0"
                        @click="orderStore.clearHistory()"
                        class="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full
                               text-[#B8391C] bg-[#B8391C]/10 hover:bg-[#B8391C] hover:text-white transition-all">
                  <i class="fas fa-trash-can text-[10px]" aria-hidden="true"></i> {{ t.clear }}
                </button>
                <button @click="showOrderHistory = false"
                        class="text-[#241A14]/40 dark:text-[#FBF5E9]/40 hover:text-[#B8391C] text-2xl leading-none">&times;</button>
              </div>
            </div>

            <div v-if="orderStore.orders.length > 0" class="relative">
              <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#241A14]/40 dark:text-[#FBF5E9]/40"></i>
              <input v-model="orderSearchQuery" type="text" :placeholder="t.searchPlaceholder"
                     class="w-full text-xs bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white pl-8 pr-3 py-2 rounded-xl
                            border border-[#241A14]/10 dark:border-[#FBF5E9]/10 focus:outline-none focus:border-[#C79A3C]">
            </div>
          </div>

          <div v-if="orderStore.orders.length === 0" class="py-16 text-center text-[#241A14]/40 dark:text-[#FBF5E9]/40 my-auto">
            <i class="fas fa-receipt text-6xl mb-4 opacity-40" aria-hidden="true"></i>
            <p class="fx-wordmark text-lg">{{ t.noOrdersTitle }}</p>
            <p class="text-xs mt-1">{{ t.noOrdersSub }}</p>
          </div>

          <div v-else-if="filteredOrders.length === 0" class="py-16 text-center text-[#241A14]/40 dark:text-[#FBF5E9]/40 my-auto">
            <i class="fas fa-search text-5xl mb-3 opacity-40"></i>
            <p class="fx-wordmark text-base">{{ t.noMatchTitle }}</p>
          </div>

          <div v-else class="mt-4 space-y-4 flex-1 min-h-0 overflow-y-auto pr-1">
            <div v-for="order in filteredOrders" :key="order.id"
                 class="bg-[#F1E7D6] dark:bg-[#241A14] p-4 rounded-2xl
                        border border-[#241A14]/5 dark:border-[#FBF5E9]/5 shadow-sm">
              <div class="flex justify-between text-xs text-[#241A14]/60 dark:text-[#FBF5E9]/60 mb-2">
                <span class="font-bold text-[#B8391C]">{{ order.id }}</span>
                <span>{{ order.date }}</span>
              </div>
              <div class="divide-y divide-[#241A14]/10 dark:divide-[#FBF5E9]/10">
                <div v-for="item in order.items" :key="item.idMeal" class="py-2 flex justify-between items-center text-sm">
                  <span class="text-[#241A14] dark:text-white">{{ item.strMeal }} (x{{ item.qty || 1 }})</span>
                  <span class="font-bold text-[#241A14] dark:text-white">
                    ${{ ((item.price || 12.99) * (item.qty || 1)).toFixed(2) }}
                  </span>
                </div>
              </div>
              <div class="mt-3 pt-2 border-t border-[#241A14]/10 dark:border-[#FBF5E9]/10 flex items-center justify-between">
                <div>
                  <span class="text-[10px] uppercase text-[#241A14]/60 dark:text-[#FBF5E9]/60 block font-bold">{{ t.totalPaid }}</span>
                  <span class="font-extrabold text-sm text-[#B8391C]">${{ order.total.toFixed(2) }}</span>
                </div>
                <button @click="reorder(order)"
                        class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full
                               text-white bg-[#B8391C] hover:bg-[#a03117] transition-all shadow-sm"
                        :title="t.orderAgain">
                  <i class="fas fa-rotate-right text-[10px]" aria-hidden="true"></i>
                  {{ t.orderAgain }}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDarkMode } from '../composables/useDarkMode'
import { useLanguage } from '../composables/useLanguage'
import { useFavorites } from '../composables/useFavorites'
import { useCartStore } from '../stores/cartStore'
import { useOrderStore } from '../stores/orderStore'
import { useAuthStore } from '../stores/authStore'

const emit = defineEmits(['open-auth', 'open-profile'])

const { isDark, toggleDarkMode } = useDarkMode()
const { currentLanguage, changeLanguage } = useLanguage()
const { favorites, favoriteCount, toggleFavorite } = useFavorites()

// Pinia Stores
const cartStore = useCartStore()
const { itemCount } = storeToRefs(cartStore)
const orderStore = useOrderStore()
const authStore = useAuthStore()

const showFavorites = ref(false)
const showOrderHistory = ref(false)
const showMobileMenu = ref(false)
const orderSearchQuery = ref('')

// Translations dictionary for English and Khmer
const translations = {
  en: {
    eyebrow: 'Phnom Penh & Beyond',
    home: 'Home',
    favorites: 'Favorites',
    orderHistory: 'Order History',
    basket: 'Shopping Basket',
    accountSettings: 'Account Settings',
    signIn: 'Sign In',
    userAccount: 'User Account',
    clear: 'Clear',
    searchPlaceholder: 'Search by Order ID or dish...',
    noFavoritesTitle: 'Nothing saved yet',
    noFavoritesSub: 'Tap the heart icon on any dish to keep it here.',
    noOrdersTitle: 'No past orders',
    noOrdersSub: 'Your completed checkouts will appear here.',
    noMatchTitle: 'No matching orders found',
    totalPaid: 'Total Paid',
    orderAgain: 'Order Again'
  },
  km: {
    eyebrow: 'ភ្នំពេញ និងតំបន់ផ្សេងទៀត',
    home: 'ទំព័រដើម',
    favorites: 'ចំណូលចិត្ត',
    orderHistory: 'ប្រវត្តិការបញ្ជាទិញ',
    basket: 'កន្ត្រកទំនិញ',
    accountSettings: 'ការកំណត់គណនី',
    signIn: 'ចូលគណនី',
    userAccount: 'គណនីអ្នកប្រើប្រាស់',
    clear: 'លុប',
    searchPlaceholder: 'ស្វែងរកតាមលេខកូដ ឬ មុខម្ហូប...',
    noFavoritesTitle: 'មិនទាន់មានអ្វីបានរក្សាទុកទេ',
    noFavoritesSub: 'ចុចលើរូបសញ្ញាបេះដូងលើមុខម្ហូបណាមួយដើម្បីរក្សាទុកទីនេះ។',
    noOrdersTitle: 'មិនមានប្រវត្តិការបញ្ជាទិញទេ',
    noOrdersSub: 'ការបញ្ជាទិញដែលបានបញ្ចប់របស់អ្នកនឹងបង្ហាញនៅទីនេះ។',
    noMatchTitle: 'រកមិនឃើញការបញ្ជាទិញដែលត្រូវគ្នាទេ',
    totalPaid: 'សរុបប្រាក់',
    orderAgain: 'បញ្ជាទិញម្តងទៀត'
  }
}

const t = computed(() => (currentLanguage.value === 'km' ? translations.km : translations.en))

const filteredOrders = computed(() => {
  if (!orderSearchQuery.value) return orderStore.orders
  const query = orderSearchQuery.value.toLowerCase()
  return orderStore.orders.filter(order => 
    order.id.toLowerCase().includes(query) ||
    order.items.some(item => item.strMeal.toLowerCase().includes(query))
  )
})

const toggleCart = () => {
  if (cartStore?.toggleCart) {
    cartStore.toggleCart()
  }
}

const handleAuthClick = () => {
  if (authStore.user) {
    emit('open-profile')
  } else {
    emit('open-auth')
  }
}

const reorder = (order) => {
  order.items.forEach(item => {
    if (cartStore?.addItem) {
      for (let i = 0; i < (item.qty || 1); i++) {
        cartStore.addItem(item)
      }
    }
  })
  showOrderHistory.value = false
  if (cartStore?.toggleCart) {
    cartStore.toggleCart()
  }
}

// Lock Body Scroll when Drawers are Open
watch([showFavorites, showOrderHistory], ([favOpen, historyOpen]) => {
  document.body.style.overflow = (favOpen || historyOpen) ? 'hidden' : ''
})

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    showFavorites.value = false
    showOrderHistory.value = false
    showMobileMenu.value = false
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');

.fx-nav {
  border-bottom: none;
}

.fx-wordmark {
  font-family: 'Fraunces', serif;
  font-weight: 600;
  letter-spacing: -0.01em;
}
.fx-wordmark em {
  font-style: italic;
  font-weight: 500;
}

.fx-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
}

.fx-link {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  transition: color 0.2s ease;
}
.fx-link:hover {
  color: #B8391C;
}

.fx-segment-active {
  background: #FBF5E9;
  box-shadow: 0 1px 4px rgba(36, 26, 20, 0.15);
}
.dark .fx-segment-active {
  background: #1B140F;
}

.fx-badge {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 500;
  font-size: 10px;
  line-height: 1;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #B8391C;
  color: #FBF5E9;
  border: 1.5px solid #C79A3C;
}

.fx-badge-corner {
  position: absolute;
  top: -4px;
  right: -4px;
}

@media (prefers-reduced-motion: reduce) {
  .fx-seal, 
  .transition-all,
  .transition-colors,
  .transition-transform {
    transition: none !important;
  }
}
</style>
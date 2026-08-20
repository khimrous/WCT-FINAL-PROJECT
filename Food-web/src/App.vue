<template>
  <div class="min-h-screen bg-[#FBF5E9] dark:bg-[#1B140F] text-[#241A14] dark:text-[#F1E7D6] font-sans transition-colors duration-300">
    <Navbar @open-auth="showAuthModal = true" @open-profile="showProfileModal = true" />

    <main id="main-content">
      <Hero />
      <FoodGrid :filters="activeFilters" @select-recipe="openRecipeDetail" />
      <Features />
    </main>

    <Footer />
    <CartSidebar />

    <!-- Recipe Detail Modal -->
    <div 
      v-if="selectedRecipe" 
      class="fixed inset-0 bg-[#1B140F]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeRecipeDetail"
    >
      <div class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FBF5E9] dark:bg-[#1B140F] shadow-2xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10">
        <button 
          @click="closeRecipeDetail" 
          class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-[#F1E7D6] flex items-center justify-center font-bold hover:bg-[#B8391C] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          ✕
        </button>
        <RecipeDetail :recipe="selectedRecipe" @add-to-cart="closeRecipeDetail" />
      </div>
    </div>

    <!-- Authentication Modal -->
    <AuthModal :is-open="showAuthModal" @close="showAuthModal = false" @authenticate="handleAuthenticate" />

    <!-- User Account / Profile Modal -->
    <div 
      v-if="showProfileModal && authStore.user" 
      class="fixed inset-0 bg-[#1B140F]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="showProfileModal = false"
    >
      <div class="w-full max-w-md bg-[#FBF5E9] dark:bg-[#1B140F] shadow-2xl rounded-3xl p-6 border border-[#241A14]/10 dark:border-[#FBF5E9]/10">
        <div class="flex items-center justify-between border-b border-[#241A14]/10 dark:border-[#FBF5E9]/10 pb-4">
          <h2 class="fx-wordmark text-xl text-[#241A14] dark:text-[#FBF5E9] flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-[#B8391C] flex items-center justify-center text-white text-xs font-bold">
              <i class="fas fa-user-check" aria-hidden="true"></i>
            </span>
            Account Profile
          </h2>
          <button @click="showProfileModal = false" class="text-[#241A14]/40 dark:text-[#FBF5E9]/40 hover:text-[#B8391C] text-2xl leading-none">&times;</button>
        </div>

        <div class="py-6 space-y-4">
          <div class="bg-[#F1E7D6] dark:bg-[#241A14] p-4 rounded-2xl border border-[#241A14]/5 dark:border-[#FBF5E9]/5 space-y-2">
            <div>
              <span class="text-[10px] uppercase font-bold tracking-wider text-[#3E6152] dark:text-[#8FB09E]">Full Name</span>
              <p class="font-semibold text-sm text-[#241A14] dark:text-white">{{ authStore.user.name }}</p>
            </div>
            <div>
              <span class="text-[10px] uppercase font-bold tracking-wider text-[#3E6152] dark:text-[#8FB09E]">Email Address</span>
              <p class="font-semibold text-sm text-[#241A14] dark:text-white">{{ authStore.user.email }}</p>
            </div>
          </div>

          <button @click="handleLogout"
                  class="w-full py-3 rounded-2xl bg-[#B8391C] hover:bg-[#a03117] text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2">
            <i class="fas fa-right-from-bracket" aria-hidden="true"></i> Sign Out
          </button>
        </div>
      </div>
    </div>

    <ToastNotification />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import FoodGrid from './components/FoodGrid.vue'
import Features from './components/Features.vue'
import Footer from './components/Footer.vue'
import CartSidebar from './components/CartSidebar.vue'
import RecipeDetail from './components/RecipeDetail.vue'
import ToastNotification from './components/ToastNotification.vue'
import AuthModal from './components/AuthModal.vue'

import { useDarkMode } from './composables/useDarkMode'
import { useLanguage } from './composables/useLanguage'
import { useCartStore } from './stores/cartStore'
import { useAuthStore } from './stores/authStore'

const { initTheme } = useDarkMode()
const { initLanguage } = useLanguage()
const authStore = useAuthStore()

const selectedRecipe = ref(null)
const activeFilters = ref({ query: '', category: 'all' })
const showAuthModal = ref(false)
const showProfileModal = ref(false)

const openRecipeDetail = (recipe) => {
  selectedRecipe.value = recipe
}

const closeRecipeDetail = () => {
  selectedRecipe.value = null
}

const handleAuthenticate = (formData) => {
  const username = formData.name || formData.email.split('@')[0]
  authStore.login(username, formData.email)
}

const handleLogout = () => {
  authStore.logout()
  showProfileModal.value = false
}

onMounted(() => {
  initTheme()
  initLanguage()
  
  try {
    const cartStore = useCartStore()
    if (cartStore?.loadFromStorage) {
      cartStore.loadFromStorage()
    }
  } catch (error) {
    console.warn('Cart state hydration deferred:', error)
  }
})
</script>
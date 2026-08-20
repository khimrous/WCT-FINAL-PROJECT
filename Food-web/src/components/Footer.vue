<template>
  <footer class="relative bg-gradient-to-b from-gray-50/50 to-gray-100/80 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200/80 dark:border-gray-800 text-gray-600 dark:text-gray-400 mt-20 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
      
      <!-- Top Grid Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-200 dark:border-gray-800">
        
        <!-- Brand / About Column -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-2 text-xl font-black text-gray-900 dark:text-white tracking-tight">
            <span class="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white text-base shadow-md shadow-orange-500/30">
              🍲
            </span>
            <span>Food<span class="text-orange-500">Explorer</span></span>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
            Discover and cook delicious recipes, local ingredients, and traditional flavors from Phnom Penh & beyond.
          </p>

          <!-- Social Links -->
          <div class="flex items-center gap-3 pt-2">
            <a 
              v-for="social in socialLinks" 
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700/60 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links Column -->
        <div class="space-y-4">
          <h3 class="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-gray-200">
            {{ t?.navigation || 'Navigation' }}
          </h3>
          <ul class="space-y-2.5 text-sm font-medium">
            <li><a href="#" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Home</a></li>
            <li><a href="#" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Popular Recipes</a></li>
            <li><a href="#" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">Khmer Specials</a></li>
            <li><a href="#" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">{{ t?.about || 'About Us' }}</a></li>
          </ul>
        </div>

        <!-- Company / Legal Column -->
        <div class="space-y-4">
          <h3 class="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-gray-200">
            {{ t?.legal || 'Legal & Info' }}
          </h3>
          <ul class="space-y-2.5 text-sm font-medium">
            <li><a href="#" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">{{ t?.privacy || 'Privacy Policy' }}</a></li>
            <li><a href="#" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">{{ t?.terms || 'Terms of Service' }}</a></li>
            <li><a href="#" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">{{ t?.contact || 'Contact Support' }}</a></li>
            <li><a href="#" class="hover:text-orange-500 dark:hover:text-orange-400 transition-colors">{{ t?.blog || 'Blog & News' }}</a></li>
          </ul>
        </div>

        <!-- Newsletter Column -->
        <div class="space-y-4">
          <h3 class="text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-gray-200">
            Stay Updated
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Get fresh recipes and culinary updates delivered weekly.
          </p>
          <form @submit.prevent class="flex flex-col gap-2">
            <div class="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                class="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
            </div>
            <button 
              type="submit" 
              class="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              <span>Subscribe</span>
              <i class="fas fa-arrow-right text-[10px]"></i>
            </button>
          </form>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-gray-400 dark:text-gray-500">
        <p class="flex items-center gap-1.5">
          <i class="fas fa-code text-orange-500"></i>
          <span>Built with</span>
          <i class="fas fa-heart text-rose-500 animate-pulse"></i>
          <span>for Cambodia 🇰🇭 · 2026</span>
        </p>

        <p>© 2026 FoodExplorer. All rights reserved.</p>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { useLanguage } from '../composables/useLanguage.js'

const { t } = useLanguage()

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com', icon: 'fab fa-github' },
  { label: 'Twitter', href: 'https://twitter.com', icon: 'fab fa-twitter' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'fab fa-youtube' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'fab fa-instagram' }
]
</script>
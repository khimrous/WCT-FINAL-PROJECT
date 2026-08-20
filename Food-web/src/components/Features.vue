<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div 
        v-for="(feature, index) in features" 
        :key="index"
        class="group relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl p-6 border border-gray-200/60 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col items-center text-center overflow-hidden"
      >
        <!-- Subtle Ambient Background Glow on Hover -->
        <div 
          class="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
          :class="feature.glowClass"
        ></div>

        <!-- Icon Container -->
        <div 
          class="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-sm"
          :class="feature.bgClass"
        >
          <!-- SVG Icon Render -->
          <svg 
            class="w-7 h-7 transition-colors duration-300" 
            :class="feature.iconClass" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.iconPath" />
          </svg>
        </div>

        <!-- Content -->
        <h3 class="font-extrabold text-gray-900 dark:text-white text-xs sm:text-sm tracking-tight mb-1 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
          {{ feature.title }}
        </h3>
        <p class="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

// Computed property ensures translations update dynamically when language toggles
const features = computed(() => [
  {
    title: t.value?.features?.search || 'Search & Discover',
    description: t.value?.features?.searchDesc || 'Find any recipe instantly',
    iconPath: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    bgClass: 'bg-amber-100/80 dark:bg-amber-950/50',
    iconClass: 'text-amber-600 dark:text-amber-400',
    glowClass: 'bg-gradient-to-b from-amber-500/10 to-transparent'
  },
  {
    title: t.value?.features?.save || 'Save Favorites',
    description: t.value?.features?.saveDesc || 'Keep your top picks saved',
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    bgClass: 'bg-emerald-100/80 dark:bg-emerald-950/50',
    iconClass: 'text-emerald-600 dark:text-emerald-400',
    glowClass: 'bg-gradient-to-b from-emerald-500/10 to-transparent'
  },
  {
    title: t.value?.features?.global || 'Global Cuisine',
    description: t.value?.features?.globalDesc || 'Food from 100+ countries',
    iconPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    bgClass: 'bg-purple-100/80 dark:bg-purple-950/50',
    iconClass: 'text-purple-600 dark:text-purple-400',
    glowClass: 'bg-gradient-to-b from-purple-500/10 to-transparent'
  },
  {
    title: t.value?.features?.responsive || 'Responsive Design',
    description: t.value?.features?.responsiveDesc || 'Works on all devices',
    iconPath: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    bgClass: 'bg-rose-100/80 dark:bg-rose-950/50',
    iconClass: 'text-rose-600 dark:text-rose-400',
    glowClass: 'bg-gradient-to-b from-rose-500/10 to-transparent'
  }
])
</script>
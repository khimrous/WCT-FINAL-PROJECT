<template>
  <section class="relative overflow-hidden bg-white dark:bg-gray-950 py-20 sm:py-28 transition-colors duration-300">
    
    <!-- Abstract Ambient Lighting -->
    <div class="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 blur-[150px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Minimalist Typography-Focused Header -->
      <div class="max-w-4xl mx-auto text-center space-y-6">
        
        <p class="text-xs font-black uppercase tracking-[0.3em] text-orange-500">
          {{ isKhmerLang ? 'បទពិសោធន៍ថ្មីនៃការធ្វើម្ហូប' : 'The New Culinary Standard' }}
        </p>

        <h1 class="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.3] sm:leading-[1.2]">
          {{ isKhmerLang ? 'គ្រប់រសជាតិ ស្ថិតនៅចុងម្រាមដៃរបស់អ្នក' : 'Taste without boundaries. ' }}
          <span class="block mt-2 bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 bg-clip-text text-transparent pb-1">
            {{ isKhmerLang ? 'បង្កើតឡើងសម្រាប់អ្នកស្រឡាញ់ម្ហូប។' : 'Crafted for pure obsession.' }}
          </span>
        </h1>

        <p class="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed pt-2">
          {{ isKhmerLang ? 'គ្មានការរំខាន គ្មានការស្វែងរកស្មុគស្មាញ។ ជ្រមុជខ្លួនចូលទៅក្នុងពិភពម្ហូបអាហារដ៏ប្រណីតរបស់យើងភ្លាមៗ។' : 'Pure aesthetic appreciation of global and traditional flavors. Explore hand-selected masterpieces curated exclusively for your palate.' }}
        </p>

      </div>

      <!-- Clean, Modern Editorial Grid Showcase (No Search, No Category Pills, No Icons) -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div 
          @click="selectEditorial('signature')"
          class="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-gray-200/50 dark:shadow-none bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
        >
          <img 
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" 
            alt="Signature Dish"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div class="absolute inset-x-6 bottom-6 text-white space-y-1.5">
            <p class="text-[10px] font-black uppercase tracking-widest text-orange-400">Editorial Choice</p>
            <h3 class="text-2xl font-black tracking-tight leading-snug">
              {{ isKhmerLang ? 'មុខម្ហូបប្រចាំហាង' : 'The Heritage Collection' }}
            </h3>
            <p class="text-xs text-gray-300 font-medium line-clamp-1 leading-relaxed">
              {{ isKhmerLang ? 'ស្វែងយល់ពីរសជាតិដើមដ៏មានតម្លៃ' : 'Authentic recipes passed down through generations.' }}
            </p>
          </div>
        </div>

        <div 
          @click="selectEditorial('modern')"
          class="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-gray-200/50 dark:shadow-none bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
        >
          <img 
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" 
            alt="Modern Cut"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div class="absolute inset-x-6 bottom-6 text-white space-y-1.5">
            <p class="text-[10px] font-black uppercase tracking-widest text-orange-400">Gourmet Selection</p>
            <h3 class="text-2xl font-black tracking-tight leading-snug">
              {{ isKhmerLang ? 'រសជាតិបែបទំនើប' : 'Modern Fusion' }}
            </h3>
            <p class="text-xs text-gray-300 font-medium line-clamp-1 leading-relaxed">
              {{ isKhmerLang ? 'ការច្នៃប្រឌិតថ្មីលើមុខម្ហូបល្បីៗ' : 'Contemporary twists on timeless classics.' }}
            </p>
          </div>
        </div>

        <div 
          @click="selectEditorial('artisan')"
          class="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-xl shadow-gray-200/50 dark:shadow-none bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
        >
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" 
            alt="Artisan Spice"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          
          <div class="absolute inset-x-6 bottom-6 text-white space-y-1.5">
            <p class="text-[10px] font-black uppercase tracking-widest text-orange-400">Master Class</p>
            <h3 class="text-2xl font-black tracking-tight leading-snug">
              {{ isKhmerLang ? 'គ្រឿងទេសពិសេស' : 'Artisan Spices' }}
            </h3>
            <p class="text-xs text-gray-300 font-medium line-clamp-1 leading-relaxed">
              {{ isKhmerLang ? 'អាថ៌កំបាំងនៃក្លិនឈ្ងុយឆ្ងាញ់' : 'The secret blends that define elite cooking.' }}
            </p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage.js'

const emit = defineEmits(['editorialSelect'])
const { currentLanguage } = useLanguage()

const isKhmerLang = computed(() => {
  return (currentLanguage?.value || currentLanguage) === 'km'
})

const selectEditorial = (type) => {
  emit('editorialSelect', type)
}
</script>
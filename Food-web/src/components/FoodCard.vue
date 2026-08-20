<template>
  <div 
    class="group relative bg-white dark:bg-gray-800/90 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700/60 flex flex-col justify-between"
  >
    <!-- Card Top / Image Container -->
    <div 
      class="relative h-52 overflow-hidden bg-gray-100 dark:bg-gray-700/50 cursor-pointer" 
      @click="viewRecipe"
    >
      <img 
        :src="food.strMealThumb" 
        :alt="food.strMeal" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      >
      
      <!-- Gradient Overlay for readability -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20 opacity-80 group-hover:opacity-90 transition-opacity"></div>

      <!-- Left Badge Stack -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
        <span 
          v-if="food.isKhmer" 
          class="bg-gradient-to-r from-red-600 to-rose-500 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md shadow-red-500/20 flex items-center gap-1.2 tracking-wide"
        >
          <span class="text-xs leading-none">🇰🇭</span> Khmer
        </span>
        
        <span 
          v-else-if="food.isNew" 
          class="bg-emerald-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-md shadow-emerald-500/20 flex items-center gap-1 uppercase tracking-wider"
        >
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg> Fast Prep
        </span>
      </div>

      <!-- Right Discount Badge -->
      <span 
        v-if="food.discount" 
        class="absolute top-3 right-3 bg-rose-500/90 backdrop-blur-md text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-md tracking-wider"
      >
        -{{ food.discount }}%
      </span>

      <!-- View Recipe Center Hover Action -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span class="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white font-extrabold px-4 py-2 rounded-2xl text-xs shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-1.5">
          <svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View 
        </span>
      </div>

      <!-- Quick Action Floating Buttons -->
      <div class="absolute bottom-3 right-3 flex items-center gap-2 z-10">
        <!-- Favorite Button -->
        <button 
          @click.stop="toggleFavorite(food)" 
          class="w-9 h-9 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90"
          :class="isFavorite(food) ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'"
          aria-label="Favorite item"
        >
          <svg class="w-4 h-4 transition-transform duration-200" :class="isFavorite(food) ? 'scale-110' : ''" :fill="isFavorite(food) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <!-- Quick Add To Cart Button -->
        <button 
          @click.stop="handleAddToCart(food)" 
          class="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 active:scale-90 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 transition-all duration-200"
          aria-label="Add to cart"
        >
          <svg class="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Card Details -->
    <div class="p-4 flex flex-col justify-between flex-1">
      <div>
        <div class="flex items-start justify-between gap-2 mb-1">
          <h3 
            class="font-extrabold text-gray-900 dark:text-white text-base truncate cursor-pointer hover:text-orange-500 transition-colors" 
            @click="viewRecipe"
          >
            {{ food.strMeal }}
          </h3>
        </div>

        <div class="flex items-center gap-1.5 text-xs text-gray-400">
          <span>{{ food.strCategory || 'International' }}</span>
          <span>•</span>
          <span class="font-medium text-gray-500 dark:text-gray-300">{{ food.strArea || 'Global' }}</span>
        </div>
      </div>
      
      <!-- Price & Rating Row -->
      <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/50">
        <div class="flex items-baseline gap-1.5">
          <span class="text-lg font-black text-gray-900 dark:text-white">
            ${{ (food.price || 12.99).toFixed(2) }}
          </span>
          <span v-if="food.oldPrice" class="text-xs text-gray-400 line-through font-semibold">
            ${{ food.oldPrice.toFixed(2) }}
          </span>
        </div>

        <div class="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-lg border border-amber-200/50 dark:border-amber-800/40">
          <svg class="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="text-xs font-bold text-amber-700 dark:text-amber-400">
            {{ food.rating || '4.8' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFavorites } from '../composables/useFavorites'
import { useCart } from '../composables/useCart'

const props = defineProps({
  food: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['viewRecipe'])

const { toggleFavorite, isFavorite } = useFavorites()
const { addToCart } = useCart()

const viewRecipe = () => {
  emit('viewRecipe', props.food)
}

const handleAddToCart = (food) => {
  addToCart(food)
}
</script>
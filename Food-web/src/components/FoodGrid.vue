<template>
  <section id="food-grid-section" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    
    <!-- Controls Header (Search & Sorting) -->
    <div class="mb-8 space-y-4">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        
        <!-- Search Input -->
        <div class="relative w-full md:w-96">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#241A14]/40 dark:text-[#FBF5E9]/40">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="searchQuery"
            type="text" 
            :placeholder="isKhmerLang ? 'ស្វែងរកម្ហូប ឬគ្រឿងផ្សំ...' : 'Search dishes or ingredients...'"
            class="w-full pl-10 pr-10 py-3 rounded-2xl border border-[#241A14]/15 dark:border-[#FBF5E9]/15 bg-[#FBF5E9] dark:bg-[#1B140F] text-[#241A14] dark:text-[#F1E7D6] focus:ring-2 focus:ring-[#B8391C] outline-none text-xs font-semibold shadow-sm transition-all"
          />
          <button 
            v-if="searchQuery" 
            @click="searchQuery = ''" 
            type="button"
            class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#241A14]/40 hover:text-[#B8391C] dark:text-[#FBF5E9]/40 dark:hover:text-[#C79A3C] text-xs font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        <!-- Sorting Pills -->
        <div class="flex items-center gap-1.5 bg-[#F1E7D6] dark:bg-[#241A14]/80 p-1.5 rounded-2xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10 w-full md:w-auto justify-end shadow-sm">
          <button 
            @click="sortBy = 'name'" 
            type="button"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 shadow-sm"
            :class="sortBy === 'name' ? 'bg-[#B8391C] text-white shadow-md' : 'text-[#241A14]/60 dark:text-[#FBF5E9]/60 hover:text-[#241A14] dark:hover:text-white'"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            {{ isKhmerLang ? 'ឈ្មោះ' : 'Name' }}
          </button>

          <button 
            @click="sortBy = 'rating'" 
            type="button"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 active:scale-95 shadow-sm"
            :class="sortBy === 'rating' ? 'bg-[#B8391C] text-white shadow-md' : 'text-[#241A14]/60 dark:text-[#FBF5E9]/60 hover:text-[#241A14] dark:hover:text-white'"
          >
            <svg class="w-3.5 h-3.5 text-[#C79A3C] fill-[#C79A3C]" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            {{ isKhmerLang ? 'ការវាយតម្លៃ' : 'Rating' }}
          </button>
        </div>
      </div>

      <!-- Categories Bar -->
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          @click="selectedCategory = cat.id"
          type="button"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-95 shadow-sm',
            selectedCategory === cat.id
              ? 'bg-[#B8391C] text-white shadow-md shadow-[#B8391C]/25'
              : 'bg-[#F1E7D6] dark:bg-[#1B140F] text-[#241A14]/70 dark:text-[#F1E7D6]/70 border border-[#241A14]/10 dark:border-[#FBF5E9]/10 hover:border-[#C79A3C]/50'
          ]"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Section Title -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="fx-wordmark text-2xl text-[#241A14] dark:text-[#F1E7D6] flex items-center gap-2 tracking-tight">
          <svg class="w-6 h-6 text-[#B8391C] fill-[#B8391C]" viewBox="0 0 24 24">
            <path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C15.9 9.38 15.28 8.07 15.42 6.64C15.58 5.03 16.55 3.68 17.89 2.92C15.21 2.38 12.33 3.19 10.38 5.14C8.04 7.48 7.54 11 9.07 13.88C9.13 13.99 9.17 14.12 9.13 14.24C9.09 14.36 8.99 14.45 8.87 14.47C8.75 14.49 8.62 14.44 8.54 14.35C6.91 12.59 6.27 10.08 6.95 7.78C4.54 9.4 3.14 12.27 3.39 15.26C3.71 19.11 6.88 22.19 10.74 22.38C15.46 22.61 19.46 19 19.7 14.28C19.82 12.97 19.04 12.01 17.66 11.2Z"/>
          </svg>
          {{ t?.popularPicks || 'Popular Dishes' }}
        </h2>
        <p class="text-xs font-semibold text-[#241A14]/50 dark:text-[#FBF5E9]/50 mt-1">
          Showing {{ paginatedFoods.length }} of {{ displayableTotal }} items available
        </p>
      </div>
    </div>

    <!-- Special Khmer Dishes Showcase Section -->
    <div v-if="showKhmerSection" class="mb-12">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-black text-[#B8391C] flex items-center gap-2">
          <span class="text-2xl leading-none">🇰🇭</span> 
          <span>{{ isKhmerLang ? 'ម្ហូបខ្មែរពិសេស' : 'Special Khmer Dishes' }}</span>
        </h3>
        <span class="h-0.5 flex-1 bg-gradient-to-r from-[#B8391C]/30 to-transparent ml-4 rounded-full"></span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <FoodCard 
          v-for="food in khmerFoods" 
          :key="food.idMeal" 
          :food="food"
          @viewRecipe="openRecipe" 
        />
      </div>
    </div>

    <!-- Loading Skeletons -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="bg-[#FBF5E9] dark:bg-[#1B140F]/60 rounded-3xl p-4 border border-[#241A14]/10 dark:border-[#FBF5E9]/10 animate-pulse">
        <div class="h-48 bg-[#241A14]/10 dark:bg-[#FBF5E9]/10 rounded-2xl mb-4"></div>
        <div class="h-5 bg-[#241A14]/10 dark:bg-[#FBF5E9]/10 rounded-lg w-3/4 mb-2"></div>
        <div class="h-4 bg-[#241A14]/10 dark:bg-[#FBF5E9]/10 rounded-lg w-1/2 mb-4"></div>
        <div class="flex justify-between items-center pt-2">
          <div class="h-6 bg-[#241A14]/10 dark:bg-[#FBF5E9]/10 rounded-lg w-1/3"></div>
          <div class="h-8 bg-[#241A14]/10 dark:bg-[#FBF5E9]/10 rounded-full w-12"></div>
        </div>
      </div>
    </div>

    <!-- Main Content Food Grid -->
    <div v-else-if="paginatedFoods.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <FoodCard 
        v-for="food in paginatedFoods" 
        :key="food.idMeal" 
        :food="food"
        @viewRecipe="openRecipe" 
      />
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && paginatedFoods.length === 0" class="py-16 text-center bg-[#FBF5E9] dark:bg-[#1B140F] rounded-3xl border border-dashed border-[#241A14]/20 dark:border-[#FBF5E9]/20 shadow-sm">
      <div class="w-16 h-16 bg-[#F1E7D6] dark:bg-[#241A14] rounded-3xl flex items-center justify-center mx-auto mb-4 text-[#241A14]/40 dark:text-[#FBF5E9]/40 border border-[#241A14]/10 dark:border-[#FBF5E9]/10">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 class="text-base font-bold text-[#241A14] dark:text-white mb-1">No items found</h3>
      <p class="text-xs text-[#241A14]/60 dark:text-[#F1E7D6]/60 max-w-xs mx-auto">Try adjusting your search query or selecting a different category filter.</p>
    </div>

    <!-- Load More / Show Less Pagination Controls -->
    <div class="flex flex-wrap justify-center items-center gap-4 mt-12">
      <button 
        v-if="visibleCount < displayableTotal && !loading"
        @click="loadMore" 
        type="button"
        class="bg-[#FBF5E9] dark:bg-[#1B140F] hover:bg-[#B8391C] hover:text-white text-[#241A14] dark:text-[#F1E7D6] font-extrabold text-xs px-8 py-3.5 rounded-2xl shadow-lg border border-[#241A14]/15 dark:border-[#FBF5E9]/15 active:scale-95 transition-all duration-200 flex items-center gap-2 group"
      >
        <span>{{ t?.loadMore || 'Load More' }}</span>
        <svg class="w-4 h-4 text-[#B8391C] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <button 
        v-if="visibleCount > 8 && !loading"
        @click="showLess" 
        type="button"
        class="bg-[#F1E7D6] dark:bg-[#241A14] hover:bg-[#241A14]/10 dark:hover:bg-[#241A14]/80 text-[#241A14] dark:text-[#F1E7D6] font-extrabold text-xs px-6 py-3.5 rounded-2xl border border-[#241A14]/15 dark:border-[#FBF5E9]/15 active:scale-95 transition-all duration-200 flex items-center gap-2 shadow-sm"
      >
        <span>{{ isKhmerLang ? 'បង្ហាញតិច' : 'Show Less' }}</span>
        <svg class="w-4 h-4 text-[#241A14]/60 dark:text-[#FBF5E9]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      <div 
        v-if="visibleCount >= displayableTotal && displayableTotal > 0 && !loading" 
        class="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#3E6152]/10 text-[#3E6152] dark:text-[#8FB09E] text-xs font-extrabold border border-[#3E6152]/20 shadow-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
        </svg>
        <span>{{ t?.allShown || 'All items displayed' }}</span>
      </div>
    </div>

    <!-- Recipe Detail Modal -->
    <RecipeDetail 
      v-if="selectedRecipe" 
      :recipe="selectedRecipe"
      :show="!!selectedRecipe"
      @update:show="selectedRecipe = $event ? selectedRecipe : null"
      @close="selectedRecipe = null" 
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import FoodCard from './FoodCard.vue'
import RecipeDetail from './RecipeDetail.vue'
import { useLanguage } from '../composables/useLanguage.js'

const { t, currentLanguage } = useLanguage()
const foods = ref([])
const searchQuery = ref('')
const selectedCategory = ref(null)
const visibleCount = ref(8)
const sortBy = ref('name')
const loading = ref(true)
const selectedRecipe = ref(null)

const isKhmerLang = computed(() => {
  return (currentLanguage?.value || currentLanguage) === 'km'
})

const categories = computed(() => [
  { id: null, label: isKhmerLang.value ? '🍽️ ទាំងអស់' : '🍽️ All' },
  { id: 'khmer', label: isKhmerLang.value ? '🇰🇭 ម្ហូបខ្មែរ' : '🇰🇭 Khmer Food' },
  { id: 'Seafood', label: isKhmerLang.value ? '🦐 គ្រឿងសមុទ្រ' : '🦐 Seafood' },
  { id: 'Beef', label: isKhmerLang.value ? '🥩 សាច់គោ' : '🥩 Beef' },
  { id: 'Pork', label: isKhmerLang.value ? '🥓 សាច់ជ្រូក' : '🥓 Pork' },
  { id: 'Soup', label: isKhmerLang.value ? '🍲 សម្ល' : '🍲 Soup' },
  { id: 'Pasta', label: isKhmerLang.value ? '🍝 មី និងប៉ាស្តា' : '🍝 Pasta & Noodles' }
])

// Khmer traditional highlights
const khmerFoods = ref([
  {
    idMeal: 'khmer1',
    strMeal: 'Fish Amok (អាម៉ុកត្រី)',
    strCategory: 'Seafood',
    strArea: 'Cambodian',
    strMealThumb: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    price: 15.99,
    rating: 4.9,
    isNew: true,
    isKhmer: true,
    hasSpice: true,
    extras: ['Extra Coconut Milk', 'Fried Egg', 'Crispy Garlic', 'Jasmine Rice'],
    strInstructions: '1. Prepare fresh fish fillet.\n2. Blend coconut cream with traditional Kroeung curry paste.\n3. Steam gently inside banana leaf cups for 15 minutes.'
  },
  {
    idMeal: 'khmer2',
    strMeal: 'Beef Lok Lak (ឡុកឡាក់សាច់គោ)',
    strCategory: 'Beef',
    strArea: 'Cambodian',
    strMealThumb: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    price: 13.99,
    rating: 4.8,
    isNew: true,
    isKhmer: true,
    hasSpice: true,
    extras: ['Fried Egg', 'Extra Kampot Pepper', 'Crispy Garlic'],
    strInstructions: '1. Marinate diced tenderloin with garlic, soy sauce, and Kampot pepper.\n2. Wok-fry on high heat.\n3. Serve over bed of lettuce, tomato, and lime-pepper dipping sauce.'
  },
  {
    idMeal: 'khmer3',
    strMeal: 'Nom Banh Chok (នំបញ្ចុក)',
    strCategory: 'Pasta',
    strArea: 'Cambodian',
    strMealThumb: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=800&q=80',
    price: 9.99,
    rating: 4.7,
    isNew: true,
    isKhmer: true,
    hasSpice: true,
    extras: ['Extra Herbs', 'Banana Flower', 'Crispy Garlic'],
    strInstructions: '1. Boil rice noodles.\n2. Top with rich green fish curry gravy pounded with lemongrass.\n3. Garnish with fresh herbs, cucumber, and banana flower.'
  },
  {
    idMeal: 'khmer4',
    strMeal: 'Bai Sach Chrouk (បាយសាច់ជ្រូក)',
    strCategory: 'Pork',
    strArea: 'Cambodian',
    strMealThumb: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    price: 11.99,
    rating: 4.6,
    isNew: true,
    isKhmer: true,
    hasSpice: false,
    extras: ['Fried Egg', 'Pickled Daikon', 'Scallion Oil'],
    strInstructions: '1. Thinly slice pork and marinate with garlic, coconut milk, and honey.\n2. Slow-grill over charcoal.\n3. Serve over steaming rice with pickled daikon.'
  }
])

// Expanded inventory with multiple dishes per category
const expandedCatalog = ref([
  // Seafood
  {
    idMeal: 'ext1',
    strMeal: 'Garlic Butter Grilled Prawns',
    strCategory: 'Seafood',
    strArea: 'International',
    strMealThumb: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80',
    price: 16.50,
    rating: 4.9,
    isNew: false,
    isKhmer: false,
    hasSpice: false,
    extras: ['Lemon Wedge', 'Extra Butter', 'Parsley'],
    strInstructions: '1. Clean jumbo prawns.\n2. Sauté in heavy garlic butter glaze.\n3. Garnish with fresh herbs.'
  },
  {
    idMeal: 'ext1-b',
    strMeal: 'Crispy Salt & Pepper Squid',
    strCategory: 'Seafood',
    strArea: 'Asian',
    strMealThumb: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    price: 14.99,
    rating: 4.7,
    isNew: true,
    isKhmer: false,
    hasSpice: true,
    extras: ['Sweet Chili Sauce', 'Spring Onion', 'Lime Wedge'],
    strInstructions: '1. Toss fresh squid rings in seasoned starch.\n2. Deep-fry until crispy golden.\n3. Toss with garlic, chilies, and green onions.'
  },
  // Beef
  {
    idMeal: 'ext2',
    strMeal: 'Classic Ribeye Steak',
    strCategory: 'Beef',
    strArea: 'Western',
    strMealThumb: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    price: 24.99,
    rating: 4.9,
    isNew: true,
    isKhmer: false,
    hasSpice: false,
    extras: ['Mushroom Sauce', 'Garlic Mashed Potatoes', 'Steamed Asparagus'],
    strInstructions: '1. Season ribeye generously with salt and pepper.\n2. Cast-iron sear to medium-rare.\n3. Rest with herb butter.'
  },
  {
    idMeal: 'ext2-b',
    strMeal: 'Tender Beef Bulgogi Bowl',
    strCategory: 'Beef',
    strArea: 'Korean',
    strMealThumb: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=800&q=80',
    price: 15.50,
    rating: 4.8,
    isNew: false,
    isKhmer: false,
    hasSpice: false,
    extras: ['Sesame Seeds', 'Kimchi Side', 'Fried Egg'],
    strInstructions: '1. Marinate sliced beef in soy, sesame oil, and pear juice.\n2. Cook quickly on high heat.\n3. Serve over rice.'
  },
  // Pork
  {
    idMeal: 'ext3',
    strMeal: 'Honey Glazed Pork Ribs',
    strCategory: 'Pork',
    strArea: 'American',
    strMealThumb: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    price: 17.99,
    rating: 4.8,
    isNew: false,
    isKhmer: false,
    hasSpice: true,
    extras: ['Extra BBQ Sauce', 'Coleslaw', 'French Fries'],
    strInstructions: '1. Slow-bake ribs until tender.\n2. Brush thick layer of honey barbecue glaze.\n3. Caramelize under broiler.'
  },
  {
    idMeal: 'ext3-b',
    strMeal: 'Crispy Tonkatsu Cutlet',
    strCategory: 'Pork',
    strArea: 'Japanese',
    strMealThumb: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    price: 13.50,
    rating: 4.7,
    isNew: true,
    isKhmer: false,
    hasSpice: false,
    extras: ['Tonkatsu Sauce', 'Shredded Cabbage', 'Steamed Rice'],
    strInstructions: '1. Bread pork loin cutlets with panko crumbs.\n2. Fry until golden brown.\n3. Slice and serve with tangy tonkatsu sauce.'
  },
  // Soup
  {
    idMeal: 'ext4',
    strMeal: 'Creamy Mushroom Soup',
    strCategory: 'Soup',
    strArea: 'European',
    strMealThumb: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    price: 7.99,
    rating: 4.5,
    isNew: false,
    isKhmer: false,
    hasSpice: false,
    extras: ['Garlic Bread', 'Extra Truffle Oil', 'Croutons'],
    strInstructions: '1. Sauté earthy mushrooms with onions and thyme.\n2. Blend smooth with heavy cream.\n3. Drizzle with truffle oil.'
  },
  {
    idMeal: 'ext5',
    strMeal: 'Spicy Seafood Tom Yum',
    strCategory: 'Soup',
    strArea: 'Thai',
    strMealThumb: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
    price: 14.50,
    rating: 4.8,
    isNew: true,
    isKhmer: false,
    hasSpice: true,
    extras: ['Extra Chili Paste', 'Coriander', 'Lime Juice'],
    strInstructions: '1. Boil aromatic galangal, lemongrass, and kaffir lime leaves.\n2. Add mixed seafood and chili paste.\n3. Finish with fresh lime juice.'
  },
  // Pasta & Noodles
  {
    idMeal: 'ext6',
    strMeal: 'Rich Truffle Carbonara',
    strCategory: 'Pasta',
    strArea: 'Italian',
    strMealThumb: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    price: 16.99,
    rating: 4.9,
    isNew: true,
    isKhmer: false,
    hasSpice: false,
    extras: ['Extra Parmesan', 'Crispy Bacon Bits', 'Garlic Bread'],
    strInstructions: '1. Boil spaghetti al dente.\n2. Whisk egg yolks, pecorino cheese, and black pepper.\n3. Toss with hot pasta and crispy pancetta.'
  }
])

const fetchFoods = async () => {
  loading.value = true
  setTimeout(() => {
    foods.value = [...khmerFoods.value, ...expandedCatalog.value]
    loading.value = false
  }, 400)
}

const showKhmerSection = computed(() => {
  return (selectedCategory.value === null || selectedCategory.value === 'khmer') && !searchQuery.value
})

const filteredFoods = computed(() => {
  let result = foods.value
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(food => 
      food.strMeal.toLowerCase().includes(query) ||
      (food.strCategory && food.strCategory.toLowerCase().includes(query)) ||
      (food.strArea && food.strArea.toLowerCase().includes(query))
    )
  }
  
  if (selectedCategory.value) {
    if (selectedCategory.value === 'khmer') {
      result = result.filter(food => food.isKhmer)
    } else {
      result = result.filter(food => food.strCategory === selectedCategory.value)
    }
  }
  
  return result
})

const sortedFoods = computed(() => {
  let sorted = [...filteredFoods.value]
  if (sortBy.value === 'name') {
    sorted.sort((a, b) => a.strMeal.localeCompare(b.strMeal))
  } else if (sortBy.value === 'rating') {
    sorted.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
  }
  return sorted
})

const displayList = computed(() => {
  if (showKhmerSection.value) {
    const nonKhmer = sortedFoods.value.filter(f => !f.isKhmer)
    return nonKhmer.length > 0 ? nonKhmer : sortedFoods.value
  }
  return sortedFoods.value
})

const displayableTotal = computed(() => displayList.value.length)

const paginatedFoods = computed(() => {
  return displayList.value.slice(0, visibleCount.value)
})

const loadMore = () => {
  visibleCount.value += 4
}

const showLess = () => {
  visibleCount.value = 8
  const section = document.getElementById('food-grid-section')
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' })
  }
}

const openRecipe = (food) => {
  selectedRecipe.value = food
}

onMounted(() => {
  fetchFoods()
})

watch([searchQuery, selectedCategory], () => {
  visibleCount.value = 8
})
</script>
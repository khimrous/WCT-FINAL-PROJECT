<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div v-if="recipe" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B140F]/70 backdrop-blur-md">
      <div class="relative w-full max-w-lg max-h-[90vh] bg-[#FBF5E9] dark:bg-[#1B140F] text-[#241A14] dark:text-[#F1E7D6] rounded-3xl shadow-2xl overflow-y-auto border border-[#C79A3C]/30 p-6">
        
        <!-- Lacquerware Decorative Accent Lines -->
        <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B8391C] via-[#C79A3C] to-[#B8391C]"></div>

        <!-- Close Button -->
        <button 
          @click="$emit('close')"
          type="button"
          class="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-[#1B140F]/80 hover:bg-[#B8391C] text-white font-bold flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
          aria-label="Close modal"
        >
          ✕
        </button>

        <!-- Hero Image & Badge Header -->
        <div class="relative w-full h-48 rounded-2xl overflow-hidden mb-5 shadow-md border border-[#241A14]/10 dark:border-[#FBF5E9]/10">
          <img 
            :src="recipe.image || recipe.strMealThumb || '/assets/hero.png'" 
            :alt="recipe.name || recipe.strMeal" 
            class="w-full h-full object-cover" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#1B140F]/80 via-transparent to-transparent"></div>
          
          <span class="absolute top-3 left-3 bg-[#B8391C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
            {{ recipe.category || recipe.strCategory || 'Masterpiece' }}
          </span>

          <span class="absolute top-3 right-14 bg-[#FBF5E9]/90 dark:bg-[#1B140F]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-extrabold text-[#C79A3C] shadow-lg flex items-center gap-1 border border-[#C79A3C]/40">
            ★ {{ recipe.rating || '4.9' }}
          </span>

          <div class="absolute bottom-3 left-4 right-4">
            <h2 class="fx-wordmark text-xl text-white drop-shadow-md leading-tight">
              {{ recipe.name || recipe.strMeal }}
            </h2>
          </div>
        </div>

        <!-- TABS NAVIGATION SWITCHER -->
        <div class="flex items-center gap-2 border-b border-[#241A14]/10 dark:border-[#FBF5E9]/10 pb-4 mb-5">
          <button 
            @click="activeTab = 'order'"
            type="button"
            :class="[
              'flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm',
              activeTab === 'order' 
                ? 'bg-[#B8391C] text-white shadow-[#B8391C]/30' 
                : 'bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14]/60 dark:text-[#F1E7D6]/60 hover:text-[#241A14] dark:hover:text-white'
            ]"
          >
            Customize 🛒
          </button>

          <button 
            @click="activeTab = 'reviews'"
            type="button"
            :class="[
              'flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm relative',
              activeTab === 'reviews' 
                ? 'bg-[#B8391C] text-white shadow-[#B8391C]/30' 
                : 'bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14]/60 dark:text-[#F1E7D6]/60 hover:text-[#241A14] dark:hover:text-white'
            ]"
          >
            Reviews 
            <span class="ml-1 px-2 py-0.5 rounded-full text-[10px]" :class="activeTab === 'reviews' ? 'bg-white/20 text-white' : 'bg-[#B8391C]/10 text-[#B8391C]'">
              {{ reviewsList.length }}
            </span>
          </button>
        </div>

        <!-- TAB 1: ORDER & CUSTOMIZATION -->
        <div v-show="activeTab === 'order'" class="space-y-4">
          <p class="text-xs text-[#241A14]/70 dark:text-[#F1E7D6]/70 leading-relaxed font-medium">
            {{ recipe.description || recipe.strInstructions || 'Hand-selected culinary masterpiece curated exclusively for your palate.' }}
          </p>

          <!-- Spice Level Selection -->
          <div v-if="availableSpiceLevels.length > 0">
            <label class="block text-[10px] font-bold uppercase tracking-wider text-[#3E6152] dark:text-[#8FB09E] mb-2">
              Select Spice Level:
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button 
                v-for="level in availableSpiceLevels" 
                :key="level"
                @click="selectedSpice = level"
                type="button"
                :class="[
                  'py-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95',
                  selectedSpice === level 
                    ? 'border-[#C79A3C] bg-[#C79A3C]/10 text-[#B8391C] dark:text-[#C79A3C] shadow-sm' 
                    : 'border-[#241A14]/10 dark:border-[#FBF5E9]/10 bg-[#F1E7D6]/50 dark:bg-[#241A14]/50 text-[#241A14]/70 dark:text-[#F1E7D6]/70 hover:border-[#C79A3C]/50'
                ]"
              >
                {{ level }}
              </button>
            </div>
          </div>

          <!-- Extra Toppings Selection -->
          <div v-if="availableExtras.length > 0">
            <label class="block text-[10px] font-bold uppercase tracking-wider text-[#3E6152] dark:text-[#8FB09E] mb-2">
              Extra Toppings <span class="text-[#B8391C] font-normal lowercase">(+$0.75 each)</span>:
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button 
                v-for="extra in availableExtras" 
                :key="extra"
                @click="toggleExtra(extra)"
                type="button"
                :class="[
                  'p-2.5 rounded-xl text-xs font-semibold border flex justify-between items-center transition-all active:scale-95',
                  selectedExtras.includes(extra) 
                    ? 'border-[#C79A3C] bg-[#C79A3C]/10 text-[#B8391C] dark:text-[#C79A3C] shadow-sm' 
                    : 'border-[#241A14]/10 dark:border-[#FBF5E9]/10 bg-[#F1E7D6]/50 dark:bg-[#241A14]/50 text-[#241A14]/70 dark:text-[#F1E7D6]/70 hover:border-[#C79A3C]/50'
                ]"
              >
                <span>{{ extra }}</span>
                <span class="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold" :class="selectedExtras.includes(extra) ? 'bg-[#B8391C] text-white' : 'bg-[#241A14]/10 dark:bg-[#FBF5E9]/10 text-[#241A14]/50 dark:text-[#F1E7D6]/50'">
                  {{ selectedExtras.includes(extra) ? '✓' : '+' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Quantity Counter & Special Notes -->
          <div class="grid grid-cols-2 gap-3 items-center pt-2">
            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-[#3E6152] dark:text-[#8FB09E] mb-1.5">
                Quantity:
              </label>
              <div class="flex items-center gap-2 bg-[#F1E7D6] dark:bg-[#241A14] p-1 rounded-xl w-fit border border-[#241A14]/10 dark:border-[#FBF5E9]/10">
                <button 
                  @click="quantity > 1 ? quantity-- : null" 
                  type="button"
                  class="w-7 h-7 rounded-lg bg-[#FBF5E9] dark:bg-[#1B140F] text-[#241A14] dark:text-white font-bold flex items-center justify-center text-xs shadow-sm active:scale-95 transition-all"
                >
                  -
                </button>
                <span class="w-6 text-center font-bold text-xs">{{ quantity }}</span>
                <button 
                  @click="quantity++" 
                  type="button"
                  class="w-7 h-7 rounded-lg bg-[#FBF5E9] dark:bg-[#1B140F] text-[#241A14] dark:text-white font-bold flex items-center justify-center text-xs shadow-sm active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold uppercase tracking-wider text-[#3E6152] dark:text-[#8FB09E] mb-1.5">
                Special Notes:
              </label>
              <input 
                v-model="specialNotes"
                type="text" 
                placeholder="e.g., No onions..."
                class="w-full px-3 py-2 rounded-xl text-xs font-medium border border-[#241A14]/10 dark:border-[#FBF5E9]/10 bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white focus:ring-2 focus:ring-[#C79A3C] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <!-- TAB 2: REVIEWS & FEEDBACK -->
        <div v-show="activeTab === 'reviews'" class="space-y-4">
          <!-- Write Review Card -->
          <div class="bg-[#F1E7D6] dark:bg-[#241A14] p-4 rounded-2xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10 space-y-3 shadow-sm">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-[#241A14] dark:text-[#F1E7D6]">
                Posting as: <span class="text-[#B8391C]">{{ authStore.user ? authStore.user.name : 'Guest (Sign in for custom name)' }}</span>
              </span>
              <div class="flex items-center gap-1 bg-[#FBF5E9] dark:bg-[#1B140F] px-3 py-1 rounded-xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10">
                <button 
                  v-for="star in 5" 
                  :key="star"
                  @click="userRating = star"
                  type="button"
                  class="text-xs focus:outline-none transition-transform hover:scale-125"
                >
                  {{ star <= userRating ? '★' : '☆' }}
                </button>
              </div>
            </div>

            <textarea 
              v-model="userReviewText"
              rows="2"
              placeholder="Share your dining experience..."
              class="w-full p-3 rounded-xl text-xs font-medium border border-[#241A14]/10 dark:border-[#FBF5E9]/10 bg-[#FBF5E9] dark:bg-[#1B140F] text-[#241A14] dark:text-white focus:ring-2 focus:ring-[#C79A3C] outline-none transition-all resize-none shadow-sm"
            ></textarea>

            <div class="flex justify-end">
              <button 
                @click="submitReview"
                type="button"
                class="px-4 py-2 rounded-xl bg-[#B8391C] hover:bg-[#a03117] text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                Post Review 💬
              </button>
            </div>
          </div>

          <!-- Reviews List -->
          <div v-if="reviewsList.length > 0" class="space-y-2.5 max-h-[30vh] overflow-y-auto pr-1">
            <div v-for="(rev, idx) in reviewsList" :key="idx" class="p-3.5 rounded-2xl bg-[#F1E7D6]/60 dark:bg-[#241A14]/60 border border-[#241A14]/5 dark:border-[#FBF5E9]/5 text-xs shadow-sm">
              <div class="flex items-center justify-between mb-1.5">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-[#B8391C] text-white font-bold flex items-center justify-center text-[10px]">
                    {{ rev.userName.charAt(0).toUpperCase() }}
                  </div>
                  <span class="font-bold text-[#241A14] dark:text-white">{{ rev.userName }}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-[#C79A3C]">★ {{ rev.rating }}.0</span>
                  <span class="text-[10px] text-[#241A14]/50 dark:text-[#FBF5E9]/50">• {{ rev.date }}</span>
                </div>
              </div>
              <p class="text-[#241A14]/80 dark:text-[#F1E7D6]/80 pl-8 font-medium">{{ rev.comment }}</p>
            </div>
          </div>
        </div>

        <!-- Bottom Checkout Action Bar -->
        <div class="mt-6 flex items-center justify-between border-t border-[#241A14]/10 dark:border-[#FBF5E9]/10 pt-4">
          <div>
            <span class="text-[10px] text-[#3E6152] dark:text-[#8FB09E] block font-bold uppercase tracking-wider">Total Price</span>
            <span class="text-xl font-extrabold text-[#B8391C]">${{ totalPrice.toFixed(2) }}</span>
          </div>

          <button 
            @click="handleAddToCart"
            type="button"
            class="bg-[#B8391C] hover:bg-[#a03117] active:scale-95 text-white font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-[#B8391C]/25 transition-all text-xs flex items-center gap-2"
          >
            <span>Add to Order</span>
            <i class="fas fa-basket-shopping" aria-hidden="true"></i>
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart'
import { useToast } from '../composables/useToast'
import { useAuthStore } from '../stores/authStore'

const props = defineProps({
  recipe: Object
})

const emit = defineEmits(['add-to-cart', 'close'])

const { addToCart } = useCart()
const { showToast } = useToast()
const authStore = useAuthStore()

const activeTab = ref('order')

const availableSpiceLevels = computed(() => {
  return props.recipe?.spiceLevels || props.recipe?.hasSpice ? ['Mild 🟢', 'Medium 🟠', 'Spicy 🔴'] : []
})

const availableExtras = computed(() => {
  return props.recipe?.extras || []
})

const selectedSpice = ref(availableSpiceLevels.value[0] || '')
const selectedExtras = ref([])
const quantity = ref(1)
const specialNotes = ref('')

const userRating = ref(5)
const userReviewText = ref('')
const reviewsList = ref([
  {
    userName: 'Chhun Dara',
    rating: 5,
    comment: 'Absolute perfection! Fresh and authentic.',
    date: '2 days ago'
  }
])

const toggleExtra = (extra) => {
  if (selectedExtras.value.includes(extra)) {
    selectedExtras.value = selectedExtras.value.filter(e => e !== extra)
  } else {
    selectedExtras.value.push(extra)
  }
}

const totalPrice = computed(() => {
  const basePrice = props.recipe?.price || 12.99
  const extrasCost = selectedExtras.value.length * 0.75
  return (basePrice + extrasCost) * quantity.value
})

const submitReview = () => {
  if (!userReviewText.value.trim()) {
    showToast?.('Please write a comment before posting.')
    return
  }

  // Pulls the active user name from the Pinia authStore, or defaults to "Verified Diner"
  const authorName = authStore.user ? authStore.user.name : 'Verified Diner'

  reviewsList.value.unshift({
    userName: authorName,
    rating: userRating.value,
    comment: userReviewText.value,
    date: 'Just now'
  })

  userReviewText.value = ''
  showToast?.('Thank you for your feedback!')
}

const handleAddToCart = () => {
  const itemName = props.recipe?.name || props.recipe?.strMeal || 'Dish'
  addToCart(props.recipe, {
    spiceLevel: selectedSpice.value,
    extras: selectedExtras.value,
    quantity: quantity.value,
    notes: specialNotes.value
  })
  showToast?.(`${quantity.value}x ${itemName} added to cart!`)
  emit('add-to-cart')
  emit('close')
}
</script>
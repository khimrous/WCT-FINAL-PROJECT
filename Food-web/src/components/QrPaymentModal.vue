<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div v-if="isVisible" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      
      <!-- Modal Card -->
      <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center border border-gray-100 dark:border-gray-800">
        
        <!-- State 1: Loading -->
        <div v-if="isLoading" class="py-10">
          <svg class="animate-spin h-10 w-10 mx-auto text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <!-- FIXED: KHMER TEXT -->
          <p class="mt-4 text-gray-500 dark:text-gray-400 text-sm">
            {{ isKhmerLang ? 'កំពុងបង្កើត QR Code...' : 'Generating QR Code...' }}
          </p>
        </div>

        <!-- State 2: Show QR Code -->
        <div v-else-if="!isPaid">
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {{ isKhmerLang ? 'ស្កេនដើម្បីបង់ប្រាក់' : 'Scan to Pay' }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">
            {{ isKhmerLang ? 'សរុប៖' : 'Total:' }} 
            <span class="font-extrabold text-orange-500 text-base">${{ amount.toFixed(2) }}</span>
          </p>
          
          <!-- The QR Code Image -->
          <div class="bg-white p-4 rounded-xl inline-block border border-gray-200 shadow-sm">
            <QrcodeVue :value="qrString" :size="200" level="H" />
          </div>
          
          <!-- FIXED: KHMER TEXT -->
          <p class="mt-4 text-xs text-gray-400 dark:text-gray-500">
            {{ isKhmerLang ? 'សូមបើកកម្មវិធីធានាគាររបស់អ្នក ហើយស្កេនកូដនេះ។' : 'Open your Banking App and scan this code.' }}
          </p>

          <div class="mt-3 flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ isKhmerLang ? 'កំពុងរង់ចាំការបង់ប្រាក់...' : 'Waiting for payment...' }}
          </div>

          <button @click="handleCancel" class="mt-4 text-sm text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors block mx-auto">
            {{ isKhmerLang ? 'បោះបង់' : 'Cancel Payment' }}
          </button>
        </div>

        <!-- State 3: Success -->
        <div v-else>
          <div class="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <!-- FIXED: KHMER TEXT -->
          <h3 class="text-xl font-bold text-green-600 dark:text-green-400">
            {{ isKhmerLang ? 'បង់ប្រាក់ដោយជោគជ័យ!' : 'Payment Successful!' }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ isKhmerLang ? 'កំពុងរក្សាទុកការបញ្ជាទិញរបស់អ្នក...' : 'Saving your order...' }}
          </p>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import QrcodeVue from 'qrcode.vue'
// ADDED: Import language logic
import { useLanguage } from '../composables/useLanguage'

const props = defineProps({
  isVisible: Boolean,
  orderId: String,
  amount: Number
})

const emit = defineEmits(['close', 'success'])

// ADDED: Setup language check
const { currentLanguage } = useLanguage()
const isKhmerLang = computed(() => {
  return (currentLanguage?.value || currentLanguage) === 'km'
})

const isLoading = ref(true)
const isPaid = ref(false)
const qrString = ref('') 
let successTimer = null

const initiatePayment = async () => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    qrString.value = `00020101021226580014com.bakong520454115303USD5405${props.amount}6304ABCD`
    isLoading.value = false
    
    successTimer = setTimeout(() => {
      isPaid.value = true
      emit('success')
    }, 5000)

  } catch (error) {
    console.error("Error:", error)
    emit('close')
  }
}

const handleCancel = () => {
  if (successTimer) clearTimeout(successTimer)
  emit('close')
}

watch(() => props.isVisible, (newVal) => {
  if (newVal) {
    isPaid.value = false
    qrString.value = ''
    initiatePayment()
  } else {
    if (successTimer) clearTimeout(successTimer)
  }
})

onUnmounted(() => {
  if (successTimer) clearTimeout(successTimer)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
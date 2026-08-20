<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" @click.self="handleClose"
         class="fixed inset-0 bg-[#1B140F]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      
      <div class="w-full max-w-lg bg-[#FBF5E9] dark:bg-[#1B140F] shadow-2xl rounded-3xl p-6 border border-[#241A14]/10 dark:border-[#FBF5E9]/10 max-h-[90vh] overflow-y-auto">
        
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-[#241A14]/10 dark:border-[#FBF5E9]/10 pb-4">
          <h2 class="fx-wordmark text-xl text-[#241A14] dark:text-[#FBF5E9] flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-[#B8391C] flex items-center justify-center">
              <i class="fas fa-credit-card text-white text-xs"></i>
            </span>
            {{ step === 'qr' ? 'Scan KHQR to Pay' : (step === 'success' ? 'Order Complete' : 'Checkout & Payment') }}
          </h2>
          <button @click="handleClose" class="text-[#241A14]/40 dark:text-[#FBF5E9]/40 hover:text-[#B8391C] text-2xl leading-none">&times;</button>
        </div>

        <!-- STEP 1: Form Input View -->
        <form v-if="step === 'form'" @submit.prevent="handleSubmit" class="mt-4 space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-[#241A14]/70 dark:text-[#FBF5E9]/70 mb-1.5">Order Type</label>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" @click="form.type = 'delivery'"
                      :class="form.type === 'delivery' ? 'bg-[#B8391C] text-white border-[#B8391C]' : 'bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white border-transparent'"
                      class="py-2.5 rounded-xl border text-xs font-bold transition-all">
                <i class="fas fa-motorcycle mr-1.5"></i> Delivery (Phnom Penh)
              </button>
              <button type="button" @click="form.type = 'dine-in'"
                      :class="form.type === 'dine-in' ? 'bg-[#B8391C] text-white border-[#B8391C]' : 'bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white border-transparent'"
                      class="py-2.5 rounded-xl border text-xs font-bold transition-all">
                <i class="fas fa-utensils mr-1.5"></i> Dine-in Branch
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-[#241A14]/70 dark:text-[#FBF5E9]/70 mb-1">Full Name</label>
              <input v-model="form.name" required type="text" placeholder="Chan Dara"
                     class="w-full text-xs bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white px-3 py-2.5 rounded-xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10 focus:outline-none focus:border-[#C79A3C]">
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-[#241A14]/70 dark:text-[#FBF5E9]/70 mb-1">Phone Number</label>
              <input v-model="form.phone" required type="tel" placeholder="+855 12 345 678"
                     class="w-full text-xs bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white px-3 py-2.5 rounded-xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10 focus:outline-none focus:border-[#C79A3C]">
            </div>
          </div>

          <div v-if="form.type === 'delivery'">
            <label class="block text-xs font-bold uppercase tracking-wider text-[#241A14]/70 dark:text-[#FBF5E9]/70 mb-1">Delivery Address (Khan/Sangkat)</label>
            <input v-model="form.address" required type="text" placeholder="Street 240, Daun Penh, Phnom Penh"
                   class="w-full text-xs bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white px-3 py-2.5 rounded-xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10 focus:outline-none focus:border-[#C79A3C]">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-[#241A14]/70 dark:text-[#FBF5E9]/70 mb-1.5">Payment Method</label>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" @click="form.payment = 'cod'"
                      :class="form.payment === 'cod' ? 'bg-[#3E6152] text-white border-[#3E6152]' : 'bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white border-transparent'"
                      class="py-2.5 rounded-xl border text-xs font-bold transition-all">
                <i class="fas fa-wallet mr-1.5"></i> Cash on Delivery
              </button>
              <button type="button" @click="form.payment = 'aba'"
                      :class="form.payment === 'aba' ? 'bg-[#3E6152] text-white border-[#3E6152]' : 'bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white border-transparent'"
                      class="py-2.5 rounded-xl border text-xs font-bold transition-all">
                <i class="fas fa-qrcode mr-1.5"></i> ABA PayWay / QR
              </button>
            </div>
          </div>

          <div class="pt-3 border-t border-[#241A14]/10 dark:border-[#FBF5E9]/10 flex justify-between items-center text-sm font-extrabold">
            <span class="text-[#241A14] dark:text-white">Total Amount</span>
            <span class="text-[#B8391C] text-lg">${{ totalAmount.toFixed(2) }}</span>
          </div>

          <button type="submit"
                  class="w-full py-3 rounded-2xl bg-[#B8391C] hover:bg-[#a03117] text-white font-bold text-sm tracking-wide shadow-lg transition-all">
            Confirm and Pay Now
          </button>
        </form>

        <!-- STEP 2: QR Code Scanning View -->
        <div v-else-if="step === 'qr'" class="mt-4 text-center space-y-5">
          <p class="text-xs text-[#241A14]/70 dark:text-[#FBF5E9]/70">
            Open your banking app (ABA, Acleda, or any Bakong-supported app), scan the QR code below, and authorize the exact amount.
          </p>

          <!-- Simulated QR Display Box -->
          <div class="bg-white p-4 rounded-2xl inline-block shadow-md border-2 border-[#C79A3C]">
            <div class="w-48 h-48 bg-[#FBF5E9] flex flex-col items-center justify-center border border-dashed border-[#241A14]/20 rounded-xl relative overflow-hidden">
              <i class="fas fa-qrcode text-7xl text-[#1B140F]"></i>
              <div class="absolute inset-x-0 bottom-0 bg-[#B8391C] text-white text-[10px] font-bold py-1">
                KHQR / FOODEXPLORER
              </div>
            </div>
          </div>

          <div class="bg-[#F1E7D6] dark:bg-[#241A14] p-3 rounded-xl flex items-center justify-between text-xs">
            <span class="text-[#241A14]/60 dark:text-[#FBF5E9]/60">Amount to Transfer:</span>
            <span class="font-extrabold text-[#B8391C] text-sm">${{ totalAmount.toFixed(2) }}</span>
          </div>

          <div class="space-y-2">
            <button @click="confirmQRPayment"
                    class="w-full py-3 rounded-2xl bg-[#3E6152] hover:bg-[#324f42] text-white font-bold text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2">
              <i class="fas fa-check-circle"></i> I Have Completed Payment
            </button>
            <button @click="step = 'form'"
                    class="text-xs text-[#241A14]/50 dark:text-[#FBF5E9]/50 hover:underline">
              Back to form details
            </button>
          </div>
        </div>

        <!-- STEP 3: Success Confirmation View -->
        <div v-else-if="step === 'success'" class="mt-4 text-center py-6 space-y-4">
          <div class="w-16 h-16 bg-[#3E6152] text-white rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg">
            <i class="fas fa-check" aria-hidden="true"></i>
          </div>
          <div class="space-y-1">
            <h3 class="fx-wordmark text-xl text-[#241A14] dark:text-white">Order Placed Successfully!</h3>
            <p class="text-xs text-[#241A14]/60 dark:text-[#FBF5E9]/60">Thank you for ordering with FoodExplorer. Your meal is on the way!</p>
          </div>
          <button @click="handleClose"
                  class="w-full py-3 rounded-2xl bg-[#B8391C] hover:bg-[#a03117] text-white font-bold text-sm tracking-wide shadow-lg transition-all">
            Done
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  totalAmount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['close', 'submitOrder'])

const step = ref('form') 

const form = reactive({
  type: 'delivery',
  name: '',
  phone: '',
  address: '',
  payment: 'cod'
})

const handleSubmit = () => {
  if (form.payment === 'aba') {
    step.value = 'qr'
  } else {
    emit('submitOrder', { ...form })
    step.value = 'success'
  }
}

const confirmQRPayment = () => {
  emit('submitOrder', { ...form })
  step.value = 'success'
}

const handleClose = () => {
  step.value = 'form'
  emit('close')
}
</script>
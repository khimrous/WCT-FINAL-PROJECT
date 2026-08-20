<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" @click.self="$emit('close')"
         class="fixed inset-0 bg-[#1B140F]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      
      <div class="w-full max-w-md bg-[#FBF5E9] dark:bg-[#1B140F] shadow-2xl rounded-3xl p-6 border border-[#241A14]/10 dark:border-[#FBF5E9]/10">
        
        <div class="flex items-center justify-between border-b border-[#241A14]/10 dark:border-[#FBF5E9]/10 pb-4">
          <h2 class="fx-wordmark text-xl text-[#241A14] dark:text-[#FBF5E9] flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-[#B8391C] flex items-center justify-center">
              <i class="fas fa-user text-white text-xs"></i>
            </span>
            {{ isRegistering ? 'Create Account' : 'Welcome Back' }}
          </h2>
          <button @click="$emit('close')" class="text-[#241A14]/40 dark:text-[#FBF5E9]/40 hover:text-[#B8391C] text-2xl leading-none">&times;</button>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-4 space-y-4">
          <div v-if="isRegistering">
            <label class="block text-xs font-bold uppercase tracking-wider text-[#241A14]/70 dark:text-[#FBF5E9]/70 mb-1">Full Name</label>
            <input v-model="form.name" required type="text" placeholder="Chan Dara"
                   class="w-full text-xs bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white px-3 py-2.5 rounded-xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10 focus:outline-none focus:border-[#C79A3C]">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-[#241A14]/70 dark:text-[#FBF5E9]/70 mb-1">Email Address</label>
            <input v-model="form.email" required type="email" placeholder="dara@foodexplorer.com"
                   class="w-full text-xs bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white px-3 py-2.5 rounded-xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10 focus:outline-none focus:border-[#C79A3C]">
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-[#241A14]/70 dark:text-[#FBF5E9]/70 mb-1">Password</label>
            <input v-model="form.password" required type="password" placeholder="••••••••"
                   class="w-full text-xs bg-[#F1E7D6] dark:bg-[#241A14] text-[#241A14] dark:text-white px-3 py-2.5 rounded-xl border border-[#241A14]/10 dark:border-[#FBF5E9]/10 focus:outline-none focus:border-[#C79A3C]">
          </div>

          <button type="submit"
                  class="w-full py-3 rounded-2xl bg-[#B8391C] hover:bg-[#a03117] text-white font-bold text-sm tracking-wide shadow-lg transition-all">
            {{ isRegistering ? 'Sign Up' : 'Log In' }}
          </button>
        </form>

        <div class="mt-4 text-center">
          <button @click="isRegistering = !isRegistering" class="text-xs text-[#3E6152] dark:text-[#8FB09E] font-semibold hover:underline">
            {{ isRegistering ? 'Already have an account? Log in' : "Don't have an account? Sign up" }}
          </button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive } from 'vue'

defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close', 'authenticate'])

const isRegistering = ref(false)
const form = reactive({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  emit('authenticate', { ...form, isRegistering: isRegistering.value })
  emit('close')
}
</script>
<template>
  <div 
    aria-live="polite" 
    class="fixed bottom-4 right-4 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
  >
    <TransitionGroup 
      name="toast-list" 
      tag="div" 
      class="flex flex-col space-y-2.5 w-full"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        role="status"
        class="pointer-events-auto w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-100 dark:border-gray-700/80 overflow-hidden transition-all duration-300"
        :class="{
          'border-l-4 border-l-emerald-500': toast.type === 'success',
          'border-l-4 border-l-blue-500': toast.type === 'info',
          'border-l-4 border-l-amber-500': toast.type === 'warning',
          'border-l-4 border-l-rose-500': toast.type === 'error'
        }"
      >
        <div class="p-3.5 sm:p-4">
          <div class="flex items-center gap-3">
            
            <!-- Type Icon -->
            <div class="flex-shrink-0">
              <i 
                :class="{
                  'fas fa-check-circle text-emerald-500': toast.type === 'success',
                  'fas fa-info-circle text-blue-500': toast.type === 'info',
                  'fas fa-exclamation-triangle text-amber-500': toast.type === 'warning',
                  'fas fa-times-circle text-rose-500': toast.type === 'error'
                }" 
                class="text-lg sm:text-xl"
              ></i>
            </div>

            <!-- Toast Message -->
            <div class="flex-1 min-w-0">
              <p class="text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-100 leading-snug break-words">
                {{ toast.message }}
              </p>
            </div>

            <!-- Dismiss Button -->
            <div class="flex-shrink-0">
              <button 
                @click="removeToast(toast.id)" 
                class="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60 focus:outline-none transition active:scale-95"
                aria-label="Close Toast"
              >
                <i class="fas fa-times text-xs sm:text-sm"></i>
              </button>
            </div>

          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { useToast } from '../composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<style scoped>
/* Smooth Vue TransitionGroup Animations */
.toast-list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.toast-list-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.toast-list-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.9);
}

.toast-list-move {
  transition: transform 0.3s ease-in-out;
}
</style>
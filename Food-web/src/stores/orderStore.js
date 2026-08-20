import { defineStore } from 'pinia'
import { ref } from 'vue'



export const useOrderStore = defineStore('orderStore', () => {
  const orders = ref([])

  function addOrder(cartItems, total) {
    orders.value.unshift({
      id: 'ORD-' + Date.now(),
      items: JSON.parse(JSON.stringify(cartItems)),
      total: total,
      date: new Date().toLocaleString(),
      status: 'Paid'
    })
  }

  // ADD THIS FUNCTION TO CLEAR HISTORY
  function clearHistory() {
    orders.value = []
  }

  // Don't forget to return it here!
  return { orders, addOrder, clearHistory } 
})
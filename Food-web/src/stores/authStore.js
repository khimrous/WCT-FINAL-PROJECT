import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('fx_user')) || null)

  function login(username, email) {
    user.value = { name: username, email: email }
    localStorage.setItem('fx_user', JSON.stringify(user.value))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('fx_user')
  }

  return { user, login, logout }
})
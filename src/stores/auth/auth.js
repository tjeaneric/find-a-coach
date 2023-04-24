import { defineStore } from 'pinia'
import { ref } from 'vue'

const authSignUrl = import.meta.env.VITE_AUTH_SIGNUP_URL
const authLoginUrl = import.meta.env.VITE_AUTH_LOGIN_URL

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(null)
  const userId = ref(null)
  const tokenExpiration = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const setUser = (authData) => {
    token.value = authData.tokenId
    userId.value = authData.localId
    tokenExpiration.value = authData.expiresIn
  }

  const signup = async (userData) => {
    isLoading.value = true
    try {
      const response = await fetch(`${authSignUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          returnSecureToken: true
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(
          data.error.message.toLowerCase() || 'Failed to authenticate, check your signup data'
        )
        throw error
      }
      console.log(data)
      setUser(data)
      isLoading.value = false
    } catch (err) {
      isLoading.value = false
      error.value = err.message || 'Failed to authenticate, try later.'
    }
  }

  const login = async (loginData) => {
    isLoading.value = true
    try {
      const response = await fetch(`${authLoginUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          returnSecureToken: true
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(
          data.error.message.toLowerCase() || 'Failed to authenticate, check your login data'
        )
        throw error
      }
      console.log(data)
      setUser(data)
      isLoading.value = false
    } catch (err) {
      isLoading.value = false
      error.value = err.message || 'Failed to authenticate, try later.'
    }
  }

  return { signup, login, userId, isLoading, error }
})

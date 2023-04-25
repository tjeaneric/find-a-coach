import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const authSignUrl = import.meta.env.VITE_AUTH_SIGNUP_URL
const authLoginUrl = import.meta.env.VITE_AUTH_LOGIN_URL

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(null)
  const userId = ref(null)
  const tokenExpiration = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const setUser = (authData) => {
    token.value = authData.idToken
    userId.value = authData.localId
    tokenExpiration.value = authData.expiresIn
  }

  const isLoggedIn = computed(() => !!token.value)

  const auth = async (payload) => {
    const url = payload.mode === 'login' ? `${authLoginUrl}` : `${authSignUrl}`
    isLoading.value = true
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
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

      // Store auth data to local storage
      localStorage.setItem('token', data.idToken)
      localStorage.setItem('userId', data.localId)

      setUser(data)
      isLoading.value = false
    } catch (err) {
      isLoading.value = false
      error.value = err.message || 'Failed to authenticate, try later.'
    }
  }

  const autoLogin = () => {
    const loginData = {
      idToken: localStorage.getItem('token'),
      localId: localStorage.getItem('userId'),
      expiresIn: null
    }
    if (loginData.idToken && loginData.localId) {
      setUser(loginData)
    }
  }

  const signup = async (userData) => {
    await auth({ ...userData, mode: 'signup' })
  }

  const login = async (loginData) => {
    await auth({ ...loginData, mode: 'login' })
  }

  const logout = () => {
    token.value = null
    userId.value = null
    tokenExpiration.value = null
  }

  return { signup, login, userId, isLoading, error, token, isLoggedIn, logout, autoLogin }
})

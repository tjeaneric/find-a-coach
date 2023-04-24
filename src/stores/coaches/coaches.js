import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from '../auth/auth'
import { storeToRefs } from 'pinia'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useCoachStore = defineStore('coachStore', () => {
  const { userId, token } = storeToRefs(useAuthStore())

  const lastFetch = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const coaches = ref([])
  const hasCoaches = computed(() => coaches.value && coaches.value.length > 0)

  const isCoach = computed(() => coaches.value.some((user) => user.id === userId.value))

  const registerCoach = async (coachData) => {
    const newCoach = {
      firstName: coachData.first,
      lastName: coachData.last,
      areas: coachData.areas,
      description: coachData.desc,
      hourlyRate: coachData.rate
    }

    try {
      const response = await fetch(
        `${backendUrl}/coaches/${userId.value}.json?auth=${token.value}`,
        {
          method: 'PUT',
          body: JSON.stringify(newCoach),
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const data = await response.json()
      if (!response.ok) {
        const error = new Error(
          data.error.message?.toLowerCase() || data.error || 'Failed to fetch'
        )
        throw error
      }

      coaches.value.push({ ...newCoach, id: userId.value })
    } catch (err) {
      error.value = err.message || 'Something went wrong'
      isLoading.value = false
    }
  }

  const shouldUpdate = () => {
    if (!lastFetch.value) return true
    const currentTimeStamp = new Date().getTime()
    return (currentTimeStamp - lastFetch.value) / 1000 > 60
  }

  const loadCoaches = async (forceRefresh = false) => {
    if (!forceRefresh && !shouldUpdate()) return
    isLoading.value = true
    try {
      const response = await fetch(`${backendUrl}/coaches.json`)
      const data = await response.json()

      if (!response.ok) {
        const error = new Error(data.message || 'Failed to fetch')
        throw error
      }

      const formattedCoaches = []
      for (const key in data) {
        const coach = {
          id: key,
          firstName: data[key].firstName,
          lastName: data[key].lastName,
          areas: data[key].areas,
          description: data[key].description,
          hourlyRate: data[key].hourlyRate
        }

        formattedCoaches.push(coach)
      }
      coaches.value = formattedCoaches
      isLoading.value = false
    } catch (err) {
      error.value = err.message || 'Something went wrong'
      isLoading.value = false
    }
    lastFetch.value = new Date().getTime()
  }

  return { coaches, hasCoaches, registerCoach, isCoach, userId, loadCoaches, isLoading, error }
})

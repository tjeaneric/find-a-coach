import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useCoachStore = defineStore('coachStore', () => {
  const isLoading = ref(false)
  const error = ref(null)
  const coaches = ref([])
  const hasCoaches = computed(() => coaches.value && coaches.value.length > 0)

  const userId = ref('c3')

  const isCoach = computed(() => coaches.value.some((user) => user.id === userId.value))

  const registerCoach = async (coachData) => {
    const newCoach = {
      firstName: coachData.first,
      lastName: coachData.last,
      areas: coachData.areas,
      description: coachData.desc,
      hourlyRate: coachData.rate
    }

    const response = await fetch(`${backendUrl}/coaches/${userId.value}.json`, {
      method: 'PUT',
      body: JSON.stringify(newCoach),
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await response.json()
    console.log(data)

    coaches.value.push({ ...newCoach, id: userId.value })
  }

  const loadCoaches = async () => {
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
    }
  }
  return { coaches, hasCoaches, registerCoach, isCoach, userId, loadCoaches, isLoading, error }
})

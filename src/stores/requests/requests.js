import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useCoachStore } from '../coaches/coaches'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useRequestStore = defineStore('requestStore', () => {
  const isLoading = ref(false)
  const error = ref(null)
  const { userId } = storeToRefs(useCoachStore())
  const requestsList = ref([])

  const addRequest = async (data) => {
    const newRequest = {
      userEmail: data.email,
      message: data.message
    }

    try {
      const response = await fetch(`${backendUrl}/requests/${data.coachId}.json`, {
        method: 'POST',
        body: JSON.stringify(newRequest)
      })
      const responseData = await response.json()

      if (!response.ok) {
        const error = new Error(responseData.message || 'Failed to send request')
        throw error
      }

      newRequest.id = responseData.name
      newRequest.coachId = data.coachId
    } catch (err) {
      // error.value = err.message || 'Something went wrong'
    }

    requestsList.value.push(newRequest)
  }

  const loadRequests = async () => {
    isLoading.value = true
    try {
      const response = await fetch(`${backendUrl}/requests/${userId.value}.json`)
      const data = await response.json()

      if (!response.ok) {
        const error = new Error(data.message || 'Failed to fetch requests')
        throw error
      }

      const requests = []
      for (const key in data) {
        const request = {
          id: key,
          coachId: userId.value,
          userEmail: data[key].userEmail,
          message: data[key].message
        }

        requests.push(request)
      }
      requestsList.value = requests
      isLoading.value = false
    } catch (err) {
      error.value = err.message || 'Something went wrong'
    }
  }

  const hasRequests = computed(
    () =>
      requestsList.value.filter((req) => req.coachId === userId.value) &&
      requestsList.value.filter((req) => req.coachId === userId.value).length > 0
  )

  const filteredRequests = computed(() =>
    requestsList.value.filter((req) => req.coachId === userId.value)
  )
  return { addRequest, hasRequests, filteredRequests, loadRequests, isLoading }
})

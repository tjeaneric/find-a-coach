import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useRequestStore = defineStore('requestStore', () => {
  const requests = ref([])

  const addRequest = (data) => {
    const newRequest = {
      id: new Date().toISOString(),
      coachId: data.coachId,
      userEmail: data.email,
      message: data.message
    }

    requests.value.push(newRequest)
  }

  const hasRequests = computed(() => requests.value && requests.value.length > 0)

  return { requests, addRequest, hasRequests }
})

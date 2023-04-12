import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  return { requests, addRequest }
})

import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { useCoachStore } from '../coaches/coaches'

export const useRequestStore = defineStore('requestStore', () => {
  const { userId } = storeToRefs(useCoachStore())
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

  const hasRequests = computed(
    () =>
      requests.value.filter((req) => req.coachId === userId) &&
      requests.value.filter((req) => req.coachId === userId).length > 0
  )

  const filteredRequests = computed(() => requests.value.filter((req) => req.coachId === userId))
  return { requests, addRequest, hasRequests, filteredRequests }
})

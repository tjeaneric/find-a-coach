import { ref } from 'vue'

export const useFetch = async (url) => {
  const loading = ref(false)
  const data = ref(null)
  const errors = ref(null)
  try {
    loading.value = true
    const response = await fetch(url)
    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch')
      throw error
    }

    data.value = responseData
    loading.value = false
  } catch (err) {
    errors.value = err
    loading.value = false
  }

  return { data, errors, loading }
}

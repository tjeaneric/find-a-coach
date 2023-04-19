import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const useCoachStore = defineStore('coachStore', () => {
  const coaches = ref([
    {
      id: 'c1',
      firstName: 'Maximilian',
      lastName: 'Schwarzmüller',
      areas: ['frontend', 'backend', 'career'],
      description:
        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      hourlyRate: 30
    },
    {
      id: 'c2',
      firstName: 'Julie',
      lastName: 'Jones',
      areas: ['frontend', 'career'],
      description:
        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
      hourlyRate: 30
    }
  ])
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
    const response = await fetch(`${backendUrl}/coaches.json`)
    const data = await response.json()

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
  }
  return { coaches, hasCoaches, registerCoach, isCoach, userId, loadCoaches }
})

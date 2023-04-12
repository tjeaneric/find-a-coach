import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

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

  const registerCoach = (data) => {
    const newCoach = {
      id: userId.value,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    }

    coaches.value.push(newCoach)
  }
  return { coaches, hasCoaches, registerCoach, isCoach }
})

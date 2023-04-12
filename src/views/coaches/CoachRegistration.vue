<script setup>
import CoachForm from '../../components/coaches/CoachForm.vue'
import { useCoachStore } from '../../stores/coaches/coaches.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const coachStore = useCoachStore()

const { registerCoach } = coachStore

const saveData = (data) => {
  registerCoach(data)
  router.replace('/coaches')
}
</script>

<template>
  <base-card>
    <section><h2>Register as a coach now!</h2></section>
    <CoachForm @save-data="saveData" />
  </base-card>
</template>

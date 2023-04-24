<script setup>
import CoachForm from '../../components/coaches/CoachForm.vue'
import { useCoachStore } from '@/stores/coaches/coaches.js'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const router = useRouter()
const coachStore = useCoachStore()

const { registerCoach } = coachStore
const { error } = storeToRefs(coachStore)

const saveData = (data) => {
  registerCoach(data)
  if (!error.value) router.replace('/coaches')
}

const errorHandler = () => (error.value = false)
</script>

<template>
  <base-card>
    <base-dialog :show="!!error" title="An error occured" @close="errorHandler">{{
      error
    }}</base-dialog>
    <section><h2>Register as a coach now!</h2></section>
    <CoachForm @save-data="saveData" />
  </base-card>
</template>

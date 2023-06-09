<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCoachStore } from '@/stores/coaches/coaches.js'
import CoachItem from '../../components/coaches/CoachItem.vue'
import CoachFilterVue from '../../components/coaches/CoachFilter.vue'
import { useAuthStore } from '@/stores/auth/auth'

const coachesStore = useCoachStore()
const { isLoggedIn } = storeToRefs(useAuthStore())

const { loadCoaches } = coachesStore
const { coaches, isLoading, isCoach, hasCoaches, error } = storeToRefs(coachesStore)

loadCoaches()

const activeFilters = ref({ frontend: true, backend: true, career: true })

const setFilters = (updatedFilters) => {
  activeFilters.value = updatedFilters
}

const filteredCoaches = computed(() =>
  coaches.value.filter((coach) => {
    if (activeFilters.value.frontend && coach.areas.includes('frontend')) return true
    if (activeFilters.value.backend && coach.areas.includes('backend')) return true
    if (activeFilters.value.career && coach.areas.includes('career')) return true
    return false
  })
)

const errorHandler = () => (error.value = null)
</script>

<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="errorHandler">
      <p>{{ error }}</p>
    </base-dialog>
    <section><CoachFilterVue @change-filter="setFilters" /></section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches(true)">Refresh</base-button>
        <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
          >Login to Register as a coach</base-button
        >
        <base-button v-if="isLoggedIn && !isLoading && !isCoach" link to="/register"
          >Register as a coach</base-button
        >
      </div>
      <div v-if="isLoading"><base-spinner></base-spinner></div>
      <ul v-else-if="hasCoaches">
        <CoachItem
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        />
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

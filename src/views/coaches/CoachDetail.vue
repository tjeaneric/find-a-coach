<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useCoachStore } from '../../stores/coaches/coaches'
import { storeToRefs } from 'pinia'

const { coaches } = storeToRefs(useCoachStore())
const selectedCoach = () => coaches.value.find((c) => c.id === props.id)
const props = defineProps(['id'])
const route = useRoute()
const contactLink = computed(() => route.path + '/contact')
const coach = selectedCoach()
const fullName = computed(() => coach.firstName + ' ' + coach.lastName)
</script>

<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ coach.hourlyRate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <header>
      <base-card>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </base-card>
    </header>
  </section>
  <RouterView />
  <section>
    <base-card>
      <base-badge v-for="area in coach.areas" :key="area" :type="area" :title="area"></base-badge>
      <p>{{ coach.description }}</p>
    </base-card>
  </section>
</template>

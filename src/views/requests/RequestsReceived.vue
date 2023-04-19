<script setup>
import { useRequestStore } from '../../stores/requests/requests.js'
import RequestItem from '../../components/requests/RequestItem.vue'

const requestStore = useRequestStore()
const { hasRequests, filteredRequests } = requestStore
</script>

<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
        <ul v-if="hasRequests">
          <RequestItem
            v-for="req in filteredRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          />
        </ul>
        <h3 v-else>You haven't received any requests yet!</h3>
      </header>
    </base-card>
  </section>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>

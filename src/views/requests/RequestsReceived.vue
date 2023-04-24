<script setup>
import { useRequestStore } from '@/stores/requests/requests.js'
import RequestItem from '../../components/requests/RequestItem.vue'
import { storeToRefs } from 'pinia'

const requestStore = useRequestStore()
const { hasRequests, filteredRequests, isLoading, error } = storeToRefs(requestStore)
const { loadRequests } = requestStore

loadRequests()
const errorHandler = () => (error.value = null)
</script>

<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="errorHandler">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
          <base-spinner v-if="isLoading"></base-spinner>
          <ul v-else-if="hasRequests">
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
  </div>
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

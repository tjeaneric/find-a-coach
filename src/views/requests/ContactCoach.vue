<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRequestStore } from '../../stores/requests/requests.js'

const requestStore = useRequestStore()
const { addRequest } = requestStore
const route = useRoute()
const router = useRouter()

const email = ref({ val: '', isValid: true })
const message = ref({ val: '', isValid: true })
const formIsValid = ref(true)

const validateForm = () => {
  formIsValid.value = true

  if (email.value.val === '' || !email.value.val.includes('@')) {
    email.value.isValid = false
    formIsValid.value = false
  }

  if (message.value.val === '') {
    message.value.isValid = false
    formIsValid.value = false
  }
}

const submitForm = () => {
  validateForm()

  if (!formIsValid.value) return
  const formData = {
    coachId: route.params.id,
    email: email.value.val,
    message: message.value.val
  }

  addRequest(formData)
  router.replace('/coaches')
}
</script>
<template>
  <section>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">Your E-mail</label>
          <input type="email" name="" id="email" v-model="email.val" />
        </div>
        <div class="form-control">
          <label for="message">Message </label>
          <textarea name="" id="message" cols="30" rows="5" v-model="message.val"></textarea>
        </div>
        <p class="errors" v-if="!formIsValid">Please enter a valid email and a non-empty message</p>
        <div class="actions">
          <base-button>Send Message</base-button>
        </div>
      </form>
    </base-card>
  </section>
</template>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth/auth.js'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { signup, login } = authStore
const { isLoading, error } = storeToRefs(authStore)

const email = ref('')
const password = ref('')
const formIsValid = ref(true)
const mode = ref('login')

const submitForm = () => {
  formIsValid.value = true
  if (email.value === '' || !email.value.includes('@') || password.value.length < 6) {
    formIsValid.value = false
    return
  }

  const authData = { email: email.value, password: password.value }

  if (mode.value == 'login') {
    login(authData)
  } else {
    signup(authData)
  }
}
const switchAuthMode = () => {
  if (mode.value === 'login') {
    mode.value = 'signup'
  } else {
    mode.value = 'login'
  }
}

const submitButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return 'Login'
  } else {
    return 'Signup'
  }
})

const switchModeButtonCaption = computed(() => {
  if (mode.value === 'login') {
    return 'Signup instead'
  } else {
    return 'Login instead'
  }
})

const errorHandler = () => (error.value = null)
</script>

<template>
  <div>
    <base-dialog :show="!!error" title="An error occured" @close="errorHandler"
      ><p>{{ error }}</p></base-dialog
    >
    <base-dialog :show="isLoading" fixed title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" name="" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters long)
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<style scoped>
form {
  margin: 1rem;
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
</style>

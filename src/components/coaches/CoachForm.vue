<script setup>
import { ref } from 'vue'
const emit = defineEmits(['save-data'])

const firstName = ref({ val: '', isValid: true })
const lastName = ref({ val: '', isValid: true })
const description = ref({ val: '', isValid: true })
const rate = ref({ val: null, isValid: true })
const areas = ref({ val: [], isValid: true })
const formIsValid = ref(true)

const clearValidity = (input) => {
  input.isValid = true
}

const validateForm = () => {
  formIsValid.value = true

  if (firstName.value.val === '') {
    firstName.value.isValid = false
    formIsValid.value = false
  }

  if (lastName.value.val === '') {
    lastName.value.isValid = false
    formIsValid.value = false
  }

  if (description.value.val === '') {
    description.value.isValid = false
    formIsValid.value = false
  }

  if (!rate.value.val || rate.value.val < 0) {
    rate.value.isValid = false
    formIsValid.value = false
  }

  if (areas.value.val.length === 0) {
    areas.value.isValid = false
    formIsValid.value = false
  }
}

const submitForm = () => {
  validateForm()

  if (!formIsValid.value) return
  const formData = {
    first: firstName.value.val,
    last: lastName.value.val,
    desc: description.value.val,
    rate: rate.value.val,
    areas: areas.value.val
  }
  emit('save-data', formData)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">First name</label>
      <input
        type="text"
        name=""
        id="firstname"
        v-model.trim="firstName.val"
        @blur="clearValidity(firstName)"
      />
      <p v-if="!firstName.isValid">First name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Last name</label>
      <input
        type="text"
        name=""
        id="lastname"
        v-model.trim="lastName.val"
        @blur="clearValidity(lastName)"
      />
      <p v-if="!lastName.isValid">Last name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        name=""
        id="description"
        cols="30"
        rows="10"
        v-model.trim="description.val"
        @blur="clearValidity(description)"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        name=""
        id="rate"
        v-model.number="rate.val"
        @blur="clearValidity(rate)"
      />
      <p v-if="!rate.isValid">Rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          value="frontend"
          id="frontend"
          v-model="areas.val"
          @blur="clearValidity(areas)"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="backend"
          id="backend"
          v-model="areas.val"
          @blur="clearValidity(areas)"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          value="career"
          id="career"
          v-model="areas.val"
          @blur="clearValidity(areas)"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and register again</p>
    <base-button>Register</base-button>
  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>

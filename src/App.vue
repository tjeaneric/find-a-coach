<script setup>
import { RouterView, useRouter } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'
import { useAuthStore } from '@/stores/auth/auth'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const { autoLogin } = useAuthStore()
const { didAutoLogout } = storeToRefs(useAuthStore())

autoLogin()
watch(didAutoLogout, (curVal, oldVal) => {
  if (curVal && curVal !== oldVal) {
    router.replace('/coaches')
  }
})
</script>

<template>
  <TheHeader />
  <router-view v-slot="SlotProps">
    <transition name="route" mode="out-in">
      <component :is="SlotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

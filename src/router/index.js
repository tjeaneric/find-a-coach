import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from '../views/coaches/CoachesList.vue'
import CoachDetail from '../views/coaches/CoachDetail.vue'
import CoachRegistration from '../views/coaches/CoachRegistration.vue'
import ContactCoach from '../views/requests/ContactCoach.vue'
import RequestsReceived from '../views/requests/RequestsReceived.vue'
import UserAuth from '../views/auth/UserAuth.vue'
import NotFound from '../views/NotFound.vue'
import { useAuthStore } from '@/stores/auth/auth'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },
    {
      path: '/coaches',
      name: 'coaches',
      component: CoachesList
    },
    {
      path: '/coaches/:id',
      name: 'coach',
      component: CoachDetail,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: CoachRegistration,
      meta: { requiresAuth: true }
    },
    {
      path: '/requests',
      name: 'request',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: UserAuth,
      meta: { requiresUnauth: true }
    },
    {
      path: '/:notFound(.*)*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, _, next) => {
  const { isLoggedIn } = storeToRefs(useAuthStore())

  if (to.meta.requiresAuth && !isLoggedIn.value) next('/auth')
  else if (to.meta.requiresUnauth && isLoggedIn.value) next('/coaches')
  else next()
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import CoachesList from '../views/coaches/CoachesList.vue'
import CoachDetail from '../views/coaches/CoachDetail.vue'
import CoachRegistration from '../views/coaches/CoachRegistration.vue'
import ContactCoach from '../views/requests/ContactCoach.vue'
import RequestsReceived from '../views/requests/RequestsReceived.vue'
import NotFound from '../views/NotFound.vue'

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
      component: CoachRegistration
    },
    {
      path: '/requests',
      name: 'request',
      component: RequestsReceived
    },
    {
      path: '/:notFound(.*)*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

export default router

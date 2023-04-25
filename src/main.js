import { createApp, defineAsyncComponent } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseBadge from './components/ui/BaseBadge.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
// import BaseDialog from './components/ui/BaseDialog.vue'

const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'))

const app = createApp(App)

app.use(createPinia())
app.use(router)
app
  .component('base-card', BaseCard)
  .component('base-button', BaseButton)
  .component('base-badge', BaseBadge)
  .component('base-spinner', BaseSpinner)
  .component('base-dialog', BaseDialog)

app.mount('#app')

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import './css/main.css'
import { config } from './utils/config'

/* Fetch sample data */
// store.dispatch('fetchClients')
store.dispatch('fetchLocation')
store.dispatch('fetchWorkingForm')

/* Default title tag */
const defaultDocumentTitle = config.defaultTitle

/* Collapse mobile aside menu on route change & set document title from route meta */
router.beforeEach(to => {
  store.dispatch('asideMobileToggle', false)
  store.dispatch('asideLgToggle', false)

  store.dispatch('formScreenToggle', !!to.meta.formScreen)
})

router.afterEach(to => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }
})

createApp(App).use(store).use(router).mount('#app')

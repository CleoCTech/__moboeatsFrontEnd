import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './axios'
import './style.css'

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
    // store.commit('SET_TOKEN', localStorage.getItem('token'))
    // store.commit('SET_USER', JSON.parse(localStorage.getItem('user')))

})
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')

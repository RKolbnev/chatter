import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './sass/font-awesome-4.7.0/scss/font-awesome.scss'
import './sass/main.sass'

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')

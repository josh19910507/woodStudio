import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import './assets/styles.css'
import App from './App.vue'
import router from '../router'
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap Bundle JS（含 Popper）
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const head = createHead()
createApp(App).use(router,head).mount('#app')

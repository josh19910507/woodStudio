import { createApp } from 'vue'
import './assets/styles.css'
import App from './App.vue'
import router from '../router'
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap Bundle JS（含 Popper）
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
createApp(App).use(router).mount('#app')

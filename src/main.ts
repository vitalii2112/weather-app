import './assets/base.css'
import 'vue-toast-notification/dist/theme-sugar.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ToastPlugin from 'vue-toast-notification'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const app = createApp(App)

app.use(createPinia())
app.use(ToastPlugin)

app.mount('#app')

import './assets/main.css'
import 'vue-final-modal/style.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css'

import App from './App.vue'
import router from './router'
import VueDragscroll from "vue-dragscroll";
import { createVfm } from 'vue-final-modal'


const app = createApp(App)
const vfm = createVfm()


app.use(VueDragscroll);
app.use(createPinia())
app.use(router)
app.use(PrimeVue);
app.use(vfm)

app.mount('#app')

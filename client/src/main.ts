import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-green/theme.css'
// import 'primevue/resources/themes/vela-orange/theme.css'
// import 'primevue/resources/themes/arya-orange/theme.css'

import App from './App.vue'
import router from './router'
import VueDragscroll from "vue-dragscroll";

const app = createApp(App)

app.use(VueDragscroll);
app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')

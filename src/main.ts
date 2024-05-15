import { createApp } from 'vue'
import './assets/styles/main.scss'
import App from './App.vue'
import router from './services/router';
import {createPinia} from 'pinia';

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')

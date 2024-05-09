import { createApp } from 'vue'
import './assets/styles/main.scss'
import App from './App.vue'
import router from './services/router';

createApp(App)
  .use(router)
  .mount('#app')

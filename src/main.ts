import { createApp } from 'vue'
import './assets/styles/main.scss'
import App from './App.vue'
import router from './services/router';
import {createPinia} from 'pinia';
import { plugin as formKitPlugin, defaultConfig as formKitDefaultConfig} from '@formkit/vue';

createApp(App)
  .use(createPinia())
  .use(router)
  .use(formKitPlugin, formKitDefaultConfig)
  .mount('#app')

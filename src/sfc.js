import { createApp } from 'vue'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import RefTemplate from './components/RefTemplate.vue'

const counter = createApp(RefTemplate);
counter.mount('#app');
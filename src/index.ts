import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './index.css';
import App from './ui/App.vue';


const app = createApp(App);

app.use(createPinia());
app.mount('#app');
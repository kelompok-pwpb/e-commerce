import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap-icons/font/bootstrap-icons.css"

const app = createApp(App)

app.use(router)
app.mount('#app')

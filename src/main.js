import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia  from './stores'

import "normalize.css" //不需要使用，单纯的引入就好
import "./assets/css/index.css"



// import './assets/main.css'

const app = createApp(App)

app.use(router),
app.use(pinia),

app.mount('#app')

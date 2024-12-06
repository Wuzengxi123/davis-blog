import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// import initMock from '../mock'
// // 导入mock数据
// if (import.meta.env.MODE != 'production') {
//     // 开发环境逻辑
//     initMock() 
// }
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

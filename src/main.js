import './assets/main.css'
import 'vant/lib/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initStorage } from './services/storage'
import { articles as initialArticles } from './data/blog'
import {
  Button,
  NavBar,
  Search,
  Tab,
  Tabs,
  List,
  PullRefresh,
  Image as VanImage,
  Icon,
  Tag,
  Toast,
  Popup,
  Cell,
  CellGroup,
  Grid,
  GridItem
} from 'vant'

// 导入mock数据
import './mock/blog'

import App from './App.vue'
import router from './router'

// 初始化本地存储
initStorage(initialArticles)

const app = createApp(App)

// 注册Vant组件
app.use(Button)
app.use(NavBar)
app.use(Search)
app.use(Tab)
app.use(Tabs)
app.use(List)
app.use(PullRefresh)
app.use(VanImage)
app.use(Icon)
app.use(Tag)
app.use(Toast)
app.use(Popup)
app.use(Cell)
app.use(CellGroup)
app.use(Grid)
app.use(GridItem)

app.use(createPinia())
app.use(router)
app.mount('#app')

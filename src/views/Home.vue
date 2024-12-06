<template>
  <div class="blog-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="Davis Blog"
      :left-arrow="false"
      :left-text="null"
      fixed
      placeholder
    >
      <template #left>
        <van-icon name="user-o" size="18" @click="showProfile = true" />
      </template>
      <template #right>
        <van-icon name="search" size="18" @click="showSearch = true" />
      </template>
    </van-nav-bar>

    <!-- 搜索弹出层 -->
    <van-popup
      v-model:show="showSearch"
      position="top"
      :style="{ height: '100%' }"
    >
      <van-search
        v-model="searchText"
        show-action
        placeholder="搜索文章"
        @search="onSearch(searchText)"
        @cancel="clearSearch"
      >
        <template #action>
          <div @click="clearSearch">取消</div>
        </template>
      </van-search>
      
      <div class="search-history" v-if="searchHistory.length && !searchText">
        <van-cell-group>
          <van-cell title="搜索历史">
            <template #right-icon>
              <van-icon name="delete-o" @click="clearHistory" />
            </template>
          </van-cell>
          <van-cell 
            v-for="item in searchHistory" 
            :key="item"
            :title="item"
            @click="onHistoryClick(item)"
          >
            <template #right-icon>
              <van-icon name="cross" @click.stop="removeHistory(item)" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </van-popup>

    <!-- 文章分类标签 -->
    <van-tabs v-model:active="activeTab" sticky animated swipeable>
      <van-tab title="全部">
        <article-list :articles="articles" />
      </van-tab>
      <van-tab title="技术">
        <article-list :articles="articles.filter(a => a.category === '技术')" />
      </van-tab>
      <van-tab title="生活">
        <article-list :articles="articles.filter(a => a.category === '生活')" />
      </van-tab>
      <van-tab title="随笔">
        <article-list :articles="articles.filter(a => a.category === '随笔')" />
      </van-tab>
    </van-tabs>

    <!-- 个人信息抽屉 -->
    <profile-drawer 
      :show="showProfile"
      @update:show="showProfile = $event"
    />

    <!-- 悬浮写作按钮 -->
    <van-button 
      class="fab-button" 
      icon="edit" 
      type="primary" 
      round
      @click="onWrite"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ArticleList from '../components/ArticleList.vue'
import ProfileDrawer from '../components/ProfileDrawer.vue'

const router = useRouter()
const showSearch = ref(false)
const showProfile = ref(false)
const searchText = ref('')
const searchHistory = ref([])
const activeTab = ref(0)

// 文章数据
const articles = ref([
  // 生活类文章
  {
    id: Date.now() - 21000,
    title: "咖啡入门指南",
    content: "分享我的咖啡探索之旅，从最初的速溶咖啡到现在的手冲咖啡。介绍不同咖啡豆的特点、烘焙程度、冲泡方法，以及如何品鉴一杯好咖啡。",
    author: "Davis",
    date: "2024-01-20",
    category: "生活",
    tags: ["咖啡", "生活品质", "美食"],
    cover: "https://picsum.photos/800/400?random=41"
  },
  {
    id: Date.now() - 22000,
    title: "居家办公环境布置",
    content: "如何打造一个舒适高效的居家办公环境，包括桌椅选择、灯光布置、设备配置等方面的经验分享，让工作和生活更加平衡。",
    author: "Davis",
    date: "2024-01-19",
    category: "生活",
    tags: ["居家办公", "生活空间", "效率"],
    cover: "https://picsum.photos/800/400?random=42"
  },
  {
    id: Date.now() - 23000,
    title: "极简主义生活实践",
    content: "分享我践行极简主义的心得体会，如何通过断舍离整理物品、简化日常事务，让生活变得更加轻松自在。",
    author: "Davis",
    date: "2024-01-18",
    category: "生活",
    tags: ["极简主义", "生活方式", "整理收纳"],
    cover: "https://picsum.photos/800/400?random=43"
  },
  {
    id: Date.now() - 24000,
    title: "城市摄影技巧",
    content: "分享我在城市摄影中的一些心得，包括构图技巧、光线运用、后期处理等，以及如何捕捉城市中的精彩瞬间。",
    author: "Davis",
    date: "2024-01-17",
    category: "生活",
    tags: ["摄影", "城市", "艺术"],
    cover: "https://picsum.photos/800/400?random=44"
  },
  {
    id: Date.now() - 25000,
    title: "健康饮食日记",
    content: "记录我的健康饮食之路，分享一些简单美味的健康食谱，以及如何在忙碌的工作中保持健康的饮食习惯。",
    author: "Davis",
    date: "2024-01-16",
    category: "生活",
    tags: ["健康", "美食", "生活方式"],
    cover: "https://picsum.photos/800/400?random=45"
  },
  {
    id: Date.now() - 26000,
    title: "户外徒步攻略",
    content: "分享一些周末徒步的经验，包括路线选择、装备准备、体能训练等，让更多人能够享受到徒步运动的乐趣。",
    author: "Davis",
    date: "2024-01-15",
    category: "生活",
    tags: ["徒步", "运动", "户外"],
    cover: "https://picsum.photos/800/400?random=46"
  },
  {
    id: Date.now() - 27000,
    title: "阅读与思考",
    content: "分享我最近读过的一些好书，以及阅读过程中的思考和感悟，探讨如何通过阅读提升自己的认知和见识。",
    author: "Davis",
    date: "2024-01-14",
    category: "生活",
    tags: ["阅读", "思考", "成长"],
    cover: "https://picsum.photos/800/400?random=47"
  },
  {
    id: Date.now() - 28000,
    title: "城市探店记",
    content: "记录在城市中发现的一些有特色的小店，包括咖啡馆、书店、文创店等，分享它们独特的魅力和故事。",
    author: "Davis",
    date: "2024-01-13",
    category: "生活",
    tags: ["探店", "城市生活", "美食"],
    cover: "https://picsum.photos/800/400?random=48"
  },
  {
    id: Date.now() - 29000,
    title: "生活中的仪式感",
    content: "探讨如何在平凡的生活中创造仪式感，让每一天都变得特别而美好，享受生活中的小确幸。",
    author: "Davis",
    date: "2024-01-12",
    category: "生活",
    tags: ["仪式感", "生活态度", "幸福"],
    cover: "https://picsum.photos/800/400?random=49"
  },
  {
    id: Date.now() - 30000,
    title: "植物养护笔记",
    content: "分享我在养护室内植物过程中的经验和教训，包括不同植物的养护要点、常见问题解决方法等。",
    author: "Davis",
    date: "2024-01-11",
    category: "生活",
    tags: ["植物", "园艺", "家居"],
    cover: "https://picsum.photos/800/400?random=50"
  },

  // 随笔类文章
  {
    id: Date.now() - 31000,
    title: "程序员的修行之路",
    content: "回顾我的编程学习历程，分享在技术成长过程中的思考和感悟，以及对未来技术发展的一些思考。",
    author: "Davis",
    date: "2024-01-10",
    category: "随笔",
    tags: ["成长", "思考", "技术人生"],
    cover: "https://picsum.photos/800/400?random=51"
  },
  {
    id: Date.now() - 32000,
    title: "关于效率与专注",
    content: "探讨在信息爆炸的时代如何保持专注和提高效率，分享一些个人的实践经验和思考。",
    author: "Davis",
    date: "2024-01-09",
    category: "随笔",
    tags: ["效率", "专注", "时间管理"],
    cover: "https://picsum.photos/800/400?random=52"
  },
  {
    id: Date.now() - 33000,
    title: "创意与灵感",
    content: "分享如何在日常生活中捕捉创意灵感，以及将这些灵感转化为实际项目的过程和方法。",
    author: "Davis",
    date: "2024-01-08",
    category: "随笔",
    tags: ["创意", "灵感", "设计思维"],
    cover: "https://picsum.photos/800/400?random=53"
  },
  {
    id: Date.now() - 34000,
    title: "数字时代的简单生活",
    content: "思考如何在数字化时代保持生活的简单和纯粹，避免被技术所困扰，找到适合自己的生活节奏。",
    author: "Davis",
    date: "2024-01-07",
    category: "随笔",
    tags: ["生活方式", "数字时代", "平衡"],
    cover: "https://picsum.photos/800/400?random=54"
  },
  {
    id: Date.now() - 35000,
    title: "工作与理想",
    content: "探讨在职业发展中如何平衡现实与理想，以及在追求梦想的过程中保持初心的重要性。",
    author: "Davis",
    date: "2024-01-06",
    category: "随笔",
    tags: ["职业发展", "理想", "成长"],
    cover: "https://picsum.photos/800/400?random=55"
  },
  {
    id: Date.now() - 36000,
    title: "关于学习的思考",
    content: "分享对终身学习的理解，以及如何在快速变化的时代保持学习的动力和持续性。",
    author: "Davis",
    date: "2024-01-05",
    category: "随笔",
    tags: ["学习", "成长", "思考"],
    cover: "https://picsum.photos/800/400?random=56"
  },
  {
    id: Date.now() - 37000,
    title: "城市漫步随想",
    content: "记录在城市漫步时的所见所闻，以及对城市生活、人文风景的一些思考和感悟。",
    author: "Davis",
    date: "2024-01-04",
    category: "随笔",
    tags: ["城市", "观察", "思考"],
    cover: "https://picsum.photos/800/400?random=57"
  },
  {
    id: Date.now() - 38000,
    title: "科技与人文",
    content: "探讨科技发展与人文精神的关系，思考如何在技术进步中保持人性的温度。",
    author: "Davis",
    date: "2024-01-03",
    category: "随笔",
    tags: ["科技", "人文", "思考"],
    cover: "https://picsum.photos/800/400?random=58"
  },
  {
    id: Date.now() - 39000,
    title: "生活的节奏",
    content: "思考如何在快节奏的生活中找到属于自己的节奏，保持内心的平静和生活的质量。",
    author: "Davis",
    date: "2024-01-02",
    category: "随笔",
    tags: ["生活节奏", "平衡", "心灵"],
    cover: "https://picsum.photos/800/400?random=59"
  },
  {
    id: Date.now() - 40000,
    title: "未来的可能性",
    content: "探讨技术发展带来的未来可能性，以及我们应该如何准备和适应这些变化。",
    author: "Davis",
    date: "2024-01-01",
    category: "随笔",
    tags: ["未来", "思考", "变革"],
    cover: "https://picsum.photos/800/400?random=60"
  },
  // 原有的技术文章保持不变
  {
    id: Date.now() - 1000,
    title: "Next.js 13 新特性解析",
    content: "深入探讨 Next.js 13 的新特性，包括 App Router、Server Components、Streaming 等，以及如何在实际项目中应用这些特性来提升应用性能和开发体验。",
    author: "Davis",
    date: "2024-01-20",
    category: "技术",
    tags: ["Next.js", "React", "SSR"],
    cover: "https://picsum.photos/800/400?random=21"
  },
  {
    id: Date.now() - 2000,
    title: "Svelte 4.0 开发实践",
    content: "探索 Svelte 4.0 的新功能和改进，包括性能优化、TypeScript 支持增强等。分享在实际项目中使用 Svelte 的经验和最佳实践。",
    author: "Davis",
    date: "2024-01-19",
    category: "技术",
    tags: ["Svelte", "前端框架", "响应式"],
    cover: "https://picsum.photos/800/400?random=22"
  },
  {
    id: Date.now() - 3000,
    title: "Web3 前端开发入门",
    content: "介绍 Web3 前端开发的基础知识，包括与区块链交互、智能合约集成、钱包连接等。探讨如何构建去中心化应用的用户界面。",
    author: "Davis",
    date: "2024-01-18",
    category: "技术",
    tags: ["Web3", "区块链", "DApp"],
    cover: "https://picsum.photos/800/400?random=23"
  },
  {
    id: Date.now() - 4000,
    title: "前端动画性能优化",
    content: "深入研究前端动画性能优化技巧，包括 CSS 动画、JavaScript 动画的性能对比，以及如何使用 requestAnimationFrame 和 Web Animations API。",
    author: "Davis",
    date: "2024-01-17",
    category: "技术",
    tags: ["动画", "性能优化", "CSS"],
    cover: "https://picsum.photos/800/400?random=24"
  },
  {
    id: Date.now() - 5000,
    title: "前端架构设计模式",
    content: "探讨前端架构中常用的设计模式，包括 MVVM、Flux、观察者模式等，以及它们在现代前端框架中的应用。",
    author: "Davis",
    date: "2024-01-16",
    category: "技术",
    tags: ["架构", "设计模式", "最佳实践"],
    cover: "https://picsum.photos/800/400?random=25"
  },
  {
    id: Date.now() - 6000,
    title: "WebGL 3D 可视化实践",
    content: "分享使用 WebGL 进行 3D 可视化开发的经验，包括 Three.js 的使用、性能优化、交互设计等方面的实践总结。",
    author: "Davis",
    date: "2024-01-15",
    category: "技术",
    tags: ["WebGL", "Three.js", "可视化"],
    cover: "https://picsum.photos/800/400?random=26"
  },
  {
    id: Date.now() - 7000,
    title: "前端代码重构技巧",
    content: "分享前端代码重构的实用技巧，包括如何识别代码异味、提取公共组件、优化代码结构等，提高代码的可维护性和可读性。",
    author: "Davis",
    date: "2024-01-14",
    category: "技术",
    tags: ["重构", "代码质量", "最佳实践"],
    cover: "https://picsum.photos/800/400?random=27"
  },
  {
    id: Date.now() - 8000,
    title: "前端数据可视化方案",
    content: "对比主流的数据可视化库（D3.js、ECharts、Chart.js等），分析它们的特点和适用场景，帮助选择合适的可视化方案。",
    author: "Davis",
    date: "2024-01-13",
    category: "技术",
    tags: ["数据可视化", "图表", "D3.js"],
    cover: "https://picsum.photos/800/400?random=28"
  },
  {
    id: Date.now() - 9000,
    title: "Rust + WebAssembly 实战",
    content: "探索使用 Rust 开发 WebAssembly 模块的实践，包括开发环境搭建、性能优化、与 JavaScript 交互等方面的经验分享。",
    author: "Davis",
    date: "2024-01-12",
    category: "技术",
    tags: ["Rust", "WebAssembly", "性能优化"],
    cover: "https://picsum.photos/800/400?random=29"
  },
  {
    id: Date.now() - 10000,
    title: "前端日志监控系统",
    content: "介绍如何构建前端日志监控系统，包括错误捕获、性能监控、用户行为分析等功能的实现方案。",
    author: "Davis",
    date: "2024-01-11",
    category: "技术",
    tags: ["监控", "日志", "错误处理"],
    cover: "https://picsum.photos/800/400?random=30"
  },
  {
    id: Date.now() - 11000,
    title: "Web 音视频处理技术",
    content: "探讨 Web 端音视频处理技术，包括 WebRTC、MediaRecorder API、音视频编解码等相关知识和实践经验。",
    author: "Davis",
    date: "2024-01-10",
    category: "技术",
    tags: ["音视频", "WebRTC", "多媒体"],
    cover: "https://picsum.photos/800/400?random=31"
  },
  {
    id: Date.now() - 12000,
    title: "前端微服务实践",
    content: "分享前端微服务架构的实践经验，包括模块拆分、通信机制、部署策略等方面的考虑和解决方案。",
    author: "Davis",
    date: "2024-01-09",
    category: "技术",
    tags: ["微服务", "架构设计", "模块化"],
    cover: "https://picsum.photos/800/400?random=32"
  },
  {
    id: Date.now() - 13000,
    title: "Web 手势识别与交互",
    content: "探讨 Web 端手势识别和交互设计，包括触摸事件处理、手势库使用、交互动效实现等方面的技术要点。",
    author: "Davis",
    date: "2024-01-08",
    category: "技术",
    tags: ["交互设计", "手势识别", "用户体验"],
    cover: "https://picsum.photos/800/400?random=33"
  },
  {
    id: Date.now() - 14000,
    title: "前端构建优化策略",
    content: "分享前端构建过程优化的策略，包括构建速度优化、产物体积优化、缓存利用等方面的实践经验。",
    author: "Davis",
    date: "2024-01-07",
    category: "技术",
    tags: ["构建优化", "性能优化", "工程化"],
    cover: "https://picsum.photos/800/400?random=34"
  },
  {
    id: Date.now() - 15000,
    title: "Web 无障碍开发指南",
    content: "介绍 Web 无障碍开发的原则和实践，包括 ARIA 属性使用、键盘导航、屏幕阅读器支持等方面的开发技巧。",
    author: "Davis",
    date: "2024-01-06",
    category: "技术",
    tags: ["无障碍", "可访问性", "用户体验"],
    cover: "https://picsum.photos/800/400?random=35"
  },
  {
    id: Date.now() - 16000,
    title: "前端智能化实践",
    content: "探讨 AI 在前端开发中的应用，包括智能代码补全、自动化测试、智能组件推荐等方面的实践案例。",
    author: "Davis",
    date: "2024-01-05",
    category: "技术",
    tags: ["AI", "智能化", "开发效率"],
    cover: "https://picsum.photos/800/400?random=36"
  },
  {
    id: Date.now() - 17000,
    title: "Web 实时通信技术",
    content: "介绍 Web 实时通信技术的应用，包括 WebSocket、SSE、WebRTC 等技术的使用场景和实现方案。",
    author: "Davis",
    date: "2024-01-04",
    category: "技术",
    tags: ["实时通信", "WebSocket", "即时消息"],
    cover: "https://picsum.photos/800/400?random=37"
  },
  {
    id: Date.now() - 18000,
    title: "前端代码自动化测试",
    content: "分享前端自动化测试的实践经验，包括单元测试、集成测试、E2E测试的工具选择和最佳实践。",
    author: "Davis",
    date: "2024-01-03",
    category: "技术",
    tags: ["测试", "自动化", "质量保证"],
    cover: "https://picsum.photos/800/400?random=38"
  },
  {
    id: Date.now() - 19000,
    title: "跨平台应用开发实践",
    content: "探讨使用 React Native、Flutter 等技术进行跨平台应用开发的经验，包括性能优化、原生集成等方面的实践。",
    author: "Davis",
    date: "2024-01-02",
    category: "技术",
    tags: ["跨平台", "移动开发", "React Native"],
    cover: "https://picsum.photos/800/400?random=39"
  },
  {
    id: Date.now() - 20000,
    title: "前端低代码平台设计",
    content: "分享前端低代码平台的设计思路和实现方案，包括可视化编辑器、组件系统、代码生成等核心功能的开发经验。",
    author: "Davis",
    date: "2024-01-01",
    category: "技术",
    tags: ["低代码", "可视化搭建", "效率工具"],
    cover: "https://picsum.photos/800/400?random=40"
  }
])

// 在组件挂载时将文章数据存储到 localStorage
onMounted(() => {
  localStorage.setItem('articles', JSON.stringify(articles.value))
})

// 搜索文章
const onSearch = (text) => {
  if (!text) return
  if (!searchHistory.value.includes(text)) {
    searchHistory.value.unshift(text)
  }
  showSearch.value = false
}

// 清空搜索
const clearSearch = () => {
  searchText.value = ''
  showSearch.value = false
}

// 点击历史记录
const onHistoryClick = (text) => {
  searchText.value = text
  onSearch(text)
}

// 移除历史记录
const removeHistory = (text) => {
  const index = searchHistory.value.indexOf(text)
  if (index !== -1) {
    searchHistory.value.splice(index, 1)
  }
}

// 清空历史记录
const clearHistory = () => {
  searchHistory.value = []
}

// 写文章
const onWrite = () => {
  router.push({ name: 'BlogEdit' })
}
</script>

<style scoped>
.blog-container {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.fab-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 48px;
  height: 48px;
  padding: 0;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.search-history {
  margin-top: 8px;
}

:deep(.van-search__action) {
  padding: 0 16px;
  color: #1989fa;
  font-size: 14px;
}

:deep(.van-tabs__wrap) {
  border-bottom: 1px solid #ebedf0;
}

:deep(.van-nav-bar) {
  background-color: #fff;
}

:deep(.van-nav-bar__title) {
  font-weight: bold;
  color: #323233;
}

:deep(.van-icon) {
  color: #323233;
}
</style>

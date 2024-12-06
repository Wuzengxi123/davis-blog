const STORAGE_KEY = 'davis_blog_articles'

// 获取所有文章
export const getArticles = () => {
  const articles = localStorage.getItem(STORAGE_KEY)
  return articles ? JSON.parse(articles) : []
}

// 保存所有文章
export const saveArticles = (articles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
}

// 获取单篇文章
export const getArticle = (id) => {
  const articles = getArticles()
  return articles.find(article => article.id === id)
}

// 保存单篇文章
export const saveArticle = (article) => {
  const articles = getArticles()
  const index = articles.findIndex(item => item.id === article.id)
  
  if (index !== -1) {
    // 更新现有文章
    articles[index] = article
  } else {
    // 添加新文章
    article.id = Date.now() // 使用时间戳作为ID
    articles.unshift(article)
  }
  
  saveArticles(articles)
  return article
}

// 删除文章
export const deleteArticle = (id) => {
  const articles = getArticles()
  const index = articles.findIndex(item => item.id === id)
  
  if (index !== -1) {
    articles.splice(index, 1)
    saveArticles(articles)
    return true
  }
  return false
}

// 初始化本地存储
export const initStorage = (initialArticles) => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    const defaultArticles = [
      {
        id: Date.now() - 1000,
        title: "Vue3 组合式 API 最佳实践",
        content: "组合式 API 是 Vue3 中引入的新特性，它提供了一种更灵活的方式来组织组件逻辑。本文将介绍组合式 API 的核心概念和最佳实践，包括 setup 函数、响应式引用、计算属性和生命周期钩子等。",
        author: "Davis",
        date: "2024-01-20",
        category: "技术",
        tags: ["Vue3", "组合式API", "前端开发"],
        cover: "https://picsum.photos/800/400?random=1"
      },
      {
        id: Date.now() - 2000,
        title: "React Hooks 深入浅出",
        content: "React Hooks 让函数组件也能使用状态和其他 React 特性。本文将详细讲解 useState、useEffect、useContext 等常用 Hooks 的使用方法和注意事项。",
        author: "Davis",
        date: "2024-01-19",
        category: "技术",
        tags: ["React", "Hooks", "前端框架"],
        cover: "https://picsum.photos/800/400?random=2"
      },
      {
        id: Date.now() - 3000,
        title: "TypeScript 高级类型系统详解",
        content: "TypeScript 的类型系统非常强大，本文将深入探讨泛型、联合类型、交叉类型、条件类型等高级特性，帮助你更好地利用 TypeScript 提高代码质量。",
        author: "Davis",
        date: "2024-01-18",
        category: "技术",
        tags: ["TypeScript", "前端开发", "类型系统"],
        cover: "https://picsum.photos/800/400?random=3"
      },
      {
        id: Date.now() - 4000,
        title: "现代 CSS 布局技巧",
        content: "介绍 Flexbox 和 Grid 布局系统的高级用法，以及如何结合 CSS 变量和媒体查询创建响应式布局。同时探讨 CSS 新特性如容器查询等。",
        author: "Davis",
        date: "2024-01-17",
        category: "技术",
        tags: ["CSS", "布局", "响应式设计"],
        cover: "https://picsum.photos/800/400?random=4"
      },
      {
        id: Date.now() - 5000,
        title: "前端性能优化实战指南",
        content: "探讨前端性能优化的各个方面，包括资源加载优化、代码分割、懒加载、缓存策略、图片优化等，帮助你构建高性能的 Web 应用。",
        author: "Davis",
        date: "2024-01-16",
        category: "技术",
        tags: ["性能优化", "前端开发", "最佳实践"],
        cover: "https://picsum.photos/800/400?random=5"
      },
      {
        id: Date.now() - 6000,
        title: "微前端架构实践",
        content: "微前端是一种将前端应用分解成更小、更易管理的独立部分的架构方案。本文分享微前端的实现方案、路由管理、通信机制等实践经验。",
        author: "Davis",
        date: "2024-01-15",
        category: "技术",
        tags: ["微前端", "架构设计", "模块化"],
        cover: "https://picsum.photos/800/400?random=6"
      },
      {
        id: Date.now() - 7000,
        title: "前端测试策略",
        content: "全面介绍前端测试方法，包括单元测试、集成测试、端到端测试等。探讨如何使用 Jest、Testing Library、Cypress 等工具提高代码质量。",
        author: "Davis",
        date: "2024-01-14",
        category: "技术",
        tags: ["测试", "Jest", "Cypress"],
        cover: "https://picsum.photos/800/400?random=7"
      },
      {
        id: Date.now() - 8000,
        title: "状态管理方案对比",
        content: "对比 Vuex、Redux、MobX、Recoil 等状态管理方案的优缺点，分析它们的使用场景，帮助你选择最适合的状态管理方案。",
        author: "Davis",
        date: "2024-01-13",
        category: "技术",
        tags: ["状态管理", "Vuex", "Redux"],
        cover: "https://picsum.photos/800/400?random=8"
      },
      {
        id: Date.now() - 9000,
        title: "WebAssembly 实战应用",
        content: "探索 WebAssembly 的实际应用场景，包括如何在前端项目中集成 WebAssembly 模块，以及性能优化案例分析。",
        author: "Davis",
        date: "2024-01-12",
        category: "技术",
        tags: ["WebAssembly", "性能优化", "前端技术"],
        cover: "https://picsum.photos/800/400?random=9"
      },
      {
        id: Date.now() - 10000,
        title: "前端工程化最佳实践",
        content: "讨论前端工程化的各个方面，包括构建工具、包管理、代码规范、CI/CD、版本控制等，帮助团队提高开发效率。",
        author: "Davis",
        date: "2024-01-11",
        category: "技术",
        tags: ["工程化", "CI/CD", "开发效率"],
        cover: "https://picsum.photos/800/400?random=10"
      },
      {
        id: Date.now() - 11000,
        title: "PWA 开发指南",
        content: "详细介绍 Progressive Web Apps 的开发流程，包括 Service Worker、离线缓存、推送通知等特性的实现方法。",
        author: "Davis",
        date: "2024-01-10",
        category: "技术",
        tags: ["PWA", "Service Worker", "Web开发"],
        cover: "https://picsum.photos/800/400?random=11"
      },
      {
        id: Date.now() - 12000,
        title: "Web Components 实践",
        content: "探讨 Web Components 技术，包括 Custom Elements、Shadow DOM 和 HTML Templates 的使用，以及如何创建可复用的组件。",
        author: "Davis",
        date: "2024-01-09",
        category: "技术",
        tags: ["Web Components", "组件化", "前端开发"],
        cover: "https://picsum.photos/800/400?random=12"
      },
      {
        id: Date.now() - 13000,
        title: "GraphQL 与前端开发",
        content: "介绍 GraphQL 在前端开发中的应用，包括查询语法、数据获取、状态管理等，以及与 REST API 的对比。",
        author: "Davis",
        date: "2024-01-08",
        category: "技术",
        tags: ["GraphQL", "API", "数据获取"],
        cover: "https://picsum.photos/800/400?random=13"
      },
      {
        id: Date.now() - 14000,
        title: "前端安全最佳实践",
        content: "探讨 Web 安全问题，包括 XSS、CSRF、CSP 等安全策略，以及如何在前端应用中实现安全防护。",
        author: "Davis",
        date: "2024-01-07",
        category: "技术",
        tags: ["Web安全", "XSS", "CSRF"],
        cover: "https://picsum.photos/800/400?random=14"
      },
      {
        id: Date.now() - 15000,
        title: "前端监控系统搭建",
        content: "分享如何搭建前端监控系统，包括性能监控、错误监控、用户行为分析等，以及常用监控工具的使用方法。",
        author: "Davis",
        date: "2024-01-06",
        category: "技术",
        tags: ["监控", "性能分析", "错误追踪"],
        cover: "https://picsum.photos/800/400?random=15"
      },
      {
        id: Date.now() - 16000,
        title: "现代构建工具对比",
        content: "对比 Vite、Webpack、Rollup、esbuild 等构建工具的特点和使用场景，帮助你选择合适的构建工具。",
        author: "Davis",
        date: "2024-01-05",
        category: "技术",
        tags: ["构建工具", "Vite", "Webpack"],
        cover: "https://picsum.photos/800/400?random=16"
      },
      {
        id: Date.now() - 17000,
        title: "CSS-in-JS 方案探索",
        content: "探讨 CSS-in-JS 的各种实现方案，包括 styled-components、emotion、tailwind 等，分析它们的优缺点和使用场景。",
        author: "Davis",
        date: "2024-01-04",
        category: "技术",
        tags: ["CSS-in-JS", "样式方案", "前端开发"],
        cover: "https://picsum.photos/800/400?random=17"
      },
      {
        id: Date.now() - 18000,
        title: "前端国际化实践",
        content: "分享前端应用国际化的实现方案，包括文本翻译、日期格式化、货币显示等，以及动态语言切换的处理方法。",
        author: "Davis",
        date: "2024-01-03",
        category: "技术",
        tags: ["国际化", "i18n", "本地化"],
        cover: "https://picsum.photos/800/400?random=18"
      },
      {
        id: Date.now() - 19000,
        title: "前端依赖管理",
        content: "探讨 npm、yarn、pnpm 等包管理工具的特点和使用方法，以及如何处理依赖冲突、版本控制等问题。",
        author: "Davis",
        date: "2024-01-02",
        category: "技术",
        tags: ["包管理", "npm", "依赖处理"],
        cover: "https://picsum.photos/800/400?random=19"
      },
      {
        id: Date.now() - 20000,
        title: "浏览器渲染原理",
        content: "深入解析浏览器渲染过程，包括 DOM 树构建、CSS 解析、布局计算、绘制等步骤，以及如何优化渲染性能。",
        author: "Davis",
        date: "2024-01-01",
        category: "技术",
        tags: ["浏览器", "渲染原理", "性能优化"],
        cover: "https://picsum.photos/800/400?random=20"
      }
    ];
    
    saveArticles(defaultArticles)
  }
}

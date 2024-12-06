// 风景图片数组
const landscapeImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',  // 优胜美地
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',  // 阿尔卑斯山
  'https://images.unsplash.com/photo-1449034446853-66c86144b0ad',  // 挪威峡湾
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',  // 森林
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',  // 阳光森林
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',  // 田野
  'https://images.unsplash.com/photo-1468581264429-2548ef9eb732',  // 湖泊
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470',  // 山脉
  'https://images.unsplash.com/photo-1439853949127-fa647821eba0',  // 海洋
  'https://images.unsplash.com/photo-1455218873509-8097305ee378',  // 雪山
]

// 文章数据
export const articles = [
  {
    id: 1,
    title: '探索前端开发的未来趋势',
    category: '技术',
    cover: landscapeImages[0] + '?w=800&h=400&fit=crop',
    summary: '前端开发技术日新月异，本文将探讨2024年最值得关注的前端发展趋势。',
    content: `
      随着Web技术的不断发展，前端开发领域正在经历着翻天覆地的变化。本文将深入探讨几个重要的发展趋势：

      1. AI辅助开发
      人工智能正在改变我们的编码方式，从自动补全到代码生成，AI工具正在提高开发效率。

      2. Web Components的普及
      组件化开发已经成为主流，Web Components提供了更标准化的解决方案。

      3. 跨平台开发的进化
      新的框架和工具使得一次开发，多端运行变得更加容易。

      4. 性能优化的新思路
      随着用户体验要求的提高，前端性能优化变得越来越重要。
    `,
    date: '2024-01-15',
    likes: 328,
    comments: 45,
    tags: ['前端开发', 'Web技术', '技术趋势'],
    author: {
      name: '张晓峰',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    }
  },
  {
    id: 2,
    title: 'Vue.js 3.0实战指南',
    category: '技术',
    cover: landscapeImages[1] + '?w=800&h=400&fit=crop',
    summary: '详细介绍Vue 3.0的新特性及其在实际项目中的应用。',
    content: `
      Vue 3.0带来了许多令人兴奋的新特性，本文将通过实际例子来说明如何充分利用这些特性：

      1. Composition API
      这是Vue 3最大的变化，它提供了更好的代码组织方式和逻辑复用能力。

      2. 更好的TypeScript支持
      Vue 3是用TypeScript重写的，为TypeScript用户提供了更好的开发体验。

      3. 性能提升
      通过优化虚拟DOM和编译策略，Vue 3在性能上有显著提升。

      4. 新的组件特性
      Teleport、Fragments等新特性解决了实际开发中的常见问题。
    `,
    date: '2024-01-10',
    likes: 256,
    comments: 32,
    tags: ['Vue.js', '前端框架', 'JavaScript'],
    author: {
      name: '李明',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    }
  },
  {
    id: 3,
    title: '移动端适配最佳实践',
    category: '技术',
    cover: landscapeImages[2] + '?w=800&h=400&fit=crop',
    summary: '探讨移动端Web开发中的各种适配问题及解决方案。',
    content: `
      移动端开发中，适配问题始终是一个重要话题。本文将分享一些实用的适配方案：

      1. viewport的设置
      合理的viewport设置是移动端适配的基础。

      2. rem和vw的选择
      这两种单位各有优势，需要根据具体场景选择。

      3. 1px边框问题
      在高清屏幕上1px边框的处理方案。

      4. 横屏适配
      如何处理横屏场景下的布局问题。
    `,
    date: '2024-01-05',
    likes: 198,
    comments: 28,
    tags: ['移动端开发', 'CSS', '响应式设计'],
    author: {
      name: '王小明',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    }
  },
  {
    id: 4,
    title: 'React Hooks 深入浅出',
    category: '技术',
    cover: landscapeImages[3] + '?w=800&h=400&fit=crop',
    summary: '深入理解React Hooks的原理和最佳实践，提升组件开发效率。',
    content: `
      React Hooks的出现彻底改变了React组件的开发方式。本文将深入探讨Hooks的使用技巧：

      1. useState和useEffect的正确使用
      理解状态管理和副作用处理的核心概念。

      2. 自定义Hooks的开发
      如何封装和复用组件逻辑，提高代码复用性。

      3. 性能优化
      使用useMemo和useCallback优化组件性能。

      4. 常见陷阱和解决方案
      探讨使用Hooks时的常见问题和解决办法。
    `,
    date: '2024-01-03',
    likes: 287,
    comments: 42,
    tags: ['React', 'Hooks', 'JavaScript'],
    author: {
      name: '陈开发',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    }
  },
  {
    id: 5,
    title: '漫谈工程师成长之路',
    category: '随笔',
    cover: landscapeImages[4] + '?w=800&h=400&fit=crop',
    summary: '分享一个前端工程师的成长历程，探讨技术人员的职业发展。',
    content: `
      作为一名前端工程师，回顾这些年的成长历程，有很多感悟想要分享：

      1. 技术广度vs深度
      在前端领域，如何平衡技术的广度和深度？

      2. 软技能的重要性
      除了技术能力，沟通和协作能力同样重要。

      3. 持续学习
      在技术快速迭代的今天，如何保持学习的动力和效率。

      4. 职业规划
      技术专家还是管理岗位？如何规划自己的职业道路。
    `,
    date: '2024-01-01',
    likes: 342,
    comments: 56,
    tags: ['职业发展', '经验分享', '技术成长'],
    author: {
      name: '张工',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    }
  },
  {
    id: 6,
    title: 'TypeScript高级特性详解',
    category: '技术',
    cover: landscapeImages[5] + '?w=800&h=400&fit=crop',
    summary: '深入探讨TypeScript的高级类型系统和实战应用技巧。',
    content: `
      TypeScript的类型系统非常强大，本文将介绍一些高级特性的使用方法：

      1. 泛型的高级用法
      理解泛型约束、条件类型等概念。

      2. 装饰器模式
      使用装饰器优化代码结构。

      3. 类型体操
      探索类型系统的极限，理解复杂类型的构造方法。

      4. 工程实践
      在大型项目中如何组织和管理类型定义。
    `,
    date: '2023-12-28',
    likes: 245,
    comments: 38,
    tags: ['TypeScript', '前端开发', '编程语言'],
    author: {
      name: '李泽',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
    }
  }
]

// 个人信息数据
export const profile = {
  name: 'Davis',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
  bio: '前端开发工程师 / 技术博主',
  posts: 42,
  categories: 6,
  tags: 24,
  views: '12k',
  about: '热爱技术，热爱生活。专注于前端开发和用户体验设计，喜欢分享技术心得和生活感悟。让我们一起在代码的世界里探索无限可能！',
  skills: [
    'Vue.js',
    'React',
    'TypeScript',
    'Node.js',
    'UI/UX',
    'Flutter',
    'Python',
    'Docker'
  ],
  socialLinks: [
    { name: 'GitHub', icon: 'github-o', url: 'https://github.com' },
    { name: '掘金', icon: 'bookmark-o', url: 'https://juejin.cn' },
    { name: '知乎', icon: 'question-o', url: 'https://zhihu.com' },
    { name: '邮箱', icon: 'envelop-o', url: 'mailto:example@email.com' }
  ]
}

// 搜索历史数据
export let searchHistory = ['Vue.js', 'React', '前端开发', '移动端适配']

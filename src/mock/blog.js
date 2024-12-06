import Mock from 'mockjs'

const Random = Mock.Random

// 自定义风景图片数组
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

// 生成文章数据
function generateArticles() {
  const articles = []
  const categories = ['技术', '生活', '随笔']
  const tags = ['Vue.js', 'React', 'JavaScript', '前端开发', '移动端', '生活感悟', '工作日常', '学习笔记']

  for (let i = 1; i <= 20; i++) {
    articles.push({
      id: i,
      title: Random.ctitle(5, 20),
      category: Random.pick(categories),
      cover: Random.pick(landscapeImages) + '?w=800&h=400&fit=crop',
      summary: Random.cparagraph(1, 3),
      content: Random.cparagraph(10, 20),
      date: Random.date('yyyy-MM-dd'),
      likes: Random.integer(0, 1000),
      comments: Random.integer(0, 100),
      tags: Random.shuffle(tags).slice(0, Random.integer(2, 4)),
      author: {
        name: Random.cname(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'
      }
    })
  }
  return articles
}

// 生成个人信息数据
function generateProfile() {
  return {
    name: 'Davis',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop',
    bio: '前端开发工程师 / 技术博主',
    posts: Random.integer(30, 100),
    categories: Random.integer(5, 10),
    tags: Random.integer(20, 50),
    views: `${Random.integer(10, 100)}k`,
    about: Random.cparagraph(2, 4),
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
}

// Mock API 接口
const articles = generateArticles()

Mock.mock(/\/api\/articles(\?.+)?$/, 'get', (options) => {
  // 这里可以根据 options.url 中的查询参数进行过滤
  return {
    code: 200,
    message: 'success',
    data: articles
  }
})

// 文章详情接口
Mock.mock(/\/api\/articles\/\d+/, 'get', (options) => {
  const id = parseInt(options.url.split('/').pop())
  const article = articles.find(item => item.id === id)
  
  if (article) {
    // 为详情页添加更多内容
    article.content = Random.cparagraph(20, 30) +
      '\n\n' + Random.cparagraph(15, 25) +
      '\n\n' + Random.cparagraph(25, 35) +
      '\n\n' + Random.cparagraph(10, 20)
  }

  return {
    code: article ? 200 : 404,
    message: article ? 'success' : 'Article not found',
    data: article || null
  }
})

Mock.mock('/api/profile', 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: generateProfile()
  }
})

// 搜索历史相关接口
let searchHistory = ['Vue.js', 'React', '前端开发', '移动端适配']

Mock.mock('/api/search/history', 'get', () => {
  return {
    code: 200,
    message: 'success',
    data: searchHistory
  }
})

Mock.mock('/api/search/history', 'post', (options) => {
  const { keyword } = JSON.parse(options.body)
  if (!searchHistory.includes(keyword)) {
    searchHistory.unshift(keyword)
    if (searchHistory.length > 10) {
      searchHistory.pop()
    }
  }
  return {
    code: 200,
    message: 'success',
    data: searchHistory
  }
})

Mock.mock(/\/api\/search\/history\/.+/, 'delete', (options) => {
  const keyword = options.url.split('/').pop()
  searchHistory = searchHistory.filter(item => item !== keyword)
  return {
    code: 200,
    message: 'success',
    data: searchHistory
  }
})

Mock.mock('/api/search/history', 'delete', () => {
  searchHistory = []
  return {
    code: 200,
    message: 'success',
    data: searchHistory
  }
})

<template>
  <div class="blog-container">
    <!-- 顶部导航栏 -->
    <div class="blog-header">
      <van-nav-bar
        title="博客详情"
        left-arrow
        @click-left="$router.back()"
      >
        <template #right>
          <van-icon 
            name="edit" 
            size="18" 
            @click="$router.push(`/blog/edit/${article?.id}`)" 
          />
        </template>
      </van-nav-bar>
    </div>

    <!-- 文章内容区域 -->
    <div class="blog-content" v-if="article" ref="blogContent">
      <div class="article-header">
        <h1 class="title">{{ article.title }}</h1>
        <div class="meta">
          <span class="author">
            <van-image
              round
              width="24"
              height="24"
              :src="article.author.avatar"
            />
            {{ article.author.name }}
          </span>
          <span class="date">{{ article.date }}</span>
          <span class="category">{{ article.category }}</span>
        </div>
        <div class="cover" v-if="article.cover">
          <van-image
            width="100%"
            :src="article.cover"
            fit="cover"
          />
        </div>
      </div>

      <div class="article-body">
        <p v-html="article.content"></p>
      </div>

      <!-- 文章底部 -->
      <div class="article-footer">
        <!-- 标签列表 -->
        <div class="tags" v-if="article.tags?.length">
          <van-tag
            v-for="tag in article.tags"
            :key="tag"
            plain
            type="primary"
            class="tag"
          >{{ tag }}</van-tag>
        </div>

        <!-- 互动统计 -->
        <div class="stats">
          <van-icon name="like-o" /> {{ article.likes || 0 }}
          <van-icon name="comment-o" /> {{ article.comments || 0 }}
        </div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-else class="loading">
      <van-loading type="spinner" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const blogContent = ref(null)

const fetchArticleDetail = () => {
  // 从 Home.vue 中获取文章列表
  const articles = JSON.parse(localStorage.getItem('articles') || '[]')
  const id = route.params.id
  // 确保进行数字类型比较
  article.value = articles.find(item => String(item.id) === id)
  
  if (!article.value) {
    showToast('文章不存在')
    router.back()
  }
}

onMounted(() => {
  fetchArticleDetail()
})
</script>

<style scoped>
.blog-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.blog-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.blog-content::-webkit-scrollbar {
  display: none;
}

.article-header {
  padding: 20px 16px;
  background: #fff;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #323233;
  line-height: 1.4;
  margin-bottom: 16px;
}

.meta {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #969799;
  font-size: 14px;
  margin-bottom: 16px;
}

.author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.category {
  background-color: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.cover {
  margin: 16px -16px;
  height: 200px;
  overflow: hidden;
}

.cover .van-image {
  width: 100%;
  height: 100%;
}

.article-body {
  padding: 16px;
  font-size: 16px;
  line-height: 1.8;
  color: #323233;
  white-space: pre-wrap;
}

.article-body p {
  margin: 16px 0;
}

.article-footer {
  margin-top: 32px;
  padding: 16px;
  border-top: 1px solid #ebedf0;
}

.tags {
  margin-bottom: 16px;
}

.tag {
  margin-right: 8px;
}

.stats {
  display: flex;
  gap: 16px;
  color: #969799;
}

.stats .van-icon {
  margin-right: 4px;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}
</style>

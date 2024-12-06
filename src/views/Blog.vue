<template>
  <div class="blog-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="博客详情"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 文章内容区域 -->
    <div class="blog-content" v-if="article">
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

      <div class="article-footer">
        <div class="tags">
          <van-tag
            v-for="tag in article.tags"
            :key="tag"
            plain
            type="primary"
            class="tag"
          >{{ tag }}</van-tag>
        </div>
        <div class="stats">
          <van-icon name="like-o" /> {{ article.likes }}
          <van-icon name="comment-o" /> {{ article.comments }}
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
import { useRoute } from 'vue-router'
import { showToast } from 'vant'
import { articles } from '../data/blog'

const route = useRoute()
const article = ref(null)

const fetchArticleDetail = () => {
  const id = parseInt(route.params.id)
  article.value = articles.find(item => item.id === id)
  
  if (!article.value) {
    showToast('文章不存在')
  }
}

onMounted(() => {
  fetchArticleDetail()
})
</script>

<style scoped>
.blog-container {
  padding-top: 46px;
  min-height: 100vh;
  background-color: #fff;
}

.blog-content {
  padding: 16px;
}

.article-header {
  margin-bottom: 24px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #323233;
  margin: 0 0 16px;
  line-height: 1.4;
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

.cover {
  margin: 16px 0;
  border-radius: 8px;
  overflow: hidden;
}

.article-body {
  font-size: 16px;
  line-height: 1.8;
  color: #323233;
}

.article-body p {
  margin: 16px 0;
}

.article-footer {
  margin-top: 32px;
  padding-top: 16px;
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

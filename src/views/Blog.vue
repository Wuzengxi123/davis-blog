<template>
  <div class="blog-container">
    <!-- 顶部导航栏 -->
    <div class="blog-header">
      <van-nav-bar
        title="博客详情"
        left-arrow
        @click-left="$router.back()"
      />
    </div>

    <!-- 文章内容区域 -->
    <div class="blog-content" v-if="article" ref="blogContent" @scroll="onScroll">
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

      <!-- 底部加载提示 -->
      <div class="loading-tips">
        <van-loading v-if="isLoading" size="16px" vertical>加载中...</van-loading>
        <span v-else-if="!hasMore" class="no-more">- 已经到底啦 -</span>
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
const isLoading = ref(false)
const hasMore = ref(true)
const blogContent = ref(null)

const fetchArticleDetail = () => {
  const id = parseInt(route.params.id)
  article.value = articles.find(item => item.id === id)
  
  if (!article.value) {
    showToast('文章不存在')
  }
}

const onScroll = () => {
  if (!hasMore.value || isLoading.value) return
  const content = blogContent.value
  if (!content) return
  
  const scrollBottom = content.scrollHeight - content.scrollTop - content.clientHeight
  if (scrollBottom < 50) loadMore()
}

const loadMore = async () => {
  if (!hasMore.value || isLoading.value) return
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  hasMore.value = false
  isLoading.value = false
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

/* 隐藏滚动条但保持可滚动 */
.blog-content {
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  -webkit-overflow-scrolling: touch;
}

/* 隐藏 Webkit 浏览器的滚动条 */
.blog-content::-webkit-scrollbar {
  display: none;
}

/* 固定头部区域 */
.blog-header {
  position: relative;
  z-index: 99;
  background: #fff;
}

:deep(.van-nav-bar) {
  position: relative;
  z-index: 999;
}

/* 固定分类标签 */
:deep(.van-tabs__wrap) {
  /* position: fixed !important; */
  top: 46px !important;
  left: 0;
  right: 0;
  z-index: 98;
  background: #fff;
}

.article-header {
  padding: 20px 16px;
  background: #fff;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.meta {
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
  gap: 16px;
}

.content {
  line-height: 1.6;
  color: #333;
}

/* 移除sticky相关样式 */
:deep(.van-sticky) {
  position: static !important;
  top: auto !important;
}

/* :deep(.van-sticky--fixed) {
  position: relative !important;
}

.van-sticky--fixed {
  position: relative !important;
} */

.article-body {
  padding: 0 16px;
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

.loading-tips {
  padding: 16px;
  text-align: center;
  margin-top: auto;
  color: #969799;
}

.no-more {
  font-size: 14px;
}

/* 内容区域自然撑开 */
.blog-content > * {
  width: 100%;
  box-sizing: border-box;
}
</style>

<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="article in articles"
          :key="article.id"
          class="article-card"
          @click="onArticleClick(article)"
        >
          <van-image
            :src="article.cover"
            class="article-cover"
            fit="cover"
            radius="4"
          />
          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-summary">{{ article.summary }}</p>
            <div class="article-meta">
              <span class="meta-item">
                <van-icon name="clock-o" />
                {{ article.date }}
              </span>
              <span class="meta-item">
                <van-icon name="like-o" />
                {{ article.likes }}
              </span>
              <span class="meta-item">
                <van-icon name="comment-o" />
                {{ article.comments }}
              </span>
              <van-tag 
                :type="getTagType(article.category)"
                size="medium"
                plain
              >
                {{ article.category }}
              </van-tag>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'

const props = defineProps({
  articles: {
    type: Array,
    required: true
  }
})

const router = useRouter()

// 列表状态
const loading = ref(false)
const finished = ref(true)
const refreshing = ref(false)

// 刷新和加载更多
const onRefresh = () => {
  setTimeout(() => {
    showToast('刷新成功')
    refreshing.value = false
  }, 1000)
}

const onLoad = () => {
  loading.value = false
}

// 文章点击事件
const onArticleClick = (article) => {
  router.push({
    name: 'blog',
    params: { id: article.id }
  })
}

// 根据分类获取标签类型
const getTagType = (category) => {
  const types = {
    '技术': 'primary',
    '生活': 'success',
    '随笔': 'warning'
  }
  return types[category] || 'default'
}
</script>

<style scoped>
.article-list {
  padding: 16px;
}

.article-card {
  background: #fff;
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(100, 101, 102, 0.08);
}

.article-cover {
  width: 100%;
  height: 200px;
}

.article-content {
  padding: 12px;
}

.article-title {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
  color: #323233;
  line-height: 1.4;
}

.article-summary {
  margin: 8px 0;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.article-meta {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.meta-item .van-icon {
  margin-right: 4px;
  font-size: 14px;
}

:deep(.van-tag) {
  margin-left: auto;
}

:deep(.van-image) {
  display: block;
}
</style>

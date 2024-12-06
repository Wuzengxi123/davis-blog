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
          @click="goToDetail(article.id)"
        >
          <div class="article-content">
            <h3 class="title">{{ article.title }}</h3>
            <p class="summary">{{ article.content.slice(0, 100) }}...</p>
            <div class="meta">
              <span class="author">
                <van-image
                  round
                  width="20"
                  height="20"
                  :src="article.author.avatar"
                />
                {{ article.author.name }}
              </span>
              <span class="date">{{ article.date }}</span>
              <span class="category">{{ article.category }}</span>
            </div>
          </div>
          <div class="article-cover" v-if="article.cover">
            <van-image
              width="120"
              height="80"
              fit="cover"
              :src="article.cover"
            />
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
    default: () => []
  }
})

const router = useRouter()
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

// 跳转到文章详情页
const goToDetail = (id) => {
  router.push(`/blog/${id}`)
}

// 加载更多
const onLoad = () => {
  loading.value = false
  finished.value = true
}
</script>

<style scoped>
.article-list {
  padding: 16px;
}

.article-card {
  display: flex;
  padding: 16px;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
}

.article-card:active {
  transform: scale(0.98);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.article-content {
  flex: 1;
  margin-right: 16px;
  overflow: hidden;
}

.title {
  font-size: 18px;
  font-weight: bold;
  margin: 0 0 8px;
  color: #323233;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.summary {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.meta {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #969799;
}

.author {
  display: flex;
  align-items: center;
  margin-right: 16px;
}

.author .van-image {
  margin-right: 4px;
}

.date {
  margin-right: 16px;
}

.category {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
}

.article-cover {
  flex-shrink: 0;
  width: 120px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
}

.article-cover .van-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

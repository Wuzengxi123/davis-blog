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
        @search="onSearch"
        @cancel="showSearch = false"
      >
        <template #action>
          <div @click="showSearch = false">取消</div>
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
        <article-list :articles="filteredArticles" />
      </van-tab>
      <van-tab title="技术">
        <article-list :articles="filteredArticles.filter(a => a.category === '技术')" />
      </van-tab>
      <van-tab title="生活">
        <article-list :articles="filteredArticles.filter(a => a.category === '生活')" />
      </van-tab>
      <van-tab title="随笔">
        <article-list :articles="filteredArticles.filter(a => a.category === '随笔')" />
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
import { ref, computed, onMounted } from 'vue'
import { showToast } from 'vant'
import ArticleList from '../components/ArticleList.vue'
import ProfileDrawer from '../components/ProfileDrawer.vue'
import { articles as initialArticles, searchHistory as initialSearchHistory } from '../data/blog'

const searchText = ref('')
const activeTab = ref(0)
const showSearch = ref(false)
const showProfile = ref(false)
const searchHistory = ref(initialSearchHistory)
const articles = ref(initialArticles)
const loading = ref(false)

// 根据搜索文本过滤文章
const filteredArticles = computed(() => {
  if (!searchText.value) return articles.value
  const searchLower = searchText.value.toLowerCase()
  return articles.value.filter(article => 
    article.title.toLowerCase().includes(searchLower) ||
    article.summary.toLowerCase().includes(searchLower)
  )
})

// 搜索相关方法
const onSearch = () => {
  if (searchText.value && !searchHistory.value.includes(searchText.value)) {
    searchHistory.value.unshift(searchText.value)
    if (searchHistory.value.length > 10) {
      searchHistory.value.pop()
    }
  }
  showSearch.value = false
}

const onHistoryClick = (text) => {
  searchText.value = text
  showSearch.value = false
}

const removeHistory = (text) => {
  searchHistory.value = searchHistory.value.filter(item => item !== text)
}

const clearHistory = () => {
  searchHistory.value = []
}

// 写文章
const onWrite = () => {
  showToast('写文章功能开发中...')
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

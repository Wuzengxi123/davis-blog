<template>
  <van-popup
    :show="show"
    position="left"
    :style="{ width: '80%', height: '100%' }"
    @update:show="$emit('update:show', $event)"
  >
    <div class="profile-container">
      <!-- 顶部背景和头像 -->
      <div class="profile-header">
        <div class="header-background"></div>
        <van-image
          round
          width="80"
          height="80"
          :src="profile.avatar"
          class="avatar"
        />
        <h2 class="username">{{ profile.name }}</h2>
        <p class="bio">{{ profile.bio }}</p>
      </div>

      <!-- 统计信息 -->
      <van-grid :column-num="4" :border="false" class="stats-grid">
        <van-grid-item>
          <span class="stats-num">{{ profile.posts }}</span>
          <span class="stats-label">文章</span>
        </van-grid-item>
        <van-grid-item>
          <span class="stats-num">{{ profile.categories }}</span>
          <span class="stats-label">分类</span>
        </van-grid-item>
        <van-grid-item>
          <span class="stats-num">{{ profile.tags }}</span>
          <span class="stats-label">标签</span>
        </van-grid-item>
        <van-grid-item>
          <span class="stats-num">{{ profile.views }}</span>
          <span class="stats-label">访问</span>
        </van-grid-item>
      </van-grid>

      <!-- 社交链接 -->
      <div class="social-links">
        <van-cell-group inset>
          <van-cell 
            v-for="link in profile.socialLinks" 
            :key="link.name"
            :title="link.name"
            :icon="link.icon"
            is-link
            :url="link.url"
          />
        </van-cell-group>
      </div>

      <!-- 个人简介 -->
      <div class="about-me">
        <van-cell-group inset>
          <van-cell title="关于我" :border="false">
            <template #label>
              <p class="about-text">{{ profile.about }}</p>
            </template>
          </van-cell>
        </van-cell-group>
      </div>

      <!-- 技能标签 -->
      <div class="skills">
        <van-cell-group inset>
          <van-cell title="技能标签" :border="false">
            <template #label>
              <div class="skill-tags">
                <van-tag
                  v-for="skill in profile.skills"
                  :key="skill"
                  type="primary"
                  plain
                  size="medium"
                  class="skill-tag"
                >
                  {{ skill }}
                </van-tag>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { ref } from 'vue'
import { profile as profileData } from '../data/blog'

const props = defineProps({
  show: Boolean
})

defineEmits(['update:show'])

// 个人信息数据
const profile = ref(profileData)
</script>

<style scoped>
.profile-container {
  height: 100%;
  overflow-y: auto;
  background-color: #f7f8fa;
}

.profile-header {
  position: relative;
  padding: 40px 20px 20px;
  text-align: center;
  color: #fff;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 160px;
  background: linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%);
  z-index: 0;
}

.avatar {
  position: relative;
  z-index: 1;
  border: 4px solid #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.username {
  position: relative;
  margin: 12px 0 4px;
  font-size: 20px;
  font-weight: bold;
  z-index: 1;
}

.bio {
  position: relative;
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
  z-index: 1;
}

.stats-grid {
  margin: 16px 0;
  background-color: #fff;
}

.stats-num {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #323233;
}

.stats-label {
  display: block;
  font-size: 12px;
  color: #969799;
  margin-top: 4px;
}

.social-links {
  margin: 16px 0;
}

.about-me {
  margin: 16px 0;
}

.about-text {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 8px 0;
}

.skills {
  margin: 16px 0;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px 0;
}

.skill-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

:deep(.van-grid-item__content) {
  padding: 16px 8px;
}

:deep(.van-cell-group) {
  margin: 0 16px;
}
</style>

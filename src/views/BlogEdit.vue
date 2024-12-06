<template>
  <div class="blog-edit">
    <van-nav-bar
      :title="isEdit ? '编辑博客' : '写博客'"
      left-arrow
      @click-left="onBack"
    >
      <template #right>
        <van-button 
          type="primary" 
          size="small" 
          :loading="saving"
          @click="onSave"
        >
          发布
        </van-button>
      </template>
    </van-nav-bar>

    <div class="edit-form">
      <van-form @submit="onSave">
        <!-- 标题输入 -->
        <van-field
          v-model="formData.title"
          label="标题"
          placeholder="请输入文章标题"
          :rules="[{ required: true, message: '请输入标题' }]"
        />

        <!-- 封面图片 -->
        <van-field
          label="封面"
          is-link
          readonly
          :value="formData.cover ? '已上传' : '点击上传'"
          @click="onUploadCover"
        />
        <div class="cover-preview" v-if="formData.cover">
          <van-image :src="formData.cover" width="100%" fit="cover" />
          <van-icon name="clear" class="remove-cover" @click="removeCover" />
        </div>

        <!-- 分类选择 -->
        <van-field
          v-model="formData.category"
          is-link
          readonly
          label="分类"
          placeholder="请选择分类"
          @click="showCategoryPicker = true"
        />
        <van-popup v-model:show="showCategoryPicker" position="bottom">
          <van-picker
            :columns="categories"
            @confirm="onCategoryConfirm"
            @cancel="showCategoryPicker = false"
          />
        </van-popup>

        <!-- 标签输入 -->
        <van-field
          v-model="tagInput"
          label="标签"
          placeholder="输入标签后点击添加"
        >
          <template #button>
            <van-button size="small" type="primary" @click="addTag">添加</van-button>
          </template>
        </van-field>
        <div class="tags-container" v-if="formData.tags.length">
          <van-tag
            v-for="tag in formData.tags"
            :key="tag"
            closeable
            type="primary"
            class="tag"
            @close="removeTag(tag)"
          >
            {{ tag }}
          </van-tag>
        </div>

        <!-- 内容编辑 -->
        <van-field
          v-model="formData.content"
          label="内容"
          type="textarea"
          rows="10"
          placeholder="请输入文章内容"
          :rules="[{ required: true, message: '请输入内容' }]"
        />
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { showToast } from 'vant'

const route = useRoute()
const router = useRouter()
const isEdit = ref(false)
const saving = ref(false)
const showCategoryPicker = ref(false)
const tagInput = ref('')

// 分类选项
const categories = [
  '技术',
  '生活',
  '随笔',
  '旅行',
  '美食',
  '其他'
]

// 表单数据
const formData = ref({
  title: '',
  cover: '',
  category: '',
  tags: [],
  content: '',
  author: {
    name: 'Davis',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
  },
  date: new Date().toLocaleDateString(),
  likes: 0,
  comments: 0
})

// 加载文章数据
onMounted(() => {
  const id = route.params.id
  if (id) {
    isEdit.value = true
    // 从 localStorage 获取文章数据
    const articles = JSON.parse(localStorage.getItem('articles') || '[]')
    const article = articles.find(item => String(item.id) === id)
    
    if (article) {
      formData.value = { ...article }
    } else {
      showToast('文章不存在')
      router.back()
    }
  }
})

// 保存文章
const onSave = async () => {
  if (!formData.value.title || !formData.value.content) {
    showToast('请填写完整信息')
    return
  }

  try {
    saving.value = true
    // 获取现有文章
    const articles = JSON.parse(localStorage.getItem('articles') || '[]')
    
    // 准备要保存的文章数据
    const articleToSave = {
      ...formData.value,
      date: new Date().toLocaleDateString()
    }

    if (isEdit.value) {
      // 更新现有文章
      const index = articles.findIndex(item => String(item.id) === route.params.id)
      if (index !== -1) {
        articles[index] = articleToSave
      }
    } else {
      // 添加新文章
      articleToSave.id = Date.now()
      articles.unshift(articleToSave)
    }

    // 保存到 localStorage
    localStorage.setItem('articles', JSON.stringify(articles))
    
    showToast('保存成功')
    router.push(`/blog/${articleToSave.id}`)
  } catch (error) {
    showToast('保存失败')
  } finally {
    saving.value = false
  }
}

// 返回首页
const onBack = () => {
  router.push({ name: 'Home' })
}

// 上传封面
const onUploadCover = () => {
  // 这里模拟上传成功
  formData.value.cover = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
}

// 移除封面
const removeCover = () => {
  formData.value.cover = ''
}

// 选择分类
const onCategoryConfirm = (value) => {
  formData.value.category = value
  showCategoryPicker.value = false
}

// 添加标签
const addTag = () => {
  const tag = tagInput.value.trim()
  if (!tag) return
  
  if (!formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag)
  }
  tagInput.value = ''
}

// 移除标签
const removeTag = (tag) => {
  const index = formData.value.tags.indexOf(tag)
  if (index !== -1) {
    formData.value.tags.splice(index, 1)
  }
}
</script>

<style scoped>
.blog-edit {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.edit-form {
  padding: 16px;
}

.cover-preview {
  position: relative;
  margin: 16px;
}

.remove-cover {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 50%;
}

.tags-container {
  padding: 8px 16px;
}

.tag {
  margin-right: 8px;
  margin-bottom: 8px;
}

:deep(.van-field__button) {
  padding-left: 8px;
}
</style>

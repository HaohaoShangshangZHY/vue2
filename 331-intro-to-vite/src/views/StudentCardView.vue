<template>
  <div class="student-container">
    <h1>学生信息卡片</h1>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="status">加载学生数据中...</div>

    <!-- 错误状态 -->
    <div v-if="error" class="status error">{{ error }}</div>

    <!-- 学生卡片列表 -->
    <div v-else class="card-grid">
      <div class="student-card" v-for="student in students" :key="student.id">
        <!-- 学生头像 -->
        <img
          :src="student.image"
          :alt="`${student.name} ${student.surname}`"
          class="student-avatar"
          @error="handleImageError($event)"
        />

        <!-- 学生信息 -->
        <div class="student-details">
          <h3>{{ student.name }} {{ student.surname }}</h3>
          <p class="gpa">GPA: {{ student.gpa.toFixed(2) }}</p>
          <!-- 保留2位小数 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchStudents, type Student } from '@/services/StudentService'

// 响应式变量
const students = ref<Student[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// 处理头像加载失败
const handleImageError = (e: Event) => {
  ;(e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=No+Image'
}

// 组件挂载时加载数据
onMounted(async () => {
  try {
    isLoading.value = true
    students.value = await fetchStudents() // 调用服务获取数据
  } catch (err) {
    error.value = err instanceof Error ? err.message : '加载失败'
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.student-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.status {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #dc2626; /* 错误提示红色 */
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 30px;
}

.student-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.student-card:hover {
  transform: translateY(-5px); /* 悬停时上浮效果 */
}

.student-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 16px;
  border: 3px solid #f0f0f0;
}

.student-details h3 {
  margin: 0 0 12px;
  color: #1e293b;
  font-size: 1.2rem;
}

.gpa {
  margin: 0;
  color: #3b82f6; /* GPA蓝色突出显示 */
  font-size: 1.1rem;
  font-weight: 600;
}
</style>

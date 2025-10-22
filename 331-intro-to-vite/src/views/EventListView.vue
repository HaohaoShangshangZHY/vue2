<template>
  <!-- 假设模板部分用于渲染事件列表，使用EventCard组件 -->
  <div class="event-list">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script setup lang="ts">
import EventCard from '../components/EventCard.vue'
import type { Event } from '../types'
import { ref, onMounted } from 'vue'
import axios from 'axios' // 直接导入axios

const events = ref<Event[]>(null)

onMounted(() => {
  axios
    .get('https://my-json-server.typicode.com/HaohaoShangshangZHY/js/events') // 替换为你的mock server地址
    .then((response) => {
      events.value = response.data
      console.log(response.data)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })
})
</script>

<style scoped>
/* 可选的样式，用于美化事件列表布局 */
.event-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>

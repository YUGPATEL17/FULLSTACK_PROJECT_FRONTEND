<template>
  <div v-if="course" class="details-page">
    <img
      :src="course.image"
      :alt="course.title"
      class="hero-image"
    />

    <h1 class="title">{{ course.title }}</h1>
    <p class="category">{{ course.category }}</p>

    <div class="top-row">
      <p class="price">£{{ course.price }}</p>
      <p class="location">📍 {{ course.location }}</p>
    </div>

    <div class="section">
      <h2>Description</h2>
      <p class="text">
        {{ course.description }}
      </p>
    </div>

    <div class="section">
      <h2>What you'll learn</h2>
      <ul class="learn-list">
        <li v-for="(item, index) in course.learn" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>

  <p v-else class="not-found">
    Course not found
  </p>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import coursesData from "../data/coursesData.js";

const route = useRoute();
const id = Number(route.params.id);

const course = computed(() =>
  coursesData.find((c) => c.id === id)
);
</script>

<style scoped>
.details-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px 60px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui,
    sans-serif;
}

.hero-image {
  width: 100%;
  height: 260px;
  border-radius: 18px;
  object-fit: cover;
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin-top: 20px;
}

.category {
  margin-top: 4px;
  color: #777;
  font-size: 14px;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
}

.price {
  font-size: 24px;
  font-weight: 700;
}

.location {
  font-size: 14px;
  color: #555;
}

.section {
  margin-top: 28px;
}

.section h2 {
  font-size: 20px;
  margin-bottom: 8px;
}

.text {
  font-size: 15px;
  color: #555;
}

.learn-list {
  padding-left: 18px;
  font-size: 15px;
  color: #555;
}

.not-found {
  text-align: center;
  margin-top: 40px;
  font-size: 18px;
}
</style>
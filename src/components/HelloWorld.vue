<template>
  <main class="page">
    <header class="page-header">
      <h1>After School Classes</h1>
      <p>Browse, search and sort lessons, then add them to your basket.</p>
    </header>

    <section class="lessons-grid">
      <article
        v-for="lesson in lessons"
        :key="lesson.id"
        class="lesson-card"
      >
        <!-- 🟢 Whole card is clickable -->
        <RouterLink
          :to="`/course/${lesson.id}`"
          class="card-link"
        >
          <img
            :src="lesson.image"
            :alt="lesson.title"
            class="lesson-image"
          />

          <div class="lesson-body">
            <h2>{{ lesson.title }}</h2>
            <p class="lesson-description">
              {{ lesson.description }}
            </p>

            <div class="lesson-meta">
              <p>📍 {{ lesson.location }}</p>
              <p>£ {{ lesson.price.toFixed(2) }}</p>
              <p>Spaces left: {{ lesson.spacesLeft }}</p>
            </div>

            <div class="lesson-rating">★★★★★</div>

            <div class="lesson-actions">
              <button class="btn-secondary">Book now!</button>
              <button
                class="btn-primary"
                :disabled="lesson.spacesLeft === 0"
              >
                {{ lesson.spacesLeft === 0 ? "Sold Out" : "Add to Cart" }}
              </button>
            </div>
          </div>
        </RouterLink>
      </article>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
import coursesData from "../data/coursesData.Js";

const lessons = coursesData;
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 24px 40px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
}

.page-header h1 {
  font-size: 32px;
  margin-bottom: 4px;
}

.page-header p {
  color: #666;
  margin-bottom: 24px;
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}

.lesson-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.card-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.lesson-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.lesson-body {
  padding: 16px 18px 18px;
}

.lesson-description {
  color: #555;
  font-size: 14px;
  margin: 6px 0 10px;
}

.lesson-meta {
  font-size: 13px;
  color: #444;
  margin-bottom: 8px;
}

.lesson-meta p {
  margin: 2px 0;
}

.lesson-rating {
  color: #f5a623;
  font-size: 18px;
  margin-bottom: 10px;
}

.lesson-actions {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

button {
  border-radius: 999px;
  padding: 8px 14px;
  border: none;
  font-size: 13px;
  cursor: pointer;
}

.btn-secondary {
  background: #e8f5e9;
  color: #1b5e20;
}

.btn-primary {
  flex: 1;
  background: #2ecc71;
  color: #fff;
}

.btn-primary:disabled {
  background: #cfd2d4;
  cursor: not-allowed;
}
</style>
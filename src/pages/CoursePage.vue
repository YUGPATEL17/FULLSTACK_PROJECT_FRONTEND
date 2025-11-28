<template>
  <main class="course-page">
    <!-- Header -->
    <section class="course-header">
      <h1>After School Classes</h1>
      <p>Browse, search and sort lessons, then add them to your basket.</p>
    </section>

    <!-- Controls -->
    <section class="course-controls">
      <div class="controls-left">
        <input
          v-model="searchTerm"
          type="text"
          class="search-input"
          placeholder="Search lessons..."
        />
      </div>
      <div class="controls-right">
        <label class="sort-label">
          Sort by:
          <select v-model="sortField" class="sort-select">
            <option value="title">Subject (title)</option>
            <option value="location">Location</option>
            <option value="price">Price</option>
            <option value="spaces">Spaces left</option>
          </select>
        </label>

        <label class="sort-label">
          Order:
          <select v-model="sortOrder" class="sort-select">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </section>

    <!-- Loading / error -->
    <p v-if="loading" class="results-text">Loading lessons...</p>
    <p v-else-if="error" class="results-text" style="color: red;">
      {{ error }}
    </p>

    <!-- Results info -->
    <p v-else class="results-text">
      Showing {{ filteredAndSortedLessons.length }} lesson<span
        v-if="filteredAndSortedLessons.length !== 1"
        >s</span
      >
    </p>

    <!-- Lessons grid -->
    <section v-if="!loading && !error" class="lessons-grid">
      <article
        v-for="lesson in filteredAndSortedLessons"
        :key="lesson.id"
        class="lesson-card"
      >
        <div class="lesson-image-wrapper">
          <img
            :src="lesson.image"
            :alt="lesson.title"
            class="lesson-image"
          />
        </div>

        <div class="lesson-body">
          <h2 class="lesson-title">{{ lesson.title }}</h2>
          <p class="lesson-description">{{ lesson.description }}</p>

          <div class="lesson-meta">
            <div class="meta-row">
              <span class="meta-icon">📍</span>
              <span>{{ lesson.location }}</span>
            </div>
            <div class="meta-row">
              <span>£ {{ lesson.price.toFixed(2) }}</span>
            </div>
            <div class="meta-row">
              <span>Spaces left: {{ spacesLeft(lesson) }}</span>
            </div>
          </div>

          <div class="lesson-rating">
            <span
              v-for="n in 5"
              :key="n"
              class="star"
              :class="{ active: n <= lesson.rating }"
            >
              ★
            </span>
          </div>

          <div class="lesson-actions">
            <button
              class="btn btn-primary"
              :disabled="!canAddToCart(lesson)"
              @click="bookNow(lesson)"
            >
              Book now!
            </button>

            <button
              class="btn btn-secondary"
              :class="{
                'btn-sold-out': !canAddToCart(lesson),
                'btn-in-cart': canAddToCart(lesson) && inCart(lesson)
              }"
              :disabled="!canAddToCart(lesson)"
              @click="addToCart(lesson)"
            >
              <span v-if="!canAddToCart(lesson)">Sold Out</span>
              <span v-else-if="inCart(lesson)">✔ In Cart</span>
              <span v-else>Add to Cart</span>
            </button>

            <RouterLink
              :to="`/course/${lesson.id}`"
              class="btn-link"
            >
              View details
            </RouterLink>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
export default {
  name: "CoursePage",

  data() {
    return {
      cart: [],
      searchTerm: "",
      sortField: "title", // title | location | price | spaces
      sortOrder: "asc",   // asc | desc

      lessons: [],        // <-- now starts empty, will come from backend
      loading: true,
      error: null,
    };
  },

  computed: {
    filteredAndSortedLessons() {
      const term = this.searchTerm.toLowerCase();

      // 1) FILTER – match title + description + location
      let list = this.lessons.filter((lesson) => {
        if (!term) return true;
        const text = (
          lesson.title +
          " " +
          lesson.description +
          " " +
          lesson.location
        ).toLowerCase();
        return text.includes(term);
      });

      // 2) SORT – by selected field + order
      const field = this.sortField;
      const order = this.sortOrder === "asc" ? 1 : -1;

      list = list.slice().sort((a, b) => {
        let cmp = 0;

        if (field === "title") {
          cmp = a.title.localeCompare(b.title);
        } else if (field === "location") {
          cmp = a.location.localeCompare(b.location);
        } else if (field === "price") {
          cmp = a.price - b.price;
        } else if (field === "spaces") {
          cmp = this.spacesLeft(a) - this.spacesLeft(b);
        }

        return cmp * order;
      });

      return list;
    },
  },

  methods: {
    // --- NEW: fetch lessons from backend ---
    async fetchLessons() {
      try {
        const res = await fetch("http://localhost:4000/api/courses");
        if (!res.ok) {
          throw new Error("Failed to fetch lessons");
        }
        const data = await res.json();
        this.lessons = data;
      } catch (err) {
        console.error(err);
        this.error = "Could not load lessons. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    loadCart() {
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },

    quantityInCart(lesson) {
      const item = this.cart.find((c) => c.id === lesson.id);
      return item ? item.quantity : 0;
    },

    inCart(lesson) {
      return this.quantityInCart(lesson) > 0;
    },

    spacesLeft(lesson) {
      return lesson.spaces - this.quantityInCart(lesson);
    },

    canAddToCart(lesson) {
      return this.spacesLeft(lesson) > 0;
    },

    addToCart(lesson) {
      if (!this.canAddToCart(lesson)) return;

      const existing = this.cart.find((c) => c.id === lesson.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.cart.push({ id: lesson.id, lesson, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
      window.dispatchEvent(new Event("cart-updated"));
    },

    bookNow(lesson) {
      this.addToCart(lesson);
      alert(`Booked: ${lesson.title}`);
    },
  },

  mounted() {
    this.loadCart();
    window.addEventListener("cart-updated", this.loadCart);

    // NEW: load lessons from backend when page mounts
    this.fetchLessons();
  },

  beforeUnmount() {
    window.removeEventListener("cart-updated", this.loadCart);
  },
};
</script>

<style scoped>
/* your existing styles – unchanged */
.course-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px 80px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui,
    sans-serif;
}

.course-header h1 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 8px;
}

.course-header p {
  font-size: 16px;
  color: #555;
  margin-bottom: 32px;
}

.course-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 16px;
  flex-wrap: wrap;
}

.results-text {
  font-size: 13px;
  color: #777;
  margin-bottom: 20px;
}

.search-input {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid #ddd;
  font-size: 14px;
  min-width: 260px;
}

.sort-label {
  font-size: 14px;
  color: #444;
  margin-left: 8px;
}

.sort-select {
  margin-left: 6px;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.lessons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 28px;
}

.lesson-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.lesson-image-wrapper {
  height: 200px;
  overflow: hidden;
}

.lesson-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lesson-body {
  padding: 20px 22px 22px;
}

.lesson-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.lesson-description {
  font-size: 14px;
  color: #555;
  margin-bottom: 14px;
}

.lesson-meta {
  font-size: 13px;
  color: #444;
  margin-bottom: 10px;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-icon {
  font-size: 14px;
}

.lesson-rating {
  margin: 4px 0 14px;
}

.star {
  font-size: 14px;
  color: #ddd;
}

.star.active {
  color: #ffb400;
}

.lesson-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.btn {
  border-radius: 999px;
  border: none;
  padding: 9px 12px;
  font-size: 13px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
}

.btn-primary {
  flex: 1;
  background: #e7f6eb;
  color: #1c7c3c;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.btn-secondary {
  flex: 1;
  background: #1c7c3c;
  color: #ffffff;
}

.btn-secondary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.btn-in-cart {
  background: #0f5c2b;
}

.btn-sold-out {
  background: #e0e0e0;
  color: #888;
}

.btn:disabled {
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.btn-link {
  font-size: 13px;
  color: #1c7c3c;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .course-page {
    padding: 32px 20px 60px;
  }

  .course-header h1 {
    font-size: 32px;
  }
}
</style>
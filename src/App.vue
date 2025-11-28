<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app-root">
    <header class="app-header">
      <div class="brand">
        <span class="brand-logo">🎓</span>
        <div class="brand-text">
          <h1>After School Club</h1>
          <p>Lesson booking system</p>
        </div>
      </div>

      <nav class="nav-links">
        <RouterLink to="/" class="nav-link" active-class="active-link" exact>
          Home
        </RouterLink>
        <RouterLink to="/courses" class="nav-link" active-class="active-link">
          Lessons
        </RouterLink>
        <RouterLink to="/cart" class="nav-link" active-class="active-link">
          Cart
        </RouterLink>
        <RouterLink to="/orders" class="nav-link" active-class="active-link">
          Orders
        </RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  background: #f3f4f6;
  color: #020617;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui,
    sans-serif;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 1.8rem;
  background: white;
  box-shadow: 0 8px 30px rgba(15, 23, 42, 0.12);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.brand-logo {
  font-size: 1.9rem;
}

.brand-text h1 {
  font-size: 1.1rem;
  margin: 0;
}

.brand-text p {
  font-size: 0.8rem;
  color: #6b7280;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 0.75rem;
}

.nav-link {
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-size: 0.85rem;
  text-decoration: none;
  color: #374151;
  transition: background 0.15s ease, color 0.15s ease, transform 0.05s ease;
}

.nav-link:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

.active-link {
  background: #16a34a;
  color: white !important;
}

.app-main {
  padding: 1.8rem 1.4rem 2.5rem;
}
@media (max-width: 720px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
  .app-main {
    padding: 1.4rem 1rem 2.2rem;
  }
}
</style>
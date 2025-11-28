<template>
  <div id="app">
    <!-- Top navigation bar -->
    <header class="top-nav">
      <div class="top-nav-inner">
        <div class="brand">After School Classes</div>

        <nav class="nav-links">
          <RouterLink
            to="/"
            class="nav-link"
            active-class="nav-link-active"
          >
            Home
          </RouterLink>
          <RouterLink
                to="/cart"
                class="nav-link"
                active-class="nav-link-active"
                >
                Cart<span v-if="cartCount"> ({{ cartCount }})</span>
              </RouterLink>
        </nav>
      </div>
    </header>

    <!-- This is where pages render -->
    <RouterView />
  </div>
</template>
  <script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";

const cartCount = ref(0);

const updateCartCount = () => {
  const stored = JSON.parse(localStorage.getItem("cart") || "[]");
  cartCount.value = stored.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
};

onMounted(() => {
  updateCartCount();
  window.addEventListener("cart-updated", updateCartCount);
});

onBeforeUnmount(() => {
  window.removeEventListener("cart-updated", updateCartCount);
});
</script>

<style>
body {
  margin: 0;
}

/* Top nav bar */
.top-nav {
  border-bottom: 1px solid #eee;
  background: #ffffff;
}

.top-nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui,
    sans-serif;
}

.brand {
  font-weight: 600;
  font-size: 18px;
}

.nav-links {
  display: flex;
  gap: 18px;
  font-size: 14px;
}

.nav-link {
  text-decoration: none;
  color: #555;
}

.nav-link-active {
  color: #1c7c3c;
  font-weight: 600;
}
</style>
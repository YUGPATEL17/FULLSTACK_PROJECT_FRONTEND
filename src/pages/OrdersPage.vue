<template>
  <main class="page">
    <header class="page-header">
      <div>
        <h1>Orders Admin</h1>
        <p>View all orders placed through the checkout form.</p>
      </div>

      <button class="refresh-btn" @click="fetchOrders" :disabled="loading">
        {{ loading ? "Refreshing..." : "Refresh" }}
      </button>
    </header>

    <section class="content">
      <p v-if="loading">Loading orders...</p>

      <p v-else-if="error" class="error">
        There was a problem loading orders. Please try again.
      </p>

      <p v-else-if="orders.length === 0">
        No orders have been placed yet.
      </p>

      <div v-else class="orders-list">
        <article
          v-for="order in orders"
          :key="order.id"
          class="order-card"
        >
          <header class="order-header">
            <div>
              <h2>Order #{{ order.id }}</h2>
              <p class="order-meta">
                <span><strong>Name:</strong> {{ order.name }}</span>
                <span><strong>Phone:</strong> {{ order.phone }}</span>
              </p>
            </div>
            <p class="order-meta">
              <strong>Placed:</strong>
              {{ formatDate(order.createdAt) }}
            </p>
          </header>

          <ul class="order-items">
            <li v-for="item in order.items" :key="item.id" class="order-item">
              <div>
                <div class="item-title">{{ item.title }}</div>
                <div class="item-meta">
                  Qty: {{ item.quantity }} × £ {{ toMoney(item.price) }}
                </div>
              </div>
              <div class="item-total">
                £ {{ toMoney(item.price * item.quantity) }}
              </div>
            </li>
          </ul>

          <footer class="order-footer">
            <span class="order-total">
              Total: £ {{ toMoney(order.total) }}
            </span>
          </footer>
        </article>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "OrdersPage",
  data() {
    return {
      orders: [],
      loading: false,
      error: false,
    };
  },
  methods: {
    async fetchOrders() {
      this.loading = true;
      this.error = false;
      try {
        const res = await axios.get("http://localhost:4000/api/orders");
        // backend returns { orders: [...] }
        this.orders = Array.isArray(res.data.orders) ? res.data.orders : [];
        console.log("Loaded orders:", this.orders);
      } catch (err) {
        console.error("Error loading orders:", err);
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    toMoney(value) {
      const num = Number(value) || 0;
      return num.toFixed(2);
    },
    formatDate(isoString) {
      if (!isoString) return "Unknown";
      const d = new Date(isoString);
      return d.toLocaleString();
    },
  },
  mounted() {
    this.fetchOrders();
  },
};
</script>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  padding: 3rem 1.5rem 4rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.8rem;
  gap: 1rem;
}

.page-header h1 {
  font-size: 2rem;
}

.page-header p {
  color: #555;
}

.refresh-btn {
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.2rem;
  background: #16a34a;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.15s ease, transform 0.05s ease,
    box-shadow 0.15s ease;
}

.refresh-btn:hover:not(:disabled) {
  background: #15803d;
  transform: translateY(-1px);
  box-shadow: 0 10px 18px rgba(22, 163, 74, 0.35);
}

.refresh-btn:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

.content {
  margin-top: 0.5rem;
}

.error {
  color: #b91c1c;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
  padding: 1rem 1.2rem 1rem;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.order-header h2 {
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}

.order-meta {
  font-size: 0.85rem;
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.order-items {
  list-style: none;
  padding: 0.4rem 0 0.3rem;
  margin: 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.35rem 0;
  font-size: 0.9rem;
}

.item-title {
  font-weight: 500;
}

.item-meta {
  font-size: 0.8rem;
  color: #555;
}

.item-total {
  font-weight: 500;
}

.order-footer {
  margin-top: 0.4rem;
  display: flex;
  justify-content: flex-end;
}

.order-total {
  font-weight: 600;
}
</style>
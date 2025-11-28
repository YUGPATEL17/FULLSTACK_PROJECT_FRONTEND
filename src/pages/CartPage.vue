<template>
  <main class="cart-page">
    <!-- Header -->
    <section class="cart-header">
      <h1>Your Basket</h1>
      <p>Review your lessons, then enter your details to place the order.</p>
    </section>

    <section class="cart-layout">
      <!-- LEFT: Selected lessons -->
      <section class="cart-panel">
        <h2>Selected lessons</h2>

        <div v-if="cart.length === 0" class="empty-cart">
          <p>Your basket is empty.</p>
          <RouterLink to="/" class="btn-link">Browse lessons</RouterLink>
        </div>

        <table v-else class="cart-table">
          <thead>
            <tr>
              <th>Lesson</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
              <td class="lesson-cell">
                <img
                  :src="item.lesson.image"
                  :alt="item.lesson.title"
                  class="lesson-thumb"
                />
                <div>
                  <div class="lesson-title">{{ item.lesson.title }}</div>
                  <div class="lesson-location">📍 {{ item.lesson.location }}</div>
                </div>
              </td>
              <td>£ {{ item.lesson.price.toFixed(2) }}</td>
              <td>
                <div class="qty-controls">
                  <button class="qty-btn" @click="decreaseQuantity(item)">
                    –
                  </button>
                  <span class="qty-value">{{ item.quantity }}</span>
                  <button class="qty-btn" @click="increaseQuantity(item)">
                    +
                  </button>
                </div>
              </td>
              <td>£ {{ (item.lesson.price * item.quantity).toFixed(2) }}</td>
              <td>
                <button class="remove-btn" @click="removeItem(item)">
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="cart.length > 0" class="cart-footer">
          <div class="cart-total">
            <strong>Total:</strong> £ {{ cartTotal.toFixed(2) }}
          </div>
          <button class="btn-outline" @click="clearCart">Clear basket</button>
        </div>
      </section>

      <!-- RIGHT: Checkout form -->
      <section class="checkout-panel">
        <h2>Checkout</h2>
        <p class="checkout-subtitle">
          Enter your details to place the order.
        </p>

        <form @submit.prevent="checkout" class="checkout-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="input"
              @blur="validateName"
            />
            <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              id="phone"
              v-model="phone"
              type="text"
              class="input"
              @blur="validatePhone"
            />
            <p v-if="errors.phone" class="error-text">{{ errors.phone }}</p>
            <p class="help-text">
              We'll use your phone number only to contact you about your booking.
            </p>
          </div>

          <button
            type="submit"
            class="btn-primary"
            :disabled="!isFormValid || isSubmitting"
          >
            <span v-if="isSubmitting">Placing order...</span>
            <span v-else>Checkout</span>
          </button>

          <p v-if="submitStatus" class="status-text">
            {{ submitStatus }}
          </p>
        </form>
      </section>
    </section>
  </main>
</template>

<script>
export default {
  name: "CartPage",

  data() {
    return {
      cart: [],
      name: "",
      phone: "",
      errors: {
        name: "",
        phone: "",
      },
      isSubmitting: false,
      submitStatus: "",
    };
  },

  computed: {
    cartTotal() {
      return this.cart.reduce(
        (sum, item) => sum + item.lesson.price * item.quantity,
        0
      );
    },

    isNameValid() {
      return this.name.trim().length >= 2;
    },

    isPhoneValid() {
      const digits = this.phone.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 11;
    },

    isFormValid() {
      return this.cart.length > 0 && this.isNameValid && this.isPhoneValid;
    },
  },

  methods: {
    loadCart() {
      this.cart = JSON.parse(localStorage.getItem("cart") || "[]");
    },

    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      window.dispatchEvent(new Event("cart-updated"));
    },

    increaseQuantity(item) {
      item.quantity += 1;
      this.saveCart();
    },

    decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        this.saveCart();
      }
    },

    removeItem(item) {
      this.cart = this.cart.filter((c) => c.id !== item.id);
      this.saveCart();
    },

    clearCart() {
      this.cart = [];
      this.saveCart();
    },

    validateName() {
      if (!this.isNameValid) {
        this.errors.name = "Please enter at least 2 characters.";
      } else {
        this.errors.name = "";
      }
    },

    validatePhone() {
      if (!this.isPhoneValid) {
        this.errors.phone = "Please enter a valid 10–11 digit phone number.";
      } else {
        this.errors.phone = "";
      }
    },

    async checkout() {
      // Front-end validation
      this.validateName();
      this.validatePhone();

      if (!this.isFormValid) {
        this.submitStatus =
          "Please fix the errors above and make sure your basket is not empty.";
        return;
      }

      this.isSubmitting = true;
      this.submitStatus = "";

      try {
        const orderPayload = {
          name: this.name.trim(),
          phone: this.phone.trim(),
          total: this.cartTotal,
          items: this.cart.map((item) => ({
            id: item.lesson.id,
            title: item.lesson.title,
            quantity: item.quantity,
            price: item.lesson.price,
          })),
        };

        const response = await fetch("http://localhost:4000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        });

        if (!response.ok) {
          throw new Error("Server returned an error");
        }

        const data = await response.json();
        console.log("Order response:", data);

        alert(`Thank you, ${this.name.trim()} – your order has been placed!`);

        // Clear cart + form
        this.clearCart();
        this.name = "";
        this.phone = "";
        this.submitStatus = "";
      } catch (err) {
        console.error("Checkout error:", err);
        this.submitStatus =
          "There was a problem placing your order. Please try again.";
      } finally {
        this.isSubmitting = false;
      }
    },
  },

  mounted() {
    this.loadCart();
    window.addEventListener("cart-updated", this.loadCart);
  },

  beforeUnmount() {
    window.removeEventListener("cart-updated", this.loadCart);
  },
};
</script>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 40px 80px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui,
    sans-serif;
}

.cart-header h1 {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 8px;
}

.cart-header p {
  font-size: 16px;
  color: #555;
  margin-bottom: 32px;
}

.cart-layout {
  display: grid;
  grid-template-columns: 2fr 1.3fr;
  gap: 30px;
}

.cart-panel,
.checkout-panel {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  padding: 24px 26px 28px;
}

.cart-panel h2,
.checkout-panel h2 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 14px;
}

.checkout-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.empty-cart {
  text-align: center;
  padding: 40px 0 10px;
  font-size: 14px;
  color: #666;
}

.btn-link {
  display: inline-block;
  margin-top: 10px;
  font-size: 14px;
  color: #1c7c3c;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.cart-table th {
  text-align: left;
  padding-bottom: 10px;
  color: #777;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}

.cart-table td {
  padding: 14px 4px;
  vertical-align: middle;
  border-bottom: 1px solid #f3f3f3;
}

.lesson-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lesson-thumb {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
}

.lesson-title {
  font-weight: 600;
}

.lesson-location {
  font-size: 12px;
  color: #777;
}

.qty-controls {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid #ddd;
  overflow: hidden;
}

.qty-btn {
  border: none;
  background: #f5f5f5;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 14px;
}

.qty-value {
  padding: 4px 10px;
  min-width: 24px;
  text-align: center;
}

.remove-btn {
  border: none;
  background: none;
  color: #c0392b;
  cursor: pointer;
  font-size: 13px;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.cart-total {
  font-size: 16px;
}

.btn-outline {
  border-radius: 999px;
  border: 1px solid #ddd;
  background: #fafafa;
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
}

.input {
  width: 100%;
  padding: 9px 12px;
  border-radius: 999px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.help-text {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.error-text {
  font-size: 12px;
  color: #c0392b;
  margin-top: 4px;
}

.btn-primary {
  margin-top: 8px;
  border-radius: 999px;
  border: none;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background: #1c7c3c;
  color: #fff;
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.1s ease;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
}

.btn-primary:disabled {
  background: #cfd8dc;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.status-text {
  font-size: 13px;
  margin-top: 6px;
  color: #555;
}

@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-page {
    padding: 32px 20px 60px;
  }
}
</style>
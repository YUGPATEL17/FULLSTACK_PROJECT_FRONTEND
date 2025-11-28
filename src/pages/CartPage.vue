<template>
  <main class="cart-page">
    <h1>Your Cart</h1>

    <div v-if="cart.length === 0" class="empty">
      <p>Your cart is empty.</p>
    </div>

    <div v-else class="cart-content">
      <!-- Cart items -->
      <div class="cart-list">
        <div
          class="cart-item"
          v-for="item in cart"
          :key="item.id"
        >
          <img :src="item.lesson.image" class="item-image" />

          <div class="item-info">
            <h2>{{ item.lesson.title }}</h2>
            <p>£ {{ item.lesson.price.toFixed(2) }}</p>

            <div class="qty-row">
              <span>Qty:</span>
              <button class="qty-btn" @click="decreaseQuantity(item)">-</button>
              <span class="qty-number">{{ item.quantity }}</span>
              <button class="qty-btn" @click="increaseQuantity(item)">+</button>
            </div>
          </div>

          <button
            class="remove-btn"
            @click="removeItem(item)"
          >
            Remove
          </button>
        </div>

        <div class="cart-total">
          <h3>Total: £ {{ totalPrice.toFixed(2) }}</h3>
        </div>
      </div>

      <!-- Customer details + checkout -->
      <div class="checkout-panel">
        <h2>Customer details</h2>

        <div class="field-row">
          <label for="name">Full name</label>
          <input
            id="name"
            v-model="customerName"
            type="text"
            placeholder="Enter your name"
            @input="clearMessages"
          />
          <p v-if="customerName && !nameValid" class="error">
            Name should contain letters and spaces only.
          </p>
        </div>

        <div class="field-row">
          <label for="phone">Phone number</label>
          <input
            id="phone"
            v-model="customerPhone"
            type="tel"
            placeholder="Enter your phone number"
            @input="clearMessages"
          />
          <p v-if="customerPhone && !phoneValid" class="error">
            Phone should contain numbers only.
          </p>
        </div>

        <!-- extra messages -->
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>

        <!-- CHECKOUT BUTTON: always visible, disabled until valid -->
        <button
          class="checkout-btn"
          :disabled="!canCheckout"
          @click="checkout"
        >
          Place order
        </button>

        <p class="checkout-note">
          This is a demo project — no real payments are processed.
        </p>
      </div>
    </div>
  </main>
</template>

<script>
const NAME_REGEX = /^[A-Za-z ]+$/;   // letters + spaces only
const PHONE_REGEX = /^[0-9]+$/;      // numbers only

export default {
  name: "CartPage",

  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),
      customerName: "",
      customerPhone: "",
      errorMessage: "",
      successMessage: "",
    };
  },

  computed: {
    totalPrice() {
      return this.cart.reduce(
        (sum, item) => sum + item.lesson.price * item.quantity,
        0
      );
    },

    // validation
    nameValid() {
      const value = this.customerName.trim();
      return value.length > 0 && NAME_REGEX.test(value);
    },

    phoneValid() {
      const value = this.customerPhone.trim();
      return value.length > 0 && PHONE_REGEX.test(value);
    },

    // button enabled only when cart has items AND both fields valid
    canCheckout() {
      return this.cart.length > 0 && this.nameValid && this.phoneValid;
    },
  },

  methods: {
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
      window.dispatchEvent(new Event("cart-updated"));
    },

    removeItem(item) {
      this.cart = this.cart.filter((c) => c.id !== item.id);
      this.saveCart();
    },

    increaseQuantity(item) {
      const target = this.cart.find((c) => c.id === item.id);
      if (!target) return;
      target.quantity += 1;
      this.saveCart();
    },

    decreaseQuantity(item) {
      const index = this.cart.findIndex((c) => c.id === item.id);
      if (index === -1) return;

      const target = this.cart[index];
      if (target.quantity > 1) {
        target.quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }

      this.saveCart();
    },

    clearMessages() {
      this.errorMessage = "";
      this.successMessage = "";
    },

    checkout() {
      this.errorMessage = "";
      this.successMessage = "";

      // extra safety – should already be handled by disabled button
      if (!this.nameValid || !this.phoneValid) {
        this.errorMessage =
          "Please enter a valid name (letters and spaces only) and phone number (numbers only).";
        return;
      }

      const cleanName = this.customerName.trim();
      const total = this.totalPrice.toFixed(2);

      // ✅ REQUIRED MESSAGE
      const msg = `Thank you, ${cleanName} – your order has been placed! Total: £${total}.`;

      // show browser alert
      alert(msg);

      // also show on the page
      this.successMessage = msg;

      // ✅ OPTIONAL: clear cart + fields (nice for demo)
      this.cart = [];
      this.customerName = "";
      this.customerPhone = "";
      this.saveCart();
    },
  },
};
</script>

<style scoped>
.cart-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px 60px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui;
}

h1 {
  font-size: 34px;
  font-weight: 700;
  margin-bottom: 20px;
}

.empty {
  margin-top: 40px;
  font-size: 18px;
  color: #777;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1.2fr;
  gap: 24px;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 18px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
}

.item-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 12px;
  margin-right: 20px;
}

.item-info h2 {
  font-size: 18px;
  margin-bottom: 6px;
}

.qty-row {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: none;
  background: #eeeeee;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.qty-btn:hover {
  background: #dddddd;
}

.qty-number {
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  margin-left: auto;
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 12px;
  cursor: pointer;
}
.remove-btn:hover {
  background: #e33b3b;
}

.cart-total {
  margin-top: 4px;
  padding: 16px 18px;
  background: #f7f7f7;
  border-radius: 12px;
  text-align: right;
  font-size: 18px;
  font-weight: 600;
}

/* Checkout panel */
.checkout-panel {
  background: #ffffff;
  padding: 20px 22px 22px;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  align-self: flex-start;
}

.checkout-panel h2 {
  font-size: 20px;
  margin-bottom: 12px;
}

.field-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.field-row label {
  font-size: 13px;
  color: #555;
}

.field-row input {
  padding: 8px 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.field-row input:focus {
  outline: none;
  border-color: #1c7c3c;
}

.error {
  color: #d93025;
  font-size: 13px;
  margin-top: 4px;
}

.success {
  color: #1c7c3c;
  font-size: 13px;
  margin-top: 4px;
}

.checkout-btn {
  width: 100%;
  margin-top: 10px;
  background: #1c7c3c;
  color: #ffffff;
  border: none;
  padding: 10px 16px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

/* always visible, but disabled by CSS when not allowed */
.checkout-btn:disabled {
  background: #c9c9c9;
  cursor: not-allowed;
}

.checkout-btn:not(:disabled):hover {
  background: #155a2f;
}

.checkout-note {
  margin-top: 8px;
  font-size: 12px;
  color: #777;
}

@media (max-width: 800px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style>
import { createRouter, createWebHistory } from "vue-router";

// We will use CoursePage as both Home and Lessons page
import CoursePage from "../pages/CoursePage.vue";
import CartPage from "../pages/CartPage.vue";
import OrdersPage from "../pages/OrdersPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: CoursePage, // Home shows lessons
  },
  {
    path: "/courses",
    name: "courses",
    component: CoursePage, // Lessons button also shows same page
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
  },
  {
    path: "/orders",
    name: "orders",
    component: OrdersPage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
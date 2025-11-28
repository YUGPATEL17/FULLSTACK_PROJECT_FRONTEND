import { createRouter, createWebHistory } from "vue-router";
import CoursePage from "../pages/CoursePage.vue";
import CartPage from "../pages/CartPage.vue";
import CourseDetails from "../pages/CourseDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: CoursePage,
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartPage,
  },
  {
    path: "/course/:id",
    name: "CourseDetails",
    component: CourseDetails,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
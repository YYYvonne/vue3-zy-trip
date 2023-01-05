import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
      // component: HomeView
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home/home.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/views/order/order.vue"),
    },
    {
      path: "/favor",
      name: "favor",
      component: () => import("@/views/favor/favor.vue"),
    },
    {
      path: "/message",
      name: "message",
      component: () => import("@/views/message/message.vue"),
    },
    {
      path: "/city",
      name: "city",
      component: () => import("@/views/city/city.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("@/views/search/search.vue"),
    },
  ],
});

export default router;

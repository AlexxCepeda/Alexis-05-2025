import { createRouter, createWebHistory } from "vue-router";
import MainTemplate from "../views/templates/MainTemplate.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainTemplate,
      redirect: { name: "home" },
      children: [
        {
          name: "home",
          path: "#",
          component: () => import("../views/HomeView.vue"),
        },
        {
          name: "team",
          path: "team",
          component: () => import("../views/TeamView.vue"),
        },
        {
          name: "detail-pokemon",
          path: "team/:id",
          component: () => import("../views/DetailPokemon.vue"),
        },
      ],
    },
  ],
});

export default router;

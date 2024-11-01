import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LayoutDefault from "@/layouts/LayoutDefault.vue";
import Login from "@/views/auth/Login.vue";
import Cookies from "js-cookie";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: LayoutDefault,
      meta: {
        title: "Home",
      },
      children: [
        {
          path: "/",
          name: "home",
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => Login,
    },
    {
      path: "/auth/register",
      name: "register",
      component: () => import('../views/auth/Register.vue'),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFoundPage.vue"),
      meta: {
        title: "Not Found",
      },
    },
    {
      path: "/403",
      name: "forbidden",
      component: () => import("../views/Forbidden.vue"),
      meta: {
        title: "forbidden",
      },
    },

  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get("accessToken");
  if (to.path == "/auth/login" && isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;

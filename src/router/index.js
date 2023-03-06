import Vue from "vue";
import VueRouter from "vue-router";
import userRoutes from "@/router/modules/user.js";
import apartmentRoutes from "@/router/modules/apartment.js";
import indoorDeviceRoutes from "@/router/modules/indoorDevice.js";
import { getToken } from "@/utils/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "layouts-default-index" */
        "@/layouts/default/Index"
      ),
    children: [
      {
        path: "/",
        name: "Dashboard",
        redirect: to => {
          return { path: "/users/user-list" };
        },
        component: () =>
          import(
            /* webpackChunkName: "views-dashboard" */
            "@/views/Dashboard"
          )
      }
    ]
  },
  userRoutes,
  apartmentRoutes,
  indoorDeviceRoutes,
  {
    path: "/authentication",
    component: () =>
      import(
        /* webpackChunkName: "layouts-authentication-index" */
        "@/layouts/authentication/Index"
      ),
    children: [
      {
        path: "sign-in",
        name: "SignIn",
        component: () =>
          import(
            /* webpackChunkName: "views-sign-in" */
            "@/views/authentication/SignIn"
          )
      },
      {
        path: "sign-up",
        name: "SignUp",
        component: () =>
          import(
            /* webpackChunkName: "views-sign-up" */
            "@/views/authentication/SignUp"
          )
      }
    ]
  },
  {
    path: "/page",
    component: () =>
      import(
        /* webpackChunkName: "layouts-page-index" */
        "@/layouts/page/Index"
      ),
    children: [
      {
        path: "product-list",
        name: "ProductList",
        component: () =>
          import(
            /* webpackChunkName: "views-product-list" */
            "@/views/page/ProductList"
          )
      }
    ]
  }
];

const router = new VueRouter({
  mode: process.env.NODE_ENV === "production" ? "hash" : "history",
  base: process.env.BASE_URL,
  routes
});

const whiteList = ["/authentication/sign-in", "/authentication/sign-up"];

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();

  if (hasToken) {
    if (
      to.path == "/authentication/sign-in" ||
      to.path == "/authentication/sign-up"
    ) {
      next({ path: "/users/user-list" });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next("/authentication/sign-in");
    }
  }
});

export default router;

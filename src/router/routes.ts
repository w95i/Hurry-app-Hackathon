const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/homePage.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/register-user",
    name: "register-user",
    component: () => import("../pages/RegisterUser.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/matching",
    name: "matching",
    component: () => import("../pages/MatchingPage.vue"),
    meta: { layout: "default" },
  },
];

export default routes;

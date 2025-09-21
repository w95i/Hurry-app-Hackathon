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
    path: "/finger-matching",
    name: "Finger Matching",
    component: () => import("../pages/MatchingFingerPrint.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/user-management",
    name: "User Management",
    component: () => import("../pages/UserManagement.vue"),
    meta: { layout: "default" },
  },
  {
    path: "/audit-log",
    name: "Audit Log",
    component: () => import("../pages/AuditLog.vue"),
    meta: { layout: "default" },
  }
];

export default routes;

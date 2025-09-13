import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
// import { RouteGuard } from "./RouteGuide";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach(RouteGuard);
export default router;
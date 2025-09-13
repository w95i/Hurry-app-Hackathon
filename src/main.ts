import { createApp } from "vue";
import "./style.css";
import "./assets/styles/tailwind.css";
import App from "./App.vue";
import ui from "@nuxt/ui/vue-plugin";
import router from "./router/index";
import VueNativeSock from "vue-native-websocket-vue3";
import GlobalComponents from "./Plugins/GlobalComponent";

const app = createApp(App);

app.use(router);
app.use(ui);
app.use(GlobalComponents);
if (import.meta.env.VITE_WS_URL) {
  app.use(VueNativeSock, import.meta.env.VITE_WS_URL as string, {
    connectManually: true,
    format: "json",
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
  });
}
app.mount("#app");

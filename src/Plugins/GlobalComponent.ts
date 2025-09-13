import type { App } from "vue";
import { UIInput, UISelect } from "../components/index";

const GlobalComponents = {
  install(app: App) {
    app.component("ui-input", UIInput);
    app.component("ui-select", UISelect);
  },
};

export default GlobalComponents;

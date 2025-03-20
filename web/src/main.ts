/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import { useErrorHandler } from "./composables/utils/useErrorHandler";

const app = createApp(App);

app.config.errorHandler = (err, vm, info) => {
  const { logErrorToConsoleAndNotifyUser } = useErrorHandler();
  logErrorToConsoleAndNotifyUser(err, vm, info);
};

registerPlugins(app);

app.mount("#app");

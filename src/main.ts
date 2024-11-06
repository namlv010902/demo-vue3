import "./assets/base.css";
import store from "./store";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { vueQueryPluginOptions } from './libs/utils/api/QueryClientProvider';

const app = createApp(App);
const toastOptions: ToastContainerOptions = {
  autoClose: 3000,
  position: "top-center",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "colored",
};

app.use(Vue3Toastify, toastOptions as ToastContainerOptions);
app.use(router);
app.use(store);
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.mount("#app");

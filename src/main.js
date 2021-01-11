import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from "axios";

//默认createApp
// createApp(App)
//   .use(store)
//   .use(router)
//   .use(Antd)
//   .mount("#app");

// 之前(Vue 2.x)
// Vue.prototype.$http = () => {}

// 之后(Vue 3.x)
const app = createApp(App);
// app.config.globalProperties.$http = () => {}
app.config.globalProperties.$axios = axios;
/**
 * 在组件调用
 * import {getCurrentInstance} from 'vue';
 * const vm=getCurrentInstance();
 * vm.ctx.$axios
 * 或者解构出来
 * const {ctx} =getCurrentInstance();
 * ctx相当于vue2.0的this
 * 但是由于ctx仅适用开发环境
 * 所以建议使用
 * const {proxy} =getCurrentInstance();
 */
app
  .use(store)
  .use(router)
  .use(Antd)
  .mount("#app");


import { createStore } from "vuex";
import { getCookie,setCookie } from "@/utils/cookie.js";
export default createStore({
  state: {
    selectedKey: 1,
    username: getCookie("username") || "",
  },
  mutations: {
    changeKey(state, key) {
      state.selectedKey = key;
    },
    saveUsername(state, value) {
      setCookie("username",value)
    }
  },
  actions: {},
  modules: {}
});

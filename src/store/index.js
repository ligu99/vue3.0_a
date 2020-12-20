import { createStore } from "vuex";

export default createStore({
  state: {
    selectedKey: 1,
    username: sessionStorage.getItem("username") || ""
  },
  mutations: {
    changeKey(state, key) {
      state.selectedKey = key;
    },
    saveUsername(state, value) {
      state.username = value;
      sessionStorage.setItem("username", value)
    }
  },
  actions: {},
  modules: {}
});

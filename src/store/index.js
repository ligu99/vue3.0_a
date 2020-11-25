import { createStore } from "vuex";

export default createStore({
  state: {
    selectedKey: 1
  },
  mutations: {
    changeKey(state, key) {
      state.selectedKey = key;
    }
  },
  actions: {},
  modules: {}
});

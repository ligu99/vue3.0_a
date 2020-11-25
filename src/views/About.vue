<template>
  <div class="about">
    <h1 @click="changeKey">click</h1>
    <span>{{ key }}</span>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    let store = useStore();
    let key = computed(() => store.state.selectedKey);
    let changeKey = () => {
      store.commit("changeKey", 2);
    };
    return {
      key,
      changeKey
    };
  }
};
</script>

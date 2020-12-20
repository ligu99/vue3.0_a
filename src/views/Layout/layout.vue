<template>
  <div class="home">
    <a-layout class="outwrap">
      <a-layout-sider>
        <navmenu></navmenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header>
          <div class="name">{{username}}</div>
        </a-layout-header>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import navmenu from "@/components/nav.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: {
    navmenu
  },
  setup() {
    let store = useStore();
    let username = computed(() => store.state.username);
    return {
      username
    };
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .ant-layout.ant-layout-has-sider {
    height: 100%;
  }
  .ant-layout {
    height: 100%;
  }
  .ant-layout-sider {
    height: 100%;
    float: left;
    color: #fff;
  }
  .ant-layout-header {
    border-bottom: 1px solid #ccc;
    background: #f0f2f5;
    .name {
      float: right;
    }
  }
  .ant-layout-content {
    min-height: calc(100% - 134px);
  }
  .ant-layout-footer {
    border-top: 1px solid #ccc;
  }
}
</style>

<template>
  <div class="home">
    <a-layout class="outwrap">
      <a-layout-sider>Sider</a-layout-sider>
      <a-layout>
        <a-layout-header>Header</a-layout-header>
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
// import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons-vue';
export default {
  // components: {
  //   UserOutlined,
  //   VideoCameraOutlined,
  //   UploadOutlined,
  // },
  data() {
    return {

    };
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
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
    background: #ccc;
    color: #fff;
  }
  .ant-layout-content {
    min-height: calc(100% - 134px);
  }
}
</style>

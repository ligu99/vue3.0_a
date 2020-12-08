<template>
  <div>
    <a-layout>
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

<style>
</style>
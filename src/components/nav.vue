<template>
  <div class="nav">
    <img src="../assets/logo.png" alt />
    <a-menu
      v-model:selectedKeys="navKeys.selectedKeys"
      v-model:openKeys="navKeys.openKeys"
      mode="inline"
      theme="dark"
      :inlineCollapsed="navKeys.collapsed"
      @select="selectKey"
    >
      <template v-for="item in menuData">
        <a-sub-menu v-if="item.list" :key="item.key">
          <template #title>
            <span>
              <DesktopOutlined />
              <span>{{ item.name }}</span>
            </span>
          </template>
          <a-menu-item v-for="sub in item.list" :key="sub.key">{{ sub.name }}</a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.key">
          <DesktopOutlined />
          <span>{{ item.name }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { DesktopOutlined } from '@ant-design/icons-vue';
import { reactive, onMounted } from 'vue';
import { useRouter } from "vue-router";
export default {
  components: {
    DesktopOutlined
  },
  setup() {
    let navKeys = reactive({
      selectedKeys: [],
      openKeys: [],
      collapsed: false
    });
    let menuData = reactive([
      { name: "首页", key: "Console.index" },
      {
        name: "用户管理",
        key: "user",
        list: [
          { name: "用户首页", key: "User.index" },
          { name: "用户列表", key: "User.userlist" }
        ]
      },
      {
        name: "消息管理",
        key: "mes",
        list: [
          { name: "消息首页", key: "Mse.index" },
          { name: "消息列表", key: "Mse.userlist" }
        ]
      }
    ]);
    let router = useRouter();
    // console.log(router);
    let selectKey = ({ item, key, selectedKeys }) => {
      console.log(item, key, selectedKeys);
      router.push({ name: key });
    };
    onMounted(() => {
      // 刷新高亮当前菜单,如果高亮的是子菜单，则展开对应的一级菜单
      // console.log(router)
      let curPath = router.currentRoute._value.name;
      menuData.map(item => {
        // console.log(item)
        if (item.list) {
          item.list.filter(m => {
            if (m.key === curPath) {
              navKeys.openKeys.push(item.key);
              navKeys.selectedKeys.push(m.key);
              return m;
            }
          });
        } else {
          if (item.key === curPath) {
            navKeys.selectedKeys.push(item.key);
          }
        }
      });
    });
    return {
      navKeys,
      selectKey,
      menuData
    };
  }
}
</script>

<style>
</style>
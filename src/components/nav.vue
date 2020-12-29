<template>
  <div class="nav">
    <img src="../assets/logo.png" alt />
    <a-menu
      v-model:selectedKeys="navKeys.selectedKeys"
      v-model:openKeys="navKeys.openKeys"
      mode="inline"
      theme="dark"
      @select="selectKey"
    >
      <template v-for="item in menuData">
        <a-sub-menu v-if="item.list" :key="item.key">
          <template #title>
            <i :class="[item.icon, 'iconv']"></i>
            <span class="itemname">{{ item.name }}</span>
          </template>
          <a-menu-item v-for="sub in item.list" :key="sub.key">{{ sub.name }}</a-menu-item>
        </a-sub-menu>
        <a-menu-item v-else :key="item.key">
          <i :class="[item.icon, 'iconv']"></i>
          <span class="itemname">{{ item.name }}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useRouter } from "vue-router";
export default {
  components: {

  },
  setup() {
    let navKeys = reactive({
      selectedKeys: [],
      openKeys: []
    });
    let menuData = reactive([
      { name: "首页", key: "Console.index", icon: "icon-shouye" },
      {
        name: "用户管理",
        key: "user",
        icon: "icon-wodeguanzhu",
        list: [
          { name: "用户首页", key: "User.index" },
          { name: "用户列表", key: "User.userlist" }
        ]
      },
      {
        name: "消息管理",
        key: "mes",
        icon: "icon-pinglun",
        list: [
          { name: "消息首页", key: "Mse.index" },
          { name: "消息列表", key: "Mse.userlist" }
        ]
      },
      {
        name: "新闻管理",
        key: "news",
        icon: "icon-xinwen",
        list: [
          { name: "新闻首页", key: "News.index" },
          { name: "新闻列表", key: "News.newslist" }
        ]
      }
    ]);
    let router = useRouter();
    // console.log(router);
    let selectKey = ({ key }) => {
      // console.log(item, key, selectedKeys);
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

<style lang="scss" scoped>
.iconv {
  vertical-align: middle;
  margin-right: 5px;
}
.itemname {
  vertical-align: middle;
}
</style>
<template>
  <div class="about">
    <h1 @click="changeKey">click</h1>
    <span>Vuex</span>
    <p>key:{{ key }}</p>
    <span>ref</span>
    <p>id:{{ id }}</p>
    <span>reactive对象</span>
    <p>name:{{ userData.username }},phone:{{ userData.userphone }}</p>
    <span>reactive数组</span>
    <p>
      <ul>
      <li v-for="(item, index) in userList" :key="index">{{index+1}}.{{ item.name }}，年龄{{ item.age }}</li>
    </ul>
    </p>
    <span>toRefs</span>
    <p>name:{{ username }},phone:{{ userphone }}</p>
    <span>toRefs避坑</span>
    <p>name:{{ user3name }},phone:{{ user3phone }}</p>
    <span>computed </span>
    <p>computed :{{ computedId }}</p>
  </div>
</template>
<script>
import {
  computed,
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onRenderTracked,
  onRenderTriggered
} from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    //Vuex
    let store = useStore();
    let key = computed(() => store.state.selectedKey);
    let changeKey = () => {
      store.commit("changeKey", 2);
    };

    //reactive
    let userData = reactive({
      username: "张三",
      userphone: "13888888888"
    });

    let userList = reactive([
      { name: "张三", age: "18" },
      { name: "李四", age: "28" }
    ]);

    //ref
    let id = ref(1);

    // 获取ref数据的值需要用value
    console.log("获取ref数据的值:", id.value);

    let userData2 = reactive({
      username: "test",
      userphone: "15812341234"
    });
    // toRefs 将响应式对象转换成普通对象
    let resUserData2 = toRefs(userData2);

    // computedID
    let computedId = computed(() => id.value + 1);

    function getUserData() {
      let userData3 = reactive({
        user3name: "王五",
        user3phone: "16612345678"
      });
      // 不用toRefs会用问题
      // return userData3；
      return toRefs(userData3);
    }
    let { user3name, user3phone } = getUserData();
    // 生命周期
    console.log("setup");

    onBeforeMount(() => {
      console.log("onBeforeMount");
    });
    onMounted(() => {
      console.log("onMounted");
    });
    onBeforeUpdate(() => {
      console.log("onBeforeUpdate");
    });
    onUpdated(() => {
      console.log("onUpdated");
    });
    onBeforeUnmount(() => {
      console.log("onBeforeUnmount");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    onRenderTracked(() => {
      console.log("onRenderTracked");
    });
    onRenderTriggered(() => {
      console.log("onRenderTriggered");
    });

    // 测试 onUpdated 相关钩子
    setTimeout(() => {
      id.value = 2;
    }, 2000);
    return {
      key,
      changeKey,
      id,
      userData,
      ...resUserData2,
      computedId,
      userList,
      user3name,
      user3phone
    };
  }
};
</script>

<style lang="scss" scoped>
.about {
  padding: 50px;
  p {
    border-bottom: 1px #ccc solid;
  }
}
</style>

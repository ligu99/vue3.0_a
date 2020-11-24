<template>
  <div class="register">
    <h3>注册</h3>
    <span @click="toLogin">去登录</span>
  </div>
</template>

<script>
export default {
  setup(props, context) {
    let toLogin = () => {
      context.emit("update:changeDisplayValue", "login");
    };
    return {
      toLogin
    };
  }
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background: #212528;
  color: #fff;
}
</style>
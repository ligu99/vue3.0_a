<template>
  <div class="forgetpw">
    忘记密码
    <a-button type="link" @click="toLogin">去登录</a-button>
  </div>
</template>

<script>
export default {
  setup(props, context) {
    // 去登录
    let toLogin = () => {
      context.emit("update:changeDisplayValue", "login");
    };
    return {
      toLogin
    }
  }
};
</script>

<style lang="scss" scoped>
.forgetpw {
  color: #fff;
}
</style>
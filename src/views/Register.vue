<template>
  <div class="register">
    <h3 class="title">注册</h3>
    <div class="form-wrap">
      <div class="toreg" @click="toLogin">去登录</div>
    </div>
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
  .title {
    font-size: 24px;
    font-weight: 600;
    color: royalblue;
    text-align: center;
    padding-top: 50px;
  }
  .form-wrap {
    width: 300px;
    margin: 0 auto;
    label {
      text-align: left;
      color: #fff;
    }
  }
  .toreg {
    text-align: right;
    cursor: pointer;
  }
}
</style>
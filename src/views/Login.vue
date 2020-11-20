<template>
  <div class="login">
    <h3 class="title">Login</h3>
    <div class="form-wrap">
      <a-form :model="formInline" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
        <label>账号：</label>
        <a-form-item>
          <a-input v-model:value="formInline.user" placeholder="Username">
            <template #prefix>
              <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>

        <label>密码：</label>
        <a-form-item>
          <a-input v-model:value="formInline.password" type="password" placeholder="Password">
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button type="primary" block html-type="submit"> 登录 </a-button>
        </a-form-item>
      </a-form>
      <div class="text">
        <span>忘记密码</span>
        <span class="line"></span>
        <span>注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined
  },
  setup() {
    //用reactive定义响应数据
    let formInline = reactive({
      user: "",
      password: ""
    });

    let handleSubmit = e => {
      console.log(e, formInline);
    };

    // 挂载完成
    onMounted(() => {
      console.log("onMounted");
    });
    return {
      formInline,
      handleSubmit
    };
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #212528;
}
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
  .text {
    text-align: center;
    span {
      display: inline-block;
      vertical-align: middle;
      color: #fff;
    }
  }
  .line {
    width: 1px;
    height: 16px;
    background: #fff;
    box-sizing: border-box;
    margin: 0 10px;
  }
}
</style>
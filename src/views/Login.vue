<template>
  <div class="login">
    <h3 class="title">Login</h3>

    <a-form :model="formInline" @submit="handleSubmit">
      <a-form-item>
        <a-input v-model:value="formInline.user" placeholder="Username">
          <template #prefix>
            <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-model:value="formInline.password" type="password" placeholder="Password">
          <template #prefix>
            <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" :disabled="formInline.user === '' || formInline.password === ''">
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</template>

<script>
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined
  },
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    handleSubmit(e) {
      console.log(e, this.formInline);
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 500px;
  margin: 50px auto;
  text-align: left;
  .title {
    font-size: 24px;
    font-weight: 600;
    color: royalblue;
  }
}
</style>
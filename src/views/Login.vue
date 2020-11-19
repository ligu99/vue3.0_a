<template>
  <div class="login">
    <span>login</span>

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
}
</style>
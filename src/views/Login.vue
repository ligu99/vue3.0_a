<template>
  <div class="login">
    <div class="loginBox" v-if="loginData.displayValue === 'login'">
      <h3 class="title">Login</h3>
      <div class="form-wrap">
        <a-form ref="loginForm" :model="formData" :wrapper-col="{ span: 24 }" :rules="rules" @finish="handleFinish">
          <label>账号：</label>
          <a-form-item name="username" required has-feedback>
            <a-input v-model:value="formData.username" placeholder="Username" autocomplete="off">
              <template #prefix>
                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>

          <label>密码：</label>
          <a-form-item name="password" required has-feedback>
            <a-input v-model:value="formData.password" type="password" placeholder="Password" autocomplete="off">
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
          <label>验证码：</label>
          <a-row :gutter="16">
            <a-col :span="18">
              <a-form-item name="code" required has-feedback>
                <a-input v-model:value="formData.code" placeholder="请输入验证码">
                  <template #prefix>
                    <SafetyCertificateOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="6">
              <span class="code">{{ loginData.codeStr }}</span>
            </a-col>
          </a-row>
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button type="primary" block html-type="handleFinish"> 登录 </a-button>
          </a-form-item>
        </a-form>
        <div class=" text">
          <span @click="changeDisplayValue('fotget')">忘记密码</span>
          <span class="line"></span>
          <span @click="changeDisplayValue('register')">注册</span>
        </div>
      </div>
    </div>
    <div class="regBox" v-else-if="loginData.displayValue === 'register'">
      <register @update:changeDisplayValue="changeDisplayValue"></register>
    </div>
    <div class="forgetPw" v-else>
      <forgetpw @update:changeDisplayValue="changeDisplayValue"></forgetpw>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons-vue";
import { validateUsername, validatePassword, validateCode } from "@/utils/validate";
import register from "./Register";
import forgetpw from "./Forgetpw";
export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
    register,
    forgetpw
  },
  setup() {
    //用reactive定义响应数据
    let formData = reactive({
      username: "",
      password: "",
      code: ""
    });

    let loginData = reactive({
      codeStr: "",
      displayValue: "login"
    });
    // 生成验证码
    let getCode = () => {
      loginData.codeStr = "1234";
    };

    // 登录
    let handleFinish = () => {
      console.log(formData);
    };

    let changeDisplayValue = value => {
      console.log(value);
      loginData.displayValue = value;
    };
    // let validateUsername = async (rule, value) => {
    //   let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    //   if (!value) {
    //     return Promise.reject("请输入用户名");
    //   } else if (!reg.test(value)) {
    //     return Promise.reject("用户名格式错误");
    //   } else {
    //     return Promise.resolve();
    //   }
    // };

    // let validatePassword = async (rule, value) => {
    //   let reg = /^(\w){6,20}$/;
    //   if (value === "") {
    //     return Promise.reject("请输入密码");
    //   } else if (!reg.test(value)) {
    //     return Promise.reject("密码格式错误");
    //   } else {
    //     return Promise.resolve();
    //   }
    // };

    let rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

    // 挂载完成
    onMounted(() => {
      getCode();
    });
    return {
      formData,
      changeDisplayValue,
      rules,
      loginData,
      handleFinish
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
      cursor: pointer;
    }
  }
  .line {
    width: 1px;
    height: 16px;
    background: #fff;
    box-sizing: border-box;
    margin: 0 10px;
    cursor: default;
  }
  .code {
    display: block;
    color: #58bc58;
    background: #fff;
    text-align: center;
    letter-spacing: 2px;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
    height: 34px;
    line-height: 34px;
    transform: translateY(5px);
  }
}
</style>
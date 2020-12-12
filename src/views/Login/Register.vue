<template>
  <div class="register">
    <h3 class="title">注册</h3>
    <div class="form-wrap">
      <a-form
        ref="regForm"
        :model="formData"
        :wrapper-col="{ span: 24 }"
        :rules="rules"
        @finish="handleFinish"
        key="regForm"
      >
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
          <a-input
            v-model:value="formData.password"
            type="password"
            placeholder="Password"
            autocomplete="off"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>

        <label>重复密码：</label>
        <a-form-item name="password2" required has-feedback>
          <a-input
            v-model:value="formData.password2"
            type="password"
            placeholder="Password"
            autocomplete="off"
          >
            <template #prefix>
              <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
            </template>
          </a-input>
        </a-form-item>
        <label>验证码：</label>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item name="code" required has-feedback>
              <a-input v-model:value="formData.code" placeholder="请输入验证码">
                <template #prefix>
                  <SafetyCertificateOutlined style="color: rgba(0, 0, 0, 0.25)" />
                </template>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="12">
            <span class="code" v-if="regData.isLoading">
              <a-spin />
            </span>
            <span class="code" v-else>{{ regData.codeStr }}</span>
          </a-col>
        </a-row>
        <!-- 获取验证码 -->
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button
            block
            @click="handleGetCode"
            :disabled="regData.disabled"
          >{{ regData.getCodeText }}</a-button>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 24 }">
          <a-button type="primary" block html-type="handleFinish">注册</a-button>
        </a-form-item>
      </a-form>
      <a-button type="link" class="toreg" @click="toLogin" block>去登录</a-button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { message } from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons-vue";
import { validateUsername, validatePassword, RegCode } from "@/utils/validate";
import { getCodeApi, postApi } from "@/api/login";

export default {
  components: {
    UserOutlined,
    LockOutlined,
    SafetyCertificateOutlined
  },
  setup(props, context) {
    // 表单数据
    let formData = reactive({
      username: "",
      password: "",
      password2: "",
      code: ""
    });
    // 注册组件数据
    let regData = reactive({
      codeStr: "点击下方获取", //验证码
      getCodeText: "获取验证码",
      disabled: false,
      timer: null,
      isLoading: false
    });


    // 点击倒计时
    let timeClick = () => {
      let time = 5;
      regData.getCodeText = `${time}S`;
      regData.timer = setInterval(() => {
        time--;
        if (time <= 0) {
          regData.getCodeText = "获取验证码";
          regData.disabled = false;
          clearInterval(regData.timer);
        } else {
          regData.getCodeText = `${time}S`;
        }
      }, 1000);
    };
    // 获取验证码
    let handleGetCode = async () => {
      let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(formData.username)) {
        regData.isLoading = true;
        let { data } = await getCodeApi({
          url: "	/getSms/",
          data: {
            username: formData.username,
            module: "register"
          }
        });
        regData.isLoading = false;
        regData.codeStr = data.message.slice(-6);
        regData.disabled = true;
        timeClick();
      } else {
        message.error("请输入正确的邮箱地址");
      }
    };
    // 注册
    let handleFinish = async () => {
      console.log(1)
      let { data } = await postApi({
        url: "/register/",
        data: {
          username: formData.username,
          password: formData.password,
          code: formData.code
        }
      });
      console.log(data)
      if (data.resCode === 0) {
        message.success("注册成功！！");
      }
    }
    // 去登录
    let toLogin = () => {
      context.emit("update:changeDisplayValue", "login");
    };
    //验证码
    let validateCode = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入验证码");
      } else if (!RegCode(value)) {
        return Promise.reject("验证码格式错误");
      } else if (value.toUpperCase() === regData.codeStr.toUpperCase()) {
        return Promise.resolve();
      } else {
        return Promise.reject("验证码错误");
      }
    };
    // 重复密码
    let validatePassword2 = async (rule, value) => {
      if (!value) {
        return Promise.reject("请输入重复密码");
      } else if (value === formData.password) {
        return Promise.resolve();
      } else {
        return Promise.reject("重复密码输入有误");
      }
    }
    //验证规则
    let rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      password2: [{ validator: validatePassword2, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

    // 挂载完成
    onMounted(() => { });
    return {
      formData,
      regData,
      rules,
      handleGetCode,
      handleFinish,
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
      font-weight: 600;
      background: #fff;
      text-align: center;
      letter-spacing: 2px;
      border-radius: 5px;
      user-select: none;
      height: 34px;
      line-height: 34px;
      transform: translateY(3px);
    }
  }
  .toreg {
    text-align: right;
    cursor: pointer;
  }
}
</style>
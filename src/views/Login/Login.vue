<template>
  <div class="login">
    <div class="loginBox" v-if="loginData.displayValue === 'login'">
      <h3 class="title">Login</h3>
      <div class="form-wrap">
        <a-form
          ref="loginForm"
          :model="formData"
          :wrapper-col="{ span: 24 }"
          :rules="rules"
          @finish="handleFinish"
          key="loginForm"
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
              <span class="code">{{ loginData.codeStr }}</span>
            </a-col>
          </a-row>
          <!-- 获取验证码 -->
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button
              block
              @click="handleGetCode"
              :disabled="loginData.disabled"
            >{{ loginData.getCodeText }}</a-button>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-button type="primary" block html-type="handleFinish">登录</a-button>
          </a-form-item>
        </a-form>
        <div class="text">
          <span @click="changeDisplayValue('fotget')">忘记密码</span>
          <span class="line"></span>
          <span @click="changeDisplayValue('register')">注册</span>
        </div>
      </div>
    </div>
    <!-- 注册 -->
    <div class="regBox" v-else-if="loginData.displayValue === 'register'">
      <register @update:changeDisplayValue="changeDisplayValue"></register>
    </div>
    <!-- 忘记密码 -->
    <div class="forgetPw" v-else>
      <forgetpw @update:changeDisplayValue="changeDisplayValue"></forgetpw>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { validateUsername, validatePassword, RegCode } from "@/utils/validate";
import register from "./Register";
import forgetpw from "./Forgetpw";
import { getCodeApi, postApi } from "@/api/login";
import md5 from "md5";
export default {
  name: "Login",
  components: {
    UserOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
    register,
    forgetpw
  },
  setup(props, context) {
    console.log(props, context)
    //用reactive定义响应数据
    let formData = reactive({
      username: "",
      password: "",
      code: ""
    });

    let loginData = reactive({
      codeStr: "点击下方获取", //验证码
      displayValue: "login",
      getCodeText: "获取验证码",
      disabled: false,
      timer: null
    });
    // 生成验证码
    // var code = () => {
    //   let str =
    //     "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    //   let code = "";
    //   for (let i = 0; i < 4; i++) {
    //     const num = parseInt(Math.random() * str.length);
    //     code += str[num];
    //   }
    //   return code;
    // };
    // let getCode = () => {
    // axios({
    //   method: "post",
    //   url: "/getSms/",
    //   timeout: 5000,
    //   data: {
    //     username: "415946604@qq.com",
    //     module: "login"
    //   }
    // }).then(response => {
    //   console.log(response.data);
    //   loginData.codeStr = response.data.message.slice(-6);
    // });
    // };

    let timeClick = () => {
      let time = 5;
      loginData.getCodeText = `${time}S`;
      loginData.timer = setInterval(() => {
        time--;
        if (time <= 0) {
          loginData.getCodeText = "获取验证码";
          loginData.disabled = false;
          clearInterval(loginData.timer);
        } else {
          loginData.getCodeText = `${time}S`;
        }
      }, 1000);
    };

    let handleGetCode = async () => {
      let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
      if (reg.test(formData.username)) {
        // 方式一
        // getCodeApi({
        //   url: "/getSms/",
        //   data: {
        //     username: formData.username,
        //     module: "login"
        //   }
        // }).then(data => {
        //   console.log(data);
        // }).catch(err => {
        //   console.log(err);
        // });

        // 方式二
        // let { data } = await getCodeApi({
        //   url: "/getSms/",
        //   data: {
        //     username: formData.username,
        //     module: "login"
        //   }
        // });
        // loginData.codeStr = data.message.slice(-6);
        // loginData.disabled = true;
        // //倒计时点击
        // timeClick();

        // 由于await对失败不关心不处理，可以用下面方式
        // await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
        try {
          let { data } = await getCodeApi({
            url: "/getSms/",
            data: {
              username: formData.username,
              module: "login"
            }
          });
          loginData.codeStr = data.message.slice(-6);
          loginData.disabled = true;
          //倒计时点击
          timeClick();
        } catch (err) {
          console.log("err", err);
        }
      } else {
        message.warning("请输入正确的邮箱地址");
      }
    };

    // 路由
    let router = useRouter();
    // 登录
    let handleFinish = async () => {
      let { data } = await postApi({
        url: "/login/",
        data: formData
      })
      // console.log(data);
      // 因为失败的情况已经被拦截器拦截，所以只有登录成功才会执行以下代码
      message.success(data.message);
      router.push("/home");
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

    let validateCode = async (rule, value) => {
      if (value === "") {
        return Promise.reject("请输入验证码");
      } else if (!RegCode(value)) {
        return Promise.reject("验证码格式错误");
      } else if (value.toUpperCase() === loginData.codeStr.toUpperCase()) {
        return Promise.resolve();
      } else {
        return Promise.reject("验证码错误");
      }
    };

    let rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

    // 挂载完成
    onMounted(() => {
      // md5加密
      console.log(md5("12345678"));//25d55ad283aa400af464c76d713c07ad
    });
    return {
      formData,
      changeDisplayValue,
      rules,
      loginData,
      handleFinish,
      handleGetCode
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
  font-weight: 600;
  font-size: 24px;
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
</style>
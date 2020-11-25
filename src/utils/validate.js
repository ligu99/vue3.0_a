export async function validateUsername(rule, value) {
  let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  if (!value) {
    return Promise.reject("请输入用户名");
  } else if (!reg.test(value)) {
    return Promise.reject("用户名格式错误");
  } else {
    return Promise.resolve();
  }
}

export async function validatePassword(rule, value) {
  let reg = /^(\w){6,20}$/;
  if (value === "") {
    return Promise.reject("请输入密码");
  } else if (!reg.test(value)) {
    return Promise.reject("密码格式错误");
  } else {
    return Promise.resolve();
  }
}

export async function validateCode(rule, value) {
  let reg = /^(\w){4}$/;
  if (value === "") {
    return Promise.reject("请输入验证码");
  } else if (!reg.test(value)) {
    return Promise.reject("验证码格式错误");
  } else {
    return Promise.resolve();
  }
}

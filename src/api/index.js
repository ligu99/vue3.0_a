import axios from "axios";
// import { message } from "ant-design-vue";
import { getCookie } from "@/utils/cookie";
// import router from '../router/index';

const isDev = process.env.NODE_ENV === 'development';

// const baseUrl = isDev ? '/devApi' : 'http://119.23.142.232:12032/devApi';
const baseUrl = isDev ? '' : 'http://119.23.142.232:12032';

const instance = axios.create({
    baseURL: baseUrl
})

// 指定请求超时的毫秒数(0 表示无超时时间)
instance.defaults.timeout = 6000;

// 每一次发送请求前都需要经过这里 - 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log("config", config);
    // 添加请求头测试
    // config.headers["Testaddhed"] = "Testaddhed";
    // 请求头添加token
    config.headers["Tokey"] = getCookie('Authorization');
    config.headers['UserName'] = getCookie('username');
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 每一次拿到数据都需要经过这里 - 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // let { data } = response;
    // if (data.resCode == 401) {//登录过期，跳转到登录
    //     router.push("/login");
    // } else if(data.resCode !== 0){
    //     message.error(data.message);
    //     return Promise.reject(data);
    // }
    // else {
    //     return response;
    // }
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
})

export default instance
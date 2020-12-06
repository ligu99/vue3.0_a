import axios from "axios";
import { message } from "ant-design-vue";

const isDev = process.env.NODE_ENV === 'development';

const baseUrl = isDev ? '/devApi' : '';

const instance = axios.create({
    baseURL: baseUrl
})

// 指定请求超时的毫秒数(0 表示无超时时间)
instance.defaults.timeout = 6000;

// 每一次发送请求前都需要经过这里 - 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 每一次拿到数据都需要经过这里 - 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let { resCode } = response.data;
    if (resCode !== 0) {
        message.error('请求失败');
        return Promise.reject(response);
    } else {
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
})

export default instance
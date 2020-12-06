import request from './index';
//获取登录验证码
export function getCodeApi(params) {
    const { url, data } = params;
    return request.post(url, data);
}

export function postApi(params) {
    const { url, data } = params;
    return request.post(url, data);
}
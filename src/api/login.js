import request from './index';

export function getCodeApi(params) {
    const { url, data } = params;
    return request.post(url, data);
}

export function login(params) {
    const { url, data } = params
    return request.post(url, data)
}
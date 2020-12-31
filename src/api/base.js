import request from './index';

export function getApi(params) {
    const { url } = params;
    return request.get(url);
}

export function postApi(params) {
    const { url, data } = params;
    return request.post(url, data||{});
}

export function getParamsApi(params) {
    const { url, data } = params;
    return request.get(url, { params: data || {} });
}
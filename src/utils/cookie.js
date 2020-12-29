/**

设置cookie，创建一个cookie，在整个站点有效：
cookies.set（'name'，'value')
或 创建一个过期的cookie，该cookie对当前页的路径有效：
cookies.set（'name'，'value'，{expires:7，path:'})

获取cookie：
cookies.get（'name'）；//=>'值'

读取所有可见的Cookie：
cookies.get（）；//=>{name:'value'}

删除Cookie：
cookies.remove（'name'）；

删除对当前页路径有效的cookie：
cookies.set（'name'，'value'，{path:'}）；
cookies.remove（'name'）；//失败！
cookies.remove（'name'，{path:'}）；//remove！

 */

import Cookies from 'js-cookie';
const setCookie=(name,value)=>{
    Cookies.set(name, value,{expires:7});
    return true;
};

const getCookie=(name)=>{
    return Cookies.get(name);
};

const removeCookie=(name)=>{
    Cookies.remove(name);
    return true;
 };

export {setCookie,getCookie,removeCookie}
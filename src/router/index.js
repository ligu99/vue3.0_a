import { createRouter, createWebHistory } from 'vue-router';
import { getCookie } from "@/utils/cookie.js";
// import Home from '../views/Home.vue';
const Layout = () => import(/* webpackeChunkName: "layout" */ '@/views/Layout/layout.vue');
const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue')
  },
  {
    path: '/console',
    name: 'Console',
    // component: () => import(/* webpackChunkName: "console" */ '@/views/Layout/layout.vue'),
    component: Layout,
    children: [
      {
        path: 'index',
        name: "Console.index",
        component: () => import(/* webpackChunkName: "console.index" */ '@/views/Console/index.vue'),
      },
      {
        path: '',
        redirect: "/console/index"
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    // component: () => import(/* webpackChunkName: "User" */ '@/views/Layout/layout.vue'),
    component: Layout,
    children: [
      {
        path: 'index',
        name: "User.index",
        component: () => import(/* webpackChunkName: "user.index" */ '@/views/Usermanage/index.vue'),
      },
      {
        path: 'userlist',
        name: "User.userlist",
        component: () => import(/* webpackChunkName: "user.userlist" */ '@/views/Usermanage/user.vue'),
      }
    ]
  },
  {
    path: '/news',
    name: 'News',
    // component: () => import(/* webpackChunkName: "News" */ '@/views/Layout/layout.vue'),
    component: Layout,
    children: [
      {
        path: 'index',
        name: "News.index",
        component: () => import(/* webpackChunkName: "News.index" */ '@/views/Newsmanage/index.vue'),
      },
      {
        path: 'newslist',
        name: "News.newslist",
        component: () => import(/* webpackChunkName: "News.newslist" */ '@/views/Newsmanage/news.vue'),
      }
    ]
  },
  {
    path: '/mse',
    name: 'Mse',
    // component: () => import(/* webpackChunkName: "Mse" */ '@/views/Layout/layout.vue'),
    component: Layout,
    children: [
      {
        path: 'index',
        name: "Mse.index",
        component: () => import(/* webpackChunkName: "Mse.index" */ '@/views/Msemanage/index.vue'),
      },
      {
        path: 'meslist',
        name: "Mse.meslist",
        component: () => import(/* webpackChunkName: "Mse.meslist" */ '@/views/Msemanage/mse.vue'),
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '@/views/Test.vue')
  },
  {
    name: '404',
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/notFound.vue')
  },
  {
    path: '/:pathMatch(.*)',    // 此处需特别注意至于最底部,这里 vue3.0 写*报错
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (to.path === "/login" && getCookie("Authorization")) {
    next({ path: '/console' });
  } else if (to.path === "/login" && !getCookie("Authorization")) {
    next();//next()默认指向to的参数
  } else {
    //进入非登陆页，校验是否有token
    // console.log(getCookie())
    if (getCookie("Authorization")) {
      // 可以在这里请求接口校验token
      next();
    } else {
      next({ path: '/login' });
    }
  }
});

export default router;

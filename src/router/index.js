import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';

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
    component: () => import(/* webpackChunkName: "console" */ '@/views/Console/layout.vue'),
    children: [
      {
        path: 'index',
        name: "Console.index",
        component: () => import(/* webpackChunkName: "console.index" */ '@/views/Console/index.vue'),
      },
      {
        path: 'userlist',
        name: "Console.userlist",
        component: () => import(/* webpackChunkName: "console.user" */ '@/views/Usermanage/user.vue'),
      },
      {
        path: 'mselist',
        name: "Console.mselist",
        component: () => import(/* webpackChunkName: "console.mse" */ '@/views/Msemanage/mse.vue'),
      },
      {
        path: '',
        redirect: "/console/index"
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

export default router;

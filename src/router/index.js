import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/Login.vue')
  },
  {
    path: '/console',
    name: 'Console',
    component: () => import(/* webpackChunkName: "console" */ '@/views/Console/index.vue'),
    children: [
      {
        path: 'user',
        name: "Console.user",
        component: () => import(/* webpackChunkName: "user" */ '@/views/Console/user.vue'),
      },
      {
        path: 'msg',
        name: "Console.msg",
        component: () => import(/* webpackChunkName: "msg" */ '@/views/Console/msg.vue'),
      },
      {
        path: '',
        redirect: "/console/user"
      }
    ]
  },
  {
    path: '/',
    redirect: '/login'
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
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

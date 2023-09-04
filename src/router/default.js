export default [
    {
        path: "/",
        redirect: "/home",
        meta: {
          keepAlive: false,
        }
      },
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: "home",
        meta: {
          keepAlive: true,
          title: "首页"
        }
      },
      {
        path: '/1',
        component: () => import('@/views/home/home.vue'),
        name: "home",
        meta: {
          keepAlive: true,
          title: "首页"
        }
      },
      {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login'),
        hidden: true,
        meta: {
          keepAlive: false,
          title: "登陆"
        }
      },
]
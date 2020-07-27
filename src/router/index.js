import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import infoManage from './infoManage.js'
import systemManage from './systemManage.js'

// 解决重复点击导航路由报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

Vue.use(VueRouter)

export const routes = [
  //请保持path和name相同,后面keep-alive组件会使用name匹配哪些会被缓存,meta内要写title,permission是判断权限用的
  {
    path: '/',
    name: 'index',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',//每个路径写全,不要简写,左侧导航渲染的时候才不会报错
        name: 'home',
        meta:{title:"首页",permission: "home",icon:'el-icon-s-home',father:'home'},
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
      },
    ]
  },
  infoManage,
  systemManage,
  {
    path: '/login',
    name: 'login',
    meta:{title:"登录",permission: "login"},
    component: Login
  },
  {
    path: '*',
    redirect: '/'
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
]

const router = new VueRouter({
  routes
})

export default router

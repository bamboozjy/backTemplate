import Index from '../views/Index.vue'
const routes = {
  path: '/systemManage',
  name: 'systemManage',
  meta: {
    title:"系统管理",
    permission: "systemManage",
    icon:"glyphicon-cog",
    isMenu:true
  },
  component: Index,
  redirect: '/systemManage/user',
  children: [{
    path: '/systemManage/user',//每个路径写全,不要简写,左侧导航渲染的时候才不会报错
    name: 'user',
    meta: {
      title:"用户管理",
      permission: "user",
      father:'systemManage'//keep-alive组件用到
    },
    component: () => import( /* webpackChunkName: "systemManage" */ '../views/systemManage/user.vue')
  }, {
    path: '/systemManage/role',
    name: 'role',
    meta: {
      title:"角色管理",
      permission: "role",
      father:'systemManage'
    },
    component: () => import( /* webpackChunkName: "systemManage" */ '../views/systemManage/role.vue')
  }, {
    path: '/systemManage/authorization',
    name: 'authorization',
    meta: {
      title:"权限管理",
      permission: "authorization",
      father:'systemManage'
    },
    component: () => import( /* webpackChunkName: "systemManage" */ '../views/systemManage/authorization.vue')
  },]
}

export default routes

import Index from '../views/Index.vue'
const routes = 
{
  path: '/infoManage',
  name: 'infoManage',
  meta: {
    title:"信息管理",
    permission: "infoManage",
    icon:"glyphicon-th-list",
    isMenu:true
  },
  component: Index,
  redirect: '/infoManage/company',
  children: [{
    path: '/infoManage/company',//每个路径写全,不要简写,左侧导航渲染的时候才不会报错
    name: 'company',
    meta: {
      title:"公司管理",
      permission: "company",
      father:'infoManage'//keep-alive组件用到
    },
    component: () => import( /* webpackChunkName: "infoManage" */ '../views/infoManage/company.vue')
  }, {
    path: '/infoManage/site',
    name: 'site',
    meta: {
      title:"直营网点",
      permission: "site",
      father:'infoManage'
    },
    component: () => import( /* webpackChunkName: "infoManage" */ '../views/infoManage/site.vue')
  } ]
}

export default routes

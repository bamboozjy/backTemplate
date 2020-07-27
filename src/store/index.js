import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import {routes} from '../router'
import states from './state.js'
import mutation from './mutation.js'

Vue.use(Vuex)

//递归处理路由为一维数组
export function filterAsyncRoutes(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    // if (hasPermission(tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children)
      }
      if (tmp.path) {
        tmp.meta.active=true
      }
      res.push(tmp)
    // }
  })
  return res
}

export default new Vuex.Store({
  state: {
    isExpend: true,//控制左侧导航展开与折叠,默认展开

    hasXscroll:false,//是否出现横向X轴的滚动条
    scrollLeft:0,//出现横向X轴的滚动条时滚动的距离

    routes,//路由配置json

    tabRoutes:[
      {name:"home",meta:{title:'首页',active:true,father:'home'},path:'/home'},
      // {name:"company",meta:{title:'公司管理'},path:'/infoManage/company'},
      // {name:"siteOperate",meta:{title:'直营网点'},path:'/infoManage/siteOperate'},
      // {name:"site",meta:{title:'非直营网点'},path:'/infoManage/site'},
    ],//激活的keep-alive的tab组件
    alive:[],

    ...states
  },
  mutations: {
    //导航栏展开与折叠
    changeExpend (state) {
      state.isExpend = !state.isExpend
    },
    //监听窗口宽度是否小于1280px
    sizeChange(state,status){
      state.hasXscroll=status
    },
    //监听窗口X轴滚动的距离
    scrollLeftChange(state,x){
      state.scrollLeft=x
    },
    //设置激活的组件
    updateAlive(state){
      let arr=state.tabRoutes.map(v=>{
        // return v.meta.father
        return v.path
      });
      arr=Array.from(new Set(arr))
      state.alive=arr
    },

    //增加/删除/激活keep-alive组件
    changeTabRoutes(state,data){
      if(data.type===1){
        // 增加或重定向
        const index=state.tabRoutes.findIndex(v=>{
          return v.path===data.path
        })
        // console.log(data,index)
        if(index===-1){//新增
          delete data.type
          state.tabRoutes.push(data);
        }
        state.tabRoutes.forEach(v=>{
          v.path===data.path?v.meta.active=true:v.meta.active=false
        })
        state.tabRoutes=Object.assign([],state.tabRoutes)
      }else if(data.type===2){
        // 删除
        const index=state.tabRoutes.findIndex((item)=>{
          return item.path===data.path
        })
        if(state.tabRoutes[index].meta.active){
          router.push(state.tabRoutes[index-1].path)
          state.tabRoutes[index-1].meta.active=true
        }
        state.tabRoutes.splice(index,1);
      }else if(data.type===3){
        // 直接点击tab切换激活的路由
        state.tabRoutes.forEach(v=>{
          v.path===data.path?v.meta.active=true:v.meta.active=false
        })
        state.tabRoutes=Object.assign([],state.tabRoutes)
        // console.log(state.tabRoutes)
      }else if(data.type===4){
        // 全部删除
        state.tabRoutes=[{name:"home",meta:{title:'首页',active:true,father:'home'},path:'/home'},]
      }else if(data.type===5){
        // 删除其他
        let index=null,items=null
        state.tabRoutes.forEach(v=>{
          if(v.path==='/home'&&v.meta.active){
            state.tabRoutes=[state.tabRoutes[0]]
          }else{
            index=state.tabRoutes.findIndex((item)=>{
              items=item
              return item.meta.active
            })
          }
        })
        // console.log(index)
        if(index){
          state.tabRoutes=[{name:"home",meta:{title:'首页',active:false,father:'home'},path:'/home'},]
          state.tabRoutes.push(items)
        }
        // index?state.tabRoutes=Object.assign([],[{name:'首页',path:'/home',active:false}],[state.tabRoutes[index]]):""
        // console.log(state.tabRoutes)
      }
    },
    // addView(state,data){
    //   if (state.tabRoutes.some(v => v.path === data.path)) return;
    //   state.tabRoutes.push(
    //     Object.assign({}, data, {
    //       title: data.meta.title
    //     })
    //   )
    // },
    resetTabRoutes(state,data){
      //重新登录时重置路由(默认有home路由)
      if (state.tabRoutes.some(v => v.path === data.path)) return;
      state.tabRoutes[0].meta.active=false
      // console.log(data)
      data.meta.active=true
      state.tabRoutes.push(data)
    },

    ...mutation
  },
  actions: {
  },
  modules: {
  }
})

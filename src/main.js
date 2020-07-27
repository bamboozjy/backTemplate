import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ajax from './axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/alibabaIcon/iconfont.css'
import './assets/icon/bootstrapIcon/icon.css'
import './assets/commonCss/common.css'

//全局组件使用大驼峰命名,如:MyComponentButton
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/common',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\w+\.(vue|js)$/
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // console.log(fileName,componentConfig)
  // 全局注册组件
  Vue.component(
    fileName.split('/').pop().replace(/\.\w+$/, ''),
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

// import mixins from './common/mixins'
// Vue.mixin(mixins)
Vue.use(Element, {
  size: 'medium' // set element-ui default size
})
Vue.prototype.$http=ajax

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

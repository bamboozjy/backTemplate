import axios from 'axios'
import router from '../router'
import store from '../store'
import {hexSec} from "./md5.js";
import qs from 'qs';
import {
  Message
} from 'element-ui'

// 创建请求配置
const service = axios.create({
  timeout: 10000, // request timeout
  // baseURL: 'http://116.62.65.193:8081/opAdmin' // url = base url + request url
  baseURL: store.state.WEB_PATH // url = base url + request url
  // responseType: "json",
  // withCredentials: true, // 是否允许带cookie这些
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  // }
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // config['Content-Type']= "application/x-www-form-urlencoded"
    // if (localStorage.getItem('rmt_token')) {
    //   // let each request carry rmt_token
    //   // ['rmt_token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers.token = localStorage.getItem('rmt_token')
    // }
    // console.log(hexSec(config),config)
    // return hexSec(config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // 登陆失效或未登录
    if (res.errorCode === 501 ) {
      // 重新登录
      Message.closeAll()
      Message({
        message: '登录失效，请重新登录',
        type: 'error',
        duration: 3000
      })
      // MessageBox.confirm('登录失效，请重新登录', {
      //   confirmButtonText: '重新登录',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      // })
      localStorage.removeItem('rmt_token')
      localStorage.removeItem("cache");
      localStorage.removeItem("pmsCode");
      store.commit("changeTabRoutes", { type: 4 });
      store.commit("resetCache");
      router.replace({path:'/login',query:{url:location.href.split("#")[1]}})
      // return Promise.reject(new Error(res.errorMsg || 'Error'))
      return res.errorMsg
    } else {
      return res
    }
  },
  error => {
    console.log('error:' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3000
    })
    return Promise.reject(error)
  }
)

//封装
let CancelToken = axios.CancelToken;
const http = {
  get: (url, params, baseurl) => {
    url = url + "?" + (params ? (qs.stringify(params) + '&') : '') + (localStorage.getItem("rmt_token") ? "token=" + localStorage.getItem("rmt_token") : "token=undefined")
    return new Promise((resolve,reject)=>{
      service({
        method: 'get',
        // url: `${baseurl?baseurl:store.state.WEB_PATH}${url}`,
        url: url,
        cancelToken: new CancelToken(function executor(c) {
          http.cancel = c
        })
      }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  },

  post: (url, params, baseurl) => {
    // console.log(`${baseurl?baseurl:store.state.WEB_PATH}${url}`)
    url = url + (localStorage.getItem("rmt_token") ? "?token=" + localStorage.getItem("rmt_token") : "?token=undefined")
    return new Promise((resolve,reject)=>{
      service({
        method: 'post',
        // url: `${baseurl?baseurl:store.state.WEB_PATH}${url}`,
        url: url,
        data: params,
        cancelToken: new CancelToken(function executor(c) {
          http.cancel = c
        })
      }).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}

export default http

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
// export default {
//   install: function (Vue, Option) {
//     Object.defineProperty(Vue.prototype, '$http', { value: service })
//   }
// }

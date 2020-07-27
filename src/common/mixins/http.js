/**
 * http请求后台服务模块
 */
import axios from 'axios';
import qs from 'qs';
import layer from "layui-layer";

let CancelToken = axios.CancelToken;
const http = {
  get: (url, params) => {
    url = url + "?" + (params ? (qs.stringify(params) + '&') : '') + (sessionStorage.getItem("rmt_token") ? "token=" + sessionStorage.getItem("rmt_token") : "token=undefined")
    return axios({
        method: 'get',
        url: `${$_domain.WEB_PATH}${url}`,
        cancelToken: new CancelToken(function executor(c) {
          http.cancel = c   
        })
      })
      .then(r => r.data)
      .then(r => {
        if (r.status == 1) {
          return r.data;
        } else {
          if (r.errorCode == "501") {
            layer.msg("用户未登录，请重新登录", {
              icon: 2,
              time: 1500
            }, function () {
              location.href = 'index.html'
            })
          } else {
            layer.msg(r.errorMsg, {
              icon: 2,
              time: 1000
            })
          }
        }
        throw r;
      }).catch((e) => {});
  },

  post: (url, params) => {
    url = url + (sessionStorage.getItem("rmt_token") ? "?token=" + sessionStorage.getItem("rmt_token") : "?token=undefined")
    return axios({
        method: 'post',
        url: `${$_domain.WEB_PATH}${url}`,
        data: params,
        cancelToken: new CancelToken(function executor(c) {
          http.cancel = c   
        })
      })
      .then(r => r.data)
      .then(r => {
        if (r.status == 1) {
          return r.data;
        } else {
          if (r.errorCode == 501) {
            layer.msg("用户未登录，请重新登录", {
              icon: 2,
              time: 1500
            }, function () {
              location.href = 'index.html'
            })
          } else {
            layer.msg(r.errorMsg, {
              icon: 2,
              time: 1000
            })
          }
        }
        throw r;
      }).catch((e) => {});
  }
}
export default window.$_http = http;
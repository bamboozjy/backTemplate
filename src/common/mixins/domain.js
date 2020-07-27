/**
 * 当前应用域名地址模块
 */
let WEB_HTTP = 'http';
let WEB_HOST = '116.62.65.193:8081';
//let WEB_HOST = '39.106.109.101:8081';
let WEB_NAME = 'opAdmin';

let DOOR_HOST = '47.93.11.102:8088';
//let DOOR_HOST = '47.111.160.164:8080';
let DOOR_NAME = 'DoorStatus';

let TIMER_HOST = '47.111.160.164:8081';
//let TIMER_HOST = '47.111.160.164:8081';
let TIMER_NAME = 'Timer';

if (location.protocol == 'https:') {
  WEB_HTTP = 'https';
}
if (location.hostname != 'localhost' && location.hostname.indexOf('inter') === -1&&location.hostname != '192.168.2.22') {
  WEB_HOST = location.host;
}
if (location.pathname && location.pathname != '/') {
  let name = location.pathname.split('?')[0];
  name = name.split('/')[1];
  if (name.indexOf('.') == -1) {
    WEB_NAME = name;
  }
}
export default window.$_domain = {
  WEB_HOST: WEB_HOST, // ip:port
  WEB_ROOT: WEB_HTTP + '://' + WEB_HOST, // http://ip:port
  WEB_PATH: WEB_HTTP + '://' + WEB_HOST + '/' + WEB_NAME, // http://ip:port/admin
  WEB_NAME: WEB_NAME,
  DOOR_HOST: DOOR_HOST, // ip:port
  DOOR_ROOT: WEB_HTTP + '://' + DOOR_HOST, // http://ip:port
  DOOR_PATH: WEB_HTTP + '://' + DOOR_HOST + '/' + DOOR_NAME, // http://ip:port/DoorStatus
  DOOR_NAME: DOOR_NAME,
  TIMER_HOST: TIMER_HOST, // ip:port
  TIMER_ROOT: WEB_HTTP + '://' + TIMER_HOST, // http://ip:port
  TIMER_PATH: WEB_HTTP + '://' + TIMER_HOST + '/' + TIMER_NAME, // http://ip:port/Timer
  TIMER_NAME: TIMER_NAME,
};
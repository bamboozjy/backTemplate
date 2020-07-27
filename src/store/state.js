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
// if (location.hostname != 'localhost' && location.hostname.indexOf('inter') === -1 && location.hostname != '192.168.2.22') {
//   WEB_HOST = location.host;
// }
// if (location.pathname && location.pathname != '/') {
//   let name = location.pathname.split('?')[0];
//   name = name.split('/')[1];
//   if (name.indexOf('.') == -1) {
//     WEB_NAME = name;
//   }
// }

let zindex = 2000

let obj = {
  //用户信息
  cache: {
    user: null, //用户对象
    role: null, //用户角色
    manage_site: null, //用户管理车场
    permission: null, //用户权限列表
    site_id: null, //车场id
    plate_name: "任马停业务管理平台"
  },

  //当前应用域名地址模块
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

  /**
   * 皮肤样式主题模块
   */
  style: {
    black: {
      color: '#243340', //主打字体颜色
      header_back_color: '#3C464F', //导航栏背景颜色
      menubar_back_color: '#243340', //导航栏中logo背景颜色
      bar_color: "#CCCCCC", //导航栏字体颜色
      unselect_color: '#6B7279', //菜单栏未选中字体色
      unselect_bg_color: '#ffffff', //菜单栏未选中背景色
      selected_color: '#243340', //菜单栏选中字体颜色
      selected_bg_color: "#EBEFF2", //菜单栏选中背景色  
    },
    blue: {
      color: '#243340', //主打字体颜色
      header_back_color: '#0C6FF8', //导航栏背景颜色
      menubar_back_color: '#0A5FD5', //导航栏中logo背景颜色
      bar_color: "#ffffff", //导航栏字体颜色
      unselect_color: '#6B7279', //菜单栏未选中字体色
      unselect_bg_color: '#ffffff', //菜单栏未选中背景色
      selected_color: '#243340', //菜单栏选中字体颜色
      selected_bg_color: "#EBEFF2", //菜单栏选中背景色
    },
    purple: {
      color: '#243340', //主打字体颜色
      header_back_color: '#674598', //导航栏背景颜色
      menubar_back_color: '#532D89', //导航栏中logo背景颜色
      bar_color: "#ffffff", //导航栏字体颜色
      unselect_color: '#6B7279', //菜单栏未选中字体色
      unselect_bg_color: '#ffffff', //菜单栏未选中背景色
      selected_color: '#243340', //菜单栏选中字体颜色
      selected_bg_color: "#EBEFF2", //菜单栏选中背景色
    },
    green: {
      color: '#243340', //主打字体颜色
      header_back_color: '#69B076', //导航栏背景颜色
      menubar_back_color: '#45A056', //导航栏中logo背景颜色
      bar_color: "#ffffff", //导航栏字体颜色
      unselect_color: '#6B7279', //菜单栏未选中字体色
      unselect_bg_color: '#ffffff', //菜单栏未选中背景色
      selected_color: '#243340', //菜单栏选中字体颜色
      selected_bg_color: "#EBEFF2", //菜单栏选中背景色
    },
    orange: {
      color: '#243340', //主打字体颜色
      header_back_color: '#EA5506', //导航栏背景颜色
      menubar_back_color: '#D3510C', //导航栏中logo背景颜色
      bar_color: "#ffffff", //导航栏字体颜色
      unselect_color: '#6B7279', //菜单栏未选中字体色
      unselect_bg_color: '#ffffff', //菜单栏未选中背景色
      selected_color: '#243340', //菜单栏选中字体颜色
      selected_bg_color: "#EBEFF2", //菜单栏选中背景色
    },
  },

  theme: {
    bg_color: '#F2F6F9', //背景颜色
    border_color_dark: '#AEBAC5', //边框深色
    border_color_light: '#D6D6D6', //边框浅色
    alternate_colors: ['#FFFFFF', '#FAFAFA'], //交替颜色(用于表格类的间隔行底色)
    list_hover_color: '#FCF0C1', //鼠标浮动颜色(用于选中表格、列表等的鼠标经过的底色)
    inputHeight: 32, //输入框默认高度
    buttonBarHeight: 40,//tab栏高度
    menuWidth: 150,
    minWidth: 824,
    headerHeight: 60,
    menu_boxshadow: "rgba(204,204,204,0.5)", //菜单栏右侧阴影
    button_bar_back_color: "#fff", //tab栏背景色
    button_bar_border_color: "#eee", //tab栏边框
    button_bar_select_back_color: '#3C464F', //tab栏选中背景颜色
    button_bar_unselect_back_color: '#fff', //tab栏未选中背景颜色
    button_bar_select_color: '#fff', //tab栏选中字符颜色
    button_bar_unselect_color: '#6B7279', //tab栏未选中字符颜色
    zindex: () => zindex++,
    rgba: (rgba, a) => {
      return rgba.replace(',1)', ',' + a + ')');
    }
  },

}
export default obj

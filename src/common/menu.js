export function getMenu() {
  let menu = {};
  menu.map = [{
    name: "信息管理",
    id: "info",
    pid: null,
    open: false,
    icon: "glyphicon-th-list"
  }, {
    name: "公司管理",
    id: "company",
    pid: "info",
    permission: "company",
    path: "Company"
  }, {
    name: "直营网点",
    id: 'siteOperate',
    pid: "info",
    permission: "siteOperate",
    path: "Operatesite",
  }, {
    name: "非直营网点",
    id: 'site',
    pid: "info",
    permission: "site",
    path: "Site",
  }, {
    name: "在线车场",
    id: "onlineSite",
    pid: "info",
    permission: "onlineSite",
    path: "Onlinesite",
  }, {
    name: "道闸信息",
    id: "gate",
    pid: "info",
    permission: "gate",
    path: "Gate",
  }, {
    name: "地锁信息",
    id: "lock",
    pid: "info",
    permission: "lock",
    path: "Lock",
  }, {
    name: "故障信息",
    id: 'fault',
    pid: "info",
    permission: "fault",
    path: "Fault",
  }, {
    name: "故障标签",
    id: 'faultTag',
    pid: "info",
    permission: "faultTag",
    path: "Faulttag",
  }, {
    name: "车位信息",
    id: 'park',
    pid: "info",
    permission: "park",
    path: "Park",
  }, {
    name: "价格信息",
    id: 'price',
    pid: "info",
    permission: "price",
    path: "Price",
  }, {
    name: "车辆管理",
    id: 'infoSiteFreeuser',
    pid: "info",
    permission: "infoSiteFreeuser",
    path: "Freecar",
  }, {
    name: "住宿管理",
    id: 'runHotelCheckin',
    pid: "info",
    permission: "runHotelCheckin",
    path: "Hotel",
  }, {
    name: "亲情卡车辆",
    id: 'infoFamilyCar',
    pid: "info",
    permission: "infoFamilyCar",
    path: "Familycar",
  }, {
    name: "访客预约信息",
    id: 'visitorAppoint',
    pid: "info",
    permission: "visitorAppoint",
    path: "Visitor",
  }, {
    name: "快速通道",
    id: 'greenChannel',
    pid: "info",
    permission: "greenChannel",
    path: "Greenchannel",
  }, {
    name: "本地数据查询",
    id: 'localDataSearch',
    pid: "info",
    permission: "localDataSearch",
    path: "Localdata",
  }, {
    name: "远程对账",
    pid: "info",
    id: 'checkFinance',
    permission: "checkFinance",
    path: "Checkfinance",
  }, {
    name: "订单管理",
    id: "order",
    pid: null,
    open: false,
    icon: "glyphicon-duplicate"
  }, {
    name: "线上订单",
    id: 'onlineLease',
    pid: 'order',
    permission: "onlineLease",
    path: "Onlineorder",
  }, {
    name: "线下订单",
    id: 'lineLease',
    pid: 'order',
    permission: "lineLease",
    path: "Offlineorder",
    //}, {
    //  name: "预约订单",
    //  id: 'appointLease',
    //  pid: 'order',
    //  permission: "appointLease",
    //  path: "Appointlease",
    //}, {
    //  name: "异常记录",
    //  id: 'errorLease',
    //  pid: 'order',
    //  permission: "errorLease",
    //  path: "Errorlease",
  }]
  let tree = []
  menu.map.forEach(obj => {
    if (!obj.pid) {
      obj.children = []
      tree.push(obj)
    }
  })
  let permission = $_cache.permission.split(";");
  for (let i = 0; i < menu.map.length; i++) {
    if (menu.map[i].pid) {
      for (let j = 0; j < tree.length; j++) {
        if (menu.map[i].pid == tree[j].id) {
          if (permission.indexOf(`${menu.map[i].permission}:view`) != -1) { //权限判断处理
            tree[j].children.push(menu.map[i])
          }
        }
      }
    }
  }
  tree.forEach((obj, index) => { //权限处理
    if (!obj.children.length) {
      tree.splice(index, 1)
    }
  })
  menu.tree = tree
  return menu
}
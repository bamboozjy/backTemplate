let obj = {
  //用户信息初始化
  cacheInit(state, result) {
    state.cache.user = result ? result : null;
    if (result) {
      state.cache.role = result.role ? result.role : null;
      state.cache.manage_site = result.manage_site ? result.manage_site : null;
      state.cache.permission = result.permission ? result.permission : null;
      state.cache.site_id = result.site_id ? result.site_id : null;
    } else {
      state.cache.role = null;
      state.cache.manage_site = null;
      state.cache.permission = null;
      state.cache.site_id = null;
    }
  },
  resetCache(state) {
    state.cache = {
      user: null, //用户对象(存储了登录时后台返回的所有信息)
      role: null, //用户角色

      site_id: null, //车场id(存在时默认管理一个车场,否则就是管理员可以管理所有车场)
      manage_site: null, //用户管理车场的id集合,逗号隔开的字符串(存在表示在默认管理的一个车场外,还管理了其他车场)

      permission: null, //用户权限列表
      plate_name: "任马停业务管理平台", //平台名称
    }
  },
  //主题更换
  themeChange(state, name) {
    localStorage.setItem('theme', name)
    let data = Object.assign({}, state.theme, state.style[name]);//引用类型监听不到,故用assign
    state.theme = data;
  }
}
export default obj

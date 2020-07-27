/**
 * 全局数据缓存模块
 */
let cache = {
  user: null, //用户对象
  role: null, //用户角色
  manage_site: null, //用户管理车场
  permission: null, //用户权限列表
  site_id: null, //车场id
  plate_name:"任马停业务管理平台"
};
cache.init = result => {
  cache.user = result ? result : null;
  if (result) {
    cache.role = result.role ? result.role : null;
    cache.manage_site = result.manage_site ? result.manage_site : null;
    cache.permission = result.permission ? result.permission : null;
    cache.site_id = result.site_id ? result.site_id : null;
  } else {
    cache.role = null;
    cache.manage_site = null;
    cache.permission = null;
    cache.site_id = null;
  }
};
export default window.$_cache = cache;
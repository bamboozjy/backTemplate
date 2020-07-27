/**
 * 将通用数据做为全局
 */
import './domain.js'
import './theme.js'
import './cache.js'
// import './http.js';

let seed = 0
window.$_uuid = name => name + (seed++)

export default {
  data () {
    return {
      theme: window.$_theme
    }
  },

  computed: {
    $_domain: () => window.$_domain,
    $_cache: () => window.$_cache
    // $_http: () => window.$_http,
  }
}

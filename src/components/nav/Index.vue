<template>
  <div
    class="nav"
    ref="navBox"
    :style="{background: '#fff',width:isCollapse?'200px':'50px',transition: 'all 0.3s'}"
  >
    <el-menu
      class="el-menu-vertical"
      ref="elMenuVertical"
      :default-active="defaultActive"
      :collapse-transition="false"
      :unique-opened="true"
      :router="true"
      :collapse="!isCollapse"
      text-color="#6B7279"
      active-text-color="#243340"
      background-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <!-- :background-color="theme.header_back_color" -->
      <template v-for="item in routers">
        <el-submenu :index="item.path" v-if="item.children&&item.children.length&&item.meta.isMenu">
          <template slot="title">
            <i class="icon glyphicon" :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
          <el-menu-item
            :index="val.path"
            :route="val.path"
            v-for="val in item.children"
            :key="val.name"
          >
            <template slot="title">
              <!-- <i class="icon iconfont">*</i> -->
              <span>{{val.meta.title}}</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item :index="item.path" :route="item.path" v-else-if="item.path!=='/home'">
          <template slot="title">
            <i class="icon glyphicon" :class="item.meta.icon"></i>
            <span>{{item.meta.title}}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import {routes} from "../../router/index.js";
export default {
  data() {
    return {
      defaultActive: "/home"
      //  [
      //   {
      //     name: "信息管理",
      //     path: "infoManage",
      //     permission: "infoManage",
      //     icon: "glyphicon-th-list",
      //     children: [
      //       {
      //         name: "公司管理",
      //         path: "company",
      //         permission: "company",
      //       },
      //     ]
      //   },
      // ]
    };
  },
  computed: {
    routers(){
      //还需要过滤有权限的路由
      // return routes[0].children
      let arr=[]
      routes.map(v=>{
        if(v.path!=='/'&&v.path!=='/login'&&v.path!=='*'){
          arr.push(v)
        }
      })
      console.log(arr)
      return arr
    },
    isCollapse() {
      return this.$store.state.isExpend;
    },
    theme() {
      return this.$store.state.theme;
    },
    tabRoutes() {
      return this.$store.state.tabRoutes;
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    handleSelect(path, arr) {
      let data = {};
      this.routers.forEach(v => {
        if (v.children && v.children.length) {
          v.children.forEach(val => {
            val.path === path ? (data = val) : "";
          });
        } else {
          v.path === path ? (data = v) : "";
        }
      });
      // console.log(path, arr, data,this.routers);
      this.$store.commit("changeTabRoutes", { type: 1, ...data });
      if (this.$route.path === path) {
        this.$forceUpdate();
      }
    }
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        this.defaultActive = newValue.path;
        if(newValue.path==='/home'){
          // console.log(this.$refs.elMenuVertical)
          if(this.$refs.elMenuVertical){//path==='/home',刷新页面时,由于立刻监听,该节点还未挂载
            this.routers.forEach(v=>{
              this.$refs.elMenuVertical.close(v.path)//折叠导航栏
            })
          }
        }
      },
      // deep: true,
      immediate: true
    }
  },
  updated() {
    // console.log("update");
  },
  mounted () {
    // console.log(this.routers);
  },
};
</script>

<style lang="less" scoped>
.glyphicon {
  top: 0 !important;
  margin-right: 5px;
}
.nav>.el-menu {
  // transition: all 0.3s;
  &::-webkit-scrollbar {/* 设置滚动条的样式 */
    width: 6px;
    height: 6px;
  } 
  &::-webkit-scrollbar-track {/* 滚动槽 */
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.1);
  } 
  &::-webkit-scrollbar-thumb {/* 滚动条滑块 */
    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}
/deep/.el-menu {
  height: 100%;
  overflow: hidden auto;
  border-right: none;
  .el-menu{
    overflow: hidden;
  }
  i {
    color: #6b7279 !important;
  }
  .el-submenu__title {
    height: 40px;
    line-height: 40px;
  }
  .el-menu-item {
    height: 30px;
    line-height: 30px;
  }
  .el-menu-item.is-active {
    border-left: 2px solid #243340;
    background: #dadee1 !important;
    span {
      font-weight: 900 !important;
    }
  }
  .is-opened {
    background: #ebeff2 !important;
    .el-submenu__title,
    .el-menu-item {
      background: #ebeff2;
    }
    .el-submenu__title {
      span,
      i {
        font-weight: 900 !important;
        color: #243340 !important;
      }
    }
  }
  .el-menu-item:hover {
    background: #dadee1 !important;
  }
}
//折叠时弹出层样式
.el-menu--vertical{
  .el-menu--popup{
    .el-menu-item{
      height: 30px;
      line-height: 30px;
    }
  }
}
/deep/.el-menu--collapse {
  width: 50px;
  transition: all 0.3s;
  border-right: none;
}
</style>
<style lang="less">
// 控制折叠菜单悬浮时的样式
.el-menu-item {
  height: 40px;
  line-height: 40px;
}
.el-menu-item.is-active {
  border-left: 2px solid #243340;
  background: #dadee1 !important;
  span {
    font-weight: 900 !important;
  }
}
</style>
<template>
  <div class="views">
    <transition name="fade-transform" mode="out-in">
      <!-- include 和 exclude:会被缓存和不会被缓存,组件路由的 name 选项,可以用逗号分隔字符串、正则表达式或一个数组来表示 -->
      <!-- max:最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉 -->
      <keep-alive :include="aliveArr" :max="20">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name:"mains",//必须要有这个组件名称,不然keep-alive组件不会生效,匿名组件不会被缓存!
    computed: {
      aliveArr() {
        let arr=this.$store.state.tabRoutes.map(v=>{
          return v.name
        });
        arr=Array.from(new Set(arr))
        console.log('alive change',arr)
        return arr
        //要加上这些父组件(infoManage,orderManage,...)的name,不然子组件不会被缓存下来,注意父组件需要写明组件名称,即name选项一定要有
        // let arr=[]
        // if(this.$store.state.routes[0].children){
        //   this.$store.state.routes[0].children.forEach(v => {
        //     arr.push(v.name)
        //   });
        // }
        // console.log(this.$store.state.tabRoutes,this.$store.state.routes[0].children,arr)

        // this.$store.commit('updateAlive')
        // console.log('alive change',this.$store.state.alive)
        // return this.$store.state.alive
      },
      key() {
        return this.$route.path;
      },
    },
  }
</script>

<style lang="less" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
}
.fade-transform-enter {
  opacity: 0;
  // transform: translateX(30px);
}
.fade-transform-leave-to {
  opacity: 0;
  // transform: translateX(-30px);
}
.views {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  position: relative;//弹窗定位父级
  &::-webkit-scrollbar {/* 设置滚动条的样式 */
    width: 8px;
    height: 8px;
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
</style>

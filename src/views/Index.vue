<template>
  <div class="index">
    <!-- <Header /> -->
    <div class="main">
      <Nav class="nav" />
      <div class="content">
        <Tabs></Tabs>
        <Mains></Mains>
        <div class="footer">©2018~{{date}} 浙江电马云车科技有限公司</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/header/Index.vue";
import Nav from "@/components/nav/Index.vue";
import Tabs from "@/components/tab/Index.vue";
import Mains from "@/views/Mains.vue";

export default {
  name: "Index",
  components: {
    Header,
    Nav,
    Tabs,
    Mains
  },
  provide () {
    return {
      pmsCode: localStorage.getItem('pmsCode')
    }
  },
  data() {
    return {
      showMain:true,
      date: new Date().getFullYear(),
      app:null,
    };
  },
  methods: {
    name() {}
  },
  beforeDestroy(){
    window.onresize=null;
    this.app.onscroll=null;
  },
  created() {
    //初始化一次,防止最开始窗口高度小于1280
    if(document.body.offsetWidth<1280){
      this.$store.commit('sizeChange',true)
    }else{
      this.$store.commit('sizeChange',false)
    }
    window.onresize=e=>{
      if(document.body.offsetWidth<1280){
        this.$store.commit('sizeChange',true)
      }else{
        this.$store.commit('sizeChange',false)
      }
      // console.log(document.body.offsetWidth)
    }
    this.app=document.getElementById("app");
    this.app.onscroll=e=>{
      // console.log(this.app.scrollLeft)
      this.$store.commit('scrollLeftChange',this.app.scrollLeft)
    }

    this.$bus.$on('reloadMainPage',d=>{
      d?this.showMain=false:this.showMain=true
    })
    this.$store.commit("themeChange", localStorage.getItem("theme") || "black");
    this.$store.commit("cacheInit", JSON.parse(localStorage.getItem("cache")));
    // if (!localStorage.getItem("rmt_token")) {
    //   this.$router.replace("/login");
    // } else {
    // }
  }
};
</script>

<style lang="less" scoped>

.index {
  height: 100%;
  min-width: 1280px;
  display: flex;
  flex-direction: column;
  // /deep/.header{

  // }
}
.main {
  flex: 1 0 auto;
  display: flex;
  height: calc(100% - 60px);
  .nav {
    flex-shrink:0;
    height: 100%;
    overflow: auto;
    border-right: 1px solid rgba(204, 204, 204, 0.5);
  }
  .content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .tabCont{
      flex-shrink: 0;
    }
    .footer{
      flex-shrink: 0;
      border-top: 1px solid #DBDBDB;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 13px;
    }
  }
}
</style>
<template>
  <div class="header flexc">
    <div class="name" :style="{
      background: theme.menubar_back_color,
      color: theme.bar_color,
      width:expend?'200px':'50px'
    }">
      <img src="@/assets/main/header/logo.png" alt="任马停" />
      <h1 v-if="expend">{{backName}}</h1>
    </div>
    <div class="tools flexsbc" :style="{
      background: theme.header_back_color,
      color: theme.bar_color}">
      <div
        @click="setExpend"
        class="controlBox flexcc"
        :style="{background:hoverStyle1}"
        @mouseover.self="mouseEnter(1)"
        @mouseleave="mouseLeave(1)"
      >
        <i :class="['controlIcon',expend?'el-icon-s-fold':'el-icon-s-unfold']" />
      </div>
      <div class="toolBox flex">
        <div
          v-if="isAdmin"
          :style="{background:hoverStyle6}"
          class="flexcc item"
          @mouseover.self="mouseEnter(6)"
          @mouseleave="mouseLeave(6)"
        >
          <i class="glyphicon glyphicon-equalizer"></i>
          <el-select v-model="company" @change="companyChange" placeholder="请选择公司">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <el-popover placement="bottom" width="240" trigger="hover">
          <div class="userMsg">
            <User :user="userMsg.user"></User>
          </div>
          <div
            slot="reference"
            :style="{background:hoverStyle2}"
            class="flexcc item"
            @mouseover.self="mouseEnter(2)"
            @mouseleave="mouseLeave(2)"
          >
            <i class="glyphicon glyphicon-user opIcon" name="user" />
            <span>{{ userMsg.user.user.user_name }}</span>
          </div>
        </el-popover>
        <el-popover placement="bottom" width="240" trigger="hover">
          <div class="userMsg">
            <EditPwd></EditPwd>
          </div>
          <div
            slot="reference"
            :style="{background:hoverStyle5}"
            class="flexcc item"
            @mouseover.self="mouseEnter(5)"
            @mouseleave="mouseLeave(5)"
          >
            <i class="glyphicon glyphicon glyphicon-lock opIcon" />
          <span>修改密码</span>
          </div>
        </el-popover>
        <el-popover placement="bottom" width="240" trigger="hover">
          <div class="fn">
            <Setting></Setting>
          </div>
          <div
            slot="reference"
            :style="{background:hoverStyle3}"
            class="flexcc item"
            @mouseover.self="mouseEnter(3)"
            @mouseleave="mouseLeave(3)"
          >
            <i class="glyphicon glyphicon-cog opIcon" name="setting" />
            <span>设置</span>
          </div>
        </el-popover>
        <div
          :style="{background:hoverStyle4}"
          class="flexcc item"
          @click="toRelogin"
          @mouseover.self="mouseEnter(4)"
          @mouseleave="mouseLeave(4)"
        >
          <i class="glyphicon glyphicon-log-out opIcon" />
          <span>退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from './User.vue'
import Setting from './Setting.vue'
import EditPwd from './EditPwd.vue'

export default {
  name: "Header",
  data() {
    return {
      isAdmin:0,//1是超级管理员,0不是
      backName:"任马停业务管理平台",
      plate_name:'任马停业务管理平台',
      style: "",
      userMsg: {},
      hoverStyle1: "",
      hoverStyle2: "",
      hoverStyle3: "",
      hoverStyle4: "",
      hoverStyle5: "",
      hoverStyle6: "",
      company:'',
      options:[{id:'',name:'总公司'}],
    };
  },
  computed: {
    expend() {
      return this.$store.state.isExpend;
    },
    theme() {
      // console.log(this.$store.state.theme)
      return this.$store.state.theme;
    }
  },
  components: {
    User,
    Setting,
    EditPwd
  },
  props: {
    msg: String
  },
  methods: {
    setExpend() {
      if(!this.expend){
        setTimeout(()=>{
          this.backName=this.plate_name
        },300)
      }else{
        this.backName=""
      }
      this.$store.commit("changeExpend");
    },
    mouseEnter(i) {
      i === 1 ? (this.hoverStyle1 = this.theme.menubar_back_color) : "";
      i === 2 ? (this.hoverStyle2 = this.theme.menubar_back_color) : "";
      i === 3 ? (this.hoverStyle3 = this.theme.menubar_back_color) : "";
      i === 4 ? (this.hoverStyle4 = this.theme.menubar_back_color) : "";
      i === 5 ? (this.hoverStyle5 = this.theme.menubar_back_color) : "";
      i === 6 ? (this.hoverStyle6 = this.theme.menubar_back_color) : "";
    },
    mouseLeave(i) {
      i === 1 ? (this.hoverStyle1 = "") : "";
      i === 2 ? (this.hoverStyle2 = "") : "";
      i === 3 ? (this.hoverStyle3 = "") : "";
      i === 4 ? (this.hoverStyle4 = "") : "";
      i === 5 ? (this.hoverStyle5 = "") : "";
      i === 6 ? (this.hoverStyle6 = "") : "";
    },
    companyChange(d){
      console.log(d)
      this.$http.get('/sysOperator/changeAdminCompany',{opt_id:JSON.parse(localStorage.getItem('cache')).user.id,company_id:d}).then(result => {
        if (result.status===1) {
          //超管切换公司时清除所有keep-alive组件,刷新组件,重新请求数据
          this.$bus.$emit('reloadMainPage',true)
          this.$nextTick(function(){
            this.$bus.$emit('reloadMainPage',false)
          })
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    toRelogin() {
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("rmt_token");
          localStorage.removeItem("cache");
          localStorage.removeItem("pmsCode");
          this.$store.commit("changeTabRoutes", { type: 4 });
          this.$store.commit("resetCache");
          this.$router.replace({path:"/login",query:{url:location.href.split("#")[1]}});
          // console.log(this.$store.state.cache);
        })
        .catch(() => {});
    }
  },
  created() {
    const cache=JSON.parse(localStorage.getItem('cache'))
    this.backName=this.plate_name=cache.plate_name
    this.userMsg = this.$store.state.cache;
    console.log(this.userMsg)
    this.isAdmin=cache.user.is_admin===1//1是超级管理员,0不是
    if(this.isAdmin){
      //获取所有公司
      this.$http.post('/infoCompany/select').then(result => {
        // console.log(result)
        if (result.data) {
          this.options=this.options.concat(result.data)
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  height: 60px;
}
.name {
  display: flex;
  align-items: center;
  width: 200px;
  height: 100%;
  transition: all 0.3s;
  img {
    width: 34px;
    height: 34px;
    margin: 0 8px;
  }
  h1 {
    font-size: 15px;
    font-family: Microsoft YaHei;
    color: rgba(255, 255, 255, 1);
    font-weight: bold;
    font-style: italic;
  }
}
.tools {
  flex: 1;
  height: 100%;
  .controlBox {
    height: 100%;
    padding: 0 10px;
    font-size: 26px;
    cursor: pointer;
  }
  .toolBox {
    height: 100%;
    .item {
      padding: 0 15px;
      height: 100%;
      cursor: pointer;
    }
    .glyphicon {
      margin-right: 5px;
    }
  }
}
</style>

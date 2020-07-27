<template>
  <!-- <div class="totalBox" :style="{borderColor:theme.border_color_light}" @click.stop=""> -->
  <div class="totalBox">
    <div class="setList">
      <i :style="{color:theme.header_back_color}" class="iconfont iconguanliyuan"></i>
      <!-- <img src="../../assets/main/header/user.png" class="userIcon" /> -->
      <div>用户名：</div>
      <div>{{userInfo.user_name}}</div>
    </div>
    <div class="setList">
      <i :style="{color:theme.header_back_color}" class="iconfont iconjiaoseguanli"></i>
      <!-- <img src="../../assets/main/header/role.png" class="userIcon" /> -->
      <div>角色名：</div>
      <div>{{userInfo['role'].name}}</div>
    </div>
    <div class="setList">
      <i :style="{color:theme.header_back_color}" class="iconfont iconshoujihaoma"></i>
      <!-- <img src="../../assets/main/header/phone.png" class="userIcon" /> -->
      <div>手机号：</div>
      <div>{{userInfo.phone}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      userInfo:null
    }
  },
  computed: {
    theme() {
      return this.$store.state.theme 
    }
  },
  props:['user'],
  created(){
    // console.log(this.user)
    this.userInfo = this.user.user
    this.userInfo.name = this.userInfo.user_name.length>10?this.userInfo.user_name.substr(0,8):this.userInfo.user_name
  },
  mounted() {

  }
}
</script>

<style scoped="scoped">
.totalBox {
  /* background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 0px 1px 3px 0px rgba(60, 70, 79, 0.3); */
}

.setList {
  cursor: pointer;
  padding: 8px 10px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  color: #141414;
  font-size: 14px;
  height: 43px;
  color: #565656;
}

.setList:hover {
  background-color: rgba(232, 232, 232, 1);
}
.userIcon,.iconfont{
  /* width: 20px;
  height: 20px;
  font-size: 20px; */
  margin-right: 5px;
  font-weight: bold;
}
</style>
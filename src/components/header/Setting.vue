<template>
  <!-- <div class="totalBox" :style="{borderColor:theme.border_color_light}"> -->
  <div class="totalBox">
    <div class="setList">
      <div class="lineBox skinBox" @click.stop="changeSkin">
        <div class="skinContent">
          <img src="../../assets/main/header/skinIcon.png" class="setIcon skinIcon" alt="" />
          <div>更换皮肤</div>
        </div>
        <img src="../../assets/main/header/close.png" v-if="!skinOpen" class="skinArrow" />
        <img src="../../assets/main/header/open.png" v-if="skinOpen" class="skinArrow"/>
      </div>
    </div>
    <ul class="skinlist" v-if="skinOpen" @click.stop="">
      <li class="black" @click="selectSkin('black')">默认主题</li>
      <li class="blue" @click="selectSkin('blue')">明蓝主题</li>
      <li class="purple" @click="selectSkin('purple')">青紫主题</li>
      <li class="green" @click="selectSkin('green')">薄绿主题</li>
      <li class="orange" @click="selectSkin('orange')">赤橙主题</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      skinOpen: true
    }
  },
  computed: {
    theme() {
      return this.$store.getters.theme 
    }
  },
  methods: {
    changeSkin(e) {
      this.skinOpen = !this.skinOpen;
    },
    selectSkin(skin){
      this.$store.commit('themeChange',skin)
    },
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
  padding: 0 10px;
}

.setList:hover {
  background-color:rgba(232, 232, 232, 1);
}

.lineBox {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  padding: 8px 10px;
  height: 43px;
  color: #141414;
  font-size: 14px;
  border-bottom: 1px solid rgba(232, 232, 232, 1);
}

.setList:last-of-type .lineBox {
  border: none;
}

.skinBox {
  justify-content: space-between;
  -webkit-justify-content: space-between;
}

.skinContent {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.setIcon {
  margin-right: 8px;
}

.pwdIcon {
  width: 16px;
  height: 16px;
  margin-left: 2px;
}

.skinIcon {
  width: 20px;
  height: 15px;
}

.skinArrow {
  width: 13px;
  height: 13px;
}

.skinlist {
  cursor: default;
  padding: 10px 10px 0;
}

.skinlist li {
  display: flex;
  color: #fff;
  height: 30px;
  font-size: 12px;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.black {
  background-image: url(../../assets/main/header/black.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.blue {
  background-image: url(../../assets/main/header/blue.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.purple {
  background-image: url(../../assets/main/header/purple.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.green {
  background-image: url(../../assets/main/header/green.png);
  background-size: 100%;
  background-repeat: no-repeat;
}

.orange {
  background-image: url(../../assets/main/header/orange.png);
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
<template>
  <div class="searchBtn btn" :style="{padding,background:disabled?'#9caebe':background,height:height+'px',lineHeight:height+'px',cursor:disabled?'not-allowed':'pointer'}" @click="sendClick">
    <i class="iconfont iconchaxun" :style="{lineHeight:height+'px'}" v-if="icon"></i>
    <!-- <span>{{name}}</span> -->
    <slot>查询</slot>
  </div>
</template>

<script>
//简单使用: <SearchBtn></SearchBtn>
//配置背景色,高度,图标显示,按钮文字: <SearchBtn background="#f00" height="20" :icon="true" >名称</SearchBtn>
export default {
  props: {
    // name: {
    //   type: String,
    //   default: '查询'
    // },
    icon: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: '#0B83FB'
    },
    padding: {
      type: String,
      default: '0 8px'
    },
    height: {
      type: [Number,String],
      default: 30
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    sendClick() {
      if(!this.disabled) this.$emit('click')
    }
  },
}
</script>

<style lang="less" scoped="scoped">
.searchBtn {
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  color: #fff;
  background: #0B83FB;
  border-radius: 2px;
  margin-right: 10px;
  display: inline-block;
  .iconfont{
    font-size: 12px;
    margin-right:4px;
  }
}
</style>
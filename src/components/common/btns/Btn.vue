<template>
  <div class="commonBtn btn" :style="{padding,background:disabled?'#9caebe':background,height:height+'px',lineHeight:height+'px',cursor:disabled?'not-allowed':'pointer'}" @click="sendClick">
    <i class="icon glyphicon" :class="iconClass?iconClass:''" :style="{lineHeight:height-2+'px'}" v-if="icon"></i>
    <slot></slot>
  </div>
</template>

<script>
//通用的按钮,必须输入按钮名字,不然为空
//简单使用: <Btn></Btn>
//配置背景色,高度,图标显示,按钮文字: <Btn background="#f00" height="20" :icon="true" >名称</Btn>
export default {
  props: {
    icon: {
      type: Boolean,
      default: true
    },
    iconClass:{
      type: String,
      default: ''
    },
    background: {
      type: String,
      default: '#0cd267'
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
.commonBtn {
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  color: #fff;
  background: #0B83FB;
  border-radius: 2px;
  margin-right: 10px;
  display: inline-block;
  .icon{
    font-size: 12px;
    margin-right:4px;
  }
}
</style>
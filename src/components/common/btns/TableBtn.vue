<template>
  <div class="TableBtn btn" :style="{background:disabled?'#9caebe':background,cursor:disabled?'not-allowed':'pointer'}" @click="sendClick">
    <slot>详情</slot>
  </div>
</template>

<script>
//简单使用: <TableBtn></TableBtn>
//配置背景色,高度,图标显示,按钮文字: <TableBtn background="#f00" height="20" :icon="true" >名称</TableBtn>
export default {
  props: {
    background: {
      type: String,
      default: '#FF7428'
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
.TableBtn {
  font-size: 12px;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  color: #fff;
  background: #0B83FB;
  border-radius: 2px;
  padding: 0 8px;
  margin: 3px;
  white-space: nowrap;
  display: inline-block;
  .iconfont{
    font-size: 12px;
    margin-right:4px;
  }
}
</style>
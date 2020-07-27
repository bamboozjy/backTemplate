<template>
  <div class="controlBox">
    <div class="setList" @click="toControl(1)">
      <i class="glyphicon el-icon-position"></i>
      <span>定位当前选项卡</span>
    </div>
    <div class="setList" @click="toControl(2)">
      <i class="glyphicon el-icon-delete-solid"></i>
      <span>关闭全部选项卡</span>
    </div>
    <div class="setList" @click="toControl(3)">
      <i class="glyphicon el-icon-delete"></i>
      <span>关闭其它选项卡</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toControl(type) {
      type===1?this.$emit('toControl','fixed'):type===2?this.$emit('toControl','all'):this.$emit('toControl','other')
    }
  },
};
</script>

<style scoped="scoped" lang="less">

.setList {
  cursor: pointer;
  padding: 4px 5px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  color: #141414;
  font-size: 14px;
  height: 30px;
  color: #565656;
  &:hover {
    background-color: rgba(232, 232, 232, 1);
  }
  .glyphicon {
    font-size: 20px;
    width: 20px;
    height: 20px;
    margin-right: 3px;
  }
}
</style>
<template>
  <div>
    用户管理
  </div>
</template>

<script>
export default {
  name: "user", //必须要有这个组件名称,不然keep-alive组件不会生效,匿名组件不会被缓存!
  data() {
    return {
    };
  },
  mounted() {
    console.log("user mounted");
  }
};
</script>

<style lang="less" scoped>
</style>

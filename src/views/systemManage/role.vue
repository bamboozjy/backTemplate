<template>
  <div>
    角色管理
  </div>
</template>

<script>
export default {
  name: "role", //必须要有这个组件名称,不然keep-alive组件不会生效,匿名组件不会被缓存!
  data() {
    return {
    };
  },
  mounted() {
    console.log("role mounted");
  }
};
</script>

<style lang="less" scoped>
</style>

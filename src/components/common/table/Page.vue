<template>
<div class="pages">
  <p>显示第 {{(current-1)*pageSize+1}} 到第 {{current*pageSize}} 条记录，共 {{total}} 条记录</p>
  <el-pagination
    v-show="total>0&&total>pageSize"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="current"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total"
  ></el-pagination>
</div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0
    },
    current: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 30, 50, 100, 200];
      }
    },
    layout: {
      type: String,
      default: "sizes, prev, pager, next, jumper"
      // default: "total, sizes, prev, pager, next, jumper"
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
      // console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.pages{
  display: flex;
  align-items: center;
  padding-top: 10px;
  >p{
    margin-top: -3px;
  }
}
</style>
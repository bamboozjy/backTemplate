<template>
  <el-select v-model="val" :placeholder="defaultLabel" :clearable="clearable" :disabled="disabled"  @change="change">
    <!-- <el-option :label="defaultLabel" :value="defaultValue" v-if="needDefault"></el-option> -->
    <slot></slot>
    <el-option :label="item.name" :value="item.id" v-for="item in datas" :key="item.id"></el-option>
  </el-select>
</template>

<script>
// 需要请求数据的下拉框
export default {
  props: {
    value: {
      type: [String,Number],
      default: ''
    },
    defaultLabel: {
      type: String,
      default: '请选择'
    },
    // defaultValue: {
    //   type: [String,Number],
    //   default: ''
    // },
    // needDefault: {
    //   type: Boolean,
    //   default: false
    // },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    url: {
      type: String,
      default: ''
    },
    urlData: {
      type: Object,
      default(){
        return {}
      }
    },
    itemKey: {
      type: String,
      default: 'id'
    },
    itemValue: {
      type: String,
      default: 'name'
    },
  },
  data() {
    return {
      val:'',
      datas: []
    }
  },
  methods: {
    change(d) {
      this.$emit('change',d)
    }
  },
  beforeMount(){
    this.val=this.value
    this.$http
      .get(this.url, this.urlData)
      .then(res => {
        if (res.data&&res.data.length) {
          this.datas = res.data.map(v=>{
            return {
              id:v[this.itemKey],
              name:v[this.itemValue],
            }
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
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
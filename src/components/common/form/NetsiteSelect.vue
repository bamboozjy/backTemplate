<template>
  <el-select v-model="val" :placeholder="defaultLabel" :clearable="clearable" :disabled="disabled"  @change="change">
    <slot></slot>
    <el-option :label="item.name" :value="item.id" v-for="item in datas" :key="item.id"></el-option>
  </el-select>
</template>

<script>
// 所属网点下拉框
export default {
  props: {
    value: {
      type: [String,Number],
      default: ''
    },
    defaultLabel: {
      type: String,
      default: '所属网点'
    },
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

    let cache=JSON.parse(localStorage.getItem('cache'))
    console.log(cache)
    if(cache.site_id){//默认一个车场
      if(cache.user.siteList&&cache.user.siteList.length){//同时管理多个车场
        this.datas=[cache.user.infoSite].concat(cache.user.siteList)
      }else{
        this.datas=[cache.user.infoSite]
      }
    }else{
      //开通的是管理员权限,可以看到所有车场
      this.$http
        .get('/infoSite/select')
        .then(res => {
          if (res.data&&res.data.length) {
            this.datas = res.data
            // .map(v=>{
            //   return {
            //     id:v.id,
            //     name:v.name,
            //   }
            // });
          }
        })
        .catch(err => {
          console.log(err);
        });

    }
  }
}
</script>

<style lang="less" scoped="scoped">

</style>
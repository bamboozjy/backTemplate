<template>
  <div>
    home
    <SearchBtn background="#f00" height="24" :icon="false" @click="fn">名称</SearchBtn>
    <OutputBtn background="#f00" height="24" :icon="false" @click="fn">名称</OutputBtn>
    <UpdateBtn background="#f00" height="24" :icon="false" @click="fn">名称</UpdateBtn>
    <InputBtn background="#f00" height="24" :icon="false" @click="fn">名称</InputBtn>
    <AddBtn background="#f00" height="24" :icon="false" @click="fn" :disabled="true">名称</AddBtn>
    <SearchBtn></SearchBtn>
    <OutputBtn></OutputBtn>
    <UpdateBtn></UpdateBtn>
    <InputBtn></InputBtn>
    <AddBtn></AddBtn>

    <Masks :show="show" @close="show=false"></Masks>
    <transition name="fade">
    <Dialog v-if="show" title="活动详情" @close="show=false" :isOk="true">
      <el-row :gutter="0">
        <el-col :span="3"><span class="red">*</span> 名称:</el-col>
        <el-col :span="9">
          <el-input v-model="input1" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="3">名称:</el-col>
        <el-col :span="9">
          <el-input v-model="input1" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="3">名称:</el-col>
        <el-col :span="9">
          <el-select v-model="input1" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">名称:</el-col>
        <el-col :span="9">
          <el-input v-model="input1" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="0">
        <el-col :span="24" style="justify-content:center">y54eh64eh6e</el-col>
      </el-row>
      <template slot="foot">
          <SearchBtn :icon="false" padding="0 40px" height="34" @click="fn1">提交</SearchBtn>
      </template>
    </Dialog>
    </transition>
    <Page style="height:80px" :pageSize='15' :total="100" :current="1" @sizeChange="sizeChange" @currentChange="currentChange"></Page>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <SearchBtn></SearchBtn>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:'home',//必须要有这个组件名称,不然keep-alive组件不会生效,匿名组件不会被缓存!
  data() {
    return {
      input1: "",
      formInline:{
        user:"",
        region:""
      },
      show:false
    };
  },
  methods: {
    fn() {
      this.show=true
      // console.log(888);
    },
    fn1() {
      this.show=false
    },
    sizeChange(d){},
    currentChange(d){},
  },
  mounted () {
    console.log('home mounted');
  },
};
</script>

<style lang="less" scoped>

</style>
<template>
  <!-- <div class="numberBox"> -->
  <input
    type="text"
    v-model="val"
    class="inputNumber"
    @change="handleChange"
    @keydown="handleChange2"
    :style="{
      width,
      height,
      'line-height':height
    }"
    :disabled="disabled"
    :placeholder="placeholder"
  />
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    placeholder:{
      type: String,
      default: "请输入数字"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    precision: {
      //保留的小数
      type: [String, Number],
      default: 2
    },
    max: {
      type: [String, Number],
      default: Infinity
    },
    min: {
      type: [String, Number],
      default: -Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    width: {
      type: String,
      default: "70%"
    },
    height: {
      type: String,
      default: "36px"
    }
  },
  data() {
    return {
      val: this.value,
      lastVal: this.value
    };
  },
  watch: {
    val(v) {
      // console.log(Number(Number(v).toFixed(this.precision)));
      this.$emit("change", Number(Number(v).toFixed(this.precision)));
    }
  },
  methods: {
    isNumber(value) {
      return /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/.test(
        value + ""
      );
    },
    handleChange(event) {
      var v = event.target.value.trim();
      if (this.isNumber(v)) {
        this.getVal(Number(v));
      } else {
        this.val = this.lastVal;
      }
    },
    getVal(v) {
      var max = this.max;
      var min = this.min;
      if (v > max) {
        this.lastVal = this.val = max;
      } else if (v < min) {
        this.lastVal = this.val = min;
      } else {
        let r=Number(v).toFixed(this.precision)
        this.lastVal = this.val = this.deleteZero(r);
      }
    },
    deleteZero(v){
      v=v+''
      let arr=v.split('.')
      if(arr.length===1){
        return v
      }else{
        let n=arr[1]
        if(Number(n)===0){
          return arr[0]
        }else{
          let m=this.digui(n)
          // console.log(m)
          return arr[0]+'.'+m
        }
      }
    },
    digui(d){
      if(d[d.length-1]==0){
        d=d.substr(0,d.length-1)
        // console.log(d)
        return this.digui(d)
      }else{
        // console.log(d)
        return d
      }
    },
    // 当聚焦时，按上下键改变
    handleChange2(event) {
      // console.log(event.keyCode)
      if (event.keyCode == "38") {
        if(this.isNumber(this.val)){
          var max = this.max;
          var min = this.min;
          var v = Number(this.val);
          // console.log(max,min,v)
          if (v > max) {
            this.val = max;
            this.lastVal = max;
          } else if (v < min) {
            this.val = min;
            this.lastVal = min;
          } else {
            let r=Number(Number(this.val) + this.step).toFixed(this.precision)
            // console.log(r)
            v == max ? "" : (this.lastVal = this.val = this.deleteZero(r));
          }
          if(this.val>max){
            this.lastVal = this.val=max
          }
        }else{
          this.val=this.lastVal
        }
      }
      if (event.keyCode == "40") {
        if(this.isNumber(this.val)){
          var max = this.max;
          var min = this.min;
          var v = Number(this.val);
          // console.log(max,min,v)
          if (v > max) {
            this.val = max;
            this.lastVal = max;
          } else if (v < min) {
            this.val = min;
            this.lastVal = min;
          } else {
            let r=Number(Number(this.val) - this.step).toFixed(this.precision)
            // console.log(r)
            v == min ? "" : (this.lastVal = this.val = this.deleteZero(r));
          }
          if(this.val<min){
            this.lastVal = this.val=min
          }
        }else{
          this.val=this.lastVal
        }
      }
    }
  }
};
</script>

<style lang="less" scoped="scoped">
.numberBox {
  display: inline-block;
  position: relative;
}
.inputNumber {
  width: 70%;
  height: 36px;
  line-height: 36px;
  background-color: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  padding: 0 10px;
  outline: none;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  &:hover {
    border-color: #c0c4cc;
  }
  &:focus {
    border-color: #1989fa;
  }
}
.disabled {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  cursor: not-allowed;
}
</style>
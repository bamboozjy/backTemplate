<template>
  <!-- <div
    class="popupbox"
    @click.self="close"
    :style="{position:'fixed',top:'101px',left:expend?'201px':'51px',right:'0',bottom:hasXscroll?'53px':'36px',margin:'auto'}"
  > -->
    <!-- :style="{position:'fixed',top:'101px',left,width:'calc(100% - '+left+')',height:'calc(100% - 137px)'}"> -->
      <div class="popupmain posiCenter" :style="{width:width}">
        <div class="popupheader" :style="{background:theme.header_back_color}">
          <p>{{title}}</p>
          <i class="el-icon-close popupclose" @click.self="close"></i>
        </div>
        <div class="content">
          <div v-show="!isOk" class="loadingBox posiCenter">
            <i class="el-icon-loading"></i>
          </div>
          <div v-show="isOk">
            <slot></slot>
          </div>
        </div>
        <div class="footer">
          <slot name="foot"></slot>
        </div>
      </div>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "80%"
    },
    title: {
      type: String,
      default: "详情"
    },
    show: {
      type: Boolean,
      default: false
    },
    isOk: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // expend() {
    //   return this.$store.state.isExpend;
    // },
    theme() {
      return this.$store.state.theme;
    },
    // hasXscroll() {
    //   return this.$store.state.hasXscroll;
    // },
  },
  data() {
    return {
    };
  },
  watch: {
    "$store.state.theme": {
      handler(newValue, oldValue) {
        $(".popupmain .footer .btn").css(
          "background",
          this.$store.state.theme.header_back_color
        );
      },
      // deep: true,
      immediate: true
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  mounted() {
    $(".popupmain .footer .btn").css(
      "background",
      this.$store.state.theme.header_back_color
    );

    // $(document).on("mousedown", ".popupheader", function(e) {
    //   e = e || window.event; //兼容ie浏览器
    //   var drag = $(this).parent();
    //   $("body").addClass("select"); //webkit内核和火狐禁止文字被选中
    //   document.body.onselectstart = document.body.ondrag = function() {
    //     return false;//ie浏览器禁止文字选中
    //   };
    //   if ($(e.target).hasClass("popupclose")) {
    //     return;//点关闭按钮不能拖拽模态框
    //   }
    //   //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器
    //   //最左边的距离-物体左边框相对于浏览器最左边的距离
    //   var diffX = e.clientX - drag.offset().left;
    //   var diffY = e.clientY - drag.offset().top;
    //   $(document).on("mousemove", function(e) {
    //     e = e || window.event; //兼容ie浏览器
    //     var left = e.clientX - diffX;
    //     var top = e.clientY - diffY;
    //     if (left < 0) {
    //       left = 0;
    //     } else if (left > window.innerWidth - drag.width()) {
    //       left = window.innerWidth - drag.width();
    //     }
    //     if (top < 0) {
    //       top = 0;
    //     } else if (top > window.innerHeight - drag.height()) {
    //       top = window.innerHeight - drag.height();
    //     } //移动时重新得到物体的距离，解决拖动时出现晃动的现象
    //     drag.css({
    //       left: left + "px",
    //       top: top + "px"
    //     });
    //   });
    //   $(document).on("mouseup", function(e) {
    //     //当鼠标弹起来的时候不再移动
    //     $(document).unbind("mousemove");
    //     $(document).unbind("mouseup");
    //   });
    // });
  },
  updated() {
    $(".popupmain .footer .btn").css(
      "background",
      this.$store.state.theme.header_back_color
    );
  }
};
</script>

<style lang="less" scoped>
// .popupbox {
//   z-index: 1900;
//   // width: 100%;
//   // height: 100%;
//   // transition: all 0.3s;
//   background: rgba(0, 0, 0, 0.5);
// }
.popupmain {
  z-index: 1950;
  min-width: 800px;
  max-width: 1000px;
  height: 80%;
  box-shadow: 1px 1px 30px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  background: #fff;
  overflow: hidden;
  .popupheader {
    background: rgb(60, 70, 79);
    position: relative;
    text-align: center;
    height: 42px;
    line-height: 42px;
    color: #ffffff;
    font-size: 18px;
    .el-icon-close {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0px;
      margin: auto;
      height: 42px;
      line-height: 42px;
      padding: 0 10px;
      cursor: pointer;
    }
  }
  .content {
    // height: calc(100% - 42px);
    // padding: 15px 10px 54px;
    height: calc(100% - 98px);
    padding: 15px 10px 0px;
    box-sizing: border-box;
    background: #fff;
    overflow: auto;
    .loadingBox {
      width: 50px;
      height: 50px;
      i {
        font-size: 50px;
        color: #999;
      }
    }
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-track {
      /* 滚动槽 */
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.1);
    }
    &::-webkit-scrollbar-thumb {
      /* 滚动条滑块 */
      border-radius: 5px;
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    // width: calc(100% - 20px);
    padding: 10px 0;
    background: #fff;
    text-align: center;
  }
}
</style>
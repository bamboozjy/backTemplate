<template>
  <transition name="fade" mode="out-in">
    <el-dialog
      top="50px"
      :width="width"
      :title="title"
      :visible="show"
      :modal-append-to-body="false"
      @close="close"
      :before-close="handleClose"
      center
    >
      <div class="dialogMain">
        <div v-if="isOk" class="loadingBox posiCenter">
          <i class="el-icon-loading"></i>
        </div>
        <slot v-else></slot>
      </div>
      <span slot="footer" class="dialog-footer">
        <slot name="foot"></slot>
        <!-- <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="show = false">确 定</el-button>-->
      </span>
    </el-dialog>
  </transition>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: "65%"
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
      default: true
    }
  },
  data() {
    return {
      // show: true
    };
  },
  watch: {
    "$store.state.theme": {
      handler(newValue, oldValue) {
        $(".el-dialog__header").css(
          "background",
          this.$store.state.theme.header_back_color
        );
        $(".el-dialog .btn").css(
          "background",
          this.$store.state.theme.header_back_color
        );
      },
      // deep: true,
      immediate: true
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleClose(done) {
      $(".el-dialog").css({ transform: "scale(0)",opacity: 0 });
      setTimeout(() => {
        done();
      }, 150);
    }
  },
  mounted() {
    // console.log(this.$store.state.theme.header_back_color);
    $(".el-dialog__header").css(
      "background",
      this.$store.state.theme.header_back_color
    );
    $(".el-dialog .btn").css(
      "background",
      this.$store.state.theme.header_back_color
    );
    this.show?$(".el-dialog").css({ transform: "scale(1)",opacity: 1 }):"";
  },
  updated() {
    if (this.show) {
      setTimeout(() => {
        $(".el-dialog").css({ transform: "scale(1)",opacity: 1 });
      }, 1);
    } 
    // else {
    //   setTimeout(() => {
    //     $(".el-dialog").css({ transform: "scale(0)",opacity: 0 });
    //   }, 1);
    // }
  }
};
</script>

<style lang="less" scoped>
/* fade */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.el-dialog__wrapper {
  position: absolute;
  height: 100%;
  /deep/.el-dialog {
    height: 85%;
    display: flex;
    flex-direction: column;
    margin-bottom: 0;
    opacity: 0;
    transform: scale(0);
    transition: all 0.3s;
    .el-dialog__header {
      flex-shrink: 0;
      padding: 0;
      background: #1e8ff5;
      height: 42px;
      line-height: 42px;
      .el-dialog__title {
        color: #fff;
      }
      .el-dialog__headerbtn {
        top: 14px;
        right: 14px;
        i {
          color: #fff;
        }
      }
    }
    .el-dialog__body {
      flex: 1;
      // height: calc(100% - 42px);
      padding: 0px;
      overflow: auto;
      &::-webkit-scrollbar {
        /* 设置滚动条的样式 */
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
      .dialogMain {
        padding: 10px 10px 0;
        height: 100%;
        box-sizing: border-box;
        position: relative;
        .loadingBox {
          width: 50px;
          height: 50px;
          i {
            font-size: 50px;
          }
        }
        // /deep/.el-row:nth-of-type(1) {
        //   border-top: 1px solid #e7eaec;
        // }
      }
    }
    .el-dialog__footer {
      flex-shrink: 0;
      padding-bottom: 10px;
    }
  }
}
</style>
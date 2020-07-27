<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
*{
  margin: 0;
  padding: 0;
}
html,body{
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #676a6c;
  height: 100%;
  overflow: auto;
  //不要自定义横向滚动条样式,会导致弹窗遮罩显示出现小问题
  &::-webkit-scrollbar {/* 设置滚动条的样式 */
    // width: 10px;
    // height: 10px;
  } 
  &::-webkit-scrollbar-track {/* 滚动槽 */
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.1);
  } 
  &::-webkit-scrollbar-thumb {/* 滚动条滑块 */
    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}

/* fade 弹窗动画过渡 */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter {
  opacity: 0;
  transform: translateX(30px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* maskFade 遮罩动画过渡 */
.maskFade-leave-active,
.maskFade-enter-active {
  transition: all 0.3s;
}
.maskFade-enter {
  opacity: 0;
}
.maskFade-leave-to {
  opacity: 0;
}

//el-dialog弹窗遮罩层及内容及必填项  目前未使用
.v-modal{
  position: absolute !important;
}
.el-row{
  // border-bottom: 1px solid #e7eaec;
  margin-bottom: 1px;
  .el-col{
    min-height: 45px;
    box-sizing: border-box;
  }
  .el-col:nth-of-type(odd){
    text-align: right;
    padding:0 5px;
    height: 100%;
    // background: #F6F6F6;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .el-col:nth-of-type(even){
    // background: #FBFBFB;
    padding:5px;
    line-height: 35px;
    display: flex;
    align-items: center;
  }
  .el-select{
    width: 100%;
  }
}
.red{
  color: red;
  margin-right: 5px;
  margin-top: 5px;
}
.break{
  // 英文字母要自动换行
  word-break: break-all;
}

//自定义弹出框
/deep/.dialogForm{
  .el-form-item{
    width: 50%;
    margin: 0px 0 20px;
    box-sizing: border-box;
    /deep/.el-form-item__content{
      width: calc(100% - 160px);
      >.el-input,.el-select{
        width: 70%;
      }
      .el-input__inner{
        padding: 0 10px;
      }
      .el-textarea__inner{
        padding:5px;
        width: 70%;
      }
      .el-date-editor{
        .el-input__inner{
          padding-left: 30px;
        }
      }
    }
    /deep/.el-form-item__label{
      padding-right: 8px;
      font-size: 13px;
    }
  }
}

//查询条件form样式
.search-form-inline{
  .el-form-item{
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    .el-form-item__label{
      line-height: 30px;
      padding-right: 6px;
    }
    .el-form-item__content{
      line-height: 30px;
      .el-input__inner{
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        width: 120px;
      }
      .el-select{
        width: 120px;
      }
      .el-input__suffix .el-input__icon{
        line-height: 30px;
      }
      .el-date-editor{
        .el-input__inner{
          padding-left: 30px;
        }
        .el-icon-date{
          line-height: 30px;
        }
      }
      .el-date-editor--month{
        width: 120px;
      }
      .el-range-editor{
        width: 350px;
      }
    }
  }
}
//表格样式
.el-table{
  /deep/.el-table__fixed{
    th{
      padding: 8px 0;
      background: #fafafa;
    }
  } 
  /deep/.el-table__header-wrapper{
    th{
      padding: 8px 0;
      background: #fafafa;
    }
  }
  .el-table__body{
    td{
      padding: 6px 0;
      .cell{
        padding: 0 6px;
      }
    }
  }
}
//下拉框的弹出内容
.el-select-dropdown.el-popper{
  min-width: 120px;
}
</style>

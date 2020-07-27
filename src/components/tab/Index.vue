<template>
  <div
    class="tabCont"
    :style="{height:`${theme.buttonBarHeight}px`,backgroundColor:theme.button_bar_back_color,borderColor:theme.button_bar_border_color,minWidth:`${theme.minWidth}px`}"
  >
    <div class="tabBox">
      <div
        class="flexcc arrow arrowLeft"
        @click="goStart"
        :style="{height:`${theme.buttonBarHeight}px`,width:`${theme.buttonBarHeight}px`,borderColor:theme.button_bar_border_color}"
      >
        <img src="../../assets/main/module/back.png" class="arrowIcon" />
      </div>
      <div class="tabs" ref="scrollContainer">
        <div
          class="tab"
          ref="isOverflow"
          @wheel.prevent="handleScroll"
          :style="{height:`${theme.buttonBarHeight}px`}"
        >
          <el-tag
            :key="item.name"
            :class="item.meta.active?'actived':''"
            v-for="(item,index) in tabRoutes"
            ref="tag"
            :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"
            :closable="index!==0"
            :disable-transitions="false"
            @close="handleClose(item)"
            @click.stop="handleClick(item)"
          >{{item.meta.title}}</el-tag>
        </div>
      </div>
      <div
        class="flexcc arrow arrowRight"
        @click="goEnd"
        :style="{height:`${theme.buttonBarHeight}px`,width:`${theme.buttonBarHeight}px`,borderColor:theme.button_bar_border_color}"
      >
        <img src="../../assets/main/module/forward.png" class="arrowIcon" />
      </div>
      <el-popover placement="bottom" width="120" trigger="hover">
        <div class="userMsg">
          <Control @toControl="toControl"></Control>
        </div>
        <div slot="reference" class="flexcc closeItem">
          <span>关闭操作</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
import Control from "./Control.vue";
const tagAndTagSpacing = 4;
export default {
  components: {
    Control
  },
  data() {
    return {
      routers: 1
    };
  },
  computed: {
    tabRoutes() {
      // console.log(this.$store.state.tabRoutes)
      return this.$store.state.tabRoutes;
    },
    theme() {
      return this.$store.state.theme;
    },
    scrollWrapper() {
      return this.$refs.isOverflow;
    }
  },
  watch: {
    $route() {
      // this.addTags()
      this.moveToCurrentTag();
    }
  },
  methods: {
    goStart() {
      if (this.scrollWrapper.scrollLeft === 0) return;
      let num = 100;
      const t = setInterval(() => {
        // console.log(this.scrollWrapper.scrollLeft,num/5)
        if (num > 10) {
          this.scrollWrapper.scrollLeft -= num / 5;
          num -= 10;
        } else {
          clearInterval(t);
        }
      }, 10);
    },
    goEnd() {
      let num = 100;
      const t = setInterval(() => {
        // console.log(this.scrollWrapper.scrollLeft,num/5)
        if (num > 10) {
          this.scrollWrapper.scrollLeft += num / 5;
          num -= 10;
        } else {
          clearInterval(t);
        }
      }, 10);
    },
    toControl(type) {
      if (type === "fixed") {
        //定位当前
        this.moveToCurrentTag();
      } else if (type === "all") {
        //全部删除
        this.$store.commit("changeTabRoutes", { type: 4 });
        this.$route.path === "/home" ? "" : this.$router.push("/home");
      } else if (type === "other") {
        //删除其他
        this.$store.commit("changeTabRoutes", { type: 5 });
      }
    },
    handleClose(tab) {
      //删除
      this.$store.commit("changeTabRoutes", { type: 2, path: tab.path });
      // console.log(tab);
    },
    handleClick(tab) {
      //切换
      this.$store.commit("changeTabRoutes", { type: 3, path: tab.path });
      this.$route.path === tab.path ? "" : this.$router.push(tab.path);
      // console.log(tab);
    },
    // judgeOverflow(){
    //   let isOverflow = this.$refs.isOverflow;
    //   for (let i in isOverflow) {
    //       let cWidth = isOverflow[i].clientWidth;
    //       let sWidth = isOverflow[i].scrollWidth;
    //       if (sWidth > cWidth) { //超过
    //           this.$set(this.isEllipsis, i, true);
    //       } else {
    //           this.$set(this.isEllipsis, i, false);
    //       }
    //   }
    // },
    handleScroll(e) {
      // console.log(e.wheelDelta , -e.deltaY)
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft - eventDelta / 4;
    },
    emitScroll() {
      this.$emit("scroll");
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          // console.log(tag,tag.to)
          if (tag.$attrs.to.path === this.$route.path) {
            // when query is different then update
            this.moveToTarget(tag);
            // if (tag.to.fullPath !== this.$route.fullPath) {
            //   // this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            // }
            break;
          }
        }
      });
    },
    moveToTarget(currentTag) {
      const $container = this.$refs.scrollContainer; //外盒 (更短)
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper; //内盒 (更宽)
      const tagList = this.$refs.tag;

      let firstTag = null;
      let lastTag = null;

      // find first tag and last tag
      if (tagList.length > 0) {
        firstTag = tagList[0];
        lastTag = tagList[tagList.length - 1];
      }

      if (firstTag === currentTag) {
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTag === currentTag) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        // find preTag and nextTag
        const currentIndex = tagList.findIndex(item => item === currentTag);
        const prevTag = tagList[currentIndex - 1];
        const nextTag = tagList[currentIndex + 1];

        // the tag's offsetLeft after of nextTag
        const afterNextTagOffsetLeft = nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing;

        // the tag's offsetLeft before of prevTag
        const beforePrevTagOffsetLeft =prevTag.$el.offsetLeft - tagAndTagSpacing;

        // console.log($scrollWrapper.scrollLeft, tagList.length, currentTag);
        if ( afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth ) {
          $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
        } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
        }
        // console.log(afterNextTagOffsetLeft, beforePrevTagOffsetLeft, $scrollWrapper.scrollLeft );
      }
    }
    // addTags() {
    //   const { name } = this.$route
    // console.log(this.$route)
    //   if (name) {
    //     this.$store.commit('addView', this.$route)
    //   }
    //   return false
    // },
  },
  mounted() {
    // console.log(this.$route)
    this.scrollWrapper.addEventListener("scroll", this.emitScroll, true);
    this.$store.commit("resetTabRoutes", this.$route);//清空tab,只保留home和当前路由
    // console.log(this.tabRoutes)
  },
  beforeDestroy() {
    this.scrollWrapper.removeEventListener("scroll", this.emitScroll);
  }
};
</script>

<style lang="less" scoped>
.tabCont {
  width: 100%;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  .tabBox {
    display: flex;
    overflow: hidden;
    width: 100%;
    height: 100%;
    > span {
      flex-shrink: 0;
    }
  }
  .tabs {
    flex: 1;
    padding-right: 4px;
    overflow-x: auto;
    overflow-y: hidden;
    position: relative; //计算滚动定位时,offsetLeft是根据定位父级来计算的
    .tab {
      &::-webkit-scrollbar {/* 设置滚动条的样式 */
        width: 4px;
        height: 4px;
      } 
      &::-webkit-scrollbar-track {/* 滚动槽 */
        border-radius: 2px;
        background: rgba(0, 0, 0, 0.1);
      } 
      &::-webkit-scrollbar-thumb {/* 滚动条滑块 */
        border-radius: 2px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }
      // overflow-x: auto;
      overflow-x: hidden;
      overflow-y: hidden;
      // white-space: nowrap;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    }
    .el-tag {
      height: 34px;
      line-height: 32px;
      margin-left: 3px;
      font-size: 14px;
      background: #fff;
      color: rgb(107, 114, 121);
      cursor: pointer;
      /deep/.el-icon-close {
        color: #243340;
        font-size: 18px;
        width: 19px;
        height: 19px;
        &:hover {
          color: #fff;
          background: rgba(200, 200, 200, 0.5);
        }
      }
    }
    .actived {
      background: #243340;
      color: #fff;
      /deep/.el-icon-close {
        color: #fff;
      }
    }
  }
  .arrow {
    flex-shrink: 0;
    cursor: pointer;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
}
.closeItem {
  cursor: pointer;
  padding: 0 8px;
  height: 100%;
}
</style>
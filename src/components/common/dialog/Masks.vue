<template>
<transition name="maskFade">
  <div
    v-if="show"
    class="popupbox"
    @click.self="close"
    :style="{position:'fixed',top:'101px',left:expend?(201-scrollLeft)+'px':(51-scrollLeft)+'px',right:'0',bottom:hasXscroll?'53px':'36px',margin:'auto'}"
  >
  </div>
</transition>
</template>

<script>
export default {
  computed: {
    expend() {
      return this.$store.state.isExpend;
    },
    hasXscroll() {
      return this.$store.state.hasXscroll;
    },
    scrollLeft() {
      return this.$store.state.scrollLeft;
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    close() {
      this.$emit('close')
    }
  },
};
</script>

<style lang="less" scoped>
.popupbox {
  z-index: 1900;
  // width: 100%;
  // height: 100%;
  // transition: all 0.3s;
  background: rgba(0, 0, 0, 0.3);
}
</style>
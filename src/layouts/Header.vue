/*
*
*   created By Xu Peng
*
*/
<template>
  <el-header height="64px">
    <div class="menu-left-header" :style="computedStyle">
      <span class="menu-left-header-span" @click.stop="triggerMenu">
        <i class="el-icon-d-arrow-left" :class="rotateIcon"></i>
      </span>
      <div class="header-right">
        <Notification class="header-right-item" />
      </div>
    </div>
    <div class="menu-top-header"></div>
  </el-header>
</template>

<script>
import Notification from "@/components/Notification/Index.vue";
export default {
  components: {
    Notification: Notification
  },
  data() {
    return {};
  },
  computed: {
    isCollapsed() {
      return this.$store.state.isMenuCollapsed;
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    computedStyle() {
      let width = this.isCollapsed ? 64 : 240
      return `width: calc(100% - ${width}px);`
    },
  },
  methods: {
    triggerMenu() {
      this.$store.dispatch("triggerMenu");
      this.$emit("on-siderTrigger");
    }
  }
};
</script>
<style lang='less'>
.menu-left-header {
  height: 64px;
  line-height: 64px;
  position: fixed;
  top:0;
  right: 0;
  z-index: 2;
  background: #fff;
  transition: width 0.2s;
  .menu-left-header-span {
    height: 64px;
    padding: 16px 24px;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.2s, padding 0s;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    .menu-icon {
      transition: all 0.2s;
    }
    .rotate-icon {
      transform: rotate(-180deg);
      transition: all 0.2s;
    }
  }
  .header-right {
    float: right;
    overflow: hidden;
    height: 100%;
    .header-right-item {
      display: inline-block;
      height: 100%;
      padding: 0 14px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
}
</style>
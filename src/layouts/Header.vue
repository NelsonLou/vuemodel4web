/*
*
*   created By Xu Peng
*
*/
<template>
  <Header>
    <div class="menu-left-header">
      <span class="menu-left-header-span" @click.stop="triggerMenu">
        <Icon :class="rotateIcon" type="md-menu"/>
      </span>
      <div class="header-right"></div>
    </div>
    <div class="menu-top-header"></div>
  </Header>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    isCollapsed() {
      return this.$store.state.isMenuCollapsed
    },
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    }
  },
  methods: {
    triggerMenu() {
      this.$store.dispatch('triggerMenu')
      this.$emit('on-siderTrigger')
    }
  }
};
</script>
<style lang='less'>
.menu-left-header {
  height: 64px;
  line-height: 64px;
  position: relative;
  background: #fff;
  .menu-left-header-span {
    height: 64px;
    padding: 16px 24px;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.3s, padding 0s;
    .menu-icon {
      transition: all .3s;
    }
    .rotate-icon {
      transform: rotate(-90deg);
    }
  }
}
</style>
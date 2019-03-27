/*
*
*   created By Xu Peng
*
*/
<template>
  <div>
    <div class="logo-container">
      <router-link to="/">
        <img v-if="logo" :src="logo" alt="logo">
        <h1 v-if="title" style="color:#eee;">{{title}}</h1>
      </router-link>
    </div>
    <hl-sider-menu></hl-sider-menu>
  </div>
</template>

<script>
import SiderMenu from "./SiderMenu";
export default {
  props: {
    logo: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'HadLinks'
    },
  },
  data() {
    return {};
  },
  components: {
    "hl-sider-menu": SiderMenu
  }
};
</script>
<style lang='less'>
  .logo-container {
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    padding-left: 24px;
    background: #0d0f10;
    transition: all 0.3s;
  }
</style>
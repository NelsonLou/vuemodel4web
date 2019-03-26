/*
*
*   created By Xu Peng
*
*/
<template>
  <div>
    <div>
      <router-link to="/">
        <img :src="logo" alt="logo">
        <h1>{{title}}</h1>
      </router-link>
    </div>
    <hl-sider-menu></hl-sider-menu>
  </div>
</template>

<script>
import SiderMenu from "./SiderMenu";
export default {
  data() {
    return {};
  },
  components: {
    "hl-sider-menu": SiderMenu
  }
};
</script>
<style lang='less'>
</style>
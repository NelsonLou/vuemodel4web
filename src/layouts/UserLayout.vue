/*
*
*   created By Xu Peng
*
*/
<template>
  <el-container class="user-container">
    <el-header></el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang='less'>
.user-container {
  min-height: 100vh;
}
</style>
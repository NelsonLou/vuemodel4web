/*
*
*   created By Xu Peng
*
*/
<template>
  <span v-popover:popover>
    <el-popover 
      placement="bottom-end" 
      width="336"
      :visible-arrow="false" 
      trigger="click" 
      ref="popover">
      <div>
        some text
        <div v-if="false"></div>
      </div>
    </el-popover>
    <el-badge :max='99' :hidden="!count" :value="count" class="notification-icon">
      <i class="el-icon-bell"></i>
    </el-badge>
  </span>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  mounted() {
    this.time = setInterval(() => {
      this.count++
    }, 1000)
  },
  beforeDestory() {
    if (this.time) {
      clearInterval(this.time)
    }
  },
};
</script>
<style lang='less'>
.notification-icon.el-badge {
  .el-badge__content.is-fixed {
    top: 18px;
    right: 15px;
  }
}
</style>
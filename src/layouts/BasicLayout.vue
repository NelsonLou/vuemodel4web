/*
*
*   created By Xu Peng
*
*/
<template>
  <el-container class="basic-container">
    <el-aside
      class="hadlinks-sider"
      width="auto"
      v-if="defaultSetting.menuPosition === 'left'">
      <hl-menu /> 
    </el-aside>
    <el-container direction="vertical">
      <hl-header 
        class="hadlinks-header"
        @on-siderTrigger="siderTrigger"/>
      <el-main>
        <router-view/>
      </el-main>  
      <hl-footer/>
    </el-container>  
  </el-container> 
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Menu from '@/components/SiderMenu/Index.vue'
import defaultSetting from '@/utils/defaultSetting'
export default {
  provide: {
    theme: defaultSetting.theme,
    mode: defaultSetting.menuPosition === 'left' ? 'vertical' : 'horizontal'
  },
  data () {
    return {
      defaultSetting: defaultSetting,
      hide: false
    };
  },
  components: {
    'hl-header': Header,
    'hl-footer': Footer,
    'hl-menu': Menu,
  },
  created() {},
  methods: {
    siderTrigger() {
    },
  },
}

</script>
<style lang='less'>
.basic-container {
  min-height:100vh;
  background:#f9f9f9;
  .hadlinks-sider {
    &.el-aside {
      box-shadow: 2px 0 6px rgba(0,21,41,.35);
      z-index: 9;
    }
  }
  .hadlinks-header {
    &.el-header {
      padding: 0;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }
  }
}
</style>
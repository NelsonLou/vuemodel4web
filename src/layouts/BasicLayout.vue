/*
*
*   created By Xu Peng
*
*/
<template>
  <Layout style="min-height:100vh;">
    <Sider 
      class="hadlinks-sider"
      width="240"
      v-if="defaultSetting.menuPosition === 'left'">
      <hl-menu /> 
    </Sider>
    <Layout>
      <hl-header class="hadlinks-header"/>
      <Content>
        <router-view/>
      </Content>  
      <hl-footer/>
    </Layout>  
  </Layout> 
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Menu from '@/components/SiderMenu'
import defaultSetting from '@/utils/defaultSetting'
export default {
  provide: {
    theme: defaultSetting.theme,
    mode: defaultSetting.menuPosition === 'left' ? 'vertical' : 'horizontal'
  },
  data () {
    return {
      defaultSetting: defaultSetting,
    };
  },
  components: {
    'hl-header': Header,
    'hl-footer': Footer,
    'hl-menu': Menu,
  },
  created() {},
  methods: {},
}

</script>
<style lang='less'>
  .hadlinks-sider {
    &.ivu-layout-sider {
      box-shadow: 2px 0 6px rgba(0,21,41,.35);
    }
  }
  .hadlinks-header {
    &.ivu-layout-header {
      background: #fff;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
    }
  }
</style>
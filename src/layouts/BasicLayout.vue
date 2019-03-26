/*
*
*   created By Xu Peng
*
*/
<template>
  <Layout>
    <Sider v-if="defaultSetting.menuPosition === 'left'">
      <hl-menu/> 
    </Sider>
    <Layout>
      <hl-header/>
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
</style>
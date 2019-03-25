/*
*
*   created By Xu Peng
*
*/
<template>
  <div>
    <Layout>
      <hadlinks-siderMenu></hadlinks-siderMenu>
      <Layout>
        <hadlins-header>
          <div slot=""></div>
        </hadlins-header>  
        <router-view />
        <hadlins-footer />
      </Layout>  
    </Layout> 
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
export default {
  data () {
    return {
    };
  },
  components: {
    'hadlins-header': Header,
    'hadlins-footer': Footer,
  },
}

</script>
<style lang='less'>
</style>
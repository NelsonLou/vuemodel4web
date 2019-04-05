/*
*
*   created By Xu Peng
*
*/
<template>
  <div>
    <div class="markdown-doc">
    </div>
    <div>
      <authorized-table></authorized-table>  
    </div>
  </div>
</template>

<script>
import AuthorizedTable from '@/components/AuthorizedTable/Index.vue'
export default {
  components: {
    'authorized-table': AuthorizedTable,
    
  },
  data () {
    return {
    };
  },
}

</script>
<style lang='less'>
</style>
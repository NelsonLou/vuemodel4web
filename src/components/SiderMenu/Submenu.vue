/*
*
*   created By Xu Peng
*
*/
<template>
  <Submenu>
    <MenuItem v-if="!children.children"></MenuItem>
    <submenu v-else :children="children.children"></submenu>
  </Submenu> 
</template>

<script>

export default {
  name: 'submenu',
  props: {
    children: {
      type: Array,
      default: [],
    }
  },
  data () {
    return {
    };
  },
}

</script>
<style lang='less'>
</style>
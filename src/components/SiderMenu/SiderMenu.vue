/*
*
*   created By Xu Peng
*
*/
<template>
  <Menu>
    <template v-for="menu in menus">
      <MenuItem v-if="!menu.children" :key="menu.name">
        {{ menus.name }}
      </MenuItem>  
      <hl-submenu v-else :key="menu.name" :children='menu.children'/>
    </template>  
  </Menu>
</template>

<script>
import Submenu from './Submenu'
export default {
  data () {
    return {
      menus: [{},{}],
    };
  },
  components: {
    'hl-submenu': Submenu
  },
}

</script>
<style lang='less'>
</style>
/*
*
*   created By Xu Peng
*
*/
<template>
  <Menu 
    class="hadlinks-menu"
    width='240px'
    :active-name="activeName"
    :open-names="openNames"
    :accordion="true"
    :theme="theme"
    :mode='mode'>
    <template v-for="menu in menus">
      <MenuItem 
        v-if="!menu.children" 
        :key="menu.name" 
        :name="menu.id">{{ menu.name }}</MenuItem>
      <hl-submenu 
        v-else 
        :key="menu.name" 
        :id="menu.id"
        :children="menu.children" 
        :name="menu.name"/>
    </template>
  </Menu>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  inject: ['mode', 'theme'],
  data() {
    return {
      menus: [
        {
          name: "一级菜单",
          id: '1-1',
          children: [
            {
              name: "二级菜单",
              id: '1-2',
              children: [
                {
                  name: '第三级菜单',
                  id: '1-3'
                },
                {
                  name: '第4级菜单',
                  id: '1-4'
                },
              ]
            }
          ]
        },
        {
          name: "1级菜单",
          id: '2-1',
          children: [
            {
              id: '2-2',
              name: "2级菜单",
            }
          ]
        },
      ]
    };
  },
  components: {
    "hl-submenu": SubMenu
  },
  computed: {
    activeName() {
      return ''
    },
    openNames() {
      return ''
    },
  },
};
</script>
<style lang='less'>
  // @menu-background-color: #001529;
  // .hadlinks-menu {
  //   &.ivu-menu {
  //     background: @menu-background-color;
  //   }
  // }
</style>
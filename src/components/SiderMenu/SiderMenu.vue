/*
*
*   created By Xu Peng
*
*/
<template>
  <Menu
    :class="menuitemClasses"
    width="auto"
    :active-name="activeName"
    :open-names="openNames"
    :accordion="true"
    :theme="theme"
    :mode="mode"
  >
    <template v-for="menu in menus">
      <MenuItem 
        v-if="!menu.children" 
        :key="menu.name" 
        :name="menu.id">
        <span>{{ menu.name }}</span>
      </MenuItem>
      <hl-submenu
        v-else
        :key="menu.name"
        :id="menu.id"
        :children="menu.children"
        :name="menu.name"
      />
    </template>
  </Menu>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  inject: ["mode", "theme"],
  data() {
    return {
      menus: [
        {
          name: "一级菜单",
          id: "1-1",
          children: [
            {
              name: "二级菜单",
              id: "1-2",
              children: [
                {
                  name: "第三级菜单",
                  id: "1-3"
                },
                {
                  name: "第4级菜单",
                  id: "1-4"
                }
              ]
            }
          ]
        },
        {
          name: "1级菜单",
          id: "2-1",
          children: [
            {
              id: "2-2",
              name: "2级菜单"
            }
          ]
        }
      ]
    };
  },
  components: {
    "hl-submenu": SubMenu
  },
  computed: {
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    isCollapsed() {
      return this.$store.state.isMenuCollapsed
    },
    activeName() {
      return "";
    },
    openNames() {
      return [];
    }
  }
};


</script>
<style lang='less'>
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
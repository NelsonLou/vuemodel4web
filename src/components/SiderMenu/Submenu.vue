/*
*
*   created By Xu Peng
*
*/
<template>
  <el-submenu :index="id">
    <template slot="title">
        <i class="el-icon-location"></i>
      <span>{{ name }}</span>   
    </template>
    <template v-for="item in children">
      <el-menu-item 
        v-if="!item.children" 
        :name="item.id"
        :key="item.name">
        <span>{{ item.name }}</span>
      </el-menu-item>
      <submenu 
        v-else 
        :children="item.children"
        :id="item.id"
        :name="item.name"
        :key="item.name"></submenu>
    </template>
  </el-submenu> 
</template>

<script>

export default {
  name: 'submenu',
  props: {
    children: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      required: true,
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
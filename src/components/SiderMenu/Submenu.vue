/*
*
*   created By Xu Peng
*
*/
<template>
  <Submenu :name="id">
    <template slot="title">
        <Icon type="ios-paper" />
       {{ name }}
    </template>
    <template v-for="item in children">
      <MenuItem 
        v-if="!item.children" 
        :name="item.id"
        :key="item.name">{{item.name}}</MenuItem>
      <submenu 
        v-else 
        :children="item.children"
        :id="item.id"
        :name="item.name"
        :key="item.name"></submenu>
    </template>
  </Submenu> 
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
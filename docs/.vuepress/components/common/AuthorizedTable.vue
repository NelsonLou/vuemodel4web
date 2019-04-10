/*
*
*   created By Xu Peng
*
*/
<template>
  <div>
    <authorized-table
      @on-change="handleChange"
      :data="data">
    </authorized-table>
    <code-container title="传入组件的data变化">
      <pre>{{ JSON.stringify(data,null,2) }}</pre>
    </code-container>
    <code-container  title="每次勾选权限时返回的权限树">
      <pre>{{ JSON.stringify(node,null,2) }}</pre>
    </code-container>
  </div>
</template>

<script>
import AuthorizedTable from "@/components/AuthorizedTable/Index.vue";
import { formDataTree } from '@/utils/formatToTree.js'
import { mockList } from '&mock/AuthorizedList.js'
export default {
  components: {
    "authorized-table": AuthorizedTable
  },
  data() {
    return {
      node: [],
      // 传入组件的data为树形结构
      data: formDataTree(mockList,{
        parentNO: 'parentId',
        childrenNO: 'id',
        childrenDesc: 'childList'
      })
    };
  },
  methods: {
    handleChange(node) {
      this.node = node
    }
  },
};
</script>
<style lang='less'>
</style>
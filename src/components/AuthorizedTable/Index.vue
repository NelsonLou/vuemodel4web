/*
*
*   created By Xu Peng
*
*/
<template>
  <div :class="preFix + 'container'">
    <el-table
      border
      :data="permissionList">
      <el-table-column label="目录权限" width="250px">
        <template slot-scope="scope">
          <authorized-item 
            v-model="scope.row.power" 
            :item="scope.row" 
            @on-change="change">{{ scope.row.name }}</authorized-item>
        </template>
      </el-table-column>
      <el-table-column label="菜单权限" width="250px">
        <template slot-scope="scope">
          <div :class="preFix + 'section-container'">
            <section 
              :class="preFix + 'section'"
              :key="item.id"
              v-for="item in scope.row.childList">
              <authorized-item
                v-model="item.power" 
                @on-change="change" 
                :item="item">{{ item.name }}</authorized-item>
            </section>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="具体权限">
        <template slot-scope="scope" >
          <template v-for="item in scope.row.childList">
            <section :key="item.id" :class="preFix + 'section'">
              <template v-if="item.childList && item.childList.length">
                <authorized-item
                  v-for="subitem in item.childList"
                  :key="subitem.id"
                  :item="subitem"
                  @on-change="change" 
                  v-model="subitem.power">{{ subitem.name }}</authorized-item>
              </template>
            </section>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
const preFix = 'authorized-table-'
import AuthorizedItem from './AuthorizedItem.vue'
export default {
  components: {
    'authorized-item': AuthorizedItem,
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      preFix: preFix,
      permissionList: this.data,
    };
  },
  methods: {
    change(val,e) {
      this.$emit('on-change', val)
    }
  },
}

</script>
<style lang='less'>
.authorized-table-container {
  .authorized-table-section {
    margin: 0 -10px;
    padding: 12px 10px;
    border-bottom: 1px solid #eee;
    height: 48px;
    box-sizing: border-box;
    &:first-child {
      padding-top: 0;
      height: 36px;
    }
    &:last-child {
      height: 36px;
      padding-bottom: 0px;
      border-bottom: none;
    }
    &:only-child {
      height: auto;
    }
  }
}
</style>
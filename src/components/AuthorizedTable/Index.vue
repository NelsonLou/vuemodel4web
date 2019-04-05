/*
*
*   created By Xu Peng
*
*/
<template>
  <div>
    <Table
      border 
      :data="permissionList"
      :columns="columns">
      <template slot-scope="{ index }" slot="first">
        <Checkbox v-model="permissionList[index].power" @on-change="change">{{ permissionList[index].name }}</Checkbox>
      </template>
      <template slot-scope="{ index }" slot="second">
        <template v-for="item in permissionList[index].children">
          <section :key="item.id">
            <Checkbox v-model="item.power" @on-change="change" :row-key="item">{{ item.name }}</Checkbox>
          </section>
        </template>
      </template>
      <!-- 坑1：slot-scope="scope" 中的scope与 permissionList非同一引用 不能双向绑定 
           使用permissionList[index]而不是scope.row 来进行v-model绑定 -->
      <template slot-scope="{ index }" slot="third">
        <template v-for="item in permissionList[index].children">
          <template v-if="item.children && item.children.length">
            <Checkbox
              v-for="subitem in item.children"
              :key="subitem.id" 
              v-model="subitem.power">{{ subitem.name }}</Checkbox>
          </template>
        </template>
      </template>
    </Table>
    <!-- <pre>{{ JSON.stringify(origin,null,2) }}</pre> -->
    <pre>{{ JSON.stringify(permissionList,null,2) }}</pre>
  </div>
</template>

<script>
import { formDataTree } from '@/utils/formatToTree'
export default {
  data () {
    return {
      columns: [
        {
          title: '权限目录',
          slot: 'first'
        },
        {
          title: '一级权限',
          slot: 'second'
        },
        {
          title: '二级权限',
          slot: 'third'
        },
      ],
      origin: [
        {
          name: '进入首页',
          id:1,
          power: true,
          parentId: 0,
        },
        {
          name: '一级权限',
          id:2,
          power: true,
          parentId: 1,
        },
        {
          name: '一级权限2',
          id:3,
          power: true,
          parentId: 1,
        },
        {
          name: '耳机全线',
          id:4,
          power: true,
          parentId: 2,
        },
        {
          name: '物业',
          id:5,
          power: true,
          parentId: 0,
        },
        {
          name: '住房',
          id:6,
          power: true,
          parentId: 5,
        },
        {
          name: '吃饭',
          id:7,
          power: true,
          parentId: 5,
        },
      ],
      permissionList: [
        {
          name: '进入首页',
          id:1,
          power: true,
          children: [
            {
              id: 2,
              power: true,
              name: '一级权限',
              children: [
                {
                  id: '2-1',
                  power: false,
                  name:'2-1menus'
                }
              ]
            },
            {
              id: 3,
              power: true,
              name: 'er级权限'
            }
          ]
        },
        {
          name: '进入权限',
          id:1.1,
          power: true,
          children: [
            {
              id: 2.1,
              power: false,
              name: '1一级权限'
            },
            {
              id: 3.1,
              power: true,
              name: '1er级权限'
            }
          ]
        },
      ],
    };
  },
  computed: {
    // permissionList() {
    //   return formDataTree(this.origin,{childrenNO:'id',parentNO:'parentId'})
    // }
  },
  methods: {
    click(val) {
      console.log(val.target.dataset.id)
      console.log(val)
    },
    change(val,e) {
      console.log(val,e)
    }
  },
}

</script>
<style lang='less'>
</style>
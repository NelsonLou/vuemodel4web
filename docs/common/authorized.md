---
title: '权限管理'
---
## 权限管理组件使用文档
---
### 基础使用方法

### props
| 参数          | 说明           | 类型  |  默认值 | 格式 |
| ------------  |:-------------:| :-----:| :------:| ----|
| data          | 进行显示的权限列表 | Array | 无   | 见组件使用 |
### events
| 事件名称       | 说明               | 回调参数           |
| ------------  |:-------------:     | :-----:           |
| on-change     | 当手动勾选权限时触发 | 当前修改权限的节点  | 

::: warning element-ui问题
element-ui版本2.7.2传入表格的data中如果有children属性，则自动渲染成树形表格，且el-table的属性row-key为必须项。此问题提出时间：2019-4-9。
所以传入组件的树形数据使用childList属性。后续版本2.8.0可能会修复这个问题：[https://github.com/ElemeFE/element/issues/14910](https://github.com/ElemeFE/element/issues/14910)
:::

组件使用方式如下图所示，需要使用`formDataTree`将数据格式化为树形结构

<<< @/docs/.vuepress/components/common/AuthorizedTable.vue{8,9,10,11}

<common-AuthorizedTable/>
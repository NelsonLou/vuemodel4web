<template lang="html">
<div class="tableComp">
    <el-table :data="tableData" stripe fit style="width: 100%" :empty-text='"暂无数据"'>
        <el-table-column align='center' prop="name" label="用户名" width="180"></el-table-column>
        <el-table-column align='center' prop="name" label="角色类型" width="180"></el-table-column>
        <el-table-column align='center' prop="address" label="最近登陆日期"></el-table-column>
        <el-table-column align='center' prop="status" label="状态">
            <slot name="empty">--</slot>
        </el-table-column>
        <el-table-column align='center' label="操作" width="100">
            <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
	name: 'tableComp',
	props: {
		dataUrl: {
			type: String,
			required: true
		},
	},
	data() {
		return {
			tableData: [{
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄',
				// status: ''
			}]
		}
	},
	mounted() {
		console.log('sss');
	},
	methods: {
		getTableData() {
			this.$Ax.get(this.dataUrl, {
				params: para
			}).then(res => {
				// eslint-disable-next-line
				console.log(res);
			}).catch(err => {
				// eslint-disable-next-line
				console.log(err);
			})
		}
	}
}
</script>

<style lang="css" scoped>
</style>

<template lang="html">
<div class="tableComp">
    <el-table :data="tableData" stripe fit style="width: 100%" :empty-text='"暂无数据"'>
        <el-table-column v-for='(item,index) in tableConf' :key='index' align='center' :prop="item.prop" :label="item.label">
        </el-table-column>
        <el-table-column v-for='(actItem,actIndex) in tableActConf' align='center' :label="actItem.label">
            <template slot-scope="scope">
                <el-button v-for='(actItemC,index) in actItem.child' @click="handleClick(scope.row,actItemC.methodsName)" type="text" size="small">{{actItemC.label}}</el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
	name: 'tableComp',
	props: {
		tableConf: {
			type: Array,
			required: true
		},
		tableActConf: {
			type: Array,
			default: [],
			required: false
		}
	},
	data() {
		return {
			tableData: []
		}
	},
	mounted() {},
	methods: {
		getTableData(api, para) {
			this.$Ax.get(api,
				// {params: para}
			).then(res => {
				this.tableData = res.data
			}).catch(err => {
				// eslint-disable-next-line
				console.log(err);
			})
		},
		handleClick(row, methodsName) {
			this.$parent[methodsName](row)
		}
	}
}
</script>

<style lang="css" scoped>
</style>

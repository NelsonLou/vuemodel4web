<template>
<div class="tableComponents">
	<Table :columns="columns" :data="tableData" :loading='tableLoading'></Table>
	<div class="clearfloat">
		<Page @on-change='handleFilp' :current='pageNum' @on-page-size-change='handleChangePageSize' :total="total" show-elevator :show-sizer='showSizer==0?false:true' show-total class="marginTop right" />
		<Button v-if='showBatchDel' type="error" class="marginTop left">批量删除</Button>
	</div>
</div>
</template>

<script>
export default {
	name: 'tableComponents',
	data() {
		return {
			timer: null,
			tableLoading: false,
			url: '',
			para: {},
			total: 0,
			pageSize: 10,
			pageNum: 1,
			pageSizeOpts: [10, 20, 30, 40],
			tableData: [],
		}
	},
	props: {
		columns: Array,
		showSizer: Number,
		showBatchDel: Boolean
	},
	methods: {
		getData(url, para) {
			this.tableLoading = true
			this.url = url
			this.para = para
			let params = {
				pageSize: this.pageSize,
				pageNum: this.pageNum,
				...para
			}
			this.$Ax.get(this.url, {
				params: params
			}).then(res => {
				if (res.data) {
					this.tableData = res.data.data
					this.total = res.data.total
				}
				let that = this
				this.timer = setTimeout(function() {
					that.tableLoading = false
					clearTimeout(that.timer)
				}, 500)
			}).catch(err => {
				/* eslint-disable */
				console.log(err);
				/* eslint-enable */
			})
		},
		handleFilp(pageNum) {
			this.pageNum = pageNum
			this.getData(this.url)
		},
		handleChangePageSize(pageSize) {
			this.pageSize = pageSize
			this.getData(this.url)
		}
	}
}
</script>
<style lang="css">
.ivu-page {
	margin-right: 20px;
}

.ivu-table-wrapper {
	border: none;
}

.ivu-table-header th {
	border: none;
}

.ivu-table th {
	background-color: #FAFAFA;
}

.ivu-table:after {
	width: 0;
}
</style>

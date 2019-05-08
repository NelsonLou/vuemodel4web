<template lang="html">
<div class="account">
	<!-- 表单组件 -->
	<formComp ref='filterForm' :inline='true' :formConf='filterFormConf'></formComp>
	<!-- 搜索按钮 -->
	<el-button icon="el-icon-search" size='small' type='primary' @click='getTableData' circle></el-button>
	<!-- 添加按钮 -->
	<el-button icon="el-icon-plus" size='small' type='primary' @click='handleAdd' circle></el-button>
	<!-- 表格组件 -->
	<tableComp ref='accountTable' :tableConf='tableConf' :tableActConf='tableActConf' class="marginTop"></tableComp>
	<!-- 弹窗 -->
	<el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
		<formComp ref='addFormConf' :formConf='addFormConf' :autoSubmit='true' :submitUrl='addUrl' :handleAferSubmit='getTableData'></formComp>
		<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary" @click="handleSubmit">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
import city from './city'
export default {
	name: 'account',
	data() {
		return {
			dialogTitle: '',
			addUrl: '/mock/addUser',
			dialogVisible: false,
			tableConf: [{ // 表格配置
					prop: 'name',
					label: '用户名',
					type: 'data'
				},
				{
					prop: 'role',
					label: '角色类型',
					type: 'data'
				},
				{
					prop: 'address',
					label: '地区',
					type: 'data'
				},
				{
					prop: 'status',
					label: '状态',
					type: 'data'
				},
			],
			tableActConf: [{ // 表格操作栏配置
				label: '操作',
				child: [{
					label: '编辑',
					methodsName: 'handleEdit'
				}, {
					label: '删除',
					methodsName: 'handleDelete'
				}],
			}],
			filterFormConf: [{ // 筛选组件配置文件
					valName: 'userName',
					type: 'input',
					plh: '用户名'
				},
				{
					valName: 'roleName',
					plh: '所属角色',
					type: 'select',
					selectList: [{
						value: 'roleA',
						label: '角色A'
					}]
				}
			],
			addFormConf: [{ // 筛选组件配置文件
					valName: 'userName',
					label: '用户名',
					type: 'input',
					plh: '用户名'
				},
				{
					valName: 'roleName',
					label: '所属角色',
					plh: '所属角色',
					type: 'select',
					selectList: [{
						value: 'roleA',
						label: '角色A'
					}]
				},
				{
					valName: 'sex',
					label: '性别',
					plh: '性别',
					type: 'select',
					selectList: [{
						value: '1',
						label: '男'
					}, {
						value: '2',
						label: '女'
					}]
				},
				{
					valName: 'limitDateRange',
					childValName: ['limitStartTime', 'limitEndTime'],
					label: '可登陆时间',
					plh: '可登陆时间',
					type: 'timeRange',
				},
				{
					valName: 'region',
					childValName: ['province', 'city'],
					label: '地区',
					plh: '地区',
					type: 'cascader',
					cascaderData: city,
					props: {
						value: 'label',
						children: 'child'
					}
				},
				{
					valName: 'forbidden',
					label: '状态',
					plh: '状态',
					type: 'switch',
					selectList: [{
						value: '1',
						label: '启用'
					}, {
						value: '0',
						label: '禁用'
					}]
				},
			]
		}
	},
	mounted() {
		this.getTableData()
	},
	methods: {
		getTableData() {
			let api = '/mock/userList',
				para = this.$refs.filterForm.handleSubmit()
			this.$refs.accountTable.getTableData(api, para)
		},
		// 编辑
		handleEdit(row) {
			console.log('edit', row);
		},
		// 添加
		handleAdd() {
			this.dialogTitle = '添加用户'
			this.dialogVisible = true
		},
		// 删除
		handleDelete(row) {
			let para = {
				name: row.name,
			}
			this.$confirm('确认删除该用户（' + row.name + '）？', '确认信息', {
					distinguishCancelAndClose: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消'
				})
				.then(() => {
					this.$Ax.post('/mock/deleteUser', para)
						.then(res => {
							this.getTableData()
						})
						.catch(err => {
							console.log(err);
						})
				})
				.catch(action => {
					this.$message({
						type: 'success',
						message: '已取消删除'
					})
				});
		},
		handleSubmit() {
			this.$refs.addFormConf.handleSubmit()
		}
	}
}
</script>

<style lang="css" scoped>
</style>

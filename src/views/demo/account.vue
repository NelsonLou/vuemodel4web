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
	<el-dialog :title="dialogTitle" :visible.sync="dialogVisible" >
		<div v-loading="loading">
			<formComp ref='addFormConf' v-show='act == "add"' :formConf='addFormConf' :autoSubmit='true' :submitUrl='formUrl' :handleAferSubmit='getTableData'></formComp>
			<formComp ref='editFormConf' v-show='act == "edit"' :formConf='addFormConf' :autoSubmit='true' :submitUrl='formUrl' :handleAferSubmit='getTableData'></formComp>
		</div>
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
			act: '',
			dialogTitle: '',
			formUrl: '/mock/addUser',
			loading: false,
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
						},
						{
							value: 'roleB',
							label: '角色B'
						},
						{
							value: 'roleC',
							label: '角色C'
						}
					]
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
						},
						{
							value: 'roleB',
							label: '角色B'
						},
						{
							value: 'roleC',
							label: '角色C'
						}
					]
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
				{
					valName: 'note',
					label: '备注',
					type: 'textarea',
					plh: '备注'
				},
				{
					valName: 'birthday',
					label: '生日',
					type: 'date',
					plh: '生日'
				},
				{
					valName: 'department',
					label: '所属部门',
					plh: '所属部门',
					type: 'select',
					multiple: true,
					selectList: [{
							value: 'departA',
							label: '部门A'
						},
						{
							value: 'departB',
							label: '部门B'
						},
						{
							value: 'departC',
							label: '部门C'
						}
					]
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
			let api = '/mock/userInfo',
				form = {}
			this.act = 'edit'
			this.$Ax.get(api)
				.then(res => {
					this.dialogVisible = true
					form = res
				}).catch(err => {
					// eslint-disable-next-line
					console.log(err);
				})
				.then(res => {
					this.$refs.editFormConf.handleDataEnter(form)
				})
		},
		// 添加
		handleAdd() {
			this.act = 'add'
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
							// eslint-disable-next-line
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
		// 提交表单
		handleSubmit() {
			this.$refs[this.act + 'FormConf'].handleSubmit()
		}
	}
}
</script>

<style lang="css" scoped>
</style>

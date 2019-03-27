<!-- 角色管理 -->
<template>
<div class="roleList clearfloat">
	<div class="clearfloat">
		<searchForm ref='searchForm' @handleSearch='getTableData()' :configList='configList'></searchForm>
		<div>
			<Button type='primary' @click='handleAdd'>新增</Button>
		</div>
	</div>
	<div class="tableBox left marginTop">
		<tableComponent ref='tableComponent' :columns='columns' :showBatchDel='false'></tableComponent>
	</div>
	<Card class="roleTreeCard right relarive marginTop">
		<div class="clearfloat" style="color:#2d8cf0;">
			<span class="left">角色名</span>
		</div>
		<Tree ref='showTree' :data="permissionList" :children-key='"child"'></Tree>
	</Card>
	<!-- 添加表单 -->
	<Modal v-model="dialog" :title="dialogTitle" :loading="dialogLoading" :width='50' @on-ok="handleSubmit">
		<Form ref="formAdd" :model="formAdd" :rules="ruleAdd" :label-width="80">
			<FormItem prop="roleName" label='角色名'>
				<!-- eslint-disable -->
				<Input type="text" v-model="formAdd.roleName" class="formInput"></Input>
				<!-- eslint-enable -->
			</FormItem>
			<FormItem prop="permission" label='角色权限'>
			</FormItem>
			<Tree ref='formAdd' :data="addPermissionList" show-checkbox :children-key='"child"' class="marginLeft"></Tree>
		</Form>
	</Modal>
</div>
</template>
<script>
import searchForm from '@/components/searchForm.vue'
import tableComponent from '@/components/tableComponent.vue'
export default {
	name: 'roleList',
	data() {
		return {
			act: '',
			roleName: '',
			dialog: false,
			dialogEdit: false,
			dialogTitle: '',
			dialogLoading: true,
			formAdd: {
				roleName: '',
				urls: [],
				permission: [],
			},
			formEdit: {
				roleName: '',
				urls: [],
				permissions: [],
			},
			ruleAdd: {
				roleName: [{
					required: true,
					message: '角色名不能为空',
					trigger: 'blur'
				}],
			},
			configList: [{
					plh: '角色名称',
					valName: 'roleName',
					type: 'input'
				},
				{
					plh: '创建时间',
					type: 'dateRange'
				},
				{
					plh: '状态',
					valName: 'forbidden',
					type: 'select',
					labelName: 'label',
					valueName: 'value',
					keyName: 'key',
					selectList: [{
						value: '1',
						label: '启用'
					}, {
						value: '0',
						label: '禁用'
					}],
				},
			],
			columns: [{
					type: 'index',
					title: '序号',
					width: 60,
					align: 'center',
				},
				{
					title: '角色名称',
					key: 'roleName',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('div', this.dealNullData(params.row.roleName))
						]);
					}
				},
				{
					title: '创建时间',
					key: 'createTime',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('div', this.dealTime(params.row.createTime))
						]);
					}
				},
				{
					title: '状态',
					key: 'forbidden',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('div', {
								style: {
									color: params.row.forbidden == 0 ? '#ed4014' : '#19be6b'
								}
							}, this.dealNullData(params.row.forbidden == 0 ? '禁用' : '启用'))
						]);
					}
				},
				{
					title: '权限',
					key: 'action',
					width: 80,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.handleShowPer(params.row)
									}
								}
							}, '查看'),
						]);
					}
				},
				{
					title: '操作',
					key: 'action',
					width: 200,
					align: 'center',
				}
			],
			allPermission: [], // 全部权限
			permissionList: [], // 展示全部权限
			addPermissionList: [], // 表单展示权限
			editPermissionList: [], // 表单展示权限
		}
	},
	created() {},
	computed: {
		permissionTree() {
			return this.handleChangeTree(JSON.parse(sessionStorage.getItem('permissionTree')))
		}
	},
	mounted() {},
	components: {
		searchForm,
		tableComponent
	},
	methods: {
		// 获取列表数据
		getTableData() {
			let para = this.$refs.searchForm.handleSubmit()
			this.$refs.tableComponent.getData(this.$api.xxx, para)
		},
		// 新增权限
		handleAdd() {
			this.act = 'add'
			this.handleResetFields()
			this.dialogTitle = '新增角色'
			this.dialog = true
		},
		// 重置表单
		handleResetFields() {
			this.$refs.formAdd.resetFields()
			this.$refs.formEdit.resetFields()
		},
		// 提交表单
		handleSubmit() {},
		// 修改表单loading状态
		changeLoading() {
			this.dialogLoading = false;
			this.$nextTick(() => {
				this.dialogLoading = true;
			});
		},
		// 处理时间显示形式
		dealTime(date) {
			return this.$Utils.dealTime(date)
		},
		// 处理空数据
		dealNullData(data) {
			return this.$Utils.dealNullData(data)
		},
		// ——————————————————————
		handleChangeTree(list) {
			for (let i in list) {
				list[i].expand = true
				if (list[i].child && list[i].child.length > 0) {
					for (let y in list[i].child) {
						list[i].child[y].expand = true
						if (list[i].child[y].child && list[i].child[y].child.length > 0) {
							for (let x in list[i].child[y].child) {
								list[i].child[y].child[x].expand = true
								if (list[i].child[y].child[x].child && list[i].child[y].child[x].child.length > 0) {
									for (let u in list[i].child[y].child[x].child) {
										list[i].child[y].child[x].child[u].expand = true
										list[i].child[y].child[x].child[u].title = list[i].child[y].child[x].child[u].name
									}
								}
							}
						}
					}
				}
			}
			return list
		},
	}
}
</script>

<style scoped>
.tableBox {
	width: 70%;
}

.roleTreeCard {
	width: 29%;
}
</style>

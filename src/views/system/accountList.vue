<template>
<div class="accountList">
	<!-- 列表 -->
	<div class="accountList-content" v-show='!showInfo'>
		<div class="">
			<div class="searchBox clearfloat">
				<searchForm v-if='createdFilter' @handleSearch='getTableData()' :configList='configList' ref='searchForm' class="left"></searchForm>
			</div>
			<div class="actBox">
				<Button @click='handleAdd' type='primary'>新增</Button>
			</div>
			<div class="marginTop">
				<tableComponent ref='tableComponent' :columns='columns'></tableComponent>
			</div>
		</div>
	</div>
	<!-- 详情表单 -->
	<div class="" v-show='showInfo'>
		<Button @click='getTableData()' class="marginRight">返回</Button>
		<Card class="marginTop">
			<Form ref="deviceForm" :model="deviceForm" inline>
				<FormItem v-for='(item, index) in formConfig' :key='index' :label='item.label' class="formItem">
					<span v-if='item.valueName!="sex"'>{{dealNullData(accountInfo[item.valueName])}}</span>
					<span v-else>{{accountInfo.sex== 1?'男':accountInfo.sex== 2?'女':'--'}}</span>
				</FormItem>
			</Form>
		</Card>
		<!-- 操作栏 -->
		<Card class="marginTop">
			<Button @click='handleSingleEdit("password","密码")' type="primary" class="marginRight">修改密码</Button>
			<Button @click='handleSingleEdit("mail","邮箱")' type="primary" class="marginRight">修改邮箱</Button>
			<Button @click='handleSingleEdit("phone","联系方式")' type="primary" class="marginRight">修改联系方式</Button>
			<Button @click='handleSingleEdit("realName","姓名")' type="primary" class="marginRight">修改真实姓名</Button>
		</Card>
	</div>
	<!-- 添加弹窗 -->
	<dialogForm ref='dialogAdd' :refName='"dialogAdd"' :title='"编辑"' :compRule='addRule' :autoSubmit='true' :submitUrl='addUrl' @submitCallBack='getTableData' :dialogFormConf='addFormConf'></dialogForm>
	<!-- 编辑弹窗 -->
	<dialogForm ref='dialogEdit' :refName='"dialogEdit"' :title='"编辑"' :compRule='editRule' :autoSubmit='true' :submitUrl='editUrl' @submitCallBack='getTableData' :dialogFormConf='editFormConf'></dialogForm>
	<!-- email编辑 -->
	<dialogForm ref='dialog_mail' :refName='"dialog_mail"' :title='"修改邮箱"' :dialogFormConf='mailFormConf' :compRule='mailRule' :autoSubmit='false' @submitCompForm='submitCompForm'></dialogForm>
	<!-- password编辑 -->
	<dialogForm ref='dialog_password' :refName='"dialog_password"' :title='"修改密码"' :dialogFormConf='passwordFormConf' :compRule='passwordRule' :autoSubmit='false' @submitCompForm='submitCompForm'></dialogForm>
	<!-- phone编辑 -->
	<dialogForm ref='dialog_phone' :refName='"dialog_phone"' :title='"修改联系方式"' :dialogFormConf='phoneFormConf' :compRule='phoneRule' :autoSubmit='false' @submitCompForm='submitCompForm'></dialogForm>
	<!-- realName编辑 -->
	<dialogForm ref='dialog_realName' :refName='"dialog_realName"' :title='"修改真实姓名"' :dialogFormConf='realNameFormConf' :compRule='realNameRule' :autoSubmit='false' @submitCompForm='submitCompForm'></dialogForm>
</div>
</template>

<script>
import searchForm from '@/components/searchForm.vue'
import tableComponent from '@/components/tableComponent.vue'
import dialogForm from '@/components/dialogForm.vue'
export default {
	name: 'accountList',
	data() {
		const validatePhone = (rule, value, callback) => {
			let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			if (!myreg.test(value) && value != '' && value != null) {
				callback(new Error('请输入正确的手机号'));
			} else {
				callback();
			}
		};
		const validateRealName = (rule, value, callback) => {
			let myEreg = /^[\u4e00-\u9fa5 ]{2,20}$/;
			// eslint-disable-next-line
			let myCreg = /^[a-zA-Z\/ ]{2,20}$/;
			if ((!myEreg.test(value) && !myCreg.test(value)) && value != '') {
				callback(new Error('请输入正确的姓名格式(中英文)'));
			} else {
				callback();
			}
		};
		const validateMail = (rule, value, callback) => {
			let myreg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
			if (!myreg.test(value) && value != '' && value != null) {
				callback(new Error('请输入正确的邮箱地址'));
			} else {
				callback();
			}
		};
		return {
			addUrl: '',
			editUrl: '',
			act: '',
			showInfo: false,
			createdFilter: false, // 控制筛选组件延迟加载
			passwordForm: { // 密码修改表单
				password: '',
				rePassword: '',
			},
			accountInfo: {},
			addRule: {
				userName: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					},
					{
						type: 'string',
						min: 3,
						message: '用户名长度最少为3位',
						trigger: 'blur'
					}
				],
				password: [{
						required: true,
						message: '新密码不能为空',
						trigger: 'blur'
					},
					{
						type: 'string',
						min: 6,
						message: '密码长度最少为6位',
						trigger: 'blur'
					}
				],
				rePassword: [],
				phone: [{
					validator: validatePhone,
				}],
				mail: [{
					validator: validateMail,
				}],
				realName: [{
					validator: validateRealName,
				}],
				roleId: [{
					required: true,
					message: '请选择用户角色',
					trigger: 'blur'
				}],
			},
			editRule: {
				userName: [{
						required: true,
						message: '用户名不能为空',
						trigger: 'blur'
					},
					{
						type: 'string',
						min: 3,
						message: '用户名长度最少为3位',
						trigger: 'blur'
					}
				],
				phone: [{
					validator: validatePhone,
					trigger: 'blur'
				}],
				mail: [{
					validator: validateMail,
					trigger: 'blur'
				}],
				roleId: [{
					required: true,
					message: '请选择用户角色',
					trigger: 'blur'
				}],
			},
			mailRule: {
				mail: [{
					validator: validateMail,
					trigger: 'blur'
				}],
			},
			passwordRule: {
				password: [{
						required: true,
						message: '新密码不能为空',
						trigger: 'blur'
					},
					{
						type: 'string',
						min: 6,
						message: '密码长度最少为6位',
						trigger: 'blur'
					}
				],
				rePassword: []
			},
			phoneRule: {
				phone: [{
					validator: validatePhone,
					trigger: 'blur'
				}],
			},
			realNameRule: {
				realName: [{
					validator: validateRealName,
					trigger: 'blur'
				}],
			},
			addFormConf: [{
					type: 'input',
					valName: 'userName',
					label: '用户名：',
					plh: '请输入登录用账户名'
				},
				{
					type: 'input',
					valName: 'password',
					inputType: 'password',
					label: '密码：',
					plh: '请输入账户密码'
				},
				{
					type: 'input',
					valName: 'rePassword',
					inputType: 'password',
					label: '重复密码：',
					plh: '请再次输入账户密码'
				},
				{
					type: 'input',
					valName: 'realName',
					label: '真实姓名：',
					plh: '请输入账户真实姓名'
				},
				{
					type: 'input',
					valName: 'phone',
					label: '联系方式：',
					plh: '请输入账户联系方式（移动电话）'
				},
				{
					type: 'select',
					valName: 'sex',
					selectList: [{
						value: 1,
						label: '男',
					}, {
						value: 0,
						label: '女',
					}],
					selLabName: 'label',
					selValName: 'value',
					label: '性别：',
					plh: '请选择账户性别'
				},
				{
					type: 'input',
					valName: 'mail',
					label: '邮箱：',
					plh: '请输入账户联系邮箱'
				},
				{
					type: 'select',
					valName: 'roleId',
					selectList: [],
					selLabName: 'roleName',
					selValName: 'id',
					label: '角色类型：',
					plh: '请选择账户角色类型'
				}
			],
			editFormConf: [{
					type: 'input',
					valName: 'userName',
					label: '用户名：',
					plh: '请输入登录用账户名'
				}, {
					type: 'input',
					valName: 'realName',
					label: '真实姓名：',
					plh: '请输入账户真实姓名'
				},
				{
					type: 'input',
					valName: 'phone',
					label: '联系方式：',
					plh: '请输入账户联系方式（移动电话）'
				},
				{
					type: 'select',
					valName: 'sex',
					selectList: [{
						value: 1,
						label: '男',
					}, {
						value: 2,
						label: '女',
					}],
					selLabName: 'label',
					selValName: 'value',
					label: '性别：',
					plh: '请选择账户性别'
				},
				{
					type: 'input',
					valName: 'mail',
					label: '邮箱：',
					plh: '请输入账户联系邮箱'
				},
				{
					type: 'select',
					valName: 'roleId',
					selectList: [],
					selLabName: 'roleName',
					selValName: 'id',
					label: '角色类型：',
					plh: '请选择账户角色类型'
				}
			],
			mailFormConf: [{
				label: '邮箱：',
				plh: '请输入新邮箱',
				valName: 'mail',
				type: 'input'
			}],
			passwordFormConf: [{
					label: '密码：',
					plh: '请输入新密码',
					valName: 'password',
					type: 'input',
					inputType: 'password'
				},
				{
					label: '重复密码：',
					plh: '请再次输入新密码',
					valName: 'rePassword',
					type: 'input',
					inputType: 'password'
				}
			],
			phoneFormConf: [{
				label: '联系方式：',
				plh: '请输入新联系方式(移动电话)',
				valName: 'phone',
				type: 'input'
			}],
			realNameFormConf: [{
				label: '真实姓名：',
				plh: '请输入账号使用者真实姓名',
				valName: 'realName',
				type: 'input'
			}],
			configList: [{ // 筛选组件配置
					plh: '角色类型',
					valName: 'roleId',
					type: 'select',
					labelName: 'roleName',
					valueName: 'id',
					keyName: 'key',
					selectList: [],
				},
				{
					plh: '用户名称',
					valName: 'userName',
					type: 'input'
				},
				{
					plh: '添加时间',
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
					title: '角色类型',
					key: 'roleName',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('div', this.dealNullData(params.row.roleName))
						]);
					}
				},
				{
					title: '用户名称',
					key: 'userName',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('div', this.dealNullData(params.row.userName))
						]);
					}
				},
				{
					title: '添加时间',
					key: 'createTime',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('div', this.dealTime(params.row.createTime))
						]);
					}
				},
				{
					title: '最近登陆时间',
					key: 'lastLoginTime',
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('div', this.dealTime(params.row.lastOnlineTime))
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
									margin: '0 auto',
									height: '20px',
									width: '50px',
									textAlign: 'center',
									backgroundColor: params.row.forbidden == 1 ? '#2D8CF0' : '#616B81',
									color: '#fff',
									borderRadius: '10px',
									lineHeight: '20px'
								}
							}, params.row.forbidden == 1 ? '启用' : params.row.forbidden == 0 ? '禁用' : '--')
						]);
					}
				},
				{
					title: '操作',
					key: 'action',
					width: 250,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Button', {
								props: {
									type: 'text',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.getAccountInfo(params.row)
									}
								}
							}, '详情'),
							h('Button', {
								props: {
									type: 'text',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.handleEdit(params.row)
									}
								}
							}, '编辑'),
							h('Button', {
								props: {
									type: 'text',
									size: 'small'
								},
								style: {
									marginRight: '5px',
								},
								on: {
									click: () => {
										this.handleForbidden(params.row)
									}
								}
							}, params.row.forbidden == 1 ? '禁用' : '启用'),
							h('Button', {
								props: {
									type: 'text',
									size: 'small'
								},
								style: {
									marginRight: '5px'
								},
								on: {
									click: () => {
										this.handleDelete(params.row)
									}
								}
							}, '删除'),
						]);
					}
				}
			],
			deviceForm: {},
			formConfig: [{
					label: '账号名称:',
					valueName: 'userName',
				},
				{
					label: '邮箱:',
					valueName: 'mail',
				},
				{
					label: '性别:',
					valueName: 'sex',
				},
				{
					label: '真实姓名:',
					valueName: 'realName',
				},
				{
					label: '联系方式:',
					valueName: 'phone',
				},
				{
					label: '所属角色:',
					valueName: 'roleName',
				},
			],
		}
	},
	components: {
		searchForm,
		tableComponent,
		dialogForm,
	},
	created() {
		this.getRoleList()
		this.addUrl = this.$api.manage_userAccount_create
		this.editUrl = this.$api.manage_userAccount_update
	},
	methods: {
		// 获取通用数据
		getRoleList() {
			this.createdFilter = true
		},
		// 获取表格数据
		getTableData() {
			this.showInfo = false
			let para = this.$refs.searchForm.handleSubmit()
			this.$refs.tableComponent.getData(this.$api.manage_userAccount_list, para)
		},
		// 获取账号详情
		getAccountInfo(row) {
			let para = {
					id: row.id
				},
				api = this.$api.manage_userAccount_detail
			this.$Ax.get(api, {
				params: para
			}).then(res => {
				this.accountInfo = res.data
				this.showInfo = true
			}).catch(err => {
				/* eslint-disable */
				console.log(err);
				/* eslint-enable */
			})
		},
		// 删除
		handleDelete(row) {
			this.$Modal.confirm({
				title: '删除',
				content: '确认删除该用户（' + row.userName + '）？',
				onOk: () => {
					let api = this.$api.manage_userAccount_delete,
						para = {
							id: row.id
						}
					this.$Ax.post(api, para).then(res => {
						if (res.success) {
							this.$Message.success('删除成功');
						}
						this.getTableData()
					}).catch(err => {
						/* eslint-disable */
						console.log(err);
						/* eslint-enable */
					})
				},
				onCancel: () => {
					this.$Message.success('已取消');
				}
			});
		},
		// 新增
		handleAdd() {
			let form = {
				userName: null,
				password: null,
				rePassword: null,
				realName: null,
				phone: null,
				sex: null,
				mail: null,
				roleId: null
			}
			this.$refs.dialogAdd.handlePushFormData(form)
			// this.$refs.dialogAdd.handleShow(true)
		},
		// 编辑
		handleEdit(row) {
			let form = {},
				para = {
					id: row.id
				},
				api = this.$api.manage_userAccount_detail
			this.$Ax.get(api, {
				params: para
			}).then(res => {
				form = res.data
				this.$refs.dialogEdit.handlePushFormData(form)
			}).catch(err => {
				/* eslint-disable */
				console.log(err);
				/* eslint-enable */
			})
		},
		// 单变量编辑
		handleSingleEdit(flag) {
			let form = {},
				para = {
					id: this.accountInfo.id
				},
				api = this.$api.manage_userAccount_detail
			this.$Ax.get(api, {
				params: para
			}).then(res => {
				form[flag] = res.data[flag]
				this.$refs['dialog_' + flag].handlePushFormData(form)
			}).catch(err => {
				/* eslint-disable */
				console.log(err);
				/* eslint-enable */
			})
		},

		// 提交单变量表单
		submitCompForm(params) {
			let para = this.accountInfo,
				api = this.$api.manage_userAccount_update
			for (let i in params.conf) {
				para[params.conf[i].valName] = params.form[params.conf[i].valName]
			}
			for (let i in para) {
				if (para[i] === "") {
					para[i] = null
				}
			}
			this.$Ax.post(api, para).then(res => {
				if (res.success) {
					this.$Message.success('编辑成功')
				}
				this.$refs[params.ref].handleShow(false)
				this.getAccountInfo(this.accountInfo)
			}).catch(err => {
				/* eslint-disable */
				console.log(err);
				/* eslint-enable */
			})
		},
		// 提交表单
		submit() {
			let api = this.$api.manage_factory_saveFactory,
				para = '',
				msg = ''
			this.$refs['form'].validate((valid) => {
				if (valid) {
					this.$Ax.post(api, para).then(res => {
						if (res.success) {
							this.$Message.success(msg);
							this.getTableData()
							this.dialog = false
						}
					}).catch(err => {
						/* eslint-disable */
						console.log(err);
						/* eslint-enable */
					})
				} else {
					return this.changeLoading();
				}
				setTimeout(() => {
					this.changeLoading();
				}, 1000);
			})
		},
		// 修改表单loading状态
		changeLoading() {
			this.formLoading = false;
			this.$nextTick(() => {
				this.formLoading = true;
			});
		},
		// 禁用/启用
		handleForbidden(row) {
			let msg = row.forbidden == 1 ? '禁用' : '启用',
				para = {
					id: row.id,
					forbiddenType: row.forbidden == 1 ? 2 : 1
				},
				api = this.$api.manage_userAccount_forbidden
			this.$Modal.confirm({
				title: msg,
				content: '确认' + msg + '该管理员(' + row.userName + ')账户？',
				onOk: () => {
					this.$Ax.post(api, para).then(res => {
						this.getTableData()
						if (res.success) {
							this.$Message.success(msg + '成功！')
						}
					}).catch(err => {
						/* eslint-disable */
						console.log(err)
						/* eslint-enable */
					})
				},
				onCancel: () => {
					this.$Message.info('已取消');
				}
			});
		},
		// 重置表单
		handleReset(form) {
			this.$refs[form].resetFields();
		},
		// 处理时间显示形式
		dealTime(date) {
			return this.$Utils.dealTime(date)
		},
		// 处理空数据
		dealNullData(data) {
			return this.$Utils.dealNullData(data)
		},
	}
}
</script>

<style scoped>
.accountList-content {
	padding: 20px 0;
	background-color: #fff;
	border-radius: 4px;
}

.searchBtn {
	padding: 1px 6px;
	font-size: 18px;
}

.formItem {
	width: 180px !important;
}
</style>

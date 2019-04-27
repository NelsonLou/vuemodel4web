// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

const postLogin = function() {
	let menu = [{
		"name": "systemModule",
		"icon": "ios-cog-outline",
		"sort": 7,
		"title": "系统管理",
		"child": [{
			"path": "/accountList",
			"flag": "menu",
			"name": "accountMenu",
			"sort": 1,
			"title": "账号列表",
			"child": [{
				"name": "管理员详情",
				"url": "/web/api/manage/userAccount/detail"
			}, {
				"name": "创建管理员",
				"url": "/web/api/manage/userAccount/create"
			}, {
				"name": "删除管理员",
				"url": "/web/api/manage/userAccount/delete"
			}, {
				"name": "修改个人信息",
				"url": "/web/api/manage/userAccount/update/info"
			}, {
				"name": "修改管理员",
				"url": "/web/api/manage/userAccount/update"
			}, {
				"name": "管理员列表",
				"url": "/web/api/manage/userAccount/list"
			}, {
				"name": "禁用、启用管理员",
				"url": "/web/api/manage/userAccount/forbidden"
			}]
		}, {
			"path": "/roleList",
			"flag": "menu",
			"name": "roleMenu",
			"sort": 2,
			"title": "角色列表",
			"child": [{
				"name": "创建角色",
				"url": "/web/api/manage/role/create"
			}, {
				"name": "删除角色",
				"url": "/web/api/manage/role/delete"
			}, {
				"name": "编辑角色",
				"url": "/web/api/manage/role/update"
			}, {
				"name": "角色详情",
				"url": "/web/api/manage/role/detail"
			}, {
				"name": "角色列表",
				"url": "/web/api/manage/role/list"
			}, {
				"name": "禁用、启用角色",
				"url": "/web/api/manage/role/forbidden"
			}]
		}, {
			"path": "/logList",
			"flag": "menu",
			"name": "logMenu",
			"sort": 4,
			"title": "日志列表",
			"child": [{
				"name": "管理日志列表",
				"url": "/web/api/manage/log/list"
			}]
		}]
	}]
	let token = 'asdadsadasdasdasdasdasdadasdas',
		userName = 'admin',
		success = true
	return {
		menu,
		userName,
		token
	}
}

const validateCode = function() {
	let code = 'test'
	return {
		code
	}
}

const userList = function() {
	let data = [{
		date: '2016-05-02',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1518 弄',
		// status: ''
	}]
	return {
		data
	}
}

// 登陆
Mock.mock('/mock/login', 'post', postLogin);
// 获取验证码
Mock.mock('/mock/validateCode', 'get', validateCode);
// 用户列表
Mock.mock('/mock/userList', 'get', userList);
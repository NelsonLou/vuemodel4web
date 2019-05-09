// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;

const postLogin = function() {
	let menu = []
	let token = 'token',
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
		role: 'root',
		status: '启用'
	}, {
		date: '2016-05-02',
		name: '王小虎',
		address: '上海市普陀区金沙江路 1518 弄',
		role: 'root',
		status: '启用'
	}, ]
	return {
		data
	}
}

const userDelete = function() {
	return {
		success: false,
		message: '删除用户失败！'
	}
}

const userAdd = function() {
	return {
		success: true,
		message: '新增用户成功！'
	}
}

const userInfo = function() {
	return {
		birthday: "1994-07-07 12:00:00",
		city: "宁波",
		department: ['departA', 'departC'],
		forbidden: "1",
		limitEndTime: "2019-06-05 00:00:00",
		limitStartTime: "2019-05-01 00:00:00",
		note: "测试用户",
		province: "浙江",
		roleName: "roleA",
		sex: "1",
		userName: "测试用户",
	}
}

// 登陆
Mock.mock('/mock/login', 'post', postLogin);
// 获取验证码
Mock.mock('/mock/validateCode', 'get', validateCode);
// 用户列表
Mock.mock('/mock/userList', 'get', userList);
// 删除用户
Mock.mock('/mock/deleteUser', 'post', userDelete);
// 新增用户
Mock.mock('/mock/addUser', 'post', userAdd);
// 用户详情
Mock.mock('/mock/userInfo', 'get', userInfo);
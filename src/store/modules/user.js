import router from '@/router'

const state = {
	userName: JSON.parse(sessionStorage.getItem('userName')) || '--',
	token: JSON.parse(sessionStorage.getItem('token')) || '',
	permission: JSON.parse(sessionStorage.getItem('permission')) || [],
	menu: JSON.parse(sessionStorage.getItem('menu')) || [],
	active_menu: JSON.parse(sessionStorage.getItem('active_menu')) || {},
}

const getters = {}

const mutations = {
	UPDATA_USERNAME: (state, data) => {
		state.userName = data
	},
	UPDATA_MENU: (state, data) => {
		state.menu = data
	},
	UPDATA_PERMISSION: (state, data) => {
		state.permission = data
	},
	UPDATA_TOKEN: (state, data) => {
		state.token = data
	},
	UPDATA_ACTIVE_MENU: (state, data) => {
		state.active_menu = data
	},
}

const actions = {
	// 清空用户数据
	handleClearUserInfo: () => {
		sessionStorage.clear()
	},
	// 修改当前展开菜单
	handleChangeActiveMenu: ({
		commit
	}, para) => {
		let obj = {
			active_name: para.name,
			active_module: para.module,
		}
		commit('UPDATA_ACTIVE_MENU', obj)
		sessionStorage.setItem('active_menu', JSON.stringify(obj));
	}
}

export default {
	state,
	getters,
	mutations,
	actions
}
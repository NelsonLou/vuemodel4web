import api from '@/config/api'
import store from '@/store'

const state = {
	userName: ''
}

const getters = {}

const mutations = {
	UPDATA_USERNAME: (state, data) => {
		state.userName = data.userName
	},
}

const actions = {
	// 刷新所有设备数据
	handleUpdataUserName: ({
		commit
	}, para) => {
		commit('UPDATA_USERNAME', para)
	},
}

export default {
	state,
	getters,
	mutations,
	actions
}
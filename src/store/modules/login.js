// import api from '@/config/api'
import Ax from '@/apiConfig/axios'
import store from '@/store'
import router from '@/router'
import sorting from '@/utils/sorting.js'
import url from '@/apiConfig/api'
import {
	Message,
} from 'iview'

const state = {
	login: false,
	code: '',
}

const getters = {
	doneTodos: state => {
		return state.login
	}
}

const mutations = {
	UPDATA_CODE: (state, data) => {
		state.code = data.code
	},
	UPDATA_LOGIN: (state, data) => {
		state.login = data
	},
}

const actions = {
	// 获取验证码
	getValidateCode: ({
		commit
	}) => {
		let api = '/mock/validateCode'
		Ax.get(api).then(res => {
			commit('UPDATA_CODE', {
				code: res.code,
			})
		}).catch(err => {
			/* eslint-disable */
			console.log(err);
			/* eslint-enable */
		})
	},
	// 登陆
	handleLogin: ({
		commit
	}, para) => {
		let api = '/mock/login'
		Ax.post(api, para).then(res => {
			console.log(res)
			// if (res.success) {
			Message.success('登陆成功')
			commit('UPDATA_LOGIN', true)
			sessionStorage.setItem('token', JSON.stringify(res.token))
			sessionStorage.setItem('userName', JSON.stringify(para.userName))
			sessionStorage.setItem('menu', JSON.stringify(res.menu))
			commit('UPDATA_MENU', res.menu)
			commit('UPDATA_USERNAME', res.userName)
			commit('UPDATA_TOKEN', res.token)
			router.push({
				path: '/'
			})
		}).catch(err => {
			/* eslint-disable */
			console.log(err);
			/* eslint-enable */
		})
	},
	// 登出
	handleLogout: () => {
		store.dispatch('handleClearUserInfo')
		router.push({
			path: 'login'
		})
	},
}

export default {
	state,
	getters,
	mutations,
	actions
}
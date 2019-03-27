import Vue from 'vue'
import Vuex from 'vuex'

// Vuex 模块引入
import user from '@/store/modules/user'
import login from '@/store/modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		login,
	}
})
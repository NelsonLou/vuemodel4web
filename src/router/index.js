import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import routes from '@/router/routes'

Vue.use(Router)

const RouterConfig = {
	// mode: 'history',
	routes
}
const router = new Router(RouterConfig)

// 路由跳转前
router.beforeEach((to, from, next) => {
	let token = !sessionStorage.getItem('token'),
		path = to.path
	if (token && path == '/login') {
		next()
	} else if (token && path != '/login') {
		next({
			path: '/login'
		})
	} else {
		next()
	}
	store.dispatch('handleChangeActiveMenu', to.meta)
})

// 路由跳转后
router.afterEach(() => {})

export default router
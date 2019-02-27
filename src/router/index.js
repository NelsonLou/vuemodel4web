import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes' //  引入组件配置文件

Vue.use(Router)

// 路由配置
const RouterConfig = {
	// mode: 'history', //开启mode="history"模式，需要服务端的支持.
	routes // 引入组件配置变量
}

const router = new Router(RouterConfig) // 创建新的vue-router实例

//路由跳转前执行
router.beforeEach((to, from, next) => {})

//路由跳转后执行
router.afterEach((to) => {});

// 抛出router实例
export default router
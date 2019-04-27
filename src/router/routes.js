// 主模板
const SysLayout = () =>
	import ('@/views/index/sysLayout')
//登陆页
const Login = () =>
	import ('@/views/login')
//首页
const Home = () =>
	import ('@/views/index/home')
//账户管理
const Account = () =>
	import ('@/views/demo/account')

// 路由配置
export default [{
	path: '/', //默认路径
	redirect: '/', // 重定向配置
	name: 'sysLayout', // 组件名称（重要，生命周期相关）
	component: SysLayout, // 对应组件
	children: [{
		path: '/',
		name: 'home',
		component: Home,
		meta: {
			breadcrumb: '数据中心',
			module: 'dataSystem',
			name: 'dataMenu',
		}
	}, {
		path: '/account',
		name: 'account',
		component: Account,
		meta: {
			breadcrumb: 'account',
			module: 'demo',
			name: 'account',
		}
	}]
}, {
	path: '/login', //默认路径
	name: 'login', // 组件名称（重要，生命周期相关）
	component: Login, // 对应组件
}, ]
// 登陆页
const Login = () =>
	import ('@/views/index/login')
// 主模版组件
const SysLayout = () =>
	import ('@/views/index/sysLayout')
// 主页
const Home = () =>
	import ('@/views/index/home')

// 路由配置
export default [{
	path: '/', //默认路径
	name: 'sysLayout', // 组件名称（重要，生命周期相关）
	component: SysLayout, // 对应组件
	children: [
		// 	{
		// 	path: '/',
		// 	name: 'home',
		// 	component: Home,
		// 	meta: {
		// 		breadcrumb: '首页'
		// 	}
		// }
	]
}, {
	path: '/login', //默认路径
	name: 'login', // 组件名称（重要，生命周期相关）
	component: Login, // 对应组件
}]
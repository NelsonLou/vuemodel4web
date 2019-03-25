// 组件导入（懒加载格式）
const Login = () => import ('@/views/Login/Login.vue')

// 路由配置
export default [{
	path: '/', //默认路径
	redirect: '/Login', // 重定向配置
	name: 'Login', // 组件名称（重要，生命周期相关）
	component: Login, // 对应组件
	// children: [{ //子组件配置
	// 	path: '/',
	// 	name: '',
	// 	component:
	// }]
}]
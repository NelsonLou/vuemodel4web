// 组件导入（懒加载格式）
const HelloWorld = () =>
	import ('@/views/HelloWorld')

// 路由配置
export default [{
	path: '/', //默认路径
	redirect: '/', // 重定向配置
	name: 'HelloWorld', // 组件名称（重要，生命周期相关）
	component: HelloWorld, // 对应组件
	// children: [{ //子组件配置
	// 	path: '/',
	// 	name: '',
	// 	component:
	// }]
}]
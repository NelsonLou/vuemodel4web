// 基本布局不用按需加载
import BasicLayout from '@/layouts/BasicLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'
// 组件导入（懒加载格式）
const Login = () => import('@/views/User/Login.vue')
const Register = () => import('@/views/User/Register.vue')
const Map = () => import('@/views/MapChart/Map.vue')

// 路由配置
export default [
	// 用户登录注册界面的布局
	{
		path: '/user',
		component: UserLayout,
		children: [
			{ 
				path: '/',
				redirect: '/user/login',
			},
			{
				path: '/user/login',
				name: 'login',
				component: Login,
			},
			{
				path: '/user/register',
				name: 'register',
				component: Register,
			}
		]
	}, 
	// 根路径布局，其他模块挂在基本布局下
	{
		path: '/',
		name: 'home',
		component: BasicLayout,
		children: [
			{
				path: '/mapchart/map',
				name: 'map',
				component: Map
			}
		],
	}
]
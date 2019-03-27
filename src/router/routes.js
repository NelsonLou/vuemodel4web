// 主模板
const SysLayout = () =>
	import ('@/views/index/sysLayout')
//产测首页
const InspectionHome = () =>
	import ('@/views/inspection/inspectionHome')
//登陆页
const Login = () =>
	import ('@/views/login')
//首页
const Home = () =>
	import ('@/views/index/home')
// 用户列表
const UserList = () =>
	import ('@/views/user/userList')
// 账户列表
const AccountList = () =>
	import ('@/views/system/accountList')
// 角色列表
const RoleList = () =>
	import ('@/views/system/roleList')
// 日志列表
const LogList = () =>
	import ('@/views/system/logList')


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
		path: '/userList',
		name: 'userList',
		component: UserList,
		meta: {
			breadcrumb: '用户列表',
			parentName: '用户管理',
			module: 'userModule',
			name: 'userMenu',
		}
	}, {
		path: '/accountList',
		name: 'accountList',
		component: AccountList,
		meta: {
			breadcrumb: '账号列表',
			parentName: '系统管理',
			module: 'systemModule',
			name: 'accountMenu',
		}
	}, {
		path: '/roleList',
		name: 'roleList',
		component: RoleList,
		meta: {
			breadcrumb: '角色列表',
			parentName: '系统管理',
			module: 'systemModule',
			name: 'roleMenu',
		}
	}, {
		path: '/logList',
		name: 'logList',
		component: LogList,
		meta: {
			breadcrumb: '日志列表',
			parentName: '系统管理',
			module: 'systemModule',
			name: 'logMenu',
		}
	}]
}, {
	path: '/login', //默认路径
	name: 'login', // 组件名称（重要，生命周期相关）
	component: Login, // 对应组件
}, ]
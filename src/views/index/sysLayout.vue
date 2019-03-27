<template>
<div class="layout">
	<Layout class="layout-main">
		<!-- 侧边导航栏 -->
		<Sider v-show="showSider" class="layout-sider" collapsible ref="side" hide-trigger :collapsed-width='0' v-model="isCollapsed">
			<div class="logoHome">LOGO</div>
			<Menu accordion v-if='!collapsed' :open-names="open_menu" :active-name='active_menu' theme="dark" width="auto" :class="menuitemClasses">
				<template v-for='(item,num) in menu'>
					<Submenu :name="item.name" :key='num'>
						<template slot="title">
							<Icon :type="item.icon" />
							<span>{{item.title}}</span>
						</template>
						<MenuItem v-for='(itemChild,index) in item.child' :key='index' :name="itemChild.name" :to='itemChild.path'>{{itemChild.title}}</MenuItem>
					</Submenu>
				</template>
			</Menu>
		</Sider>
		<Layout :class="layoutClass">
			<!-- 头部 -->
			<Header class="layout-header" :class="{ leftToZore: isLeftClass }">
				<Layout>
					<Content class="layout-header-right">
						<!-- 顶部操作栏 -->
						<div class="layout-header-top clearfloat">
							<Breadcrumb class="Breadcrumb left marginLeft" style="lineHeight:60px;">
								<BreadcrumbItem>{{parentName}}</BreadcrumbItem>
								<BreadcrumbItem>{{breadcrumb}}</BreadcrumbItem>
							</Breadcrumb>
							<Dropdown class="right Dropdown" placement="bottom-end" trigger="click" @on-click="handleDropdown">
								<strong class="user">
									<Avatar style="background-color: #55b387" icon="md-person" size="small"></Avatar>
									{{userName}}
									<Icon type="ios-arrow-down"></Icon>
								</strong>
								<DropdownMenu class="list" slot="list">
									<DropdownItem v-for="item in dropdown" :key="item.label" :name="item.name">
										<span>{{item.label}}</span>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<div class="right layout-header-date">{{newDate()}}</div>
						</div>
					</Content>
				</Layout>
			</Header>
			<!-- 内容 -->
			<Content class="layout_content">
				<router-view class="marginTop" style="padding:20px;background:#fff;border-radius:5px;"></router-view>
				<userCenter ref='userCenter'></userCenter>
			</Content>
			<!-- 尾部 -->
			<div class="layout_footer">
				@2019 hadlinks.com 海大物联研发中心团队提供技术支持
			</div>
		</Layout>
	</Layout>
	<Spin fix class="syslayout_sp in" v-if='homeLoading'></Spin>
</div>
</template>
<script>
import userCenter from '@/components/userCenter'
export default {
	name: 'syslayout',
	data() {
		return {
			timer: null,
			isCollapsed: false,
			collapsed: false,
			homeLoading: false,
			collapsedStyle: {
				color: '#000',
				marginTop: '10px',
				marginLeft: '20px',
			},
			nowPermission: '管理平台',
			dropdown: [{
					label: '修改密码',
					name: 'userCenter',
					path: '/personal',
				},
				{
					label: '退出',
					name: 'logout',
					path: '/login',
				}
			],
			layoutClass: 'openLayout',
			showSider: true,
			isLeftClass: false
		}
	},
	components: {
		userCenter
	},
	created() {
		if (this.menu.length < 1) {
			this.isCollapsed = true
		} else {
			this.isCollapsed = false
		}
	},
	computed: {
		showSwitch() {
			return this.$store.state.user.showSwitch
		},
		// 菜单列表
		menu() {
			console.log(this.$store.state.user.menu);
			return this.$store.state.user.menu
		},
		// 展开菜单
		open_menu() {
			let menu = []
			menu.push(this.$store.state.user.active_menu.active_module)
			return menu
		},
		// 点击菜单
		active_menu() {
			return this.$store.state.user.active_menu.active_name
		},
		// 用户名
		userName() {
			return this.$store.state.user.userName
		},
		// 所处模块
		model() {
			return this.$store.state.user.model
		},
		permission() {
			return this.$store.state.user.permission
		},
		// 控制侧边栏缩进按钮
		rotateIcon() {
			return [
				['menu-icon', 'left', 'left-icon'],
				this.isCollapsed ? ['rotate-icon', 'left', 'left-icon'] : ''
			];
		},
		// 控制侧边拦缩进
		menuitemClasses() {
			return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
			]
		},
		breadcrumb() {
			return this.$route.meta.breadcrumb
		},
		parentName() {
			return this.$route.meta.parentName
		}
	},
	watch: {
		// 菜单列表
		menu(val) {
			if (val.length < 1) {
				this.isCollapsed = true
			} else {
				this.isCollapsed = false
			}
		},
	},
	methods: {
		// 处理下拉框
		handleDropdown(name) {
			switch (name) {
				case 'userCenter':
					// 修改密码
					this.$refs.userCenter.handleShow(true)
					break
				default:
					// 退出系统
					this.$Modal.confirm({
						title: '警告',
						content: '确认退出系统?',
						okText: '确认',
						cancelText: '取消',
						onOk: () => {
							this.$store.dispatch('handleLogout') // 重置菜单
						}
					})
			}
		},
		//返回最新时间
		newDate() {
			let date = new Date,
				year = date.getFullYear(),
				month = Number(date.getMonth() + 1) < 10 ? '0' + Number(date.getMonth() + 1) : Number(date.getMonth() + 1),
				day = Number(date.getDate()) < 10 ? '0' + Number(date.getDate()) : Number(date.getDate())
			return year + '-' + month + '-' + day
		},
		// 控制菜单展开
		collapsedSider() {
			let that = this
			if (this.collapsed) {
				this.collapsed = setTimeout(function() {
					that.collapsed = !that.collapsed
					that.layoutClass = 'openLayout'
					that.showSider = true
					that.isLeftClass = false
				}, 150)
			} else {
				that.collapsed = !that.collapsed
				that.layoutClass = 'closeLayout'
				that.showSider = false
				that.isLeftClass = true
			}
			this.$refs.side.toggleCollapse()
		}
	}
}
</script>
<style scoped>
.syslayout_spin {
	z-index: 9999;
}

.ivu-layout-sider {
	position: fixed;
	top: 0px;
	left: 0px;
	height: 100%;
	z-index: 9999;
	background-color: #192639 !important;
	z-index: 99999999;
}

.ivu-menu-dark {
	background-color: #192639 !important;
	font-size: 14px;
	font-weight: 700;
}

.openLayout {
	margin-left: 200px;
}

.closeLayout {
	margin-left: 0;
}

.layout {
	background: #f5f7f9;
	position: relative;
	border-radius: 4px;
	overflow: hidden;
	min-height: 100vh;
	min-width: 1200px;
}

.layout-main {
	position: relative;
	min-height: 100vh;
}

.layout-header-left {
	color: #fff;
	font-size: 30px;
	font-weight: 700;
	text-align: center;
}

.layout-header {
	position: fixed;
	top: 0;
	left: 200px;
	right: 0;
	margin: 0;
	padding: 0;
	height: 64px;
	z-index: 1;
}

.layout-header.leftToZore {
	left: 0;
}

.layout-header .ivu-layout {
	height: 100%;
}

.layout-header-right {
	display: inline-block;
	background-color: #ECEDF1;
	/* color: #fff; */
}

.layout-header-right.ivu-layout-content {
	overflow-y: hidden;
}

.layout-header-top {
	height: 100%;
}

.layout-header-top .headerIcon {
	margin-top: 17px !important;
}

.myMenu {
	margin-top: 23px;
	height: 18px;
}

.myMenu>>>.ivu-dropdown-rel {
	height: 100%;
	line-height: 1;
}

.mySelectMenu {
	font-family: PingFang-SC-Bold;
	font-size: 18px;
	font-weight: bold;
	color: #3F4656;
}

.layout-header-act {
	background: #192639;
}

.menu-icon {
	transition: all .3s;
}

.rotate-icon {
	transform: rotate(-90deg);
}

.menu-item span {
	display: inline-block;
	overflow: hidden;
	width: 69px;
	text-overflow: ellipsis;
	white-space: nowrap;
	vertical-align: bottom;
	transition: width .2s ease .2s;
}

.menu-item i {
	transform: translateX(0px);
	transition: font-size .2s ease, transform .2s ease;
	vertical-align: middle;
	font-size: 16px;
}

.Breadcrumb {
	line-height: 32px;
}

.Breadcrumb span {
	font-size: 12px;
	color: #999;
}

.layout-header-date {
	margin-right: 20px;
	line-height: 64px;
}

.Dropdown {
	margin-right: 20px;
	line-height: 64px;
}

.layout-header-route {
	margin-right: 50px;
	color: #fff;
	list-style: none;
}

.layout-header-route .left {
	margin-left: 20px;
	line-height: 30px;
}

.layout-pathLink {
	cursor: pointer;
}

.logoHome {
	margin: 25px auto;
	background-size: 100% 100%;
	width: 100px;
	height: 50px;
	/* demo */
	color: #fff;
	text-align: center;
	font-size: 30px;
	font-weight: 700;
}

.left-icon {
	margin-top: 20px !important;
}

.layout_content {
	margin-top: 64px;
	padding: 20px;
	padding-top: 0;
	min-height: 280px;
	background: #F4F4F7;
	height: 100%;
}

.layout_content .explain {
	float: right;
	line-height: 32px;
	font-size: 12px;
	color: #999;
}

.layout_footer {
	height: 40px;
	line-height: 40px;
	font-size: 12px;
	color: #999;
	text-align: center;
	background-color: #ECEDF1;
}
</style>

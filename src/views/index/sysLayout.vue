<template>
<div class="layout">
	<el-container>
		<el-aside class="layout_side" :width="asideWidth">
			<div class="layout_LOGO_l"></div>
			<el-menu default-active="2" class="el-menu-vertical-demo layout_menu" :collapse='menuCollapse' router unique-opened background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-setting"></i>
						<span v-show='showMenuSpan'>Module</span>
					</template>
					<el-menu-item index="/account">DemoPage</el-menu-item>
					<el-menu-item index="1-2">MenuItem</el-menu-item>
				</el-submenu>
			</el-menu>
		</el-aside>
		<el-container>
			<el-header class="clearfloat layout_header">
				<!-- 缩进按钮 -->
				<i :class="[showMenuSpan?'el-icon-s-unfold':'el-icon-s-fold','layout_headerIcon']" @click='handleCollapse'></i>
				<!-- 面包屑 -->
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>活动管理</a></el-breadcrumb-item>
				</el-breadcrumb>
				<!-- 下拉功能菜单 -->
				<el-dropdown class="right layout_dropdown" @command="handleClick">
					<span class="el-dropdown-link">
						userName<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command='EditPassword'>EditPassword</el-dropdown-item>
						<el-dropdown-item command='Logout'>Logout</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-header>
			<!-- 主要部分 -->
			<el-main>
				<router-view></router-view>
			</el-main>
			<!-- footer -->
			<el-footer height='44px'>@2019 hadlinks.com 海大物联研发中心团队提供技术支持</el-footer>
		</el-container>
	</el-container>
</div>
</template>
<script>
export default {
	name: 'syslayout',
	data() {
		return {
			asideWidth: '200px',
			menuCollapse: false,
			showMenuSpan: true,
		}
	},
	components: {},
	created() {},
	computed: {},
	watch: {
		menuCollapse(val) {
			this.asideWidth = val ? '70px' : '200px'
		}
	},
	methods: {
		handleCollapse() {
			this.showMenuSpan = !this.showMenuSpan
			let that = this
			setTimeout(function() {
				that.menuCollapse = !that.menuCollapse
			}, 100)
		},
		handleClick(command) {
			if (command == 'Logout') {
				this.$store.dispatch('handleLogout')
			}
		}
	}
}
</script>
<style scoped>
.layout {
	min-height: 100vh;
	min-width: 1200px;
}

.layout_header {
	background: #f5f7f9;
}

.layout_side {
	height: 100vh;
}

.layout_menu {
	height: calc(100vh - 80px);
	/* 设置导航字体不能被选中 */
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

.layout_LOGO_s {
	height: 60px;
	background: #f5f7f9;
	text-align: center;
	line-height: 60px;
}

.layout_LOGO_l {
	height: 60px;
	width: 80px;
	background: #f5f7f9;
	text-align: center;
	line-height: 60px;
	background-color: #fff;
	background-image: url('../../assets/logo.jpg');
	background-size: 100% 100%;
}

.el-submenu .el-menu-item {
	text-align: center;

}

.el-footer {
	text-align: center;
	line-height: 44px;
	font-size: 12px;
	color: #909090;
}

.layout_dropdown {
	margin-top: 20px;
}

.layout_headerIcon {
	font-size: 30px;
	margin-top: 15px;
}

.el-breadcrumb {
	display: inline-block;
	margin-left: 20px;
	margin-top: -5px;
}

.el-menu--collapse {
	width: auto;
}
</style>

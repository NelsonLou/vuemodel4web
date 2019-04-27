import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//
// // iView 完整引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//
// 引入全局表格组件
import components from '@/components/components.js';
Vue.use(components);

// 基础样式导入
import './style/base.css'

// 引入全局api文档
import api from './apiConfig/api'
Vue.prototype.$api = api

// 引入axios实例
import Ax from './apiConfig/axios'
Vue.prototype.$Ax = Ax

// 全局引入echarts
var echarts = require('echarts');
Vue.prototype.$Echarts = echarts

// 引入全局数据处理方法
import utils from './utils/dealNullData.js'
Vue.prototype.$Utils = utils

// 引入mock
require('@/mock/index.js')
Vue.config.productionTip = false
Vue.use(ElementUI);


new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
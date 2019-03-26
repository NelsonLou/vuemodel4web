import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css';
// 引入vuex全局库
import store from './store'
Vue.prototype.$Store = store

// 全局组件定义
import components from './components/components.js';
Vue.use(components);
Vue.use(iView)
// 引入全局api接口配置文件
import api from './apiConfig/api'
Vue.prototype.$Api = api

// 引入axios实例
import Ax from '@/apiConfig/axios'
Vue.prototype.$Ax = Ax

// 引入全局websorket方法
import wsAll from './utils/websorketAll'
Vue.prototype.$WsAll = wsAll

// 引入全局基础样式
import './style/base.css'

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
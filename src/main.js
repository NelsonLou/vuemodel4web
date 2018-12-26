import Vue from 'vue'
import App from './App.vue'

// 引入vuex全局库
import store from './store'
Vue.prototype.$Store = store

// 全局组件定义
import components from './components/components.js';
Vue.use(components);

// 引入全局api接口配置文件
import api from './config/api'
Vue.prototype.$Api = api

// 引入axios实例
import Ax from '@/config/axios'
Vue.prototype.$Ax = Ax

// 引入全局websorket方法
import wsAll from './utils/websorketAll'
Vue.prototype.$WsAll = wsAll

// 引入全局基础样式
import './style/base.css'

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
}).$mount('#app')
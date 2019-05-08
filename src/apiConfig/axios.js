// axios配置文件 配置新的axios类
import axios from 'axios'
import qs from 'qs'
import apiConfig from '@/apiConfig'
import store from '@/store'
import {
	Message
} from 'element-ui';

const {
	baseURL,
	timeout,
	commonKey
} = apiConfig

// axios创建配置实例
const Ax = axios.create({
	// baseURL: baseURL,
	timeout: timeout,
	transformRequest: [
		(data) => qs.stringify(data) // 序列化请求的数据
	]
});

// 添加请求拦截器
Ax.interceptors.request.use(function(config) {
	// 请求头中添加sessionStorage存储的token
	config.headers['token'] = JSON.parse(sessionStorage.getItem('token'))
	return config
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
Ax.interceptors.response.use(function(response) {
	if (response.data.message != undefined) {
		Message({
			message: response.data.message,
			type: response.data.success ? 'success' : 'info'
		});
	}
	// 响应数据统一配置
	return response.data
}, function(error) {
	// 对响应错误执行
	Message.error('服务器异常，请稍后再试。')
	return Promise.reject(error);
});

export default Ax //抛出实例
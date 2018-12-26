// axios配置文件 配置新的axios类
import axios from 'axios'
import qs from 'qs'
import config from '@/config'
import store from '../store'
const {
	env,
	baseURL,
	timeout
} = config

// axios创建配置实例
const Ax = axios.create({
	baseURL: baseURL,
	timeout: timeout,
	transformRequest: [
		(data, headers) => qs.stringify(data) // 序列化请求的数据
	]
});

// 添加请求拦截器
Ax.interceptors.request.use(function(config) {
	// 请求头中添加sessionStorage存储的token
	config.headers['Authorization'] = sessionStorage.getItem('token')
	return config
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
Ax.interceptors.response.use(function(response) {
	// 响应数据统一配置
	return response
}, function(error) {
	// 对响应错误执行
	return Promise.reject(error);
});

export default Ax //抛出实例
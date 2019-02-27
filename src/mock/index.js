import Mock from 'mockjs' // 引入mockjs
import {
	userLogin
} from './user'

const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

Mock.mock('/user/login', 'post', userLogin) // 根据数据模板生成模拟数据
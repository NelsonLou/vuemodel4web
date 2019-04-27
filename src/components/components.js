// 全局组件统一注册文件
import tableComp from './tableComp.vue';
export default (Vue) => {
	Vue.component("tableComp", tableComp);
}
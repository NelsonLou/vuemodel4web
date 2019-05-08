// 全局组件统一注册文件
import tableComp from './tableComp.vue';
import formComp from './formComp.vue';
export default (Vue) => {
	Vue.component("tableComp", tableComp);
	Vue.component("formComp", formComp);
}
<template lang="html">
<div class="formComp">
    <el-form v-if='showForm' :inline="inline"  class="demo-form-inline">
        <el-form-item v-for='(item,index) in formConf' :key='index' :label="item.label?item.label+'：':''" :label-width="item.label?'100px':'0px'" >
            <!-- input -->
            <el-input class='formInput' v-if='item.type=="input"' size='small' :placeholder="item.plh" v-model='form[item.valName]' clearable></el-input>
            <!-- select -->
            <el-select class='formInput' v-if='item.type=="select"' :multiple='item.multiple' size='small' v-model='form[item.valName]'  :placeholder="item.plh" clearable>
                <el-option v-for='selItem in item.selectList' :key='selItem.value' :value="selItem.value" :label='selItem.label'></el-option>
            </el-select>
            <!-- timeRange -->
            <el-date-picker v-if='item.type=="timeRange"' size='small' v-model="form[item.valName]" @change='handleDealArrayRange(item)' type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间">
            </el-date-picker>
            <!-- Cascader -->
            <el-cascader v-if='item.type=="cascader"' expand-trigger="hover" :options="item.cascaderData" @change='handleDealArrayRange(item)' :props="item.props" v-model="form[item.valName]">
            </el-cascader>
            <!-- switch -->
            <el-switch v-if='item.type=="switch"' v-model="form[item.valName]" :active-value='item.selectList[0].value' :inactive-value='item.selectList[1].value' :active-text="item.selectList[0].label" :inactive-text="item.selectList[1].label">
            </el-switch>
            <!-- textarea -->
            <el-input v-if='item.type=="textarea"' :placeholder='item.plh' type="textarea" v-model="form[item.valName]"></el-input>
            <!-- date -->
            <el-date-picker v-if='item.type=="date"' v-model="form[item.valName]" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
            </el-date-picker>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
	name: 'formComp',
	data() {
		return {
			form: {},
			showForm: false,
		}
	},
	created() {
		for (let i in this.formConf) {
			this.form[this.formConf[i].valName] = null
			if (this.formConf[i].childValName) {
				for (let x in this.formConf[i].childValName) {
					this.form[this.formConf[i].childValName[x]] = null
				}
			}
		}
		this.form = Object.assign({}, this.form)
		this.showForm = true
	},
	props: {
		formConf: { // 表单配置
			type: Array,
			required: true
		},
		inline: { // 是否为行内表单
			type: Boolean,
			required: false,
			default: false,
		},
		autoSubmit: { // 是否自动提交
			type: Boolean,
			required: false,
			default: false,
		},
		submitUrl: {
			type: String,
			required: false,
			default: '',
		}
	},
	methods: {
		// 数据插入表单
		handleDataEnter(form) {
			for (let i in this.form) {
				this.form[i] = form[i]
			}
			for (let i in this.formConf) {
				if (this.formConf[i].childValName) {
					this.form[this.formConf[i].valName] = [form[this.formConf[i].childValName[0]], form[this.formConf[i].childValName[1]]]
				} else {
					this.form[this.formConf[i].valName] = form[this.formConf[i].valName]
				}
			}
		},
		// 数据提交
		handleSubmit(flag) {
			if (this.autoSubmit) { // 组件自动提交表单
				this.$Ax.post(this.submitUrl, this.handleDealForm(this.form))
					.then(res => {
						this.$emit('handleAferSubmit')
					}).catch(err => {
						// eslint-disable-next-line
						console.log(err);
					})
			} else { // 返还表单数据至父组件
				return this.handleDealForm(this.form)
			}
		},
		// 提交前处理表单数据
		handleDealForm(form) {
			let newForm = Object.assign({}, this.form)
			for (let i in this.formConf) {
				if (this.formConf[i].childValName) {
					delete newForm[this.formConf[i].valName]
				}
				if (this.formConf[i].type == 'date') {
					newForm[this.formConf[i].valName] = this.$Utils.dealTime(newForm[this.formConf[i].valName])
				}
			}
			return newForm
		},
		// 多字段数据父级赋值给子级
		handleDealArrayRange(obj) {
			for (let i in obj.childValName) {
				if (obj.type == 'timeRange') {
					this.form[obj.childValName[i]] = this.$Utils.dealTime(this.form[obj.valName][i])
				} else {
					this.form[obj.childValName[i]] = this.form[obj.valName][i]
				}
			}
		}
	}
}
</script>

<style lang="css" scoped>
.formInput{
    width: 200px;
}
</style>

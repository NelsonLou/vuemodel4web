<template>
<div class="login clearfloat">
	<el-card class="login_card right">
		<div class="login_LOGO"></div>
		<el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
			<el-form-item prop="userName">
				<el-input ref='userNameIP' placeholder='用户名' @keyup.enter.native="handleFocus('pwdIP')" v-model="loginForm.userName"></el-input>
			</el-form-item>
			<el-form-item prop="password">
				<el-input ref='pwdIP' placeholder='密码' @keyup.enter.native="handleFocus('validateBoxIP')" v-model="loginForm.password" type="password"></el-input>
			</el-form-item>
			<el-form-item prop="code" class="clearfloat" v-loading="validateLoading">
				<el-input ref='validateBoxIP' placeholder='验证码' v-model.number="loginForm.code" @keyup.enter.native="handleLogin('validateBoxIP')" class="validateBoxIP"></el-input>
				<canvas id="validateBox" class="right"></canvas>
			</el-form-item>
			<el-form-item>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
				<el-button @click="handleReset('loginForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</div>
</template>
<script>
export default {
	name: 'login',
	data() {
		return {
			img: '',
			focus: 'userName',
			validateLoading: false,
			flagSubmit: false,
			loginForm: {
				userName: '',
				password: '',
				code: '',
				codeId: '',
			},
			rules: {
				userName: [{
					required: true,
					message: '用户名不能为空',
					trigger: 'blur'
				}],
				password: [{
					required: true,
					message: '密码不能为空',
					trigger: 'blur'
				}],
				code: [{
					required: true,
					message: '验证码不能为空',
					trigger: 'blur'
				}]
			}
		}
	},
	created() {},
	computed: {
		code() {
			return this.$store.state.login.code
		},
	},
	mounted() {
		this.$store.dispatch('getValidateCode')
	},
	watch: {
		code(val) {
			this.handleCreated(val)
		}
	},
	methods: {
		// 获取验证码
		getValidateCode() {
			this.handleCreated('test')
		},
		// 调用验证码生成
		handleCreated(code) {
			let options = {
				canvasId: "validateBox",
				txt: code,
				height: 50,
				width: 220
			}
			this.writeAuthCode(options);
		},
		// 生成验证码
		writeAuthCode(options) {
			var canvas = document.getElementById(options.canvasId);
			canvas.width = options.width || 300
			canvas.height = options.height || 150
			let ctx = canvas.getContext('2d'); /**创建一个canvas对象*/
			ctx.textBaseline = "middle";
			ctx.fillStyle = this.randomColor(180, 255); /**这个范围的颜色作背景看起来清晰一些*/
			ctx.fillRect(0, 0, options.width, options.height);
			for (let i = 0; i < options.txt.length; i++) {
				let txt = options.txt.charAt(i); /**让每个字不一样*/
				ctx.font = '20px SimHei';
				ctx.fillStyle = this.randomColor(50, 160); /**随机生成字体颜色*/
				ctx.shadowOffsetY = this.randomNum(-3, 3);
				ctx.shadowBlur = this.randomNum(-3, 3);
				ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
				let x = options.width / (options.txt.length + 1) * (i + 1);
				let y = options.height / 2;
				let deg = this.randomNum(-30, 30);
				/**设置旋转角度和坐标原点*/
				ctx.translate(x, y);
				ctx.rotate(deg * Math.PI / 180);
				ctx.fillText(txt, 0, 0);
				/**恢复旋转角度和坐标原点*/
				ctx.rotate(-deg * Math.PI / 180);
				ctx.translate(-x, -y);
			}
			/**1~4条随机干扰线随机出现*/
			for (let i = 0; i < this.randomNum(1, 4); i++) {
				ctx.strokeStyle = this.randomColor(40, 180);
				ctx.beginPath();
				ctx.moveTo(this.randomNum(0, options.width), this.randomNum(0, options.height));
				ctx.lineTo(this.randomNum(0, options.width), this.randomNum(0, options.height));
				ctx.stroke();
			}
			/**绘制干扰点*/
			for (let i = 0; i < options.width / 6; i++) {
				ctx.fillStyle = this.randomColor(0, 255);
				ctx.beginPath();
				ctx.arc(this.randomNum(0, options.width), this.randomNum(0, options.height), 1, 0, 2 * Math.PI);
				ctx.fill();
			}
		},
		// 随机数字
		randomNum(min, max) {
			return Math.floor(Math.random() * (max - min) + min);
		},
		// 随机颜色
		randomColor(min, max) {
			let r = this.randomNum(min, max);
			let g = this.randomNum(min, max);
			let b = this.randomNum(min, max);
			return "rgb(" + r + "," + g + "," + b + ")";
		},
		// 登录相关
		handleLogin() {
			this.flagSubmit = true
			this.$refs['loginForm'].validate((valid) => {
				if (valid) {
					this.$store.dispatch('handleLogin', this.loginForm)
				} else {
					if (this.loginForm.userName == '') {
						this.$refs.userNameIP.focus()
					} else if (this.loginForm.password == '') {
						this.$refs.pwdIP.focus()
					} else if (this.loginForm.code == '') {
						this.$refs.validateBoxIP.focus()
					}
					return false;
				}
			});
		},
		// 控制焦点
		handleFocus(val) {
			if (this.loginForm.userName == '') {
				this.$refs.userNameIP.focus()
			} else if (this.loginForm.password == '') {
				this.$refs.pwdIP.focus()
			} else if (this.loginForm.code == '') {
				this.$refs.validateBoxIP.focus()
			} else {
				this.handleLogin()
			}
		},
		// 重置表单
		handleReset(form) {
			this.$refs[form].resetFields()
		}
	}
}
</script>
<style scope>
.login_card {
	width: 400px;
	height: 450px;
	margin-right: 200px;
	margin-top: 15%;
}

.login_LOGO {
	background-image: url('../assets/logo.jpg');
	background-size: 100% 100%;
	width: 100px;
	height: 100px;
	line-height: 80px;
	font-size: 30px;
	text-align: center;
	margin: 0 auto;
}

.validateBoxIP {
	width: 35%;
}

#validateBox {
	border-radius: 5px;
	width: 60%;
	height: 40px;
}
</style>

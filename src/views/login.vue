<template>
<div class="login clearfloat">
	<el-card class="login_card right">
		<div class="login_LOGO">
			LOGO
		</div>
		<el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="demo-ruleForm">
			<el-form-item prop="pass">
				<el-input placeholder='用户名' v-model="loginForm.pass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="checkPass">
				<el-input type="password" placeholder='密码' v-model="loginForm.checkPass" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item prop="age" class="clearfloat">
				<el-input placeholder='验证码' v-model.number="loginForm.age" style="width:35%;"></el-input>
				<canvas id="validateBox" class="right"></canvas>
			</el-form-item>
			<el-form-item>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
				<el-button @click="resetForm('loginForm')">重置</el-button>
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
			validateLoading: false,
			timer: null,
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
				validate: [{
					required: true,
					message: '验证码不能为空',
					trigger: 'blur'
				}]
			}
		}
	},
	created() {
		this.$store.dispatch('getValidateCode')
	},
	computed: {
		code() {
			return this.$store.state.login.code
		},
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
			let userInput = document.getElementById('unInput'),
				pwdInput = document.getElementById('pwdInput'),
				vaInput = document.getElementById('vaInput')
			this.$refs['loginForm'].validate((valid) => {
				if (valid) {
					this.loginForm.codeId = this.$store.state.login.codeId
					this.$store.dispatch('handleLogin', this.loginForm)
				} else {
					if (this.loginForm.userName == '') {
						this.timer = setTimeout(function() {
							userInput.children[2].focus()
							userInput.children[2].select()
						}, 100)
					} else if (this.loginForm.password == '') {
						this.timer = setTimeout(function() {
							pwdInput.children[2].focus()
							pwdInput.children[2].select()
						})
					} else if (this.loginForm.code == '') {
						this.timer = setTimeout(function() {
							vaInput.children[2].focus()
							vaInput.children[2].select()
						})
					}
				}
			})
		},
		// 控制焦点
		handleFocus(count) {
			let pwdInput = document.getElementById('pwdInput'),
				vaInput = document.getElementById('vaInput')
			if (count == 'un') {
				this.timer = setTimeout(function() {
					pwdInput.children[2].focus()
					// pwdInput.children[1].select()
				}, 100)
			} else if (count == 'pw') {
				this.timer = setTimeout(function() {
					vaInput.children[2].focus()
					// vaInput.children[1].select()
				}, 100)
			} else {
				this.handleLogin()
			}
		},
		// 重置表单
		handleReset() {
			this.$refs.loginForm.resetFields()
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
	height: 80px;
	line-height: 80px;
	font-size: 30px;
	text-align: center;
}

#validateBox {
	border-radius: 10px;
	width: 60%;
	height: 55px;
}
</style>

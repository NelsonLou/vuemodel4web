// vue.config.js
module.exports = {
	// 修改的配置
	css: {
		loaderOptions: {
			// 给 less-loader 传递选项
			less: {
				// @/ 是 src/ 的别名
				javascriptEnabled: true
			}
		}
	},
	outputDir: process.env.outputDir,
	publicPath: '/',
	devServer: {
		proxy: {
			'/api': {
				target: 'https://qinyuan-test-h5.yunext.com',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
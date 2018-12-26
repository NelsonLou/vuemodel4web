// websorket api地址配置
let wsApi = {
	// 根据不同版本获取（当前为直接获取当前访问地址）
	production: 'wss://' + document.location.origin.split('//')[1] + ':18094/ws', // 生产环境api
	release: 'wss://' + document.location.origin.split('//')[1] + ':18094/ws', // 测试环境api
	development: 'wss://qinyuan-test-h5.yunext.com:18094/ws', // 开发环境api
}

// 配置api地址（方便紧急api地址修改）
const api = {
	// 重命名api地址
	// dddd: 'aaa/bbb/ccc'
}

export default api
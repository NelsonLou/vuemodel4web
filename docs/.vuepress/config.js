const path = require('path')
module.exports = {
	title: '海大物联组件文档1.0',
	description: '海大物联组件文档',
	base: '/dist/',
	evergreen: true,
	configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'),
        '&mock': path.resolve(__dirname, '../../mock'),
      }
    }
	},
	themeConfig: {
    // 添加组件文档路径，通用组件在common文件夹下面，将路径添加到children中
		sidebar: [
      {
        title: '通用组件',
        children: [
					'/common/authorized'
        ]
      },
      {
        title: '业务组件',
        children: [ 
				 ]
      },
      {
        title: '组件贡献',
        children: [
					'/common/',
					'/common/doc',
					'/business/',
					'/business/doc'
        ]
      },
      {
        title: '其他说明',
        children: [
					'/other/',
        ]
      },
    ],
		lastUpdated: 'Last Updated', // string | boolean
	}
}
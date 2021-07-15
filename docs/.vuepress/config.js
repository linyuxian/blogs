module.exports = {
  base: '/blogs/',
  title: '部落格',
  description: 'Just playing around',
  themeConfig: {
    logo: '/assets/logo.png',
    sidebar: 'auto',
    displayAllHeaders: true, // 默认值：false 启用页面自动显示侧边栏，按照标题等级自动加载
    nav: [
      {
        text: '笔记',
        ariaLabel: '日常笔记',
        items: [
          { text: 'Mongoose', link: '/mongoose/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      }
    ]
  }
}
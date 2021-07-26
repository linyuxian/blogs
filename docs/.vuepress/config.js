module.exports = {
  base: '/blogs/',
  title: 'Note',
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
          { text: '小程序', link: '/mini-program/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },
      {
        text: '插件',
        ariaLabel: '常用插件',
        items: [
          { text: 'vue', link: '/plugins/vue/' },
          { text: 'react', link: '/mini-program/' },
          { text: '小程序', link: '/language/japanese/' },
          { text: 'JavaScript', link: '/language/japanese/' },
        ]
      }
    ]
  }
}
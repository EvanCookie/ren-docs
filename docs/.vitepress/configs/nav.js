export const nav = [
  { text: '主页', link: 'index' },
  { text: '导航', link: 'tools-nav/index' },
  {
    text: '前端框架',
    items: [
      { text: 'Vue', link: 'vue/vue2', activeMatch: '/vue/.*' },
      { text: 'React', link: 'react/index', activeMatch: '/react/.*' }
    ]
  },
  { text: 'Node相关', link: 'nodejs/base', activeMatch: '/nodejs/.*' },
  { text: 'Git', link: 'git/git_base', activeMatch: '/git/.*' },
  { text: '笔记', link: 'other/cross_domain', activeMatch: '/other/.*' },
  { text: '关于', link: 'me/index', activeMatch: '/me/.*' }
]

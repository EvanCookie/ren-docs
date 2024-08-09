import { defineConfig } from 'vitepress'

// 导入 nav,sidebar模块数据
import { head, nav, sidebar} from './configs'

export default defineConfig({
    // base: '/renDocs/',
    outDir: '../dist',
    title: "RenDocs",
    lang: 'zh-CN',
    description: "RenDocs知识库，包含前端常用知识、笔记、日常工具等",
    head,

    // markdown配置
    markdown: {
        image: {
            // 启用图片懒加载
            lazyLoading: true
        }
    },

    // 主题配置
    themeConfig: {
        logo: '/logo.png',

        // 导航栏与侧边栏配置
        nav,
        sidebar,

        // 开启搜索框
        search: {
            provider: 'local'
        },

        // 友情链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/EvanCookie' }
        ],

        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',

        // 更新时间戳
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
              dateStyle: 'short',
              timeStyle: 'medium'
            }
        },

        // 右侧大纲配置
        outline: {
            level: 'deep',
            label: '本页内容',
        },

        docFooter: {
            prev: '上一页',
            next: '下一页',
        },

        // 页脚
        footer: {
            message: 'Released under the MIT License.',
            copyright: `Copyright © 2024-${new Date().getFullYear()} Evan Cookie`
        },
    }
})

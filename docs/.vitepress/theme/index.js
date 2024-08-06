import { h,onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {

    })
  },

  enhanceApp({ app, router, siteData }) {
    // 使用 onMounted 在 Vue 组件挂载后初始化 medium-zoom
    onMounted(() => {
      
    })
  }
}

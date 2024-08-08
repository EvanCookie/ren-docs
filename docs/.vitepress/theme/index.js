import { h,onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import myLayout from './components/Layout.vue'
import './styles/index.scss'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(myLayout)
  },

  enhanceApp({ app, router, siteData }) {
    onMounted(() => {
      
    })
  }
}

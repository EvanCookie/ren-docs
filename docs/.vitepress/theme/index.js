import { h, } from "vue"
import DefaultTheme from "vitepress/theme"
import { useData } from 'vitepress'
import myLayout from "./components/Layout.vue"
import NavLinks from './components/NavLinks.vue'
import "./styles/index.scss"

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout: () => {
    const props = {}

    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(myLayout, props)
  },

  enhanceApp({ app, router, siteData }) {
    app.component('NavLinks', NavLinks)
  },
};

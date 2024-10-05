import { h,} from "vue"
import DefaultTheme from "vitepress/theme"
import myLayout from "./components/Layout.vue"
import myNavLinks from './components/MNavLinks.vue'
import "./styles/index.scss"

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(myLayout)
  },

  enhanceApp({ app, router, siteData }) {
    app.component('myNavLinks', myNavLinks)
  },
};

<!-- .vitepress/theme/components/Layout.vue -->
<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'
const { isDark } = useData()

// 添加一个新的函数来判断是否是PC端
const isPC = () => window.matchMedia('(min-width: 769px)').matches;

// 检查是否启用过渡效果的函数
const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches &&
  isPC();

// 提供toggle-appearance功能，用于切换暗黑模式
provide('toggle-appearance', async ({ clientX: x, clientY: y }) => {
  // 如果不支持 startViewTransition，则直接切换
  if (!enableTransitions()) {
    // 切换暗黑模式
    isDark.value = !isDark.value;
    return;
  }

  // 计算动画的最大半径，基于鼠标点击位置和窗口大小
  const maxRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  // 定义clip-path的起点和终点，用于圆形扩展动画
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${maxRadius}px at ${x}px ${y}px)`
  ];

  // 如果浏览器支持startViewTransition API，则使用此API进行过渡效果
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value; // 切换暗黑模式
    await nextTick(); // 等待DOM更新
  }).ready;

  // 使用clip-path创建过渡动画效果
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  );
});

</script>

<template>
  <DefaultTheme.Layout />
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  -webkit-animation: none;
  -moz-animation: none;
  animation: none;

  -webkit-mix-blend-mode: normal;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

/* 按钮的基础样式 */
.VPSwitchAppearance {
  width: 40px !important;
}

.VPSwitchAppearance .check {
  left: 2px;
}
</style>
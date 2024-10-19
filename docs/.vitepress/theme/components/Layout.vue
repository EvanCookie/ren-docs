<!-- .vitepress/theme/components/Layout.vue -->
<script setup>
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { nextTick, provide } from "vue";
const { isDark } = useData();
const { Layout } = DefaultTheme;

// Determine whether it is a pc
const isPC = () => window.matchMedia("(min-width: 769px)").matches;

// Check Whether to enable Transitions
const enableTransitions = () =>
  "startViewTransition" in document &&
  window.matchMedia("(prefers-reduced-motion: no-preference)").matches &&
  isPC();

// Toggle appearance function
provide("toggle-appearance", async ({ clientX: x, clientY: y }) => {
  // startViewTransition direct switch over is not supported
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  // Calculate the maximum radius of the animation
  const maxRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  // Define the start and end of clip-path
  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${maxRadius}px at ${x}px ${y}px)`,
  ];

  // Supports the startViewTransition API, which is used for transition effects
  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;

    // Waiting for DOM updates
    await nextTick();
  }).ready;

  // Use clip-path to create a transition animation
  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: "ease-in",
      pseudoElement: `::view-transition-${isDark.value ? "old" : "new"}(root)`,
    }
  );
});
</script>

<template>
  <Layout v-bind="$attrs"></Layout>
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

/* Toggle button style */
.VPSwitchAppearance {
  width: 40px !important;
}

.VPSwitchAppearance .check {
  left: 1px !important;
}
</style>

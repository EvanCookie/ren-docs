<script setup>
import { NAV_DATA } from './data'
</script>

<template>
  <NavLinks v-for="navitem in NAV_DATA" :title="navitem.title"  :items="navitem.items" />
</template>

<style src="./index.scss"></style>

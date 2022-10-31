<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component" :key="route.fullPath"></component>
    </transition>
  </router-view>
</template>

<script setup></script>

<style scoped lang="less"></style>

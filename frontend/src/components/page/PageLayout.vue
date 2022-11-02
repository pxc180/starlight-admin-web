<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <div class="page-container">
        <component :is="Component" :key="route.fullPath"></component>
      </div>
    </transition>
  </router-view>
</template>

<script setup></script>

<style scoped lang="less">
.page-container {
  min-height: 100%;
  width: 100%;
  background-color: var(--color-bg-1);
}
</style>

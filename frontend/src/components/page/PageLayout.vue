<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <div class="page-container">
        <keep-alive v-if="route.meta.keepAlive" :include="cacheList">
          <component :is="Component" :key="route.name" />
        </keep-alive>

        <component
          :is="Component"
          v-else
          :key="route.name"
        />
      </div>
    </transition>
  </router-view>
  <GlobalSetting></GlobalSetting>
</template>

<script setup>
import GlobalSetting from '@/components/setting/GlobalSetting.vue'
import { useTabBarStore } from '@/store'
import { computed } from 'vue'

const tabBarStore = useTabBarStore()
const cacheList = computed(() => tabBarStore.getCacheList)
</script>

<style scoped lang="less">
.page-container {
  min-height: 100%;
  width: 100%;
  background-color: var(--color-bg-1);
}
</style>

<template>
  <a-tabs
    :active-key="$route.fullPath"
    editable
    @change="changePage"
    @delete="deletePage"
  >
    <a-tab-pane
      v-for="(item, index) in routeList"
      :key="item.fullPath"
      :title="item.title"
      :closable="index !== 0"
    ></a-tab-pane>
  </a-tabs>
</template>

<script setup>
import { useTabBarStore } from '@/store'
import { useRouter } from 'vue-router'
import { listenerRouteChange } from '@/utils/routeListener'
import { computed } from 'vue'

const router = useRouter()
const tabBarStore = useTabBarStore()
const routeList = computed(() => {
  return tabBarStore.getRouteList
})

listenerRouteChange((route) => {
  if (
    !route.meta.noAffix &&
    !routeList.value.some((tag) => tag.fullPath === route.fullPath)
  ) {
    tabBarStore.updateRouteList(route)
  }
}, true)

const changePage = (key) => {
  router.push({ path: key })
}
const deletePage = (key) => {
  const index = routeList.value.findIndex((v) => v.fullPath === key)
  if (index > 0) {
    tabBarStore.deleteRoute(index)
    let latest
    if (index === routeList.value.length) {
      latest = routeList.value[routeList.value.length - 1]
    } else {
      latest = routeList.value[index]
    }
    router.push({ path: latest.fullPath })
  }
}
</script>

<style scoped lang="less">
.arco-tabs {
  background-color: var(--color-bg-2);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.08);
}
:deep(.arco-tabs-content) {
  padding-top: 0px;
}
.arco-layout-content {
  padding: 12px;
}
.page-container {
  min-height: 100%;
  width: 100%;
  background-color: var(--color-bg-1);
}
</style>

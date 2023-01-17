<template>
  <a-drawer
    :width="300"
    :mask-closable="false"
    :visible="visible"
    ok-text="复制配置"
    cancel-text="关闭"
    @ok="copySettings"
    @cancel="handleCancel"
  >
    <template #title> 页面配置 </template>
    <h5 class="title">内容区域</h5>
    <SettingItem
      v-for="item in settingOptions"
      :key="item.key"
      :option="item"
      @change="handleChange"
    />
  </a-drawer>
</template>

<script setup>
import { useAppStore } from '@/store'
import { computed } from 'vue'
import SettingItem from './SettingItem.vue'

const appStore = useAppStore()

const visible = computed(() => appStore.globalSetting)
const settingOptions = computed(() => [
  { name: '菜单栏', key: 'menu', defaultVal: appStore.menu },
  { name: '底部', key: 'footer', defaultVal: appStore.footer },
  { name: '多页签', key: 'tabBar', defaultVal: appStore.tabBar },
  { name: '顶部菜单栏', key: 'topMenu', defaultVal: appStore.topMenu },
  {
    name: '动态路由',
    key: 'menuFromServer',
    defaultVal: appStore.menuFromServer
  }
])

const handleChange = async ({ value, key }) => {
  if (key === 'menuFromServer' && value) {
    await appStore.getServerMenu()
  }
  appStore.updateSettings({ [key]: value })
}
const handleCancel = () => {
  appStore.updateSettings({ globalSetting: false })
}
const copySettings = () => {
  appStore.updateSettings({ globalSetting: false })
}
</script>

<style scoped lang="less">
.title {
  margin: 10px 0;
  font-size: 14px;
}
</style>

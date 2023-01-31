<template>
  <div class="header">
    <div class="left-header">
      <div class="logo"></div>
      <h2>{{ appStore.appName }}</h2>
      <!-- <h2>Starlight Admin Web</h2> -->
    </div>
    <ul class="right-header">
      <li>
        <a-tooltip
          :content="`点击切换为${theme === 'light' ? '暗黑' : '亮色'}模式`"
        >
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="toggleTheme()"
          >
            <template #icon>
              <icon-sun-fill v-if="theme === 'dark'" />
              <icon-moon-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="页面配置">
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="setSettingVisible"
          >
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown position="br">
          <a-avatar :size="32" :style="{ backgroundColor: '#3370ff' }">
            <IconUser />
          </a-avatar>
          <template #content>
            <a-doption @click="handleLogout">
              <template #icon>
                <IconExport />
              </template>
              <template #default>退出登录</template>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  IconUser,
  IconExport,
  IconSettings
} from '@arco-design/web-vue/es/icon'
import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useAppStore, useUserStore } from '@/store'

import { Message } from '@arco-design/web-vue'

const appStore = useAppStore()
const userStore = useUserStore()
const router = useRouter()

const theme = computed(() => {
  return appStore.theme
})

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark) {
    appStore.toggleTheme(dark)
  }
})
const toggleTheme = useToggle(isDark)

const handleLogout = async () => {
  try {
    await userStore.logout()
    router.push('/login')
    Message.success('登出成功')
  } catch (error) {}
}
const setSettingVisible = () => {
  appStore.updateSettings({ globalSetting: true })
}
</script>

<style scoped lang="less">
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;

  .left-header {
    display: flex;
    align-items: center;
    .logo {
      height: 48px;
      width: 48px;
      background-image: url('@/assets/logo.svg');
      background-size: 100%;
      margin: 0 16px;
    }
    h2 {
      color: var(--color-text-1);
    }
  }
  .right-header {
    display: flex;
    align-items: center;
    list-style: none;
    margin-right: 2px;

    li {
      padding: 0 10px;
    }
    .nav-btn {
      border-color: rgb(var(--gray-2));
      color: rgb(var(--gray-8));
      font-size: 16px;
    }
  }
}
</style>

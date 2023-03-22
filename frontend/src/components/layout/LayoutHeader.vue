<template>
  <div class="header">
    <div class="left-header">
      <div class="logo"></div>
      <h2>{{ appStore.appName }}</h2>
    </div>

    <div class="header-menu" v-if="renderMenu">
      <Menu mode="horizontal" />
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
        <a-tooltip :content="`点击${isFullscreen ? '退出' : '切换'}全屏模式`">
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="toggleFullScreen"
          >
            <template #icon>
              <icon-fullscreen-exit v-if="isFullscreen" />
              <icon-fullscreen v-else />
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
import Menu from '../menu/index.vue'
import {
  IconUser,
  IconExport,
  IconSettings
} from '@arco-design/web-vue/es/icon'
import { computed } from 'vue'
import { useDark, useToggle, useFullscreen } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useAppStore, useUserStore } from '@/store'

import { Message } from '@arco-design/web-vue'

const appStore = useAppStore()
const router = useRouter()

const renderMenu = computed(() => appStore.menu && appStore.topMenu)
const theme = computed(() => {
  return appStore.theme
})

const setSettingVisible = () => {
  appStore.updateSettings({ globalSetting: true })
}

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

const { isFullscreen, toggle: toggleFullScreen } = useFullscreen()

const userStore = useUserStore()
const handleLogout = async () => {
  try {
    await userStore.logout()
    router.push('/login')
    Message.success('登出成功')
  } catch (error) {}
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

  .header-menu {
    flex: 1;
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

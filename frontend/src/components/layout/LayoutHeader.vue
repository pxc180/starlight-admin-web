<template>
  <div class="header">
    <div class="left-header">
      <div class="logo"></div>
      <h2>Starlight Admin Web</h2>
    </div>
    <div class="right-header">
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
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useAppStore } from '@/store'

const appStore = useAppStore()

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

    .nav-btn {
      border-color: rgb(var(--gray-2));
      color: rgb(var(--gray-8));
      font-size: 16px;
    }
  }
}
</style>

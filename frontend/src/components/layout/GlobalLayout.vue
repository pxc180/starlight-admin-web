<template>
  <a-layout class="global-layout">
    <div class="global-layout-header">
      <LayoutHeader></LayoutHeader>
    </div>
    <a-layout>
      <a-layout-sider class="global-layout-sider" hide-trigger collapsible>
        <Menu />
      </a-layout-sider>
      <a-layout
        :class="{
          'global-layout-content': true,
          'global-tab-layout-content': appStore.tabBar
        }"
      >
        <TabsBar class="global-tabs-bar" v-if="appStore.tabBar"></TabsBar>
        <a-layout-content>
          <PageLayout></PageLayout>
        </a-layout-content>
        <a-layout-footer v-if="appStore.footer" class="global-layout-footer">
          <div>Pxc</div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import PageLayout from '../page/PageLayout.vue'
import TabsBar from '../page/TabsBar.vue'
import LayoutHeader from './LayoutHeader.vue'
import Menu from '../menu/index.vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()
</script>

<style scoped lang="less">
@header-size-height: 60px;
@tabBar-size-height: 40px;
@footer-size-height: 40px;
@menu-size-width: 220px;

.global-layout {
  height: 100%;
  width: 100%;

  .global-layout-header {
    width: 100%;
    height: @header-size-height;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 100;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
  }
  .global-layout-sider {
    width: @menu-size-width !important;
    position: fixed;
    height: calc(100% - @header-size-height);
    padding-top: @header-size-height;
    top: 0px;
    left: 0px;
    z-index: 99;
  }
  .global-layout-content {
    min-height: calc(100vh - @header-size-height);
    overflow: hidden;
    padding-top: @header-size-height;
    padding-left: @menu-size-width;
    background-color: var(--color-fill-2);

    &.global-tab-layout-content {
      min-height: calc(100vh - @header-size-height - @tabBar-size-height);
      padding-top: calc(@header-size-height + @tabBar-size-height);
    }

    .global-tabs-bar {
      width: calc(100% - @menu-size-width);
      position: fixed;
      top: @header-size-height;
      left: @menu-size-width;
      z-index: 99;
    }
    .arco-layout-content {
      padding: 12px;
    }
  }
  .global-layout-footer {
    height: @footer-size-height;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-1);
  }
}
</style>

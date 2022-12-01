<template>
  <a-layout class="global-layout">
    <div class="global-layout-header">
      <LayoutHeader></LayoutHeader>
    </div>
    <a-layout>
      <a-layout-sider
        class="global-layout-sider"
        style="width: 220px"
        hide-trigger
        collapsible
      >
        <Menu />
      </a-layout-sider>
      <a-layout class="global-layout-content">
        <a-layout-content>
          <PageLayout></PageLayout>
        </a-layout-content>
        <a-layout-footer class="global-layout-footer">
          <div>Pxc</div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup>
import PageLayout from '../page/PageLayout.vue'
import LayoutHeader from './LayoutHeader.vue'
import Menu from '../menu/index.vue'
</script>

<style scoped lang="less">
@header-size-height: 60px;
@footer-size-height: 40px;

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
    padding-left: 220px;
    background-color: var(--color-fill-2);

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

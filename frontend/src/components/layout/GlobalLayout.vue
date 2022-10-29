<template>
  <a-layout class="global-layout">
    <div class="global-layout-header"></div>
    <a-layout>
      <a-layout-sider class="global-layout-sider" hide-trigger collapsible> </a-layout-sider>
      <a-layout class="global-layout-content">
        <a-layout-content>Content</a-layout-content>
        <a-layout-footer class="global-layout-footer">
          <div>Pxc</div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup></script>

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
    background-color: white;
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
    padding-left: 200px;

    .arco-layout-content {
      padding: 12px;
    }
  }
  .global-layout-footer {
    height: @footer-size-height;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

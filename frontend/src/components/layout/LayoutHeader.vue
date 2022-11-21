<template>
  <div class="header">
    <div class="left-header">
      <div class="logo"></div>
      <h2>Starlight Admin Web</h2>
    </div>
    <div class="right-header"></div>
  </div>
</template>

<script setup></script>

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
  }
}
</style>

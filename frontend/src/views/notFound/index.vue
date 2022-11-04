<template>
  <div class="not-found-content">
    <a-result status="404" subtitle="抱歉，页面不见了~"></a-result>
    <a-button type="primary" @click="back">
      <template #icon>
        <icon-undo />
      </template>
      返回
    </a-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const back = () => {
  router.go(-1)
}
</script>

<style scoped lang="less">
.not-found-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  :deep(.arco-result) {
    padding-top: 0px;

    .arco-result-icon {
      padding-top: 0px;
    }
  }
}
</style>

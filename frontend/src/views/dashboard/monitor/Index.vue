<template>
  <div>
    <div>Monitor</div>
    <a-button @click="toWorkplace">to-workplace</a-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const toWorkplace = () => {
  router.push('/dashboard/workplace')
}
</script>

<style scoped lang="less"></style>

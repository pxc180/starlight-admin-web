<template>
  <a-button @click="login">登录</a-button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const login = () => {
  router.push('/dashboard')
}
</script>

<style lang="less"></style>

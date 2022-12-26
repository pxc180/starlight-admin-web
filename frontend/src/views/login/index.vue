<template>
  <a-button @click="login">登录</a-button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  try {
    await userStore.login()
    router.push('/dashboard')
  } catch (error) {}
}
</script>

<style lang="less"></style>

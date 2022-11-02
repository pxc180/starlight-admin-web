<template>
  <a-button @click="login">登录</a-button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { setToken } from '@/utils/auth'

const router = useRouter()

const login = () => {
  setToken('token12345')
  router.push('/dashboard')
}
</script>

<style lang="less"></style>

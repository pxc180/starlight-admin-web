<template>
  <a-button @click="login">登录</a-button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

import { Message } from '@arco-design/web-vue'

const router = useRouter()
const userStore = useUserStore()

const login = async () => {
  try {
    const { success, message } = await userStore.login({
      userName: 'admin',
      password: '123456'
    })
    if (success) {
      router.push('/dashboard')
      Message.success('欢迎使用')
    } else {
      Message.error(message + '!')
    }
  } catch (error) {}
}
</script>

<style lang="less"></style>

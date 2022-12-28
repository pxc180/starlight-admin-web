<template>
  <a-form :model="form" size="large">
    <a-form-item field="userName" hide-label>
      <a-input placeholder="请输入账号" v-model="form.userName">
        <template #prefix>
          <icon-user />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item field="password" hide-label>
      <a-input-password
        placeholder="请输入密码"
        v-model="form.password"
        allow-clear
      >
        <template #prefix>
          <icon-lock />
        </template>
      </a-input-password>
    </a-form-item>
    <a-form-item hide-label>
      <a-button @click="login">登录</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'

import { Message } from '@arco-design/web-vue'
import { reactive, toRaw } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const form = reactive({ userName: '', password: '' })

const login = async () => {
  try {
    const { success, message } = await userStore.login(toRaw(form))
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

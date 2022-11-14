<template>
  <a-modal
    :align-center="false"
    :mask-closable="false"
    v-model:visible="visible"
    :ok-loading="loading"
    :on-before-ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> {{ title }} </template>
    <a-form :model="form" ref="formRef">
      <a-form-item
        field="roleName"
        label="角色名称"
        :rules="validatorRules.roleName.rules"
        :validate-trigger="validatorRules.roleName.trigger"
      >
        <a-input v-model="form.roleName" placeholder="请输入角色名称" />
      </a-form-item>
      <a-form-item field="description" label="描述">
        <a-textarea
          v-model="form.description"
          placeholder="..."
          :auto-size="{
            minRows: 3,
            maxRows: 5
          }"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { Message } from '@arco-design/web-vue'
import { reactive, ref, toRaw } from 'vue'
import { addRole } from '@/api/modules/role'

const validatorRules = {
  roleName: {
    rules: [{ required: true, message: '请填写角色名称!' }],
    trigger: ['change', 'input']
  }
}

const emits = defineEmits(['submit'])

const title = ref('弹窗标题')
const visible = ref(false)
const loading = ref(false)
const formRef = ref(null)
const form = reactive({
  roleName: '',
  description: ''
})

const handleOk = async () => {
  let flag = false
  await formRef.value.validate((error) => {
    if (!error) {
      flag = true
    }
  })

  if (flag) {
    loading.value = true
    await addRole(toRaw(form))
      .then((result) => {
        const { statusCode, message } = result
        if (statusCode === 200) {
          Message.success('添加成功!')
          emits('submit')
        } else {
          throw message
        }
      })
      .catch((error) => {
        flag = false
        Message.warning(`操作失败，${error}`)
      })
      .finally(() => {
        loading.value = false
      })
  }
  return flag
}
const handleCancel = () => {
  formRef.value.resetFields()
}

const onShow = () => {
  visible.value = true
}

defineExpose({
  title,
  onShow
})
</script>

<style scoped lang="less"></style>

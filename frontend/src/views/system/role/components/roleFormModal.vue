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
      <a-form-item
        field="roleCode"
        label="角色编码"
        :rules="validatorRules.roleCode.rules"
        :validate-trigger="validatorRules.roleCode.trigger"
      >
        <a-input v-model="form.roleCode" placeholder="请输入角色编码" />
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
import { addRole, editRole } from '@/api/modules/role'

const validatorRules = {
  roleName: {
    rules: [{ required: true, message: '请填写角色名称!' }],
    trigger: ['change', 'input']
  },
  roleCode: {
    rules: [{ required: true, message: '请填写角色编码!' }],
    trigger: ['change', 'input']
  }
}

const emits = defineEmits(['submit'])

const title = ref('弹窗标题')
const visible = ref(false)
const loading = ref(false)
const formRef = ref(null)
const roleId = ref(null)
const form = reactive({
  roleName: '',
  roleCode: '',
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
    let result
    if (roleId.value) {
      result = editRole({ id: roleId.value, ...toRaw(form) })
    } else {
      result = addRole(toRaw(form))
    }
    await result
      .then((res) => {
        const { statusCode, message } = res
        if (statusCode === 200) {
          Message.success(message)
          emits('submit', roleId.value ? undefined : 1)
          handleCancel()
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
  roleId.value = null
  formRef.value.resetFields()
}

const onShow = () => {
  visible.value = true
}
const onEdit = (record) => {
  onShow()
  roleId.value = record._id
  form.roleName = record.roleName
  form.roleCode = record.roleCode
  form.description = record.description
}

defineExpose({
  title,
  onShow,
  onEdit
})
</script>

<style scoped lang="less"></style>

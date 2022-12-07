<template>
  <a-drawer
    :width="480"
    :mask-closable="false"
    v-model:visible="visible"
    :ok-loading="loading"
    :on-before-ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> {{ title }} </template>
    <a-form :model="form" ref="formRef">
      <a-form-item
        field="userName"
        label="账号"
        :rules="validatorRules.userName.rules"
        :validate-trigger="validatorRules.userName.trigger"
      >
        <a-input v-model="form.userName" placeholder="请填写账号" />
      </a-form-item>
      <a-form-item
        field="realName"
        label="姓名"
        :rules="validatorRules.realName.rules"
        :validate-trigger="validatorRules.realName.trigger"
      >
        <a-input v-model="form.realName" placeholder="请填写用户姓名" />
      </a-form-item>
      <a-form-item
        field="roleId"
        label="所属角色"
        :rules="validatorRules.roleId.rules"
        :validate-trigger="validatorRules.roleId.trigger"
      >
        <a-select
          v-model="form.roleId"
          :options="roleDict"
          :field-names="replaceFields"
          placeholder="请选择所属角色"
        >
        </a-select>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup>
import { Message } from '@arco-design/web-vue'
import { onMounted, reactive, ref, toRaw } from 'vue'
import { addUser, editUser } from '@/api/modules/user'
import { queryAllRoleList } from '@/api/modules/role'

const replaceFields = { value: '_id', label: 'roleName' }
const roleDict = ref([])
onMounted(() => {
  queryAllRoleList()
    .then((res) => {
      const { statusCode, data, message } = res
      if (statusCode === 200) {
        roleDict.value = data
      } else {
        throw message
      }
    })
    .catch((error) => {
      console.error(error)
    })
})

const validatorRules = {
  userName: {
    rules: [{ required: true, message: '请填写用户姓名!' }],
    trigger: ['change', 'input']
  },
  realName: {
    rules: [{ required: true, message: '请填写账号!' }],
    trigger: ['change', 'input']
  },
  roleId: {
    rules: [{ required: true, message: '请选择所属角色!' }],
    trigger: ['change', 'input']
  }
}

const emits = defineEmits(['submit'])

const title = ref('弹窗标题')
const visible = ref(false)
const loading = ref(false)
const formRef = ref(null)
const userId = ref(null)
const form = reactive({
  userName: '',
  realName: '',
  roleId: ''
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
    if (userId.value) {
      result = editUser({ id: userId.value, ...toRaw(form) })
    } else {
      result = addUser(toRaw(form))
    }
    await result
      .then((res) => {
        const { statusCode, message } = res
        if (statusCode === 200) {
          Message.success(message)
          emits('submit', userId.value ? undefined : 1)
          handleCancel()
        } else {
          throw message
        }
      })
      .catch((error) => {
        flag = false
        const { code, message } = error
        Message.warning(
          `操作失败，${code === '11000' ? '该账号已存在' : message || error}`
        )
      })
      .finally(() => {
        loading.value = false
      })
  }
  return flag
}
const handleCancel = () => {
  userId.value = null
  formRef.value.resetFields()
}

const onShow = () => {
  visible.value = true
}
const onEdit = (record) => {
  onShow()
  userId.value = record._id
  form.userName = record.userName
  form.realName = record.realName
  form.roleId = record.roleId._id
}

defineExpose({
  title,
  onShow,
  onEdit
})
</script>

<style scoped lang="less"></style>

<template>
  <a-drawer
    :width="480"
    :mask-closable="false"
    :unmount-on-close="true"
    v-model:visible="visible"
    :ok-loading="loading"
    :on-before-ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> {{ title }} </template>
    <a-tree
      ref="treeRef"
      v-if="treeSwitch"
      :checkable="true"
      :check-strictly="true"
      :default-expand-checked="true"
      :default-expand-all="true"
      :field-names="{
        key: '_id',
        title: 'name',
        children: 'children',
        icon: undefined
      }"
      v-model:checked-keys="checkedKeys"
      :data="menusTree"
    />
  </a-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { queryAllMenu } from '@/api/modules/menu'
import { saveRolePermissions } from '@/api/modules/role'
import { Message } from '@arco-design/web-vue'

const title = ref('菜单权限授权')
const visible = ref(false)
const loading = ref(false)
const menusTree = ref([])
const checkedKeys = ref([])
const treeSwitch = ref(false)
const treeRef = ref(null)
const roleId = ref('')

const onShow = (id) => {
  visible.value = true
  roleId.value = id
  queryAllMenu()
    .then((res) => {
      menusTree.value = res.data.result
      treeSwitch.value = true
    })
    .catch((error) => {
      Message.warning(`操作失败，${error}`)
    })
}
const handleOk = () => {
  saveRolePermissions({
    roleId: roleId.value,
    menuIds: checkedKeys.value
  })
    .then((res) => {
      const { statusCode, message } = res
      if (statusCode === 200) {
        Message.success(message)
        handleCancel()
      } else {
        throw message
      }
    })
    .catch((error) => {
      Message.warning(`操作失败，${error}`)
    })
    .finally(() => {
      loading.value = false
    })
}
const handleCancel = () => {
  roleId.value = ''
  checkedKeys.value = []
}

defineExpose({
  onShow
})
</script>

<style scoped lang="less"></style>

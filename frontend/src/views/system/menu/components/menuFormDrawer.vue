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
        field="name"
        label="菜单名称"
        :rules="validatorRules.name.rules"
        :validate-trigger="validatorRules.name.trigger"
      >
        <a-input v-model="form.name" placeholder="请输入菜单名称" />
      </a-form-item>

      <a-form-item field="parentId" label="上级菜单">
        <a-tree-select
          :data="props.menuData"
          placeholder="请选择上级菜单"
          v-model="form.parentId"
          :field-names="{
            key: '_id',
            title: 'name',
            children: 'children',
            icon: undefined
          }"
        ></a-tree-select>
      </a-form-item>

      <a-form-item
        field="url"
        label="菜单路径"
        :rules="validatorRules.url.rules"
        :validate-trigger="validatorRules.url.trigger"
      >
        <a-input v-model="form.url" placeholder="请输入菜单路径" />
      </a-form-item>

      <a-form-item
        field="component"
        label="前端组件"
        :rules="validatorRules.component.rules"
        :validate-trigger="validatorRules.component.trigger"
      >
        <a-input v-model="form.component" placeholder="请输入前端组件" />
      </a-form-item>

      <a-form-item field="icon" label="菜单图标">
        <a-input v-model="form.icon" placeholder="请输入菜单图标" />
      </a-form-item>

      <a-form-item field="redirect" label="重定向">
        <a-input v-model="form.redirect" placeholder="请输入重定向地址" />
      </a-form-item>

      <a-form-item field="sortNo" label="排序">
        <a-input-number v-model="form.sortNo" placeholder="请输入菜单排序" />
      </a-form-item>

      <a-form-item field="hide" label="是否隐藏">
        <a-switch v-model="form.hide" :checked-value="1" :unchecked-value="0" />
      </a-form-item>

      <a-form-item field="keepAlive" label="是否缓存">
        <a-switch
          v-model="form.keepAlive"
          :checked-value="1"
          :unchecked-value="0"
        />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script setup>
import { Message } from '@arco-design/web-vue'
import { reactive, ref, toRaw } from 'vue'
import { addMenu, editMenu } from '@/api/modules/menu'

const emits = defineEmits(['submit'])

const props = defineProps({
  menuData: {
    type: Array,
    required: true,
    default: () => []
  }
})

const validatorRules = {
  name: {
    rules: [{ required: true, message: '请输入菜单名称!' }],
    trigger: ['change', 'input']
  },
  url: {
    rules: [{ required: true, message: '请输入菜单路径!' }],
    trigger: ['change', 'input']
  },
  component: {
    rules: [{ required: true, message: '请输入前端组件!' }],
    trigger: ['change', 'input']
  }
}

const title = ref('弹窗标题')
const visible = ref(false)
const loading = ref(false)
const formRef = ref(null)
const menuId = ref(null)
const form = reactive({
  name: '',
  parentId: null,
  url: '',
  component: '',
  icon: '',
  redirect: '',
  sortNo: 1,
  hide: 0,
  keepAlive: 0
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
    if (menuId.value) {
      result = editMenu({ id: menuId.value, ...toRaw(form) })
    } else {
      result = addMenu(toRaw(form))
    }
    await result
      .then((res) => {
        const { statusCode, message } = res
        if (statusCode === 200) {
          Message.success(message)
          emits('submit', menuId.value ? undefined : 1)
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
  menuId.value = null
  formRef.value.resetFields()
}

const onShow = () => {
  visible.value = true
}
const onEdit = (record) => {
  onShow()
  menuId.value = record._id
  const {
    name,
    parentId,
    url,
    component,
    icon,
    redirect,
    sortNo,
    hide,
    keepAlive
  } = record
  Object.assign(form, {
    name,
    parentId,
    url,
    component,
    icon,
    redirect,
    sortNo,
    hide,
    keepAlive
  })
}

defineExpose({
  title,
  onShow,
  onEdit
})
</script>

<style scoped lang="less"></style>

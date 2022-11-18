<template>
  <a-modal
    :width="960"
    :align-center="false"
    :mask-closable="false"
    :footer="false"
    v-model:visible="visible"
  >
    <template #title>角色用户</template>
    <a-row>
      <a-col flex="auto">
        <a-form :model="form" ref="formRef">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-item field="userName" label="用户姓名">
                <a-input v-model="form.userName" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item field="createTime" label="创建时间">
                <a-date-picker v-model="form.createTime" style="width: 100%" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-divider style="height: 32px" direction="vertical" />
      <a-col flex="172px">
        <a-space :size="8">
          <a-button type="primary" @click="onSearchQuery">
            <template #icon>
              <icon-search />
            </template>
            查询
          </a-button>
          <a-button @click="onResetQuery">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-divider style="margin-top: 0" />
    <a-table
      row-key="_id"
      :loading="loading"
      :data="tableData"
      :bordered="false"
      :pagination="pagination"
      @page-change="onPageNoChange"
      @page-size-change="onPageSizeChange"
    >
      <template #columns>
        <a-table-column title="用户姓名" data-index="userName"></a-table-column>
        <a-table-column
          title="所属角色"
          data-index="roleId.roleName"
        ></a-table-column>
        <a-table-column
          title="创建时间"
          data-index="createTime"
        ></a-table-column>
      </template>
    </a-table>
  </a-modal>
</template>

<script setup>
import { ref } from 'vue'
import usePageList from '@/hooks/usePageList'
import { queryUserByRoleId } from '@/api/modules/user'

const {
  form,
  formRef,
  loading,
  tableData,
  pagination,
  onPageNoChange,
  onPageSizeChange,
  onSearchQuery,
  onResetQuery,
  queryList
} = usePageList({
  searchForm: { userName: '', createTime: '' },
  api: { list: queryUserByRoleId },
  disabledMounted: true
})

const visible = ref(false)

const onShow = (roleId) => {
  visible.value = true
  form.roleId = roleId
  queryList(1)
}

defineExpose({ onShow })
</script>

<style scoped lang="less"></style>

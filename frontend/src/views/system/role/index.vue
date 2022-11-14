<template>
  <a-card class="general-card" title="角色管理">
    <a-row>
      <a-col flex="auto">
        <a-form :model="form" ref="formRef">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item field="roleName" label="角色名称">
                <a-input v-model="form.roleName" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
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
    <a-row style="margin-bottom: 16px">
      <a-button type="primary" @click="onAdd">
        <template #icon>
          <icon-plus />
        </template>
        新建
      </a-button>
    </a-row>

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
        <a-table-column title="角色名称" data-index="roleName"></a-table-column>
        <a-table-column
          title="创建时间"
          data-index="createTime"
        ></a-table-column>
        <a-table-column
          title="最近更新时间"
          data-index="updateTime"
        ></a-table-column>
        <a-table-column title="操作" align="center">
          <template #cell="{ record }">
            <a-button @click="onCheckRoleUser(record)" type="text">
              用户
            </a-button>
            <a-button @click="onEdit(record)" type="text">编辑</a-button>
            <a-popconfirm
              type="warning"
              content="是否删除该角色?"
              @ok="onDelete(record._id)"
            >
              <a-button type="text"> 删除 </a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <RoleFormModal
      ref="modalFormRef"
      @submit="
        () => {
          queryList(1)
        }
      "
    ></RoleFormModal>
  </a-card>
</template>

<script setup>
import usePageList from '@/hooks/usePageList'
import { queryRoleList, deleteRoleById } from '@/api/modules/role'
import RoleFormModal from './components/roleFormModal.vue'

const {
  form,
  formRef,
  modalFormRef,
  loading,
  tableData,
  pagination,
  onPageNoChange,
  onPageSizeChange,
  onSearchQuery,
  onResetQuery,
  queryList,
  onAdd,
  onEdit,
  onDelete
} = usePageList({
  searchForm: { roleName: '', createTime: '' },
  api: { list: queryRoleList, deleteById: deleteRoleById }
})

const onCheckRoleUser = (record) => {
  console.log(record)
}
</script>

<style scoped lang="less"></style>

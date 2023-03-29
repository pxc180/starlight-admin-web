<template>
  <a-card class="general-card" title="用户管理">
    <TableSearch
      :form="form"
      :onSearchQuery="onSearchQuery"
      :onResetQuery="onResetQuery"
    >
      <template v-slot:item1>
        <a-form-item field="realName" label="用户姓名">
          <a-input v-model="form.realName" placeholder="请输入" />
        </a-form-item>
      </template>
      <template v-slot:item2>
        <a-form-item field="createTime" label="创建时间">
          <a-date-picker v-model="form.createTime" style="width: 100%" />
        </a-form-item>
      </template>
    </TableSearch>

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
        <a-table-column title="序号" :width="60">
          <template #cell="{ rowIndex }">
            {{ rowIndex + 1 }}
          </template>
        </a-table-column>
        <a-table-column title="账号" data-index="userName"></a-table-column>
        <a-table-column title="用户姓名" data-index="realName"></a-table-column>
        <a-table-column
          title="所属角色"
          data-index="roleId.roleName"
        ></a-table-column>
        <a-table-column
          title="创建时间"
          data-index="createTime"
        ></a-table-column>
        <a-table-column title="操作" align="center">
          <template #cell="{ record }">
            <a-button @click="onEdit(record)" type="text">编辑</a-button>
            <a-popconfirm
              type="warning"
              content="是否删除该角色?"
              @ok="onDelete(record._id)"
            >
              <a-button type="text">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <UserFormDrawer
      ref="modalFormRef"
      @submit="
        (param) => {
          queryList(param)
        }
      "
    ></UserFormDrawer>
  </a-card>
</template>

<script setup>
import usePageList from '@/hooks/usePageList'
import { queryUserList, deleteUserById } from '@/api/modules/user'
import UserFormDrawer from './components/userFormDrawer.vue'
import TableSearch from '@/components/tableSearch/index.vue'

const {
  form,
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
  searchForm: { realName: '', createTime: '' },
  api: { list: queryUserList, deleteById: deleteUserById }
})
</script>

<script>
export default { name: 'system-user' }
</script>

<style scoped lang="less"></style>

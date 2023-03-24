<template>
  <a-card class="general-card" title="角色管理">
    <TableSearch
      :form="form"
      :onSearchQuery="onSearchQuery"
      :onResetQuery="onResetQuery"
    >
      <template v-slot:item1>
        <a-form-item field="roleName" label="角色名称">
          <a-input v-model="form.roleName" />
        </a-form-item>
      </template>
      <template v-slot:item2>
        <a-form-item field="createTime" label="创建时间">
          <a-date-picker v-model="form.createTime" style="width: 100%" />
        </a-form-item>
      </template>
      <template v-slot:item3>
        <a-form-item field="createTime" label="创建时间">
          <a-date-picker v-model="form.createTime" style="width: 100%" />
        </a-form-item>
      </template>
      <template v-slot:item4>
        <a-form-item field="createTime" label="创建时间">
          <a-date-picker v-model="form.createTime" style="width: 100%" />
        </a-form-item>
      </template>
      <template v-slot:item5>
        <a-form-item field="createTime" label="创建时间">
          <a-date-picker v-model="form.createTime" style="width: 100%" />
        </a-form-item>
      </template>
    </TableSearch>

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
        <a-table-column title="角色名称" data-index="roleName"></a-table-column>
        <a-table-column title="角色编码" data-index="roleCode"></a-table-column>
        <a-table-column
          title="角色描述"
          data-index="description"
        ></a-table-column>
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
            <a-button @click="onAwardedPermissions(record)" type="text">
              授权
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <RoleFormModal
      ref="modalFormRef"
      @submit="
        (param) => {
          queryList(param)
        }
      "
    ></RoleFormModal>
    <RoleUserModal ref="userListRef"></RoleUserModal>
    <SetRolePermissionsVue ref="setPermissionsRef"></SetRolePermissionsVue>
  </a-card>
</template>

<script setup>
import { ref } from 'vue'
import usePageList from '@/hooks/usePageList'
import { queryRoleList, deleteRoleById } from '@/api/modules/role'
import RoleFormModal from './components/roleFormModal.vue'
import RoleUserModal from './components/roleUserModal.vue'
import SetRolePermissionsVue from './components/setRolePermissions.vue'
import TableSearch from '@/components/tableSearch/index.vue'

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

const userListRef = ref(null)
const setPermissionsRef = ref(null)

const onCheckRoleUser = (record) => {
  userListRef.value.onShow(record._id)
}
const onAwardedPermissions = (record) => {
  setPermissionsRef.value.onShow(record._id)
}
</script>

<style scoped lang="less"></style>

<template>
  <a-card class="general-card" title="菜单管理">
    <TableSearch
      :form="form"
      :onSearchQuery="onSearchQuery"
      :onResetQuery="onResetQuery"
    >
      <template v-slot:item1>
        <a-form-item field="name" label="菜单名称">
          <a-input v-model="form.name" />
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
        <a-table-column title="菜单名称" data-index="name"></a-table-column>
        <a-table-column title="菜单路径" data-index="url"></a-table-column>
        <a-table-column title="组件" data-index="component"></a-table-column>
        <a-table-column title="菜单icon" data-index="icon"></a-table-column>
        <a-table-column title="是否隐藏" data-index="hide">
          <template #cell="{ record }">
            <span>{{ record.hide ? '是' : '否' }}</span>
          </template>
        </a-table-column>
        <a-table-column title="排序" data-index="sortNo"></a-table-column>
        <a-table-column title="操作" align="center">
          <template #cell="{ record }">
            <a-button @click="onEdit(record)" type="text">编辑</a-button>
            <a-popconfirm
              type="warning"
              content="是否删除该菜单?"
              @ok="onDelete(record._id)"
            >
              <a-button type="text"> 删除 </a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <MenuFormDrawer
      ref="modalFormRef"
      :menuData="tableData"
      @submit="
        (param) => {
          queryList(param)
        }
      "
    ></MenuFormDrawer>
  </a-card>
</template>

<script setup>
import usePageList from '@/hooks/usePageList'
import { queryAllMenu, deleteMenuById } from '@/api/modules/menu'
import MenuFormDrawer from './components/menuFormDrawer.vue'
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
  searchForm: { name: '' },
  api: { list: queryAllMenu, deleteById: deleteMenuById },
  disabledPage: true
})
</script>

<style scoped lang="less"></style>

<template>
  <a-card class="general-card" title="菜单管理">
    <a-row>
      <a-col flex="auto">
        <a-form :model="form" ref="formRef" label-align="left">
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item field="name" label="菜单名称">
                <a-input v-model="form.name" />
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
        <a-table-column title="菜单名称" data-index="name"></a-table-column>
        <a-table-column title="菜单路径" data-index="url"></a-table-column>
        <a-table-column title="组件" data-index="component"></a-table-column>
        <a-table-column title="菜单icon" data-index="icon"></a-table-column>
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
import { queryAllMenu } from '@/api/modules/menu'
import MenuFormDrawer from './components/menuFormDrawer.vue'

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
  searchForm: { name: '' },
  api: { list: queryAllMenu },
  formatTableData: (data) => {
    return data.map((v) => ({ ...v, children: null }))
  }
})
</script>

<style scoped lang="less"></style>

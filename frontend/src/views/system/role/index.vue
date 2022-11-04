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
                <a-date-picker v-model="form.createTime" />
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

    <a-table row-key="id" :data="tableData" :bordered="false">
      <template #columns>
        <a-table-column title="角色名称" data-index="roleName"></a-table-column>
        <a-table-column
          title="创建时间"
          data-index="createTime"
        ></a-table-column>
        <a-table-column title="操作" align="center">
          <template #cell="{ record }">
            <a-button @click="onCheckRoleUser(record)" type="text">
              用户
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </a-card>
</template>

<script setup>
import usePageList from '@/hooks/usePageList'

const listApi = (params) => {
  return new Promise((resolve) => {
    console.log(params)
    resolve(params)
  })
}

const { form, formRef, tableData, onSearchQuery, onResetQuery } = usePageList({
  searchForm: { roleName: '', createTime: '' },
  api: { list: listApi }
})

const onCheckRoleUser = (record) => {
  console.log(record)
}
</script>

<style scoped lang="less"></style>

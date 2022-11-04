import { reactive, ref, toRaw, onMounted } from 'vue'

export default function usePageList({ searchForm, api }) {
  const { list } = api
  const form = reactive(searchForm)
  const formRef = ref(null)
  const tableData = ref([])

  onMounted(() => {
    list(searchForm).then(() => {
      tableData.value = [
        { key: '1', roleName: '超级管理员', createTime: '20220-11-02' }
      ]
    })
  })

  const onSearchQuery = () => {
    list(toRaw(form))
  }
  const onResetQuery = () => {
    formRef.value.resetFields()
    list(toRaw(form))
  }

  return {
    form,
    formRef,
    tableData,
    onSearchQuery,
    onResetQuery
  }
}

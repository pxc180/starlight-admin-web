import { reactive, ref, toRaw, onMounted } from 'vue'
import { filterObj } from '../utils/tools'

export default function usePageList({ searchForm, api }) {
  const { list } = api
  const form = reactive(searchForm)
  const formRef = ref(null)
  const tableData = ref([])
  const loading = ref(false)
  const pagination = reactive({
    current: 1,
    pageSize: 10,
    showPageSize: true,
    showJumper: true
  })

  onMounted(() => {
    queryList(1)
  })

  const queryList = (pageNo) => {
    loading.value = true

    const params = getQueryParams()

    if (pageNo) {
      pagination.current = pageNo
    }
    list(params)
      .then((value) => {
        tableData.value = value.data
        pagination.total = value.data.length
      })
      .finally(() => {
        loading.value = false
      })
  }

  const getQueryParams = () => {
    const param = {
      ...toRaw(form),
      pageNo: pagination.current,
      pageSize: pagination.pageSize
    }
    return filterObj(param)
  }

  const onPageNoChange = (pageNo) => {
    pagination.current = pageNo
    queryList()
  }
  const onPageSizeChange = (pageSize) => {
    pagination.pageSize = pageSize
    for (let index = pagination.current; index >= 1; index--) {
      if ((index - 1) * pagination.pageSize < pagination.total) {
        pagination.current = index
        break
      }
    }
    queryList()
  }

  const onSearchQuery = () => {
    queryList(1)
  }
  const onResetQuery = () => {
    formRef.value.resetFields()
    queryList(1)
  }

  return {
    form,
    formRef,
    loading,
    tableData,
    pagination,
    onPageNoChange,
    onPageSizeChange,
    onSearchQuery,
    onResetQuery
  }
}

<script lang="jsx">
import { compile, defineComponent, h, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const routerList = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/workplace',
    meta: {
      title: '首页',
      icon: 'icon-dashboard'
    },
    children: [
      {
        path: '/dashboard/workplace',
        name: 'dashboard-workplace',
        component: () => import('@/views/dashboard/workplace/index.vue'),
        meta: {
          title: '工作台'
        }
      },
      {
        path: '/dashboard/monitor',
        name: 'dashboard-monitor',
        component: () => import('@/views/dashboard/monitor/index.vue'),
        meta: {
          title: '监控台'
        }
      }
    ]
  }
]

export default defineComponent({
  setup() {
    const router = useRouter()
    const selectedKeys = ref([])
    console.log(router.getRoutes())

    watch(
      () => router.currentRoute.value.name,
      (newValue, oldValue) => {
        selectedKeys.value = [!newValue ? oldValue : newValue]
      },
      { immediate: true }
    )

    const goto = (item) => {
      router.push(item.path)
    }

    const renderSubMenu = () => {
      function travel(routers) {
        const nodes = []
        if (routers) {
          routers.forEach((element) => {
            const icon = element?.meta?.icon
              ? () => h(compile(`<${element.meta.icon}/>`))
              : null

            const node =
              element?.children && element?.children.length ? (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{
                    icon,
                    title: () => h(compile(element?.meta?.title || ''))
                  }}
                >
                  {travel(element.children)}
                </a-sub-menu>
              ) : (
                <a-menu-item
                  v-slots={{ icon }}
                  key={element?.name}
                  onClick={() => {
                    goto(element)
                  }}
                >
                  {element?.meta?.title || ''}
                </a-menu-item>
              )

            nodes.push(node)
          })
        }
        return nodes
      }
      return travel(routerList)
    }

    return () => (
      <a-menu selectedKeys={selectedKeys.value} auto-open-selected={true}>
        {renderSubMenu()}
      </a-menu>
    )
  }
})
</script>

<style scoped lang="less">
.menu-container {
  height: 100%;
  width: 100%;
}
</style>

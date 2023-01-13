<script lang="jsx">
import { compile, defineComponent, h, ref } from 'vue'
import { useRouter } from 'vue-router'

import { listenerRouteChange } from '@/utils/routeListener'
import useMenuTree from './useMenuTree'

export default defineComponent({
  setup() {
    const router = useRouter()
    const selectedKey = ref([])

    const { menuTree } = useMenuTree()

    listenerRouteChange((newRoute) => {
      const key = newRoute.matched[newRoute.matched.length - 1]?.name
      selectedKey.value = [key]
    }, true)

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

      return travel(menuTree.value)
    }

    return () => (
      <a-menu
        selectedKeys={selectedKey.value}
        auto-open={false}
        auto-open-selected={true}
      >
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
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }
  .arco-menu-indent-list {
    display: inline-block;
    width: 34px;
  }
  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>

<script lang="jsx">
import { compile, defineAsyncComponent, h } from 'vue'
import { useRouter } from 'vue-router'
import { listenerRouteChange } from '@/utils/routeListener'
import useMenuTree from './useMenuTree'
import { useAppStore } from '@/store'

const iconModules = import.meta.glob(
  '/node_modules/@arco-design/web-vue/es/icon/**/index.js'
)

export default defineComponent({
  props: { mode: { type: String, default: 'vertical' } },
  setup(props) {
    const router = useRouter()
    const appStore = useAppStore()
    const selectedKey = ref([])
    const collapsedMenu = computed(
      () => appStore.menuCollapse && !appStore.topMenu
    )

    const { menuTree } = useMenuTree()

    listenerRouteChange((newRoute) => {
      const key = newRoute.matched[newRoute.matched.length - 1]?.name
      selectedKey.value = [key]
    }, true)

    const goto = (item) => {
      router.push(item.path)
    }
    const menuCollapseChange = (value) => {
      appStore.updateSettings({ menuCollapse: value })
    }

    const renderSubMenu = () => {
      function travel(routers) {
        const nodes = []
        if (routers) {
          routers.forEach((element) => {
            const icon = element?.meta?.icon
              ? () =>
                  h(
                    defineAsyncComponent(
                      iconModules[
                        `/node_modules/@arco-design/web-vue/es/icon/${element.meta.icon}/index.js`
                      ]
                    )
                  )
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

    return () => {
      return (
        <a-menu
          showCollapseButton
          mode={props.mode}
          v-model:collapsed={collapsedMenu.value}
          selectedKeys={selectedKey.value}
          auto-open={false}
          auto-open-selected={true}
          style="height: 100%"
          onCollapse={menuCollapseChange}
        >
          {renderSubMenu()}
        </a-menu>
      )
    }
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

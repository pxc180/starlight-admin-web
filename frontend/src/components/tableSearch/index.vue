<template>
  <a-row>
    <a-col :flex="1">
      <a-form :model="props.form" :auto-label-width="true">
        <a-grid :collapsed-rows="1" :cols="col" :col-gap="16" :row-gap="0">
          <slot v-for="(item, index) in slotsName" :key="index" :name="item">
          </slot>
        </a-grid>
      </a-form>
    </a-col>
    <a-col
      :flex="slotsName.length > resultCol ? '108px' : '198px'"
      style="display: flex"
    >
      <a-divider
        :style="{ height: slotsName.length > resultCol ? '84px' : '32px' }"
        direction="vertical"
      />
      <div
        style="
          flex: 1;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        "
      >
        <a-button
          type="primary"
          :style="{
            marginBottom: slotsName.length > resultCol ? '20px' : '0px'
          }"
          @click="onSearchQuery"
        >
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
      </div>
    </a-col>
  </a-row>
</template>

<script setup>
import {
  computed,
  onUnmounted,
  onMounted,
  toRaw,
  useSlots,
  reactive
} from 'vue'

const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)'
}
const screens = reactive({
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
  xxl: true
})
const colArr = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs']
const col = { xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }

const resultCol = computed(() => {
  let res
  for (let i = 0; i < colArr.length; i++) {
    const breakpoint = colArr[i]
    if (screens[breakpoint] || breakpoint === 'xs') {
      res = col[breakpoint]
      break
    }
  }
  return res
})

const matchHandlers = {}

onMounted(() => {
  Object.keys(responsiveMap).forEach((screen) => {
    const matchMediaQuery = responsiveMap[screen]
    if (!matchMediaQuery) return
    const listener = ({ matches }) => {
      screens[screen] = matches
    }
    const mql = window.matchMedia(matchMediaQuery)
    if (mql.addEventListener) {
      mql.addEventListener('change', listener)
    } else {
      mql.addListener(listener)
    }
    matchHandlers[matchMediaQuery] = {
      mql,
      listener
    }
    listener(mql)
  })
})

onUnmounted(() => {
  // 移除监听器
  Object.keys(responsiveMap).forEach((screen) => {
    const matchMediaQuery = responsiveMap[screen]
    if (!matchMediaQuery) return
    const handler = matchHandlers[matchMediaQuery]
    if (handler && handler.mql && handler.listener) {
      if (handler.mql.removeEventListener) {
        handler.mql.removeEventListener('change', handler.listener)
      } else {
        handler.mql.removeListener(handler.listener)
      }
    }
  })
})

const slots = useSlots()
const props = defineProps({
  form: { type: Object, required: true },
  onSearchQuery: { type: Function, default: () => {} },
  onResetQuery: { type: Function, default: () => {} }
})

const slotsName = computed(() => Object.keys(toRaw(slots)))
</script>

<style scoped lang="less"></style>

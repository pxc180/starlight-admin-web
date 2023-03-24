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
    <a-col flex="198px" style="display: flex">
      <a-divider style="height: 32px" direction="vertical" />
      <div style="flex: 1; display: flex; justify-content: space-between">
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
      </div>
    </a-col>
  </a-row>
</template>

<script setup>
import { computed, toRaw, useSlots } from 'vue'
import { useWindowSize } from '@vueuse/core'

const colWidth = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 }
const col = { xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }
const { width } = useWindowSize()
console.log(width.value)

const slots = useSlots()
const props = defineProps({
  form: { type: Object, required: true },
  onSearchQuery: { type: Function, default: () => {} },
  onResetQuery: { type: Function, default: () => {} }
})

const slotsName = computed(() => Object.keys(toRaw(slots)))
</script>

<style scoped lang="less"></style>

<template>
  <div class="setting-item-wrapper">
    <span>
      {{ option.name }}
      <a-tooltip v-if="option.prompt" :content="option.prompt">
        <icon-question-circle-fill />
      </a-tooltip>
    </span>
    <a-switch :default-checked="option.defaultVal" @change="settingChange" />
  </div>
</template>

<script setup>
const props = defineProps({
  option: {
    type: Object,
    default: () => {}
  }
})

const emits = defineEmits(['change'])
const settingChange = (value) => {
  emits('change', { value, key: props.option.key })
}
</script>

<style scoped lang="less">
.setting-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
}
</style>

<template>
  <div>
    <div>Workplace</div>
    <a-button @click="toMonitor">to-monitor</a-button>
  </div>
</template>

<script setup>
const router = useRouter()

const toMonitor = () => {
  router.push('/dashboard/monitor')
}
</script>

<script>
export default { name: 'dashboard-workplace' }
</script>

<style scoped lang="less"></style>

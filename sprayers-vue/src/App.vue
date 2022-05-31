<template>
    <div class="app">
    <sprayers-header/>
    <sprayers-main />
  </div>
</template>

<script>
  import SprayersMain from '@/view/main/SprayersMain'
  import SprayersHeader from '@/view/header/SprayersHeader'
  export default {
    name: 'App',
    components: {
      SprayersMain,
      SprayersHeader
    }
  }
</script>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 1290px;
  }
</style>

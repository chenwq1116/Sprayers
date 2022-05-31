<template>
  <div class="content-basic main-side">
    <h1>{{ title }}</h1>
    <div class="side-group">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SprayersSide',
  props: ["title"]
}
</script>

<style lang="scss">

    .side-group{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

</style>

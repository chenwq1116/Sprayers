<template>
  <div class="main">
    <!-- <sprayers-side v-bind:title="title_Group">
      <a class="main-group" v-for="(group,index) in groups" :key="index" :href="'#'+group.id">{{ group.name }}</a>
    </sprayers-side> -->
    <div class="main-content">
      <router-view></router-view>
    </div>
    <!-- <sprayers-side v-bind:title="title_HotTop">
      <a class="main-group" v-for="(hotTop,index) in hotTops" :key="index" :href="'#'+hotTop.id">{{ ++index }}.{{ hotTop.name }}</a>
    </sprayers-side> -->
  </div>
</template>

<script>
// import sprayersSide from '@/view/main/SprayersSide'

export default {
  name: 'SprayersMain',
  // components: {
  //   sprayersSide
  // },
  data(){
    return {
      title_Group: 'Group',
      title_HotTop: 'Hot Top',
      groups: [{
        name: 'china',
        id: 'china'
      },{
        name: 'guangdong',
        id: 'guangdong'
      },{
        name: 'zhuhai',
        id: 'zhuhai'
      },{
        name: 'nfh',
        id: 'nfh'
      }],
      hotTops: [{
        name: '今天核酸了嘛',
        id: '1'
      },{
        name: '今天核酸了嘛',
        id: '1'
      },{
        name: '今天核酸了嘛',
        id: '1'
      }]
    }
  }
}
</script>

<style lang="scss">
    .main{
        margin-top: 10px;
        min-width: 800px;
        display: flex;
        justify-content: center;

      .main-content{
          width: 800px;
          display: flex;
          justify-content: center;
      }
    }
</style>

<template>
    <div class="app" @scroll="handleScroll($event)">
    <sprayers-header/>
    <sprayers-main />
  </div>
</template>

<script>
  import SprayersMain from '@/view/main/SprayersMain'
  import SprayersHeader from '@/view/header/SprayersHeader'
  import { mapActions,mapState } from 'vuex'
  export default {
    name: 'App',
    components: {
      SprayersMain,
      SprayersHeader
    },
    computed:{
        ...mapState({
            sprayersData: state => state.content.sprayersData,
        })
    },
    data(){
      return {
        loadData: true
      }
    },
    methods:{
      ...mapActions({
        getContentList: 'content/getContentList',
      }),
      handleScroll(event) {
        const {
          scrollTop,
          clientHeight,
          scrollHeight
        } = event.target;
        if ((scrollTop + clientHeight) > (scrollHeight * 0.9) && this.loadData) {
          this.loadData = false;
          const last_data = this.sprayersData[this.sprayersData.length-1];
          this.getContentList(last_data._id).then(res =>{
            if(res){
              this.loadData = true;
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss">
  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow-y:scroll
  }
</style>

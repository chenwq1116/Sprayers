<template>
  <div class="content-home">
    <div class="content-basic home-top">
      <!-- <sprayers-text-area v-bind:submitType="'home'" /> -->
      
    </div>
    <sprayers-box v-for="(data,index) in sprayersData" :key="index" v-bind:sprayersData="data" />
  </div>
</template>

<script>
// import SprayersTextArea from '@/components/SprayersTextArea.vue'
import SprayersBox from '@/components/SprayersBox.vue'
import { mapState,mapActions } from 'vuex'

export default {
  name: 'ContentHome',
  components: {
    // SprayersTextArea,
    SprayersBox,

  },
  computed:{
    ...mapState({
      sprayersData: state => state.content.sprayersData
    })
 

  },
  data(){
    return {
    }
  },
  created() {
    let contentReq = {
      id: '',
      topic: this.$route.params.topic,
      note: this.$route.params.note,
    };
    this.$watch(
      () => this.$route.params,
      toParams => {
        contentReq.topic = toParams.topic;
        contentReq.note = toParams.note;
        this.getContentList(contentReq);   
      }
    );
    this.getContentList(contentReq);
  },
  methods:{
    ...mapActions({
      getContentList: 'content/getContentList'
    })
  }
}
</script>

<style lang="scss">
    .content-home{
      // width: 800px;
      width: 100%;
      .home-top{
        // width: 800px;
        display: flex;
        justify-content: space-around;
      }
    }
</style>

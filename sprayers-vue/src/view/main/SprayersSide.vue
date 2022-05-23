<template>
  <div class="content-basic main-side">
    <h1>{{ title }}</h1>
    <div class="side-group">
      <a class="main-group" v-for="(hotTop,index) in topicTop" :key="index" @click="toTopicContent(hotTop.name)">{{ hotTop.name }}</a>
    </div>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'

export default {
  name: 'SprayersSide',
  props: ["title"],
  computed:{
    ...mapState({
      topicTop: state => state.content.topicTop
    })
  },
  created: function(){
    if(this.title == 'Hot Topic'){
      this.getTopicTop();
    }
  },
  methods:{
    ...mapActions({
        getTopicTop: 'content/getTopicTop'
    }),
    toTopicContent(topic){
      topic = topic.replaceAll('#','%23');
      window.location='/#/topic/'+topic;
    }
  }
}
</script>

<style lang="scss">

    .side-group{
      display: flex;
      flex-direction: column;
      align-items: center;
    }

</style>

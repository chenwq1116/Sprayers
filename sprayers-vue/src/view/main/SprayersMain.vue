<template>
  <div class="main">
    <!-- <sprayers-side v-bind:title="title_Note" v-if="!isMobile">
      <span class="main-group" v-for="(note,index) in notes" :key="index" @click="toNoteContent(note.name)">{{ note.name }}</span>
    </sprayers-side> -->
    <div class="main-content"  >
      <router-view></router-view>
    </div>
    <!-- <sprayers-side v-bind:title="title_HotTop" v-if="!isMobile">
      <span class="main-group" v-for="(hotTop,index) in topicTop" :key="index" @click="toTopicContent(hotTop.name)">{{ hotTop.name }}</span>
    </sprayers-side> -->
  </div>
</template>

<script>
// import sprayersSide from '@/view/main/SprayersSide'
import { mapActions,mapState } from 'vuex'

export default {
  name: 'SprayersMain',
  components: {
    // sprayersSide
  },
  computed:{
    ...mapState({
      topicTop: state => state.content.topicTop,
      notes: state => state.content.note
    })
  },
  data(){
    return {
      title_Note: 'Note',
      title_HotTop: 'Hot Topic',
      isMobile:false
    }
  },
  created: function(){
      // this.getTopicTop();
      // this.getNoteList();
  },
  methods:{
    ...mapActions({
        getTopicTop: 'content/getTopicTop',
        getNoteList: 'content/getNoteList'
    }),
    toTopicContent(topic){
      topic = topic.replaceAll('#','%23');
      window.location='/#/topic/'+topic;
    },
    toNoteContent(note){
      note = note.replaceAll('$','%24');
      window.location='/#/note/'+note;
    }
  }
}
</script>

<style lang="scss">
    .main{
        // margin-top: 10px;
          width: 100%;
        // min-width: 800px;
        display: flex;
        justify-content: center;

      .main-content{
          width: 100%;
          display: flex;
          justify-content: center;
          // margin-right: 5px;
          // margin-left: 5px;
      }
    }
</style>

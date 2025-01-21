<template>
  <div class="app" style="overflow-y:scroll;overflow-x:hidden;" @scroll="handleScroll($event)" v-loading.fullscreen.lock="loading">
    <!-- <sprayers-header/> -->
    <sprayers-main />
    <drag @handlepaly="handleaudioplay" style="cursor:pointer"></drag>
    <drag @handlepaly="handleSearch" :distanceBottom=200 contentText="🔍" style="cursor:pointer"></drag>
  </div>
</template>

<script>
import SprayersMain from '@/view/main/SprayersMain'
// import SprayersHeader from '@/view/header/SprayersHeader'
import drag from "@/components/dragbase.vue";

export default {
  name: 'App',
  components: {
    SprayersMain,
    drag
    // SprayersHeader
  },
  data() {
    return {
      loadData: true,
      loading: false
    }
  },
  methods: {
    handleaudioplay() {
      this.$router.push('/text');
    },
    handleSearch() {
      this.$router.push('/search');
    },
    handleScroll(e) {
      const {
        scrollTop,
        clientHeight,
        scrollHeight
      } = e.srcElement;
      const sprayersData = this.$store.getters.sprayersData;
      if ((scrollTop + clientHeight) > (scrollHeight * 0.95) && this.loadData && sprayersData.length >= 5) {
        this.loadData = false;
        this.loading = true;
        let last_data = sprayersData[sprayersData.length - 1];
        if (last_data == null) {
          last_data = {
            _id: ''
          }
        }
        let contentReq = { id: last_data._id };
        this.$store.dispatch('content/getContentList', contentReq).then(res => {
          if (res) {
            this.loadData = true;
            this.loading = false;

          }
        });
      }
    }
  }
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>

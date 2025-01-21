<template>
  <div class="content-home">
    <div class="content-basic home-top">
      <div class="search-box">
        <input class="search-input" type="text" placeholder="search" v-model="text" @keyup.enter="go()">
        <button class="search-button" @click="go()">🔍</button>
      </div>
    </div>
    <sprayers-box v-for="(data, index) in sprayersData" :key="index" v-bind:sprayersData="data" />
  </div>
</template>

<script>
import SprayersBox from '@/components/SprayersBox.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ContentHome',
  components: {
    SprayersBox,

  },
  computed: {
    ...mapState({
      sprayersData: state => state.content.sprayersData
    })


  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    ...mapActions({
      contentSearch: 'content/contentSearch'
    }),
    go() {
      console.log("search text", this.text)
      this.contentSearch(this.text)
    }
  }
}
</script>

<style lang="scss">
.content-home {
  // width: 800px;
  width: 100%;

  .home-top {
    // width: 800px;
    display: flex;
    justify-content: space-around;
  }

  .search-box {
    width: 100%;
    height: 50px;
    text-align: center;
    display: flex;
    justify-content: space-around;

    .search-input {
      width: 75%;
      height: 40px;
    }
    .search-button {
      width: 20%;
    }
  }

}
</style>
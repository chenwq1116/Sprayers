<template>
  <div class="header">
      <div class="contains header-contains">
        <div class="contains-left">
            <img src="sprayers.png"/>
            <!-- <input placeholder="Search" /> -->
        </div>
        <div class="contains-right">
            <div class="menu">
                <router-link class="menu-item" v-for="(router,index) in menuRouter" :to="router.to" :key="index">
                    <div>{{ router.name }}</div>
                </router-link>
            </div>
        </div>

      </div>
  </div>
</template>

<script>

export default {
  name: 'SprayersHeader',
  data(){
      return {
          menuRouter: [{
              name: 'Home🏡',
              to: '/'
          }]
      }
  }
}
</script>

<style lang="scss">
    .header{
        background-color: white;
        width: 100%;
        min-width: 800px;
        height: 60px;
        display: flex;
        justify-content: center;
        position: sticky;
        z-index: 999;
        top: 0;

        .header-contains{
            display: flex;
            justify-content: space-between;
            align-items: center;

            .contains-left{
                display: flex;
                align-items: center;
                width: 25%;
                img{
                    width: 50px;
                    height: 50px;
                }

                input{
                    height: 25px;
                    border-radius: 5px;
                    border-color: black;
                }

            }

            .contains-right{
                width: 60%;
            }

        }

    }
</style>

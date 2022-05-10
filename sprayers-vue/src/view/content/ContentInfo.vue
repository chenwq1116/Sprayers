<template>
  <div class="content-basic">
    <div class="content-info">
        <div class="box-content" @click="toInfo()">
            <p class="content-text">
                {{ infoData.content}}
            </p>
            <div class="content-img">
                <viewer>
                    <img v-for="(img,index) in infoData.imgs" :key="index" :src="img.data" />
                </viewer>
            </div>
        </div>
    </div>
    <sprayers-comment v-bind:sprayersInfo="infoData.info"></sprayers-comment>    
    <p class="content-list" v-for="(data,index) in sprayersData" :key="index">
        {{ data.content }}
    </p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SprayersComment from '@/components/SprayersComment.vue'

export default {
  components: { SprayersComment },
    name: 'ContentInfo',
    data(){
        return {
            infoData: this.$route.params.sprayersData,
            id: this.$route.query.id,
            sprayersData:[{
                name: 'nick name',
                date: 'Today 23:37',
                content: 'sdfwe'
            },{
                name: 'nick name',
                date: 'Today 23:37',
                content: 'fskfjkasjfdsajdflkjsdlf'
            }]
        }
    },
    methods:{
        ...mapActions({
            getContentById: 'content/getContentById'
        })
    }
}
</script>

<style lang="scss">
    .content-basic{
        .content-list{
            padding-left: 50px;
        }
    }
    .content-info{
        width: 800px;

        .box-content{
            padding-left:50px;

            .content-text{
                line-height: 24px;
            }

            .content-img{
                display: flex;
                flex-wrap: wrap;
                
                img{
                    width:200px;
                    height:250px;
                    border-radius: 10%;
                    padding-top: 10px;
                    padding-right: 10px;
                }
            }
        }
    }
</style>

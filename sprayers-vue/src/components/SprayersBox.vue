<template>
    <div class="content-basic box">
        <div class="box-content">
            <p class="content-date">
                {{ sprayersData.createDate | dateFormat_y_m_d_hm }}
                <span class="width-draw" v-if="isWithdraw()" @click="withdraw()">↩️</span>
            </p>
            <p class="content-text" v-html="sprayersData.content">
            </p>
            <div class="content-img">
                <viewer>
                    <img v-for="(img,index) in sprayersData.imgs" :key="index" :src="img.data" />
                </viewer>
            </div>
        </div>
        <sprayers-comment v-bind:id="sprayersData._id"></sprayers-comment>
    </div>
</template>

<script>
import SprayersComment from './SprayersComment.vue';
import { getCookie } from '@/utils/cookiesUtil';
import { mapActions } from 'vuex'

export default {
    components: { SprayersComment },
    name: 'SprayersBox',
    props:['sprayersData'],
    methods: {
        ...mapActions({
           contentDelete: 'content/contentDelete',
           getContentList: 'content/getContentList'
        }),
        toInfo(sprayersData){
            this.$router.push({
                name: 'info',
                params: { sprayersData: sprayersData },
                query: { id: sprayersData._id }
            });
        },
        isWithdraw(){
            return getCookie(this.sprayersData._id);
        },
        withdraw(){
            this.contentDelete(this.sprayersData._id).then(res => {
                console.log(res);
                this.getContentList({id:''});
            });
        }
    }
}
</script>

<style lang="scss">
    .box{
        margin-top: 10px;
        padding: 20px;
        padding-bottom: 0px;

        .box-content{
            padding-left:50px;

            .content-date{
                font-size: 14px;
                color: #939393;

                .width-draw{
                    cursor:pointer;
                }
            }

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
<template>
    <div class="content-basic box">
        <div class="box-content">
            <p class="content-date">
                {{ sprayersData.createDate | dateFormat_y_m_d_hm }}
            </p>
            <p class="content-text">
                {{ sprayersData.content }}
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
export default {
    components: { SprayersComment },
    name: 'SprayersBox',
    props:['sprayersData'],
    methods: {
        toInfo(sprayersData){
            this.$router.push({
                name: 'info',
                params: { sprayersData: sprayersData },
                query: { id: sprayersData._id }
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
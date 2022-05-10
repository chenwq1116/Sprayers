<template>
    <div class="content-basic">
        <div class="box-bottom">
            <div :class="['bottom-btn','Comment'===active ? 'active' : '']" @click="isShowComment()">⌨️ {{ countComment }}</div>
            <div class="bottom-btn" @click="likeToSubmit(id)">👍 {{ countLike }}</div>
        </div>
        <div class="box-comment" v-if="showComment">
            <sprayers-text-area v-bind:submitType="'Comment'===active ? 'Transmit' : 'Comment'" v-bind:id="id"></sprayers-text-area>
            <div class="comment-list">
                <p class="content-list" v-for="(data,index) in sprayersComment[id]" :key="index">
                {{ data.createDate | dateFormat_y_m_d_hm }}: {{ data.content }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import SprayersTextArea from '@/components/SprayersTextArea.vue';
import { mapActions,mapState } from 'vuex'

export default {
  components: { SprayersTextArea },
    name: 'SprayersComment',
    props:{
        id: {
            type: String,
            default: ''
        }
    },
    computed:{
        ...mapState({
            sprayersComment: state => state.content.sprayersComment,
        })
    },
    data(){
        return {
            sprayersData: [],
            showComment: false,
            active: '',
            countComment: 0,
            countLike:0
        }
    },
    created: function(){
        this.countCommentByParentId(this.id).then(res =>{
            this.countComment = res.data;
        });
        this.getLike(this.id).then(res =>{
            this.countLike = res.data;
        });
    },
    methods: {
        ...mapActions({
            getContentByParentId: 'content/getContentByParentId',
            countCommentByParentId: 'content/countCommentByParentId',
            likeSubmit: 'content/likeSubmit',
            getLike: 'content/getLike'
        }),
        isShowComment(){
            this.active = 'Comment';
            if(this.showComment){
                this.active = '';
                this.showComment = false;
            }else{
                if(this.id.length>0){
                    this.getContentByParentId(this.id);
                }
                this.showComment = true;
            }
            return this.showComment;
        },
        likeToSubmit(val){
            ++this.countLike;
            this.likeSubmit(val);
        }
    }
}
</script>

<style lang="scss">
    .content-basic{
        .box-bottom{
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 5px;

            .bottom-btn{
                cursor: pointer;
                &:hover{
                    color: #ff8200;
                }
                &.active{
                    color: #ff8200;
                }
            }
        }

        .box-comment{
            width: 100%;
            display: flex;
            flex-direction: column;
            .box-img{
                width: 50px;
                margin-right: 5px;
                padding-top: 20px;
                img{
                    height: 50px;
                    width: 50px;
                    border-radius: 50%;
                }
            }
        }   
    }
    

</style>

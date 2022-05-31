<template>
    <div class="content-basic home-textArea">
        <textarea v-model="message" :maxlength="maxLengthLimit" @input="textMsg()" @change="textMsg()" v-on:keyup.enter.shift="submitContent()" ></textarea>
        <div class="home-img" v-show="uploadFiles.length > 0" >
            <div class="img" v-for="(uploadFile,index) in uploadFiles" v-bind:key="index">
                <img class="img-bottom" :src="uploadFile.data"/>
                <img src="del.png" class="imgs-top" @click="delImg(index)"/>
            </div>
        </div>       
        <div class="home-bottom">
            <div class="home-tool" v-if="submitType == 'home'">
                <div class="tool-btn">
                    <div @click="isShowEmoji()">😃</div>
                    <VEmojiPicker @select="selectEmoji" v-show="isEmoji"/>  
                </div>
                <div class="tool-btn">
                    <input @change="getFiles($event)" type="file" accept="image/*" class="input-file" multiple="true" />
                    📷
                </div>
            </div>
            <div class="home-tool" v-if="submitType != 'home'">
                <div class="tool-btn">
                    <div @click="isShowEmoji()">😃</div>
                    <VEmojiPicker @select="selectEmoji" v-show="isEmoji"/>  
                </div>
            </div>
            <div class="home-send">
                <div> {{ maxlength }}/120</div>
                <button type="button" class="comment-btn" @click="submitContent()">🗣</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions,mapMutations } from 'vuex'
import { analyse_topic,analyse_note } from '@/utils/util'

export default {
    name: "SprayersTextArea",
    props:{
        submitType:{
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: ''
        }
    },
    data(){
        return {
            message: '',
            text: '',
            isEmoji: false,
            uploadFiles: [],
            maxlength: 0,
            maxLengthLimit: 120,
            picturesLengthLimit: 9,
            picturesErrorMsg:'Pictures more than 9',
            messageErrorMsg:'Message more than 120',
            picturesSizeLimitErrorMsg:'Pictures more than 10m',
            uploadSizeLimit: 10 * 1024
        }
    },
    computed:{
        isUploadOverSizeLimit(){
            let flag = false;
            let sizeSum = 0;
            const files = this.uploadFiles;
            let index;
            for(index in files){
                const file = files[index];
                if( file != null ){
                    sizeSum += file.size;
                }
            }
            if(this.uploadSizeLimit <= sizeSum){
                flag = true;
            }
            return flag;
        }
    },
    methods: {
        ...mapActions({
           submitContentActions: 'content/submitContent',
           getContentList: 'content/getContentList',
           getContentByParentId: 'content/getContentByParentId',
           insertTopics: 'content/insertTopics',
           insertNote: 'content/insertNote'
        }),
        ...mapMutations({
            addContentList: 'content/addContentList',
            addCommentById: 'content/addCommentById'
        }),
        delImg(val){
            this.uploadFiles.splice(val,1);
        },
        selectEmoji(emoji) {
            this.message +=emoji.data;
            this.isEmoji = false;
            this.textMsg();
        },
        isShowEmoji(){
            if(this.isEmoji){
                this.isEmoji = false;
            }else{
                this.isEmoji = true;
            }
            return this.isEmoji;
        },
        getFiles(e){
            var files = e.target.files;
            let index;
            for(index in files){
                let file = files[index];
                var reader = new FileReader(); 
                reader.readAsDataURL(file);
                let url = "";
                let that = this;
                reader.onload = function() {
                    url = this.result.substring(this.result.indexOf(",") + 1);
                    var uploadFile = {
                        name: file.name,
                        data: "data:image/png;base64," + url
                    };
                    that.uploadFiles.push(uploadFile);
                };
            }
        },
        textMsg(){
            this.maxlength = this.message.length;
        },
        submitContent(){
            const msg = this.message.trim();
            if(msg.length<=0){
                alert("Message is Empty");
                return;
            }
            if(this.message.length>this.maxLengthLimit){
                alert(this.messageErrorMsg);
                return;
            }
            if(this.uploadFiles.length>this.picturesLengthLimit){
                alert(this.picturesErrorMsg);
                return;
            }
            if(this.isUploadOverSizeLimit){
                alert(this.picturesSizeLimitErrorMsg);
                return;
            }
            const topics = analyse_topic(this.message);
            const note = analyse_note(this.message);
            let data = {
                content: this.message,
                imgs: this.uploadFiles,
                parentId: this.id,
                createDate: new Date(),
                topics: topics,
                note: note
            };
            let that = this;
            this.submitContentActions(data).then(res =>{
                if(res){
                    if(that.id.length > 0){
                        that.getContentByParentId(that.id);
                    }else{
                        that.getContentList({id:''});
                    }

                    that.message = '';
                    that.uploadFiles = [];
                    console.log("topics="+topics+",note="+note);
                    that.insertTopics(topics).catch( err=>{
                        if(err)console.log(err);
                    });
                    that.insertNote(note).catch( err=>{
                        if(err)console.log(err);
                    });
                }
            });
        }
    }
}

</script>

<style lang="scss">
    .home-textArea{
        width: 90%;
        padding: 20px 20px 10px 20px;
        background-color: white;
        .home-img{
            display: flex;
            flex-wrap: wrap;

            .img{
                position: relative;

                img{
                    width: 200px;
                    height: 250px;
                    cursor:pointer;
                    border-radius: 10%;
                    padding-top: 10px;
                    padding-right: 10px;
                }
                .img-bottom{
                }

                .imgs-top{
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    z-index: 1;
                    &:hover{
                        opacity: 1;
                    }
                }
            }

        }
        .home-bottom{
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .home-tool{
                width: 70%;
                display: flex;
                align-items: center;
                
                .tool-btn{
                    margin-right: 15px;
                    cursor:pointer;
                    width: 22px;
                    height: 22px;

                    input{
                        cursor:pointer;
                    }

                    .input-file{ 
                        width: 22px;
                        height: 22px;
                        position: absolute; 
                        opacity: 0;
                        cursor:pointer;
                    }
                }
                .emoji-picker{
                    position: absolute;
                }
            }

            .home-send{
                width: 25%;
                display: flex;
                justify-content: space-around;
                align-items: center;

                .comment-btn{
                    width: 70px;
                    height: 34px;
                    background: #ff8200;
                    color: white;
                    border-radius: 8px;
                    border: #ff8200;
                    cursor:pointer;

                    &:hover{
                        background: #ff5900
                    }
                }
            }
        }

    }
</style>

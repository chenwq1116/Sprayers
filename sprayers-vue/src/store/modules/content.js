import contentApi from "@/api/contentApi";
import { getPromiseAction,getPromiseActionNoMutations } from '@/utils/promiseUtil.js'
import Vue from "vue";

const state = {
    sprayersData: [],
    sprayersComment:{}
}

const mutations = {
    getContentList(state,formObj){
        state.sprayersData = formObj.data;
    },
    addContentList(state,formObj){
        state.sprayersData = state.sprayersData.concat(formObj.data);
    },
    getCommentById(state,obj){
        if(obj.data.length>0){
            Vue.set(state.sprayersComment,obj.data[0].parentId,obj.data);
        }
    },
    addCommentById(state,obj){
        let commentList = state.sprayersComment[obj.parentId];
        if(!commentList){
            commentList = []
        }
        commentList.push(obj);
        Vue.set(state.sprayersComment,obj.parentId,commentList);
    }
}

const actions = {
    getContentList(context,id){
        let commitCall = "getContentList";
        if(id != null && id.length>0){
            commitCall = "addContentList";
        }
        return getPromiseAction(contentApi.get_content_list(id),context,commitCall);
    },
    submitContent(context,obj){
        return getPromiseActionNoMutations(contentApi.submit_content(obj));
    },
    getContentById(context,id){
        return getPromiseActionNoMutations(contentApi.get_content_by_id(id));
    },
    getContentByParentId(context,id){
        return getPromiseAction(contentApi.get_content_by_parent_id(id),context,'getCommentById');
    },
    countCommentByParentId(context,id){
        return getPromiseActionNoMutations(contentApi.count_comment_by_parent_id(id));
    },
    likeSubmit(content,id){
        return getPromiseActionNoMutations(contentApi.like_width_id(id));
    },
    getLike(content,id){
        return getPromiseActionNoMutations(contentApi.get_like_by_id(id));
    }
    
}

export default{
    namespaced: true,
    actions,
    state,
    mutations
}
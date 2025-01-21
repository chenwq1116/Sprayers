import contentApi from "@/api/contentApi";
import { getPromiseAction,getPromiseActionNoMutations } from '@/utils/promiseUtil.js'
import Vue from "vue";
import { analyse_topic_to_html,analyse_note_to_html} from "@/utils/util";

const state = {
    sprayersData: [],
    sprayersComment:{},
    topicTop:[],
    note:[]
}

const mutations = {
    getContentList(state,formObj){
        let index;
        for(index in formObj.data){
            let sprayers = formObj.data[index];
            sprayers.content = analyse_topic_to_html(sprayers.content);
            sprayers.content = analyse_note_to_html(sprayers.content);
        }
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
    },
    getTopicTop(state,formObj){
        if(formObj){
            state.topicTop = formObj.data;
        }
    },
    getNoteList(state,formObj){
        if(formObj){
            state.note = formObj.data;
        }
    }
}

const actions = {
    getContentList(context,obj){
        let commitCall = "getContentList";
        if(obj.id.length>0){
            commitCall = "addContentList";
        }
        return getPromiseAction(contentApi.get_content_list(obj),context,commitCall);
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
    likeSubmit(context,id){
        return getPromiseActionNoMutations(contentApi.like_width_id(id));
    },
    getLike(context,id){
        return getPromiseActionNoMutations(contentApi.get_like_by_id(id));
    },
    getTopicTop(context){
        return getPromiseAction(contentApi.get_topic_top(),context,'getTopicTop');
    },
    insertTopics(context,obj){
        return getPromiseActionNoMutations(contentApi.insert_Topics(obj));
    },
    insertNote(context,obj){
        return getPromiseActionNoMutations(contentApi.insert_Note(obj));
    },
    getNoteList(context){
        return getPromiseAction(contentApi.get_note_list(),context,'getNoteList');
    },
    contentDelete(context,id){
        return getPromiseActionNoMutations(contentApi.content_delete(id));
    },
    countDocments(context){
        return getPromiseActionNoMutations(contentApi.count_docments(),context);
    },
    contentSearch(context,text){
        return getPromiseAction(contentApi.content_search(text),context,'getContentList');
    }
    
}

export default{
    namespaced: true,
    actions,
    state,
    mutations
}
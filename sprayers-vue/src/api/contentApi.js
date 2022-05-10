import Vue from 'vue'

export default{
    get_content_list(id){
        if(id == null){
            id = '';
        }
        return Vue.axios.get('/api/?id='+id);
    },
    submit_content(obj){
        return Vue.axios.post('/api/submit',obj);
    },
    get_content_by_id(id){
        return Vue.axios.get('/api/get?id='+id);
    },
    get_content_by_parent_id(id){
        return Vue.axios.get('/api/getByParentId?id='+id);
    },
    count_comment_by_parent_id(id){
        return Vue.axios.get('/api/countComment?id='+id);
    },
    like_width_id(id){
        return Vue.axios.get('/api/like?id='+id);
    },
    get_like_by_id(id){
        return Vue.axios.get('/api/getLike?id='+id);
    }
}
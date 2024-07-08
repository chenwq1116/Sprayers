import axios from 'axios'
export default{
    get_content_list(obj){
        return axios.post('/api/',obj);
    },
    submit_content(obj){
        return axios.post('/api/submit',obj);
    },
    get_content_by_id(id){
        return axios.get('/api/get?id='+id);
    },
    get_content_by_parent_id(id){
        return axios.get('/api/getByParentId?id='+id);
    },
    count_comment_by_parent_id(id){
        return axios.get('/api/countComment?id='+id);
    },
    like_width_id(id){
        return axios.get('/api/like/?id='+id);
    },
    get_like_by_id(id){
        return axios.get('/api/like/getLike?id='+id);
    },
    get_topic_top(){
        return axios.get('/api/topic/getTopicTop');
    },
    trends_topic(topic){
        if(topic == null || topic == ''){
            return;
        }
        return axios.get('/api/topic/?topic='+topic);
    },
    insert_Topics(obj){
        return axios.post('/api/topic/insertTopic',obj);
    },
    get_note_list(){
        return axios.get('/api/note/getNoteList');
    },
    insert_Note(obj){
        return axios.post('api/note/insert',obj);
    },
    content_delete(id){
        return axios.get('/api/delete/?id='+id);
    },
    count_docments(){
        return axios.get('/api/countDocments');
    }
}
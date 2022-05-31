import Vue from "vue";
import { dateFormat_y_m_d_hm,analyse_topic_to_html,analyse_note_to_html} from "@/utils/util";

Vue.filter('dateFormat_y_m_d_hm',date =>{
    return dateFormat_y_m_d_hm(date);
});

Vue.filter('analyse_topic_to_html',message =>{
    return analyse_topic_to_html(message);
});

Vue.filter('analyse_note_to_html',message =>{
    return analyse_note_to_html(message);
});


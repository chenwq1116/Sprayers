export function dateFormat_y_m_d_hm(date){
    const dateFormat = new Date(date);
    return dateFormat.toLocaleString();
}

export function analyse_topic_to_html(message){
    let patt = /#[a-zA-Z0-9\u4e00-\u9fa5]*#/g;
    const result = message.match(patt);
    let index;
    for(index in result){
        const topicMsg = result[index];
        const topicHtml = "<a href='#/topic/"+ topicMsg.replaceAll('#','%23') +"'>"+ topicMsg +"</a>";
        message = message.replace(topicMsg,topicHtml);
    }
    return message;
}

export function analyse_topic(message){
    let patt = /#[a-zA-Z0-9\u4e00-\u9fa5]*#/g;
    const result = message.match(patt);
    return result;
}
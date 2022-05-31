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

export function analyse_note_to_html(message){
    let patt = /\$[a-zA-Z0-9\u4e00-\u9fa5]*\$/g;
    const result = message.match(patt);
    let index;
    for(index in result){
        const note = result[index];
        const noteHtml = "<a href='#/note/"+ note.replaceAll('$','%24') +"'>"+ note +"</a>";
        message = message.replace(note,noteHtml);
    }
    return message;
}

function analyse_msg(message,patt){
    return message.match(patt);
}

export function analyse_topic(message){
    let patt = /#[a-zA-Z0-9\u4e00-\u9fa5]*#/g;
    return analyse_msg(message,patt);
}

export function analyse_note(message){
    let patt = /\$[a-zA-Z0-9\u4e00-\u9fa5]*\$/;    
    return analyse_msg(message,patt);
}

export function getUrlParams(){
    const hash = window.location.hash;
    const re = /%23\S*%23/;
    const nameList = hash.match(re);
    let params = '';
    if(nameList!=null && nameList.length>0){
        params = nameList[0]
    }
    return params;
}


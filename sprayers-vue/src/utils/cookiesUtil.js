import Vue from 'vue'

export function getCookie(cookieName){
	var value = Vue.$cookies.get(cookieName)
	return value;
}

//default set value expire 3min
export function setCookie(cookieName,cookieValue){
    Vue.$cookies.set(cookieName,cookieValue,60*3);
}
import Vue from 'vue'
import Vuex from 'vuex';
import content from './modules/content';
Vue.use(Vuex);
export default new Vuex.Store({
    debug: true,
    state: {
        message: 'every sprayer is create by yourself'
    },
    modules: {
        content
    },
    getters: {
        sprayersData: () =>{
            return content.state.sprayersData;
        }
    }
});
import Vue from 'vue'
import App from './App.vue'
import './assets/styles/index.scss'
import router from './router'

import VEmojiPicker from 'v-emoji-picker';

import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

import axios from 'axios'
import VueAxios from 'vue-axios'

import store from './store/index.js'

import './filter.js'

import VueCookies from 'vue-cookies'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import md5 from 'js-md5';


let loadData = true;
window.onscroll = function (){
  const {
    scrollTop,
    clientHeight,
    scrollHeight
  } = window.document.scrollingElement;
  const sprayersData = store.getters.sprayersData;
  if ((scrollTop + clientHeight) > (scrollHeight * 0.9) && loadData && sprayersData.length>=20) {
    loadData = false;
    let last_data = sprayersData[sprayersData.length-1];
    if(last_data == null){
      last_data = {
        _id: ''
      }
    }
    let toParams = '';
    if(router.history.current.params.topic!=null){
      toParams = router.history.current.params.topic;
    }
    let contentReq = {id:last_data._id,topic:toParams};
    store.dispatch('content/getContentList',contentReq).then(res =>{
      if(res){
        loadData = true;
      }
    });
  }
}

Vue.config.productionTip = false;
Vue.use(VEmojiPicker);
Vue.use(VueViewer);

Vue.use(VueAxios, axios);

Vue.use(VueCookies);
Vue.use(ElementUI);
Vue.prototype.$md5 = md5;

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app');


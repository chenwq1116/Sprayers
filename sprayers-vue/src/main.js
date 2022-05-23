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


Vue.config.productionTip = false;
Vue.use(VEmojiPicker);
Vue.use(VueViewer);

Vue.use(VueAxios, axios);

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app');


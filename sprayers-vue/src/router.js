import contentHome from './view/content/ContentHome'
import contentInfo from './view/content/ContentInfo'
import Vue from 'vue'
import VueRouter from 'vue-router'
import SprayersTextArea from './components/SprayersTextArea'
import PassWord from './view/main/PassWord.vue';
import search from './components/search.vue'


Vue.use(VueRouter);
const routes = [
    { 
        path: '/home',
        name: 'home',
        component: contentHome 
    },
    {
        path: '/topic/:topic',
        name: 'topic',
        component: contentHome   
    },
    {
        path: '/note/:note',
        name: 'note',
        component: contentHome   
    },
    { 
        path: '/info',
        name: 'info',
        component: contentInfo 
    },
    { 
        path: '/text',
        name: 'text',
        component: SprayersTextArea 
    },
    {
        path: '/',
        name: 'pass',
        component: PassWord
    },{
        path: '/search',
        name: 'search',
        component: search
    }
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to,from,next)=>{
    if(to.name == 'pass'){
        next();
    }else{
        let md5 = sessionStorage.getItem('md5');
        if(md5 == process.env.VUE_APP_MD5){
            next();                
        }else{
            next("/");
        }
    }
});

export default router;
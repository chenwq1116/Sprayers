import contentHome from './view/content/ContentHome'
import contentInfo from './view/content/ContentInfo'
import Vue from 'vue'
import VueRouter from 'vue-router'
import contentApi from "@/api/contentApi";

Vue.use(VueRouter);
const routes = [
    { 
        path: '/',
        name: 'home',
        component: contentHome 
    },
    {
        path: '/topic/:topic',
        name: 'topic',
        component: contentHome   
    },
    { 
        path: '/info',
        name: 'info',
        component: contentInfo 
    }
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to,from,next)=>{
    if(to.name == 'topic'){
        const topic = to.params.topic.replaceAll('#','%23');
        contentApi.trends_topic(topic);
    }
    next();
});

export default router;
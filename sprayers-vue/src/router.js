import contentHome from './view/content/ContentHome'
import contentInfo from './view/content/ContentInfo'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
const routes = [
    { 
        path: '/',
        name: 'home',
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

export default router;
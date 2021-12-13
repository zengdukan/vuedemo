import { createApp } from "vue";
import RouteView from './components/RouteView.vue'
import UserPost from './components/UserPost.vue'
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/users/:username/posts/:postId', component: UserPost
    }]
});

const app = createApp(RouteView).use(router);
app.mount('#app');



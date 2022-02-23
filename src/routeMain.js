import { createApp } from "vue";
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const AppView = {
    template: `
        <h1>Hello App!</h1>
        <p><router-link to="/">Go to Home</router-link></p>
        <p><router-link to="/about">Go to About</router-link></p>
        <p><router-link to="/user/john">/user/john</router-link></p>
        <p><router-link to="/user/sam">/user/sam</router-link></p>
        <p><router-link to="/user/">/user/admin</router-link></p>
        <router-view></router-view>
    `,
}

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
const User = { 
    template: `
        <div>User {{ $route.params.id }}</div>
    `,
    updated() {
        console.log(`updated: ${this.$route.params.id}`);
    },

    created() {
        this.$watch(
            () => this.$route.params,
            (toParams, previousParams) => {
                console.log(`to: ${toParams.id}, pre: ${previousParams.id}`);
            }
        )
    }
}

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/user/:id', component: User },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})



const app = createApp(AppView).use(router);
app.mount('#app');



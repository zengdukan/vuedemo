import { createApp, onMounted } from 'vue'
import App from './App.vue'
import Counter from './Counter.vue'
import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0,
        }
    },

    mutations: {
        increment(state) {
            state.count++;
        }
    }
});


const counter = createApp(Counter);
counter.use(store);
counter.mount('#counter');

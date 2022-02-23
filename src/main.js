import { createApp, onMounted } from 'vue'
import App from './App.vue'
import Counter from './Counter.vue'
import axios from 'axios'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0,
            todos: [
                { id: 1, text: '...', done: true },
                { id: 2, text: '...', done: false },
                { id: 3, text: '...', done: true },
            ]
        }
    },

    mutations: {
        increment1(state) {
            state.count++;
        },

        increment2(state, n) {
            state.count += n;
        },

        increment3(state, payload) {
            state.count += payload.amount;
        }
    },

    getters: {
        doneTodos: (state) => {
            return state.todos.filter(todo => todo.done);
        }
    }
});


const counter = createApp(Counter);
counter.use(store);
counter.mount('#counter');

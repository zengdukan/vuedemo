import { createApp } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count: 0,
        };
    },
    mutations: {
        increment(state) {
            state.count++;
        }
    }
});

const Counter = {

    template: `
        <div> {{ count }} </div>
        <button @click="increment">add</button>
    `,

    methods: {
        increment() {
            this.$store.commit('increment');
        }
    },

    computed: {
        count() {
            return this.$store.state.count;
        }
    }
    
}

const app = createApp(Counter)
app.use(store);
app.mount('#app');

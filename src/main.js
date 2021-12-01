import { createApp } from 'vue'
import App from './App.vue'

const TodoItem = {
    props: ['todo'],
    template: `<li>{{ todo.text }}</li>`
}

const BlogPost = {
    props: {
        title: String,
        likes: {
            type: Number,
            default: 100,
        }
    },

    template: `
        <p>{{ title }} : {{ likes }}</p>
    `
}

const Counter = {
    data() {
        return {
            counter: 0,
            message: 'Hello Vue!!',
            seen: true,
            todos: [
                { id: 0, text: 'Learn JavaScript' },
                { id: 1, text: 'Learn Vue' },
                { id: 2, text: 'Build something awesome' }
              ]
        };
    },
    mounted() {
        setInterval(() => {
            this.counter++
        }, 1000)
    },
    methods: {
        reverseMessage() {
            this.message = this.message.split('').reverse().join('');
        }
    },
    components: {
        'todo-item': TodoItem,
        'blog-post': BlogPost,
    }
};

const counter = createApp(Counter);

counter.mount('#counter');
// createApp(App).mount('#app')

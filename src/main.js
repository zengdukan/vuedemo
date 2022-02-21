import { createApp, onMounted } from 'vue'
import App from './App.vue'
import axios from 'axios'

const AddFont = {
    props:['title'],
    template: `
        <p>
            <span>{{ title }}</span>
            <button @click="onclick">+</button>
        </p>
    `,

    methods: {
        onclick() {
            this.$emit('enlargeText', 0.1);
        }
    }
}

const TodoItem = {
    props: ['todo'],
    template: `<li>{{ todo.text }}</li>`
}

const ButtonCounter = {
    data() {
        return {
            counter: 0,
        };
    },

    methods: {
        onclick() {
            this.counter++;
        }
    },

    template: `
        <button @click='onclick'>
            You click {{ this.counter }} times.
        </button>
    `,
}

const BlogPost = {
    props: ['title'],
    template:`
        <h4>{{ title }}</h4>
    `
}

const Counter = {
    data() {
        return {
            counter: 2,
            message: 'You loaded this page on ' + new Date().toLocaleString(),
            input_txt: 'Hello Vue',
            todos: [
                { id: 0, text: 'Vegetables' },
                { id: 1, text: 'Cheese' },
                { id: 2, text: 'Whatever else humans are supposed to eat' }
            ],
            author: {
                name: 'John Doe',
                books: [
                    'Vue 2 - Advanced Guide',
                    'Vue 3 - Basic Guide',
                    'Vue 4 - The Mystery'
                ]
            },
            firstName: 'a',
            lastName: 'b',
            numbers: [1, 2, 3, 4, 5],
            postFontSize: 1
        }
    },

    mounted() {
        setInterval(() => {
            this.counter++;
        }, 1000);
    },

    methods: {
        reverse() {
            this.message = [...this.message].reverse().join('');
        },

        onEnlargeText(value) {
            this.postFontSize += value;
        }
    },

    components: {
        TodoItem,
        'my-button-counter': ButtonCounter,
        'button-counter': ButtonCounter,
        BlogPost,
        AddFont
    },

    computed: {
        publishedBooksMessage() {
            return this.author.books.length > 0 ? 'yes' : 'no';
        },

        fullName() {
            return `${this.firstName} ${this.lastName}`;
        },

        evenInNumbers() {
            return this.numbers.filter(n => n % 2 === 0);
        }
    },
};



const counter = createApp(Counter);
counter.mount('#counter');

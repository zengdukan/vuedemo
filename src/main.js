import { createApp } from 'vue'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

const TodoItem = {
    props: ['todo'],
    template: `<li>{{ todo.text }}</li>`
}

const ButtonCounter = {
    props: ['title'],
    data() {
        return {
            count: 0,
        }
    },

    methods: {
        onEnlargeText(enlargeAmount) {
            this.postFontSize += enlargeAmount
        },
    },

    template: `
        <div>
            <h4>{{ title }}</h4>
            <button @click="count++">
                You clicked me {{count}} times.
            </button>
            <button @click="$emit('enlargeText', 0.1)">
                enlargeText
            </button>
            <br />
        </div>
        `
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
            ],
            question: '',
            answer: 'Questions usually contain a question mark. ;-)',
            checked: false,
            postFontSize: 1,
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
        },

        getAnswer() {
            this.answer = 'Thinking...';
            axios.get('https://yesno.wtf/api')
                .then(response => {
                    this.answer = response.data.answer;
                    console.log(this.answer);
                })
                .catch(error => {
                    this.answer = 'Error! Could not reach the API. ' + error;
                });
        },

        say(message) {
            alert(message);
        },


    },
    components: {
        ButtonCounter,
        'todo-item': TodoItem,
        'blog-post': BlogPost,
    },
    computed: {
        hasTodos() {
            return this.todos.length > 5 ? 'yes' : 'no';
        }
    },
    watch: {
        question(newQuestion, oldQuestion) {
            console.log(newQuestion);
            if (newQuestion.indexOf('?') > -1) {
                this.getAnswer();
            }
        }
    },
};

const counter = createApp(Counter);
counter.mount('#counter');

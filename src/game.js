import { createApp, onMounted } from 'vue'

const app = createApp({
    template: `<Game />`,
});

app.component('Game', {
    data() {
        return  {
            history:[{squares: Array(9).fill(null)}],
            xIsNext: true,
            stepNumber: 0,
        }
    },

    methods: {
        handleClick(idx) {
            const history = this.history.slice(0, this.stepNumber + 1);
            const current = history[history.length - 1];
            const squares = [...current.squares];
            if (this.calculateWinner || squares[idx]) {
                return;
            }
            squares[idx] = this.xIsNext ? 'X' : 'O';
            this.history = [
                ...history,
                { squares: squares }
            ];
            this.xIsNext = !this.xIsNext;
            this.stepNumber = history.length;
        },

        jumpTo(step) {
            this.stepNumber = step;
            this.xIsNext = (step % 2) === 0;
        }
    },

    computed: {   
        squares() {
            const history = this.history;
            const current = history[this.stepNumber];
            return current.squares;
        },

        next() {
            return this.xIsNext ? 'X' : 'O';
        },

        calculateWinner() {
            const lines = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
                return this.squares[a];
                }
            }
            return null;
        },

        status() {
            const winner = this.calculateWinner;
            if (winner) {
                return `Winner: ` + winner;
            } else {
                return `Next player: ${this.next}`;
            }
        }
    },

    template: `
        <div class="game">
            <div class="game-board">
                <Board @clickSquare='handleClick' :squares='squares'/>
            </div>
            <div class="game-info">
                <div>{{ status }}</div>
                <ol>
                    <li v-for='(item, step) in history' :key='step'>
                        <button @click='jumpTo(step)'>Goto {{step === 0 ? 'start' : step }}</button>
                    </li>
                </ol>
            </div>
        </div>
    `,
})



app.component('Square', {
    props: ['value', 'idx'],
    template: `
        <button class='square' @click='onclick'>
            {{ value }}
        </button>
    `,

    methods: {
        onclick() {
            this.$emit('clickSquare', this.idx);
        },
    },

    updated() {
        console.log(`update: ${this.idx}`);
    }
})

app.component('Board', {
    props:['squares'],
    methods: {
        clickSquare(idx) {
            this.$emit('clickSquare', idx);
        },
    },

    template: `
        <div>
            <div class="board-row" v-for='r of 3' :key='r'>
                <Square v-for='c of 3' :key='(r - 1)*3 + (c - 1)' :value='squares[(r - 1)*3 + (c - 1)]' @clickSquare='clickSquare' :idx='(r - 1)*3 + (c - 1)'/>
            </div>
        </div>
    `,
})

app.mount("#app")
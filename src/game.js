import { createApp, onMounted } from 'vue'

const app = createApp({
    template: `<Game />`,
});

app.component('Game', {
    data() {
        return {
            
        }
    },

    template: `
        <div class="game">
            <div class="game-board">
                <Board />
            </div>
        </div>
        <div class="game-info">
            <div><!--TODO--></div>
            <ol><!--TODO--></ol>
        </div>
    `,
})



app.component('Square', {
    props: ['value', 'idx'],
    template: `
        <button class='square' @click='onclick'>
            {{ this.value }}
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
    data() {
        return  {
            squares: Array(9).fill(null),
            xIsNext: true,
        }
    },

    methods: {
        clickSquare(idx) {
            const squares = [...this.squares];
            if (this.calculateWinner || squares[idx]) {
                return;
            }
            squares[idx] = this.xIsNext ? 'X' : 'O';
            this.squares = squares;
            this.xIsNext = !this.xIsNext;
            // this.squares[idx] = 'X'; // direct modify is ok too
        },

    },

    computed: {
        getIdx(row, col) {
            console.log(typeof(row));
            console.log(row);
            return (row - 1)*3 + (col - 1);
        },

        getValue(row, col) {
            return this.squares[getIdx(row, col)];
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
        <div>
            <div class="status">{{ this.status }}</div>
            <div class="board-row" v-for='r of 3' :key='r'>
                <Square v-for='c of 3' :key='(r - 1)*3 + (c - 1)' :value='this.squares[(r - 1)*3 + (c - 1)]' @clickSquare='clickSquare' :idx='(r - 1)*3 + (c - 1)'/>
            </div>
        </div>
    `,
})

app.mount("#app")
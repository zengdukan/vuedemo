<template>
    <button @click="increment">{{ count }}</button>
    <button @click="increment">{{ countAlias }}</button>
    <button @click="increment">{{ countPlusLocalState }}</button>
    <p>getter {{ $store.getters.doneTodos.length }}</p>
    <p>getter compute: {{ doneTodosCount }}</p>
    <p>compute {{ computeCount }}</p>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            localCount: 1,
        };
    },

    methods: {
        increment() {
            this.$store.commit('increment');
            console.log(this.$store.state.count);
        }
    },

    computed: {
        ...mapState({
            count: state => state.count,
            countAlias: 'count',
            countPlusLocalState (state) {
                return state.count + this.localCount;
            }
        }),

        computeCount() {
            return this.$store.state.count;
        },

        doneTodosCount() {
            return this.$store.getters.doneTodos.length;
        }
    },
}
</script>
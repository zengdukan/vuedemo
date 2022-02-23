<template>
    <button @click="increment1">add 1 : {{ count }}</button>
    <button @click="increment2">add 2 :{{ countAlias }}</button>
    <button @click="increment3">add 3 :{{ countPlusLocalState }}</button>
    <button @click="increment4">add 4 :{{ countPlusLocalState }}</button>
    <button @click="asyncIncrement">asyncIncrement :{{ countPlusLocalState }}</button>
    <p>getter {{ $store.getters.doneTodos.length }}</p>
    <p>getter compute: {{ doneTodosCount }}</p>
    <p>compute {{ computeCount }}</p>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    data() {
        return {
            localCount: 1,
        };
    },

    methods: {
        increment1() {
            this.$store.commit('increment1');
            console.log(this.$store.state.count);
        },

        increment2() {
            this.$store.commit('increment2', 2);
            console.log(this.$store.state.count);
        },

        increment3() {
            this.$store.commit('increment3', { 
                amount: 3
            });
            console.log(this.$store.state.count);
        },

        increment4() {
            this.$store.commit({
                type: 'increment3',
                amount: 4
            });
            console.log(this.$store.state.count);
        },

        asyncIncrement() {
            this.$store.dispatch('incrementAsync', {
                amount: 10
            });
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
        },

    },
}
</script>
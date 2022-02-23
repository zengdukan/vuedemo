<template>
    <button @click="increment">{{ count }}</button>
    <button @click="increment">{{ countAlias }}</button>
    <button @click="increment">{{ countPlusLocalState }}</button>
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

    computed: mapState({
        count: state => state.count,
        countAlias: 'count',
        countPlusLocalState (state) {
            return state.count + this.localCount;
        }
    }),
}
</script>
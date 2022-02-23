<template>
    <button @click="increment">{{ count }}</button>
</template>

<script>

export default {
    methods: {
        increment() {
            this.$store.commit('increment');
            console.log(this.$store.state.count);
        }
    },

    computed: {
        count() {
            return this.$store.state.count;
        }
    }
}
</script>
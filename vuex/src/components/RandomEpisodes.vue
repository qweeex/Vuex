<template>
    <v-container>
        {{ random_numbers }}
        <LiteCard
            v-for="card in random_arr_episodes"
            v-bind:key="card.id"
            v-bind:card="card"
        />
    </v-container>
</template>

<script>
import LiteCard from '@/components/LiteCard.vue'
export default {
    name: 'RandomEpisodes.vue',
    components: {
        LiteCard
    },
    props: {
        random_numbers: Array
    },


    data: () => ({
        random_arr_episodes: [],
        random_numbers_str: String
    }),
    methods: {
        async getRandomEpisodes() {
            console.log(this.random_numbers)
            this.random_numbers_str = this.random_numbers.toString()
            await this.$store.dispatch('SET_ARR_EPISODES', this.random_numbers.toString())
            console.log(this.random_numbers)
            this.random_arr_episodes = this.$store.getters.ARR_EPISODES;
        }
    },
    mounted() {
        this.getRandomEpisodes() 
    }
}

</script>
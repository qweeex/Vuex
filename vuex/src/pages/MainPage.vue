<template>
    <h2 class="mx-auto">Main page</h2>
    <v-container class="d-flex flex-wrap">    
        <LiteCard  
            v-for="card in episodes"
            v-bind:key="card.id"
            v-bind:card="card"
        />
        
        <router-view />
    </v-container>
</template>

<script>
import LiteCard from '@/components/LiteCard.vue'
    export default {
        components: {
            LiteCard
        },
        data: () => ({
            episodes: [],
        }),

        methods: {
            getEpisodes(page) {
                this.$store.dispatch('SET_EPISODES', page)
            },
            async getAllEpisodes() {
                await this.getEpisodes(1);
                await this.getEpisodes(2);
                await this.getEpisodes(3);
                this.episodes = this.$store.getters.EPISODES;
            }
        },
        mounted() {
            this.getAllEpisodes()
        }
    }
</script>

<style>

</style>
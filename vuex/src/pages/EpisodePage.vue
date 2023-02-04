<template>
    <v-container
        v-if="single_episode">
            <DetailedCard
            v-bind:episodeId="setId"/>

            <v-container class="mt-20">
                <v-sheet
                    class="mx-auto"
                    max-width="2200"
                >
                    <v-slide-group>
                        <LiteCard
                            v-for="card in random_arr_episodes"
                            v-bind:key="card.id"
                            v-bind:card="card"
                            @click="forceUpdate"
                        />
                    </v-slide-group>
                </v-sheet>
            </v-container>
    </v-container>
    <v-container
        v-else>
        нет эпизода

    </v-container>
</template>

<script>
import DetailedCard from '@/components/DetailedCard.vue'
import LiteCard from '@/components/LiteCard.vue'
    export default {
        components: {
            DetailedCard,
            LiteCard
        },

        data(){
            return{
              single_episode: [],
              characters_count: null,
              random_numbers: [],
              random_arr_episodes: [],
              setId: ''
            }
        },

        created() {
            this.setId = this.$route.params.id
        },
        methods: {

            // async getEpisode() {
            //     await this.$store.dispatch('SET_SINGLE_EPISODE', this.setId)
            //     this.single_episode = this.$store.getters.SINGLE_EPISODE;
            //     this.characters_count = parseInt(this.single_episode.characters.length);
            // },
            async randomEpisodes() {
                while (this.random_numbers.length < 6) {
                    let random = Math.floor(Math.random() * 51) + 1
                    if (!this.random_numbers.includes(random)) {
                        await this.$store.dispatch('SET_ARR_EPISODES', random)
                        this.random_numbers.push(random)
                        //this.random_arr_episodes = this.$store.getters.ARR_EPISODES;
                        this.random_arr_episodes.push(this.$store.getters.ARR_EPISODES)
                    } else {
                        continue;
                    }
                }

            },
          forceUpdate(){
            location.reload()
          },
        },
        mounted() {
            this.randomEpisodes()
        }
    }


</script>


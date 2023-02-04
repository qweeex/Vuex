<template>
    <v-container
        v-if="single_episode">
            <div>
              <v-container>
                <v-card
                    class="mx-auto"
                    max-width="604"
                    height="500"
                    outlined
                >
                  <v-card-title class="text-h5 mb-1">
                    {{single_episode.name}}
                  </v-card-title>
                  <v-card-subtitle>
                    {{ single_episode.episode }}
                  </v-card-subtitle>
                  <v-container class="d-flex justify-space-between mt-10">
                    <v-card-text>{{single_episode.air_date}}</v-card-text>
                    <v-container class="d-flex justify-end ml-20"
                                 max-width="200"
                    >
                      <v-card-text>Number of characters: {{characters_count}}</v-card-text>
                      <v-btn
                          @click='toggle = !toggle'
                          class="mx-2"
                          fab
                          icon
                          dark
                      >
                        <v-icon>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </v-container>
                    <v-list class="pop-up-window overflow-auto "
                            v-show='toggle'
                    >
                      <v-list-item
                          v-for="character in single_episode.characters"
                          :key='character'
                      >
                        <v-list-item-title>{{ character }}</v-list-item-title>

                      </v-list-item>

                    </v-list>
                  </v-container>
                </v-card>
              </v-container>
            </div>

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
import LiteCard from '@/components/LiteCard.vue'
    export default {
        components: {
            LiteCard
        },
      watch: {
          "$route": "getEpisode"
      },
      data(){
            return{
              toggle: false,
              single_episode: [],
              characters_count: null,
              random_numbers: [],
              random_arr_episodes: []
            }
        },
        methods: {
            async randomEpisodes() {
                let episodes = this.$store.state.episodes;
                if (episodes !== undefined){
                  while (this.random_numbers.length < 6) {
                    let random = Math.floor(Math.random() * episodes.length) + 1;
                    if (!this.random_numbers.includes(random)) {
                      this.random_numbers.push(random)
                      this.random_arr_episodes.push(episodes[random])
                    }
                  }
                }
            },
          getEpisode() {
            let episode = this.$store.state.episodes.find((item) => item.id === parseInt(this.$route.params.id));
            if (episode !== undefined){
              this.single_episode = episode;
              this.randomEpisodes();
            } else {
              this.single_episode = undefined;
            }
          },
        },
        mounted() {
          this.getEpisode();
        }
    }


</script>


<template>
    <div class="content">
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
                v-for="character in arr_characters"
                v-bind:key='character.id'
                v-bind:character="character"
            >
              <v-list-item-title>{{ character.name }}</v-list-item-title>

            </v-list-item>

          </v-list>
        </v-container>
      </v-card>
    </div>
</template>

<script>
export default {
    name: 'DetailedCard',
    props: {
        episodeId: String
    },
    data() {
        return {
            toggle: false,
            arr_characters: [],
            single_episode: [],
          characters_count: null
        }
    },
    methods: {
      async getEpisode() {
        await this.$store.dispatch('SET_SINGLE_EPISODE', this.episodeId)
        this.single_episode = this.$store.getters.SINGLE_EPISODE;
        this.characters_count = parseInt(this.single_episode.characters.length);
        for (let id in this.single_episode.characters) {
          await this.$store.dispatch('SET_CHARACTER', this.single_episode.characters[id])
          this.arr_characters.push(this.$store.getters.CHARACTER)
        }
      },
    },
    mounted() {
      this.getEpisode()
    }
}

</script>

<style>
.pop-up-window {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 300px
}

</style>

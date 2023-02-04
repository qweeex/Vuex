<template>
  <v-app>
    <h1 class="mx-auto">Rick & Morty API</h1>
    <v-main>
      
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({

  }),
  created() {
    this.$store.dispatch('doUpdateEpisodes')
  }

};
</script>

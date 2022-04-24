<template>
  <v-contianer>
    <v-btn @click="pushToPokemons()">Pokemons</v-btn>
  </v-contianer>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {};
  },

  methods: {
    pushToPokemons() {
      this.$router.push("/pokemons");
    },
  },
});
</script>

<style></style>

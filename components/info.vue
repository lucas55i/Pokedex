<template>
  <main>
    <h1>{{ pokemons.name }}</h1>
    <v-card></v-card>
  </main>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Pokemon } from "~/core/models/pokemon";

export default Vue.extend({
  props: {
    event: {
      type: Object,
      required: true,
    } as PropOptions<Pokemon>,
  },
  data() {
    return {
      pokemons: {} as Pokemon,
      open: true,
    };
  },
  methods: {
    async getPokemon() {
      const pokemonsName = this.$route.params.id;
      this.pokemons.name = pokemonsName;

      this.pokemons = (await this.$store.dispatch(
        "pokemons/getPokemon",
        pokemonsName
      )) as Pokemon;
    },
  },
  created() {
    this.getPokemon();
  },
});
</script>

<style>
</style>
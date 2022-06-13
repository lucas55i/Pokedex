<template>
  <v-container>
    <div class="text-center">
      <v-pagination :length="6"></v-pagination>
    </div>
    <v-col>
      <v-row>
        <v-card
          class="mx-auto my-12"
          width="250"
          v-for="(pokemons, index) in pokemon.results"
          :key="pokemons.results"
        >
          <div class="zoom">
            <v-img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                index + 1
              }.png`"
            ></v-img>
          </div>

          <v-card-title> {{ pokemons.name }} </v-card-title>

          <DialogPokemon :pokemons="pokemons" />
          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Pokemons, Pokemon } from "~/core/models/pokemon";
import DialogPokemon from "~/components/pokemons/dialog_pokemon.vue";

export default Vue.extend({
  components: {
    DialogPokemon: DialogPokemon,
  },
  data() {
    return {
      dialog: false,

      pageNumber: 1,
      pageSize: 10,
      pokemons: {} as Pokemon,
    };
  },

  computed: {
    pokemon(): Array<Pokemons> {
      return this.$store.state.pokemons.pokemons as Array<Pokemons>;
    },
  },
  methods: {
    getPokemons(): void {
      this.$store.dispatch("pokemons/getAll");
    },
  },
  created() {
    this.getPokemons();
  },
});
</script>

<style>
.loading {
  padding: 10px;
}
.zoom {
  transition: transform 0.2s; /* Animation */
  margin: 0 auto;
}

.zoom:hover {
  transform: scale(
    1.1
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>

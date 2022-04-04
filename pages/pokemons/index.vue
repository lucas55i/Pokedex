<template>
  <v-container>
    <v-col>
      <v-row>
        <v-card
          class="mx-auto my-12"
          width="250"
          v-for="(pokemons, index) in pokemon.results"
          :key="index"
        >
          <v-img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
              index + 1
            }.png`"
          ></v-img>

          <v-card-title> {{ pokemons.name }} </v-card-title>

          <v-divider class="mx-4"></v-divider>

          <v-card-actions>
            <v-btn
              icon
              color="red lighten-2"
              dark
              @click="getPokemon(pokemons.name), (dialog = true)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-col>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          {{ pokemons.name }}
        </v-card-title>

        <v-card-text>Peso: {{ pokemons.weight }} </v-card-text
        ><v-card-text>
          {{ abilities(pokemons.abilities) }}
          <!-- <v-list v-for="(pokemons, index) in abilities" :key="index">
            <v-list-item>{{ pokemons.ability.name }}</v-list-item>
          </v-list> --> </v-card-text
        ><v-card-text
          >Status:

          {{ pokemons.stats }}
        </v-card-text>
        <v-card-text>
          <v-progress-linear></v-progress-linear>
        </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Pokemons, Pokemon, Abilities } from "~/core/models/pokemon";
import InfoPokemon from "~/components/info.vue";

export default Vue.extend({
  components: {
    "info-pokemon": InfoPokemon,
  },
  data() {
    return { dialog: false, pokemons: {} as Pokemon, value: 10 };
  },

  computed: {
    pokemon(): Array<Pokemons> {
      return this.$store.state.pokemons.pokemons as Array<Pokemons>;
    },
  },
  methods: {
    abilities(pokemons: Pokemons): any {
      return this.pokemons.abilities;
    },
    getPokemons(): void {
      this.$store.dispatch("pokemons/getAll");
    },
    async getPokemon(pokemonsName: Pokemon) {
      this.pokemons = (await this.$store.dispatch(
        "pokemons/getPokemon",
        pokemonsName
      )) as Pokemon;
    },
  },
  created() {
    this.getPokemons();
  },
});
</script>

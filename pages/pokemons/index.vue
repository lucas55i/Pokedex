<template>
  <v-container>
    <div class="text-center">
      <v-pagination :length="6"></v-pagination>
    </div>
    <v-col>
      <v-row>
        <v-card
          @click="getPokemon(pokemons.name), (dialog = true)"
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

          <v-divider class="mx-4"></v-divider>
        </v-card>
      </v-row>
    </v-col>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title>
          {{ pokemons.name }}
        </v-card-title>
        <v-divider class="mx-4"></v-divider>

        <v-card-text align="center">
          <v-img
            max-height="250"
            max-width="250"
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons.id}.png`"
          ></v-img>
        </v-card-text>

        <v-card-text>Peso: {{ pokemons.weight }} </v-card-text>
        <v-tabs v-model="tab" centered icons-and-text>
          <v-tab> Habilidades </v-tab>
          <v-tab> Status </v-tab>
        </v-tabs>
        <br />

        <v-tabs-items v-model="tab">
          <v-tab-item key="abilities"
            ><v-card-text v-for="pokemons in abilities" :key="pokemons.url">
              Habilidades: {{ pokemons.ability.name }}
            </v-card-text>
          </v-tab-item>

          <v-tab-item key="base">
            <v-simple-table>
              <template>
                <thead>
                  <tr>
                    <th class="text-left"></th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stats, index) in stats" :key="index">
                    <td class="loading">
                      {{ stats.stat.name }} - {{ stats.base_stat }}
                      <v-progress-linear color="teal" :value="stats.base_stat">
                      </v-progress-linear>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
        </v-tabs-items>

        <v-card-text> </v-card-text>

        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Pokemons, Pokemon, Abilities } from "~/core/models/pokemon";

export default Vue.extend({
  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
      dialog: false,
      pokemons: {} as Pokemon,
      value: 10,
      tab: null,
      tabs: {
        0: {
          name: "abilities",
        },
        1: {
          name: "base",
        },
      },

      status: ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"],
    };
  },

  computed: {
    pokemon(): Array<Pokemons> {
      return this.$store.state.pokemons.pokemons as Array<Pokemons>;
    },
    abilities(): any {
      return this.pokemons.abilities;
    },
    stats(): any {
      return this.pokemons.stats;
    },
  },
  methods: {
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

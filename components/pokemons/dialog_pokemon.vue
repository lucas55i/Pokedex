<template>
  <v-container>
    <v-btn @click="getPokemon(pokemons.name), (dialog = true)" icon>
      <v-icon dark> mdi-information-outline </v-icon>
    </v-btn>
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

        <v-tabs v-model="tab" centered>
          <v-tab> Habilidades </v-tab>
          <v-tab> Status </v-tab>
        </v-tabs>
        <br />

        <v-tabs-items v-model="tab">
          <v-tab-item key="abilities">
            <v-card-text>Peso: {{ pokemons.weight }} </v-card-text>
            <v-card-text v-for="pokemons in abilities" :key="pokemons.url">
              Habilidades: {{ pokemons.ability.name }}
            </v-card-text>
          </v-tab-item>

          <v-tab-item key="base">
            <v-simple-table>
              <template>
                <tbody>
                  <tr v-for="(stats, index) in stats" :key="index">
                    <td>{{ stats.stat.name }}</td>
                    <td width="300">
                      <v-progress-linear
                        height="10"
                        color="teal"
                        :value="stats.base_stat"
                      >
                      </v-progress-linear>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-tab-item>
        </v-tabs-items>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Pokemon } from "~/core/models/pokemon";

export default Vue.extend({
  props: {
    pokemons: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pokemon: {} as Pokemon,
      value: 10,
      tab: null,
      dialog: false,

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
    abilities(): any {
      return this.pokemons.abilities;
    },
    stats(): any {
      return this.pokemons.stats;
    },
  },
  methods: {
    async getPokemon(pokemonsName: Pokemon) {
       this.pokemons = (await this.$store.dispatch(
        "pokemons/getPokemon",
        pokemonsName
      )) as Pokemon;
    },
  },
});
</script>

<style></style>

<template>
  <v-container>
    <v-col>
      <v-row>
        <v-card
          class="mx-auto my-12"
          width="250"
          v-for="(pokemons, index) in pokemon.results"
          :key="pokemons.results"
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

        <v-card-text>Peso: {{ pokemons.weight }} </v-card-text>
        <v-tabs v-model="tab" centered icons-and-text>
          <v-tab> Habilidades </v-tab>
          <v-tab> Evoluções </v-tab>
        </v-tabs>
        <br />

        <v-tabs-items v-model="tab">
          <v-tab-item key="abilities"
            ><v-card-text v-for="pokemons in abilities" :key="pokemons.url">
              Habilidades: {{ pokemons.ability.name }}
            </v-card-text>
          </v-tab-item>

          <v-tab-item key="status">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left"></th>
                    <th class="text-left"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(status, index) in status" :key="index">
                    <td>{{ status }}</td>
                    <td>
                      <v-progress-linear rounded color="teal" height="11">
                      </v-progress-linear>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-card-text> </v-card-text>
          </v-tab-item>
        </v-tabs-items>

        <v-card-text> </v-card-text>
        <v-card-text> </v-card-text>

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
    return {
      dialog: false,
      pokemons: {} as Pokemon,
      value: 10,
      tab: null,
      tabs: {
        0: {
          name: "abilities",
        },
        1: {
          name: "status",
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

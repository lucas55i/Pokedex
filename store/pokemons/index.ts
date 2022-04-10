import { Paginator, Pokemons } from "~/core/models/pokemon";
import { pokemonService } from "~/core/service/pokemonService";

interface UserState {
    pokemons: Array<Pokemons>;
}

export const state = (): UserState => ({
    pokemons: []
});

export const mutations = {
    setPokemons(state: UserState, pokemons: Array<Pokemons>) {
        state.pokemons = pokemons;
    }
};

export const actions = {
    getAll(context: any, pokemon: Paginator) {
        context.commit("setPokemons", []);
        pokemonService
            .getAll()
            .then(res => {
                context.commit("setPokemons", res);
            })
            .catch(err => {
                alert(err);
            });
    },
    getPokemon(context: any, pokemonName: string) {
        return new Promise((resolve, reject) => {
            pokemonService
                .getDetailPokemon(pokemonName)
                .then((pokemon) => {
                    resolve(pokemon)
                })
                .catch((err) => {
                    reject(err)
                })

        })
    },
};

import httpClient from "../common/http-client";
import { Pokemons, Pokemon } from "../models/pokemon";

class PokemonService {
    getAll(): Promise<Pokemons[]> {
        return httpClient.get('pokemon')
    }
    getDetailPokemon(pokemonName: string): Promise<Pokemon[]> {
        return httpClient.get('/pokemon/' + pokemonName)
    }

}

const pokemonService = new PokemonService();
export { pokemonService }
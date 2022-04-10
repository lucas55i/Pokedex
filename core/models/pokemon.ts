export interface Pokemons {
    next: string;
    count: number;
    result: Pokemons[];
    paginator: Paginator
}
export interface Paginator {
    offset: number
    limit: number
}


export interface Pokemon {
    name: string;
    weight: number
    abilities: Abilities[]
    stats: Staties[]
    type: Types[]
}

export interface Abilities {
    ability: Ability;
}
export interface Ability {
    name: string
    //url info for one ability
    url: string;
}


export interface Staties {
    base_stat: number

    stat: Stat
}
export interface Stat {
    name: string
}


export interface Types {
    type: Type
}export interface Type {
    name: string;

}
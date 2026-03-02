export interface Pokemon {
    number: number;
    species: string;
    sprites: { front_default: string };
    picture: string;
    weight: number;
    height: number;
    type: string;
    hp: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    speed: number;
    abilities: Abilities;
    flavorText: string;
    cry: string;
    caught: boolean;
}

export type Abilities = Array<PokeAbility>;

export interface PokeAbility {
    ability: { name: string };
}

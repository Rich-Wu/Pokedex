import { Pokemon } from "@/types";
import { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";

export function AddPokeball({ addPokemon }: { addPokemon: Function }) {
    return (
        <div className="stillball" id="addNew" onClick={() => addPokemon()}>
            <i className="material-icons">add</i>
        </div>
    );
}

export function FullPokeball({ pokemon, ...rest }: Record<string, any>) {
    return (
        <Pokeball {...(rest as PokeballProps)}>
            {pokemon && <img src={pokemon.picture} alt={pokemon.species} />}
        </Pokeball>
    );
}

type PokeballProps = {
    children: ReactNode;
    pokemon: Pokemon | null;
    onSelect: Dispatch<SetStateAction<Pokemon | null>>;
};

export function Pokeball({ children, pokemon, onSelect }: PokeballProps) {
    return (
        <div className="carousel-item valign-wrapper">
            <div className="pokeball stillball">
                {children}
                {pokemon && <img src={pokemon.picture} alt={pokemon.species} />}
            </div>
        </div>
    );
}

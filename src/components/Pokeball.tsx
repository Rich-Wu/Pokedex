import { Pokemon } from "@/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export function AddPokeball({ addPokemon }: { addPokemon: Function }) {
    return (
        <Pokeball>
            <div className="stillball" id="addNew" onClick={() => addPokemon()}>
                <i className="material-icons">add</i>
            </div>
        </Pokeball>
    );
}

export function FullPokeball({
    pokemon,
    onSelect,
}: {
    pokemon: Pokemon;
    onSelect: Dispatch<SetStateAction<Pokemon | null>>;
}) {
    return (
        <Pokeball>
            <img
                src={pokemon.picture}
                alt={pokemon.species}
                onClick={() => onSelect(pokemon)}
            />
        </Pokeball>
    );
}

function Pokeball({ children }: { children: ReactNode }) {
    return (
        <div className="carousel-item valign-wrapper">
            <div className="pokeball stillball">{children}</div>
        </div>
    );
}

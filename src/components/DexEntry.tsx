import { useEffect, useRef } from "react";
import { capitalize } from "../utils";
import { Pokemon } from "@/types";

function getAbilities(abilities) {
    return abilities.map((a) => capitalize(a.ability.name)).join(", ");
}

export default function DexEntry({ pokemon: Pokemon }) {
    const cryRef = useRef(null);

    useEffect(() => {
        if (cryRef.current) {
            cryRef.current.play().catch(() => {});
        }
    }, [pokemon.number]);

    return (
        <div className="dexInfo">
            <img
                id="sprite"
                src={pokemon.sprites.front_default}
                alt={pokemon.species}
            />
            <p id="dexScreen">
                No. {pokemon.number}
                <br />
                {capitalize(pokemon.species)}
                <br />
                HT: {(pokemon.height * 0.1).toFixed(1)}m<br />
                WT: {(pokemon.weight * 0.1).toFixed(1)}kg
                <br />
                <br />
                HP: {pokemon.hp} SPD: {pokemon.speed}
                <br />
                ATK: {pokemon.atk} Sp.ATK: {pokemon.spatk}
                <br />
                DEF: {pokemon.def} Sp.DEF: {pokemon.spdef}
                <br />
                <br />
                Abilities: {getAbilities(pokemon.abilities)}
                <br />
                <br />
                {pokemon.flavorText}
            </p>
            <audio ref={cryRef} src={pokemon.cry} />
        </div>
    );
}

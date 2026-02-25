import { useState, useEffect, useRef } from "react";
import { fetchPokemon } from "./api";
import PokedexDevice from "./components/PokedexDevice";
import PokeballCarousel from "./components/PokeballCarousel";
import { Pokemon } from "@/types";

export default function App() {
    const [team, setTeam] = useState<Array<Pokemon>>([]);
    const [activePokemon, setActivePokemon] = useState<Pokemon | null>(null);
    const themeRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        async function loadDefaults() {
            const defaults = await Promise.all([
                fetchPokemon("vulpix"),
                fetchPokemon("smeargle"),
                fetchPokemon(135),
            ]);
            setTeam(defaults);
            setActivePokemon(defaults[0]);
        }
        loadDefaults();
    }, []);

    useEffect(() => {
        function playTheme() {
            themeRef.current?.play().catch(() => {});
        }
        window.addEventListener("click", playTheme, { once: true });
        return () => window.removeEventListener("click", playTheme);
    }, []);

    async function addPokemon() {
        const input = window.prompt("Enter Pokemon name or number:");
        if (!input) return;
        try {
            const pokemon = await fetchPokemon(input.toLowerCase().trim());
            setTeam((prev) => [...prev, pokemon]);
            setActivePokemon(pokemon);
        } catch {
            alert("Pokemon not found!");
        }
    }

    function removePokemon() {
        if (!activePokemon) return;
        const idx = team.findIndex((p) => p.number === activePokemon.number);
        const newTeam = team.filter((p) => p.number !== activePokemon.number);
        setTeam(newTeam);
        setActivePokemon(
            newTeam.length > 0
                ? newTeam[Math.min(idx, newTeam.length - 1)]
                : null,
        );
    }

    return (
        <div className="row">
            <audio ref={themeRef} src="/opening.ogg" />
            <PokedexDevice
                activePokemon={activePokemon}
                onRemove={removePokemon}
            />
            <PokeballCarousel
                team={team}
                activePokemon={activePokemon}
                onSelect={setActivePokemon}
                onAdd={addPokemon}
            />
        </div>
    );
}

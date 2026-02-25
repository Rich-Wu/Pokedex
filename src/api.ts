import { threeDigits } from "./utils";

export async function fetchPokemon(query: string | number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}/`);
    if (!res.ok) throw new Error(`Pokemon not found: ${query}`);
    const data = await res.json();
    const flavor = await fetchFlavor(data.id);

    return {
        number: data.id,
        species: data.name,
        sprites: data.sprites,
        picture: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${threeDigits(data.id)}.png`,
        weight: data.weight,
        height: data.height,
        type: data.types,
        hp: data.stats[5].base_stat,
        atk: data.stats[4].base_stat,
        def: data.stats[3].base_stat,
        spatk: data.stats[2].base_stat,
        spdef: data.stats[1].base_stat,
        speed: data.stats[0].base_stat,
        abilities: data.abilities,
        cry: `cries/${data.id}.ogg`,
        flavorText: flavor,
    } as Pokemon;
}

export async function fetchFlavor(id: number) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    if (!res.ok) throw new Error(`Species not found: ${id}`);
    const data = await res.json();
    const entry = data.flavor_text_entries.find(
        (e) => e.language.name === "en",
    );
    return entry ? entry.flavor_text : "No info found";
}

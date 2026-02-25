# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A retro-styled Pokedex web app that fetches Pokemon data from the [PokeAPI](https://pokeapi.co/api/v2/). This is a static vanilla JS project — no build system, no package manager.

## Development

**Run locally:**
```bash
python3 -m http.server 8000
# or
npx http-server
```
Then open `http://localhost:8000`. Requires internet access for PokeAPI.

**Compile SCSS:**
```bash
sass scss/master.scss css/master.css --watch
```
Edit `scss/master.scss`; never edit `css/master.css` directly (it's auto-generated).

No tests, no linting tools configured.

## Architecture

**Entry point:** `index.html` loads jQuery (CDN), Materialize, and `js/main.js`.

**Two core classes in `js/main.js`:**
- `Pokemon` — holds all data for a single Pokemon (stats, sprites, flavor text, cry audio). Key methods: `dexEntry()` renders it on screen, `playCry()` plays the `.ogg` audio.
- `Trainer` — manages the team (`pokes` object keyed by ID). Methods: `all()`, `get(name)`, `remove(name)`.

**Data flow:**
1. `addPokemon()` prompts user → calls `fetchPokemon(input)`
2. `fetchPokemon()` hits `https://pokeapi.co/api/v2/pokemon/{id|name}` via XHR → creates `Pokemon` instance → calls `addFlavor(pokemon)` to fetch `pokemon-species` endpoint for Pokedex flavor text
3. Both fetches complete → `drawPokeballs()` re-renders the Materialize carousel
4. User clicks a Pokeball → `dexEntry()` + `playCry()` update the screen

**Default Pokemon** loaded on page load: Vulpix (#37), Smeargle (#235), Jolteon (#135).

**Carousel** (`drawPokeballs()`): Clears and rebuilds Materialize carousel items each time the team changes. An extra empty Pokeball at the end triggers `addPokemon()`.

**Layout:** Two-pane layout — Pokedex device (left/top) + carousel (right/bottom). Responsive via CSS media queries: landscape = side-by-side (33%/67%), portrait = stacked (50%/50%).

**Audio:** Opening theme (`opening.ogg`) plays on first page click. Pokemon cries are in `cries/{id}.ogg`.

## Key Files

| File | Purpose |
|------|---------|
| `js/main.js` | All application logic |
| `scss/master.scss` | Source styles (edit this) |
| `css/master.css` | Compiled CSS (do not edit) |
| `index.html` | HTML structure + script/style imports |
| `cries/` | 773 OGG Pokemon cry audio files |

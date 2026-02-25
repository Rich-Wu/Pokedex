export default function SplashScreen() {
  return (
    <div className="splash">
      <img id="logo" className="animated fadeInDown" src="/img/pokelogo.png" alt="Pokemon logo" />
      <p id="author">Pokedex written by Richard Wu</p>
      <img className="animated flipInY" id="trainer" src="/img/trainer.png" alt="Trainer" />
      <p id="prompt">Click anywhere to initialize Pokemon</p>
      <p id="credits">
        Utilizes PokeAPI, Animate.css, Pokemon-font by Superpencil, Pokemon images
        from pokemon.com, and Pokemon cries from veekun.com
      </p>
    </div>
  )
}

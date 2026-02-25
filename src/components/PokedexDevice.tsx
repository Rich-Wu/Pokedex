import SplashScreen from './SplashScreen'
import DexEntry from './DexEntry'

export default function PokedexDevice({ activePokemon, onRemove }) {
  return (
    <div className="col s12 m6 l4">
      <div className="pokedex-body">
        <div className="lights">
          <div className="pokedex-lens">
            <div className="lens-glare"></div>
          </div>
          <div className="lights-flex">
            <div className="red-light"></div>
            <div className="yellow-light"></div>
            <div className="green-light"></div>
          </div>
        </div>
        <div className="screen-wrapper">
          <div className="screen-wrapper-notch"></div>
          <div className="greenscreen">
            {activePokemon ? <DexEntry pokemon={activePokemon} /> : <SplashScreen />}
          </div>
          <button className="red remove" onClick={onRemove}>REMOVE</button>
        </div>
      </div>
    </div>
  )
}

console.log('linked');

function threeDigits(num) {
  if (num.toString().length == 3) {
    return num;
  } else {
    num = "0" + num.toString();
    return threeDigits(num);
  }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Trainer {
  constructor() {
    this.pokes = {};
  }

  all() {
    let allPokes = [];
    for (let poke in this.pokes) {
      allPokes.push(this.pokes[poke]);
    }
    return allPokes;
  }

  get(name) {
    for (let poke in this.pokes) {
      if (this.pokes[poke]['species'] == name || this.pokes[poke]['number'] == name) {
        return this.pokes[poke];
      }
    }
  }

  remove(name) {
    for (let poke in this.pokes) {
      if (this.pokes[poke]['species'] == name || this.pokes[poke]['number'] == name) {
        delete this.pokes[poke];
      }
    }
  }
}

class Pokemon {
  constructor(number, species, sprites, weight, height, type, hp, atk, def, spatk, spdef, speed, abilities) {
    this.number = number;
    this.species = species;
    this.sprites = sprites;
    this.picture = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + threeDigits(number) + ".png";
    this.weight = weight;
    this.height = height;
    this.type = type;
    this.hp = hp;
    this.atk = atk;
    this.def = def;
    this.spatk = spatk;
    this.spdef = spdef;
    this.speed = speed;
    this.abilities = abilities;
    this.flavorText = undefined;
    this.cry = "cries/" + number + ".ogg";
    this.caught = false;
  }

  dexEntry() {
    var entry = `No. ${this['number']}<br>${capitalize(this['species'])}<br>HT: ${Number(.1*this['height']).toFixed(1)}m<br>WT: ${Number(this['weight']*0.1).toFixed(1)}kg<br><br>HP: ${this['hp']} SPD: ${this['speed']}<br>ATK: ${this['atk']} Sp.ATK: ${this['spatk']}<br>DEF: ${this['def']} Sp.DEF: ${this['spdef']}<br><br>Abilities: ${this.getAbilities()}<br><br>${this['flavorText']}`;
    // console.log(entry);
    document.getElementsByClassName('splash')[0].style.display = 'none';
    var target = document.getElementById('dexScreen');
    target.innerHTML = entry;
  }

  getAbilities() {
    let abilityString = capitalize(this['abilities'][0]['ability']['name']);
    for (let i = 1;i < this.abilities.length;i++) {
      abilityString = abilityString + ", " + capitalize(this['abilities'][i]['ability']['name']);
    }
    return abilityString;
  }

  playCry() {
    document.getElementById(this.number + "cry").play();
    console.log('played ' + this.number + ", " + this.species);
  }
}

function addPokemon() {
  var xhttp = new XMLHttpRequest();
  var userEntry = prompt("Pokemon number").toLowerCase();
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + userEntry + "/", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // what result you want to achieve
      let data = JSON.parse(this.responseText);
      // console.log(data);
      var pokemon = new Pokemon(data['id'], data['name'], data['sprites'], data['weight'], data['height'], data['types'], data['stats'][5]['base_stat'], data['stats'][4]['base_stat'], data['stats'][3]['base_stat'], data['stats'][2]['base_stat'], data['stats'][1]['base_stat'], data['stats'][0]['base_stat'], data['abilities']);
      // console.log(pokemon);
      pokemon['flavorText'] = addFlavor(pokemon);
    };
    if (this.readyState == 4 && this.status != 200) {
      alert('An error occurred while processing your input of ' + userEntry + '. Please try another input.');
    };
  };
}

function fetchPokemon(userEntry) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + userEntry + "/", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      // console.log(data);
      var pokemon = new Pokemon(data['id'], data['name'], data['sprites'], data['weight'], data['height'], data['types'], data['stats'][5]['base_stat'], data['stats'][4]['base_stat'], data['stats'][3]['base_stat'], data['stats'][2]['base_stat'], data['stats'][1]['base_stat'], data['stats'][0]['base_stat'], data['abilities']);
      // console.log(pokemon);
      pokemon['flavorText'] = addFlavor(pokemon);
    };
  };
}

function addFlavor(pokemon) {
  var xhttp2 = new XMLHttpRequest();
  xhttp2.open("GET", "https://pokeapi.co/api/v2/pokemon-species/" + pokemon.number + "/", true);
  xhttp2.send();
  xhttp2.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.responseText);
      // console.log(data['flavor_text_entries'][2]['flavor_text']);
      // console.log(data);
      for (entries in data['flavor_text_entries']) {
        if (data['flavor_text_entries'][entries]['language']['name'] == 'en'){
          // console.log(data['flavor_text_entries'][entries]);
          pokemon.flavorText = data['flavor_text_entries'][entries]['flavor_text'];
          console.log(pokemon.number);
          for (poke in Red.pokes) {
            console.log('checking poke')
            if (Red.pokes[poke]['number'] == pokemon['number']) {
              console.log('duplicate pokemon found');
              alert('Pokemon already exists on team');
              return;
            }
            console.log('still good');
          }
          Red.pokes[pokemon['number']] = pokemon;
          setTimeout(drawPokeballs, 500);
          return;
        }
      }
    }
  };
}

function drawPokeballs() {
  var pokeContainer = document.getElementById("pokeSelector");
  for (pokemon in Red.pokes) {
    if (Red.pokes[pokemon]['caught'] == false) {
      Red.pokes[pokemon]['caught'] = true;
      var newMonster = document.createElement('div');
      newMonster.className = "carousel-item valign-wrapper"
      var newPokeball = document.createElement('div');
      newPokeball.className = "pokeball";
      newPokeball.id = Red.pokes[pokemon]['number'];
      var pokemonImg = document.createElement('img');
      for (pokemon in Red.pokes) {
        if (Red.pokes[pokemon]['number'] == newPokeball.id) {
          pokemonImg.src = Red.pokes[pokemon]['picture'];
        }
      };
      var pokemonCry = document.createElement('audio');
      for (pokemon in Red.pokes) {
        if (Red.pokes[pokemon]['number'] == newPokeball.id) {
          pokemonCry.src = Red.pokes[pokemon]['cry'];
          pokemonCry.id = newPokeball.id + "cry";
        }
      }
      document.getElementById('pokeSelector').insertBefore(newMonster, document.getElementsByClassName('carousel-item')[0]);
      newMonster.appendChild(newPokeball);
      newPokeball.appendChild(pokemonImg);
      newPokeball.appendChild(pokemonCry);
      newPokeball.addEventListener('click', function(e) {
        if (e.target.parentElement.parentElement.classList.contains('active')) {
          Red.pokes[e.target.parentElement.id].dexEntry();
          Red.pokes[e.target.parentElement.id].playCry();
        }
      });
    }
  }
  var elems = document.querySelectorAll('.carousel');
  let options = {
    'numVisible': 3,
    'indicators': false,
    'noWrap': false,
    'shift': 170,
    'dist': -150
  };
  var instances = M.Carousel.init(elems, options);
}

function removePokemon() {
  if (document.getElementsByClassName('active')[0].firstElementChild.classList.contains('stillball')) {
    console.log("Empty pokeball can't be removed");
    return;
  }
  let selectedId = document.getElementsByClassName('active')[0].childNodes[0].id;
  console.log(selectedId);
  let removedBall = document.getElementsByClassName('active')[0];
  console.log(removedBall);
  Red.remove(selectedId);
  document.getElementById('pokeSelector').removeChild(removedBall);
  drawPokeballs();
  if (document.getElementsByClassName('active')[0].firstElementChild.classList.contains('stillball')) {
    document.getElementsByClassName('splash')[0].style.display = "block";
  }
  Red['pokes'][document.getElementsByClassName('active')[0].firstElementChild.id].dexEntry();
}

document.getElementById('addNew').addEventListener('click',function(e) {
  if (e.target.parentElement.parentElement.classList.contains('active')) {
    addPokemon();
  }
});

var Red = new Trainer();
document.getElementsByClassName('remove')[0].addEventListener('click',removePokemon);
fetchPokemon('vulpix');
fetchPokemon('smeargle');
fetchPokemon(135);
setTimeout(drawPokeballs, 1000);
window.addEventListener('load', function() {
  document.getElementById('theme').play();
})

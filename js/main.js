console.log('linked');

activePokemon = 0;

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
    var entry = `No. ${this['number']}<br>${capitalize(this['species'])}<br>HT: ${Number(.1*this['height']).toFixed(1)}m<br>WT: ${Number(this['weight']*0.1).toFixed(1)}kg<br><br>HP: ${this['hp']} SPD: ${this['speed']}<br>ATK: ${this['atk']} Sp.ATK: ${this['spatk']}<br>DEF: ${this['def']} Sp.DEF: ${this['spdef']}<br><br>Abilities: ${capitalize(this['abilities'][0]['ability']['name'])}<br><br>${this['flavorText']}`;
    // console.log(entry);
    var target = document.getElementById('dexScreen');
    target.innerHTML = entry;
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
    }
  };
}

function fetchPokemon(userEntry) {
  var xhttp = new XMLHttpRequest();
  // var userEntry = prompt("Pokemon number").toLowerCase();
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
    }
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
          pokes[pokemon['number']] = pokemon;
          return;
        }
      }
      // pokes.push(pokemon);
    }
  };
}
var pokes = {};

// class Trainer {
//   constructor(name) {
//     this.name = name;
//     // this.gender = gender;
//     this.team = [];
//   };
//
//   getTeam() {
//     if (this.team.length > 0) {
//       let teamOutput = `${this.name}'s team is currently `;
//       for (let member = 0; member < this.team.length; member++) {
//         teamOutput = teamOutput + this.team[member] + " ";
//       }
//       console.log(teamOutput);
//     } else {
//       console.log("This trainer has no Pokemon and is a scrubnoob.")
//     }
//   }
//
//   makeTeam() {
//       while (pokes.length != 0) {
//         this.team.unshift(pokes.pop());
//       }
//   }
// }

// var Red = new Trainer('Red');
// document.getElementById('pokebutton').addEventListener('click', addPokemon);
// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.carousel');
//     options = {
//       'numVisible': 3,
//       'indicators': false,
//       'noWrap': true,
//       'shift': 170,
//       'dist': -300
//     };
//     var instances = M.Carousel.init(elems, options);
//   });

function drawPokeballs() {
  var pokeContainer = document.getElementById("pokeSelector");
  for (pokemon in pokes) {
    if (pokes[pokemon]['caught'] == false) {
      pokes[pokemon]['caught'] = true;
      var newMonster = document.createElement('div');
      newMonster.className = "carousel-item valign-wrapper"
      var newPokeball = document.createElement('div');
      newPokeball.className = "pokeball";
      newPokeball.id = pokes[pokemon]['number'];
      var pokemonImg = document.createElement('img');
      for (pokemon in pokes) {
        if (pokes[pokemon]['number'] == newPokeball.id) {
          pokemonImg.src = pokes[pokemon]['picture'];
        }
      }
      var pokemonCry = document.createElement('audio');
      for (pokemon in pokes) {
        if (pokes[pokemon]['number'] == newPokeball.id) {
          pokemonCry.src = pokes[pokemon]['cry'];
          pokemonCry.id = newPokeball.id + "cry";
        }
      }
      document.getElementById('pokeSelector').insertBefore(newMonster, document.getElementsByClassName('carousel-item')[0]);
      newMonster.appendChild(newPokeball);
      newPokeball.appendChild(pokemonImg);
      newPokeball.appendChild(pokemonCry);
      newPokeball.addEventListener('click', function(e) {
        if (e.target.parentElement.parentElement.classList.contains('active')) {
          pokes[e.target.parentElement.id].dexEntry();
          pokes[e.target.parentElement.id].playCry();
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
  // for (ball in document.getElementsByClassName('pokeball')) {
  //   document.getElementsByClassName('pokeball')[ball].addEventListener('click', function() {
  //     console.log(this.currentTarget);
  //     pokes[this.currentTarget.id].dexEntry();
  //     pokes[this.currentTarget.id].playCry();
  //   });
  // }
}

function writeDex() {
  // for (pokemon in pokes) {
    // if (pokes[pokemon]['number'] == document.getElementsByClassName('active')[0].children[0].id) {
      pokes[this.currentTarget.id].dexEntry();
    // }
  // }
}

// function playCry(pokemonNum) {
//   document.getElementById(pokemonNum + 'cry').play();
// }


//create eventListener for button to add items to pokes array and refresh carousel
document.getElementById('addNew').addEventListener('click',addPokemon);
document.getElementsByClassName('scan')[0].addEventListener('click',drawPokeballs);
fetchPokemon(135);
fetchPokemon('vulpix');
fetchPokemon('smeargle');
setTimeout(drawPokeballs, 1000);

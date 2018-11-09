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
          pokes.push(pokemon);
          return;
        }
      }
      // pokes.push(pokemon);
    }
  };
}

class Trainer {
  constructor(name) {
    this.name = name;
    // this.gender = gender;
    this.team = [];
  };

  getTeam() {
    if (this.team.length > 0) {
      let teamOutput = `${this.name}'s team is currently `;
      for (let member = 0; member < this.team.length; member++) {
        teamOutput = teamOutput + this.team[member] + " ";
      }
      console.log(teamOutput);
    } else {
      console.log("This trainer has no Pokemon and is a scrubnoob.")
    }
  }

  makeTeam() {
      while (pokes.length != 0) {
        this.team.unshift(pokes.pop());
      }
  }
}

var pokes = [];
var Red = new Trainer('Red');
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
  console.log(pokeContainer);
  console.log(pokes + ", " + pokes.length);
  for (let i = 0;i <= pokes.length;i++) {
    // var pokemonData = pokes.pop();
    if (i == pokes.length) {
      var newMonster = document.createElement('div');
      newMonster.className = "carousel-item valign-wrapper"
      var newPokeball = document.createElement('div');
      newPokeball.className = "stillball";
      newPokeball.id = "addNew";
      newMonster.appendChild(newPokeball);
      pokeContainer.appendChild(newMonster);

    } else if (pokes[i]['caught'] == false) {
      var newMonster = document.createElement('div');
      newMonster.className = "carousel-item valign-wrapper"
      var newPokeball = document.createElement('div');
      newPokeball.className = "pokeball " + pokes[i]['species'];
      newMonster.appendChild(newPokeball);
      pokeContainer.appendChild(newMonster);
      pokes[i]['caught'] = true;
      console.log(pokes[i]);
    }
  }
  var elems = document.querySelectorAll('.carousel');
  let options = {
    'numVisible': 3,
    'indicators': false,
    'noWrap': true,
    'shift': 170,
    'dist': -150
  };
  var instances = M.Carousel.init(elems, options);
}

function dexEntry() {
  //testing with pokes[0]
  let tester = pokes[2];
  var entry = `No. ${threeDigits(tester['number'])}<br>${capitalize(tester['species'])}<br>HT: ${tester['height']}<br>WT: ${tester['weight']}<br><br>HP: ${tester['hp']} SPD: ${tester['speed']}<br>ATK: ${tester['atk']} Sp.ATK: ${tester['spatk']}<br>DEF: ${tester['def']} Sp.DEF: ${tester['spdef']}<br><br>Abilities: ${capitalize(tester['abilities'][0]['ability']['name'])}<br><br>${tester['flavorText']}`;
  console.log(entry);
  var target = document.getElementById('dexScreen');
  target.innerHTML = entry;
}
//create eventListener for button to add items to pokes array and refresh carousel

fetchPokemon(135);
fetchPokemon('vulpix');
fetchPokemon('smeargle');
setTimeout(drawPokeballs, 500);
setTimeout(dexEntry, 500);

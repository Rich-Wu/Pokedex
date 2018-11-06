console.log('linked');


class Pokemon {
  constructor(number, species, weight, height, type, hp, atk, def, spatk, spdef, speed, abilities) {
    this.number = number;
    this.species = species;
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
    this.flavorText = '';
  }
}

function addPokemon() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // what result you want to achieve
      let data = JSON.parse(this.responseText);
      console.log(data);
      let pokemon = new Pokemon(data['id'], data['name'], data['weight'], data['height'], data['types'], data['stats'][5], data['stats'][4], data['stats'][3], data['stats'][2], data['stats'][1], data['stats'][0], data['abilities']);
      Red.team.push(pokemon);
    }
  };
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + prompt("Pokemon number") + "/", true);
  xhttp.send();
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
}

var Red = new Trainer('Red');

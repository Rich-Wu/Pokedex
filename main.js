console.log('linked');


class Pokemon {
  constructor(pokemon) {
    this.species = pokemon;
    this.
  }
  function getPokemonData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        // what result you want to achieve
        let data = JSON.parse(this.responseText);
        console.log(data);
      }
    };
    xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon/" + this.species + "/", true);
    xhttp.send();
  }
}

class Trainer {
  constructor(name) {
    this.name = name;
    // this.gender = gender;
    this.team = [];
  }

  function getTeam() {
    let teamOutput = `${this.name}'s team is currently `;
    for (let member = 0; member < this.team.length; member++) {
      teamOutput = teamOutput + this.team[member] + " ";
    }
    console.log(teamOutput);
  }
}

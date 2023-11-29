const pokemonCard = {
  bug: 'bugCard.png',
  dark: 'darkCard.png',
  dragon: 'dragonCard.png',
  electric: 'electrikCard.png',
  fairy: 'fairyCard.png',
  fighting: 'fightCard.png',
  fire: 'fireCard.png',
  flying: 'flyCard.png',
  ghost: 'ghostCard.png',
  grass: 'grassCard.png',
  ground: 'groundCard.png',
  ice: 'iceCard.png',
  normal: 'normalCard.png',
  poison: 'poisonCard.png',
  psychic: 'psyCard.png',
  rock: 'rockCard.png',
  steel: 'steelCard.png',
  water: 'waterCard.png',
};

function imagePokemon(text) {
  return pokemonCard[text];
}

const pokemonType = {
  bug: 'bug.png',
  dark: 'dark.png',
  dragon: 'dragon.png',
  electric: 'electr.png',
  fairy: 'fairy.png',
  fighting: 'fight.png',
  fire: 'fire.png',
  flying: 'flying.png',
  ghost: 'ghost.png',
  grass: 'grass.png',
  ground: 'ground.png',
  ice: 'ice.png',
  normal: 'normal.png',
  poison: 'poison.png',
  psychic: 'psy.png',
  rock: 'rock.png',
  steel: 'steel.png',
  water: 'water.png',
};

function translateType(text) {
  return pokemonType[text];
}

const pokemonEnergy = {
  bug: 'bugEnergy.png',
  dark: 'darkEnergy.png',
  dragon: 'dragonEnergy.png',
  electric: 'electrEnergy.png',
  fairy: 'fairyEnergy.png',
  fighting: 'fightEnergy.png',
  fire: 'fireEnergy.png',
  flying: 'flyingEnergy.png',
  ghost: 'ghostEnergy.png',
  grass: 'grassEnergy.png',
  ground: 'groundEnergy.png',
  ice: 'iceEnergy.png',
  normal: 'normalEnergy.png',
  poison: 'poisonEnergy.png',
  psychic: 'psyEnergy.png',
  rock: 'rockEnergy.png',
  steel: 'steelEnergy.png',
  water: 'waterEnergy.png',
};

function imageEnergy(type) {
  return pokemonEnergy[type];
}

document.addEventListener("DOMContentLoaded", function () {
  const rickRollAudio = document.getElementById("rickRollAudio");
  const rickRollImage = document.getElementById("rickRollImage");

  const getPokemon = (e) => {
    const getname = document.querySelector("#pokemonName").value;
    const name = getname.toLowerCase();
    const image = document.querySelector("#imagepokemon");
    const namepokemon = document.querySelector("#namepokemon");
    const number = document.querySelector("#Number");
    const weight = document.querySelector("#weight");
    const type = document.querySelector("#type");
    const energy = document.querySelector("#energy");
    const height = document.querySelector("#height");

    if (name === '0' || name === '898') {
      rickRollAudio.play();
      rickRollImage.style.display = 'block';
      toggleCardShadow(false);
      return;
    }

    rickRollAudio.pause();
    rickRollAudio.currentTime = 0;
    rickRollImage.style.display = 'none';

    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${name}`)
      .then((response) => response.json())
      .then((frenchData) => {
        const frenchName = frenchData.name;
        namepokemon.textContent = frenchName.charAt(0).toUpperCase() + frenchName.slice(1);

        fetch(`https://pokeapi.co/api/v2/pokemon/${frenchData.id}`)
          .then((response) => response.json())
          .then((data) => {
            image.src = `${data.sprites.other['official-artwork'].front_default}`;
            image.alt = `${data.name}`;
            number.textContent = `${data.id}`;
            weight.textContent = `${Math.round(data.weight / 10)} kg`;
            type.innerHTML = `<img src="${translateType(data.types[0].type.name)}"/>`;
            height.textContent = `${data.height * 10} cm`;
            const cardImage = document.querySelector("#cardImage");
            const cardPath = imagePokemon(data.types[0].type.name);
            cardImage.src = cardPath;
            energy.innerHTML = `<img src="${imageEnergy(data.types[0].type.name)}" alt="Energy"/>`;
          });
      })
      .catch((err) => {
        alert('Pokemon non trouvé', err);
      });

    e.preventDefault();
  };

  document.querySelector('#search').addEventListener("click", getPokemon);
  let input = document.getElementById("pokemonName");
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      imagePokemon()
      translateType()
      imageEnergy()
      getPokemon()
    }
  });
});
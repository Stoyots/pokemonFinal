const pokemonCard = {
  bug: 'img/bugCard.png',
  dark: 'img/darkCard.png',
  dragon: 'img/dragonCard.png',
  electric: 'img/electrikCard.png',
  fairy: 'img/fairyCard.png',
  fighting: 'img/fightCard.png',
  fire: 'img/fireCard.png',
  flying: 'img/flyCard.png',
  ghost: 'img/ghostCard.png',
  grass: 'img/grassCard.png',
  ground: 'img/groundCard.png',
  ice: 'img/iceCard.png',
  normal: 'img/normalCard.png',
  poison: 'img/poisonCard.png',
  psychic: 'img/psyCard.png',
  rock: 'img/rockCard.png',
  steel: 'img/steelCard.png',
  water: 'img/waterCard.png',
};

function imagePokemon(text) {
  return pokemonCard[text];
}

const pokemonType = {
  bug: 'img/bug.png',
  dark: 'img/dark.png',
  dragon: 'img/dragon.png',
  electric: 'img/electr.png',
  fairy: 'img/fairy.png',
  fighting: 'img/fight.png',
  fire: 'img/fire.png',
  flying: 'img/flying.png',
  ghost: 'img/ghost.png',
  grass: 'img/grass.png',
  ground: 'img/ground.png',
  ice: 'img/ice.png',
  normal: 'img/normal.png',
  poison: 'img/poison.png',
  psychic: 'img/psy.png',
  rock: 'img/rock.png',
  steel: 'img/steel.png',
  water: 'img/water.png',
};

function translateType(text) {
  return pokemonType[text];
}

const pokemonEnergy = {
  bug: 'img/bugEnergy.png',
  dark: 'img/darkEnergy.png',
  dragon: 'img/dragonEnergy.png',
  electric: 'img/electrEnergy.png',
  fairy: 'img/fairyEnergy.png',
  fighting: 'img/fightEnergy.png',
  fire: 'img/fireEnergy.png',
  flying: 'img/flyingEnergy.png',
  ghost: 'img/ghostEnergy.png',
  grass: 'img/grassEnergy.png',
  ground: 'img/groundEnergy.png',
  ice: 'img/iceEnergy.png',
  normal: 'img/normalEnergy.png',
  poison: 'img/poisonEnergy.png',
  psychic: 'img/psyEnergy.png',
  rock: 'img/rockEnergy.png',
  steel: 'img/steelEnergy.png',
  water: 'img/waterEnergy.png',
};

function getRandomSpriteURL(pokemonNumber) {
  const versions = {
    'generation-iii': ['emerald', 'firered-leafgreen', 'ruby-sapphire'],
    'generation-iv': ['diamond-pearl', 'heartgold-soulsilver', 'platinum'],
    'generation-v': ['black-white'],
    'generation-vi': ['x-y', 'omegaruby-alphasapphire'],
    'generation-vii': ['ultra-sun-ultra-moon'],
  };

  const generationKeys = Object.keys(versions);
  const randomGenerationKey = generationKeys[Math.floor(Math.random() * generationKeys.length)];
  const randomGeneration = versions[randomGenerationKey];

  const randomVersion = randomGeneration[Math.floor(Math.random() * randomGeneration.length)];

  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/${randomGenerationKey}/${randomVersion}/${pokemonNumber}.png`;
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
            const spriteURL = getRandomSpriteURL(data.id);
            image.src = spriteURL;
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
      getPokemon();
    }
  });
});
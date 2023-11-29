const pokemonList = document.querySelector("#pokemonList");
const headerBtn = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";



for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => pokemon(data))
}

function pokemon(data) {


    //https://pokebuildapi.fr/api/v1/pokemon/1

    let types = data.types.map((type) => `<p class="type ${type.type.name}">${type.type.name}</p>`)
    types = types.join('');

    let pokeId = ('00' + data.id).slice(-3);
    console.log(data)

    const div = document.createElement("div")
    div.classList.add("pokemon");
    div.innerHTML = `
<p class="pokemon-id-back">#${pokeId}</p>
<div class="imgPokemon">
<img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}">
</div>
<div class="pokemonInfo">
<div class="pokemonContainer">
<p class="pokemonId">#${pokeId}</p>
<h2 class="pokemonName">${data.name}</h2>
</div>
<div class="pokemonType">
${types}
</div>
<div class="pokemonStats">
<p class="stat">${data.height * 10} cm</p>
<p class="stat">${data.weight / 10} kg</p>
</div>
</div>

`
    pokemonList.append(div);
}





headerBtn.forEach(boutton => boutton.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id;

    pokemonList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (btnId === "allPoke") {
                    pokemon(data);
                } else {
                    const types = data.types.map(type => type.type.name);
                    if (types.some(type => type.includes(btnId))) {
                        pokemon(data);
                    }
                }

            })
    }
}))




//     const div = document.createElement("div");
//     div.classList.add("pokemon");
//     div.innerHTML = `
//         <p class="pokemon-id-back">#${pokeId}</p>
//         <div class="imgPokemon">
//             <img src="${data.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
//         </div>
//         <div class="pokemonInfo">
// <div class="pokemonContainer">
//     <p class="pokemonId">#${pokeId}</p>
//     <h2 class="pokemonName">${data.name}</h2>
// </div>
// <div class="pokemonType">
//     ${types}
// </div>
// <div class="pokemonStats">
//     <p class="stat">${data.height*10}cm</p>
//     <p class="stat">${data.weight/10}kg</p>
// </div>
//         </div>
//     `;
//     pokemonList.append(div);
// }



// const getPokemon = (e) => {
//     const getName = document.querySelector("#pokemonName").value
//     const name = getName.toLowerCase()
//     const url = "https://pokeapi.co/api/v2"
//     fetch(`${url}/pokemon/${name}`)
//         .then((response) => response.json())
//         .then((data) => {
//             document.querySelector(".pokemonBox").innerHTML =
//             `
//             <div>
//             <img src="${data.sprites.other['official-artwork'].front_default}"
//             alt=${data.name}/>
//             </div>
//             <div class="pokemonInfo">
//             <h1>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
//             <p>Pokémon #${data.order}</p>
//             <p>type : ${data.types[0].type.name}</p>
//             <p>Species: ${data.species.name}
//             </div>
//             <div>
//             <p>
//             </p>
//             </div>
//             `;       
//         })
//         .catch((err) => {
//             console.log("Pokemon not found: ", err);
//         });
//     e.preventDefault();
// }



// document.querySelector('#search').addEventListener("click", getPokemon);

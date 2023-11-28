// declaration des variables
let nomDuPokemon = "";
let pokemon = ""
let score = 0
let blurValue = 12
const reponse = document.querySelector("#reponse")
document.getElementById("score").textContent = "Score = 0"


const getPokemon = (e) => {
    document.getElementById("imagepokemon").style.filter = `blur(${blurValue}px) saturate(0)`;
    let random = Math.random() * (151 - 1) + 1;
    const name = parseInt(random);
    const image = document.querySelector("#imagepokemon");
    // on fetch l'image dans l'api anglaise
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => response.json())
        .then((data) => {
            image.src = `${data.sprites.other['official-artwork'].front_default}`;
            image.alt = `${data.name}`;
            // on fetch le nom en francais dans l'api fr
            fetch(`https://pokebuildapi.fr/api/v1/pokemon/${name}`)
                .then((response) => response.json())
                .then((frenchData) => {
                    reponse.textContent = `${frenchData.name}`
                    nomDuPokemon = `${frenchData.name}`;
                    console.log(nomDuPokemon)
                }).catch((err) => {
                    e.preventDefault();
                    alert('Pokemon not found', err);
                });
        })
}
// on appelle la fonction 
getPokemon()

// alertes win
function afficherFenetreWin(message) {
    var win = document.getElementById('win');
    win.textContent = message;
    win.style.display = 'block';

    // Utiliser setTimeout pour masquer la fenêtre win après 2 secondes
    setTimeout(function () {
        win.style.display = 'none';
    }, 2000);
}
// alerte loose
function afficherFenetreLoose(message) {
    var loose = document.getElementById('loose');
    loose.textContent = message;
    loose.style.display = 'block';

    // Utiliser setTimeout pour masquer la fenêtre win après 2 secondes
    setTimeout(function () {
        loose.style.display = 'none';
    }, 1500);
}

function guessName() {
    // on recupere l'input de l'utilisateur
    const getname = document.querySelector("#pokemonName").value;
    // on le passe en minuscule
    let nom = getname.toLowerCase();
    // on passe le nom "officiel" du pokemon en minuscule
    pokemon = nomDuPokemon.toLowerCase()
    // on compare ces deux string entre elle
    if (nom === pokemon) {
        blurValue = 14
        afficherFenetreWin("Le pokemon a été ajouté à votre pokedex !");
        document.getElementById("imagepokemon").style.filter = 'none';
        score++
        document.getElementById("score").textContent = "Score = " + score;
        setTimeout(() => { getPokemon(); }, 3500)

    } else {
        afficherFenetreLoose("Raté");
        blurValue -= 2;
        document.getElementById("imagepokemon").style.filter = `blur(${blurValue}px) saturate(0)`;
        score--
        document.getElementById("score").textContent = "Score = " + score;
    }
}

let input = document.getElementById("pokemonName");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        guessName()
    }
});
document.querySelector('#search').addEventListener("click", guessName)


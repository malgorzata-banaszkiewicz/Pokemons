const pokeAPI = 'https://pokeapi.co/api/v2/pokemon';
const pokemonsData = fetch (pokeAPI);
const pokemonCards = document.querySelector('[data-pokemon-cards]');
const pokemonWebsite = document.querySelector('[data-pokemon-website]');
const progressItem = document.createElement('progress');

//function to create cards with pokemon names

function getPokeNames() {
pokemonsData.then( response => {
    if(!response.ok) {
        pokemonCards.innerText = 'Failed to load data...';
        progressItem.classList.add('disabled');
    }
progressItem.setAttribute('id', 'pokemons');
pokemonWebsite.prepend(progressItem);
pokemonCards.innerText = 'Loading...';
return response.json();
}).then (pokemons => {
    progressItem.classList.add('disabled');
    pokemonCards.innerText = '';
    let pokemonResults = pokemons.results;
    for(let i = 0; i < pokemonResults.length; i++) {
        pokemonsData.then(
        pokemon => {
            let pokemonName = pokemonResults[i].name;
            const pokemonDOMElement = document.createElement('div');
            pokemonDOMElement.setAttribute('id', i+1);
            pokemonDOMElement.innerText = pokemonName;
            pokemonDOMElement.classList.add('one-pokemon');
            pokemonCards.appendChild(pokemonDOMElement); 
        }
        ).catch((error) => {
            console.log('promise error', error);
            pokemonCards.innerText = 'Failed to load data...';
        });
    }
    return;
})};

//function to add photo and experience to every pokemon

function pokemonsDetails(id) {
    let onePoke = fetch (pokeAPI + '/' + id);
    onePoke.then (
        response => {
            return response.json();
        }).then(onePoke => {
            pokemonDOMElement = document.getElementById(id);
            let pokemonPower = document.createElement('div');
            pokemonPower.setAttribute('id', id + 'power');
            pokemonPower.innerText =  'Power: ' + onePoke.base_experience;
            let pokemonPicture = document.createElement('img');
            pokemonPicture.setAttribute('id', id);
            pokemonPicture.setAttribute('src', onePoke.sprites.front_shiny);
            pokemonDOMElement.prepend(pokemonPicture);
            pokemonDOMElement.appendChild(pokemonPower);
            pokemonPower.classList.add('disabled');
            return onePoke;
        }).catch((error) => {
            console.log('promise error', error);
            pokemonCards.innerText = 'Failed to load data...';
        });
    }

// filling the table with data 
getPokeNames()
for (let id = 1; id < 21; id++) {
pokemonsDetails(id);
}

//function showing single pokemon with it's power

function showCard(){
    event.stopPropagation();
    pokemonCards.classList.add('disabled');
    let bigCard = document.createElement('div');
    bigCard.classList.add('big-card');
    let pokePower = document.getElementById(event.target.id + 'power');
    pokePower.classList.remove('disabled');
    let wholeCard = document.getElementById(event.target.id);
    wholeCard.classList.remove('one-pokemon');
    wholeCard.classList.add('one-clicked-pokemon');
    bigCard.appendChild(wholeCard);
    pokemonWebsite.appendChild(bigCard);
   
    return;
}

//function to enable return to list of every pokemon

function returnToList() {
    if (pokemonCards.classList.contains('disabled')) {
        let clickedPokemon = document.querySelector('.one-clicked-pokemon');
        clickedPokemon.classList.remove('one-clicked-pokemon');
        clickedPokemon.classList.add('one-pokemon');
        clickedPokemon.classList.add('pokemon-already-viewed');
        pokemonCards.classList.remove('disabled');
        let bigCard = document.querySelector('.big-card');
        pokemonCards.appendChild(bigCard.firstChild);
        bigCard.remove();
    return;
}}

//adding event listener to wait for the click on certain pokemon
pokemonCards.addEventListener('click', showCard);

//adding event listener to wait for user to want to go back to the whole list
document.addEventListener('click', returnToList);

    

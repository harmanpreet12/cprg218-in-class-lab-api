// In script.js, reorder the code snippets in https://learn.sait.ca/d2l/le/content/688713/viewContent/16706483/View to get the page working like in video example in video-solution.mov file in this repo.

// fetch details of each category
async function fetchPokemonsByCategory(category) {
  // fetching all pokemon of particular category
  const response = await fetch(`https://pokeapi.co/api/v2/type/${category}`);
  const data = await response.json();
  // retuning array of all pokemon category
  return data.pokemon.map((p) => p.pokemon);
}

// Fetching details of each pokemon
async function fetchPokemonDetails(url) {
  if (url) {
    const response = await fetch(url);
    const pokemonResults = await response.json();

    // Returning the result
    return pokemonResults;
  }
}

// making dropdown options
function populateDropdown(dropdown, categories) {
  categories.forEach((category) => {
    // Creating a option tag
    const option = document.createElement('option');

    // adding value in option tag
    option.value = category.name;

    // adding text in option tag
    option.textContent = category.name;

    // appending option tag in dropdown
    dropdown.appendChild(option);
  });
}

// fetch pokemon categories
// I have made this function async because api will take time to fetch so we
// need to wait for api response that's why function is async
async function fetchPokemonCategories() {
  //fetching pokemon categories
  const response = await fetch('https://pokeapi.co/api/v2/type');

  // converting stringfy data to json using .json()
  const data = await response.json();

  // this data was returning me object which contains
  // count
  // next
  // previous
  // results
  // and we need to return results object
  console.log(data.results);
  return data.results;
}

function createPokemonCard(pokemon) {
  // Creating a div
  const card = document.createElement('div');

  // adding styles to it by giving it class
  card.classList.add('card');

  // creating img tag
  const img = document.createElement('img');

  // giving src abd alt attribute to img tag
  img.src = pokemon.sprites.front_default;
  img.alt = pokemon.name;

  // Creating h3 to display name of pokemon
  const name = document.createElement('h3');
  name.textContent = pokemon.name;

  // appending name and img tag in div
  card.appendChild(img);
  card.appendChild(name);

  // returning the created card
  return card;
}

// Function to display all pokemon cards
function displayPokemonCards(container, pokemons) {
  container.innerHTML = '';
  pokemons.forEach((pokemon) => {
    // Fetch Pokémon detail
    fetchPokemonDetails(pokemon.url)
      .then((details) => {
        // After getting the result, we need to create card and show details in it
        const card = createPokemonCard(details);

        // appending card to container
        container.appendChild(card);
      })
      .catch((error) =>
        console.error('Error fetching Pokémon details:', error)
      );
  });
}

function showDropdownAndDisplayResults() {
  // throw dom selecting select tag by id selector
  const dropdown = document.getElementById('pokemon-categories');

  // selection div which will contain all cards
  const cardsContainer = document.getElementById('pokemon-cards');

  // after fetching all categories, we need to add then in Dropdown
  fetchPokemonCategories()
    .then((categories) => {
      // After fetching all categories, we need to create dropdown
      populateDropdown(dropdown, categories);
    })
    .catch((error) =>
      console.error('Error fetching Pokémon categories:', error)
    );

  // adding change event listener to dropdown because every time pokemon change, we need to make call
  dropdown.addEventListener('change', () => {
    // Get dropdown value
    const category = dropdown.value;
    if (category) {
      // Fetch Pokémon based on dropdown category value
      fetchPokemonsByCategory(category)
        .then((pokemons) => displayPokemonCards(cardsContainer, pokemons))
        .catch((error) => console.error('Error fetching Pokémon:', error));
    } else {
      cardsContainer.innerHTML = '';
    }
  });
}

// Event listener for DOMContentLoaded to call the function
document.addEventListener('DOMContentLoaded', showDropdownAndDisplayResults);

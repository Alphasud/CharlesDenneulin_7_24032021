import recipes from './recipes.js';
import showRecipe from './displayRecipes.js';

const searchInput = document.querySelector('#searchInput');
const resultSection = document.querySelector('.result');

resultSection.innerHTML = showRecipe(recipes);

function searchQuery(string) {
  console.log(string);
  const recipeFilteredByName = recipes.filter((element) =>
    element.name.toLowerCase().normalize('NFC').includes(string)
  );
  console.log(recipeFilteredByName);
  resultSection.innerHTML = showRecipe(recipeFilteredByName);
}

searchInput.addEventListener('input', (e) => {
  const result = e.target.value.toLowerCase().normalize('NFC');
  if (result.length >= 3) {
    searchQuery(result);
  } else {
    resultSection.innerHTML = showRecipe(recipes);
  }
});

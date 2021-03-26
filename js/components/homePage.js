import recipes from './recipes.js';
import displayRecipe from './displayRecipes.js';
import normalizeData from './utils.js';
import searchQuery from './queryFunction.js';

const searchInput = document.querySelector('#searchInput');
const resultSection = document.querySelector('.result');

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

resultSection.innerHTML = displayRecipe(recipes);

searchInput.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  console.log(inputNormalized);
  if (inputNormalized.length >= 3) {
    const globalSearch = searchQuery(inputNormalized);
    if (globalSearch.length < 1) {
      resultSection.innerHTML = `<p class='error-result'>Pas de recettes à afficher pour cette recherche</p>`;
    } else {
      console.log(globalSearch);
      resultSection.innerHTML = displayRecipe(globalSearch);
    }
  } else {
    resultSection.innerHTML = displayRecipe(recipes);
  }
});

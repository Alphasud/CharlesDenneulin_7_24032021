import recipes from './recipes.js';
import displayRecipe from './displayRecipes.js';
import { normalizeData, passData, dropDown } from './utils.js';
import {
  searchQuery,
  displayIngredient,
  searchIngredient,
} from './queryFunction.js';

const searchInput = document.querySelector('#searchInput');
const resultSection = document.querySelector('.result');
const form = document.querySelector('#form');
const searchInputIngredient = document.querySelector('.search__filter__input');
const listIngredient = document.querySelector('#listIngredient');
let dropDownContent;

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

/// /DISPLAY ALL RECIPE ON PAGE LOAD/////
resultSection.innerHTML = displayRecipe(recipes);
form.reset();
dropDown();

/// /LISTEN TO THE FIRST INPUT/////
searchInput.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  console.log(inputNormalized);

  if (inputNormalized.length >= 3) {
    const globalSearch = searchQuery(inputNormalized);
    if (globalSearch.length < 1) {
      resultSection.innerHTML = `<p class='error-result'>Pas de recettes à afficher pour cette recherche.</p>`;
      listIngredient.innerHTML = '';
    } else {
      console.log(globalSearch);
      resultSection.innerHTML = displayRecipe(globalSearch);
      const ingredientList = displayIngredient(globalSearch).join('');
      listIngredient.innerHTML = ingredientList;
      dropDownContent = passData(ingredientList);
    }
  } else {
    resultSection.innerHTML = displayRecipe(recipes);
    listIngredient.innerHTML = '';
  }
});

/// /LISTEN TO THE INGREDIENT INPUT/////
searchInputIngredient.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  if (inputNormalized.length < 1) {
    listIngredient.innerHTML = dropDownContent;
  } else {
    searchIngredient(inputNormalized);
  }
});

/// /LISTEN TO THE INGREDIENT CLICK/////
const filterElement = document.querySelector('.search__filter__element');
filterElement.addEventListener('click', () => {
  const list = document.querySelectorAll('.custom-option');
  console.log('Click');
  if (list.length > 0) {
    filterElement.classList.toggle('open');
    listIngredient.innerHTML = dropDownContent;
    searchInputIngredient.value = '';
    searchInputIngredient.focus();
  }
});

/// CLOSE DOPDOWN MENU WHEN USER CLICK ELSEWHERE//////
document.addEventListener('click', (event) => {
  const advancedSearch = document.querySelector('.search__filter__element');
  if (!advancedSearch.contains(event.target)) {
    // If the node does not contain .custom-select (meaning the class is currently .custom-select-open)
    advancedSearch.classList.remove('open'); // then 'open' is removed.
  }
});

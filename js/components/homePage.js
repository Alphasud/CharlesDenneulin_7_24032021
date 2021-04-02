import recipes from './recipes.js';
import displayRecipe from './displayRecipes.js';
import { normalizeData } from './utils.js';
import {
  searchQuery,
  displayIngredients,
  displayAppliances,
  displayDevices,
} from './queryFunction.js';
import SearchField from './searchField.js';

const searchInput = document.querySelector('#searchInput');
const resultSection = document.querySelector('.result');
const form = document.querySelector('#form');
const searchFilter = document.querySelector('.search__filter');
let globalSearch;

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});
/// DISPLAY SEARCH BUTTON///
const advancedSearchField = new SearchField();

const deviceAdvancedSearch = advancedSearchField.createSearchField(
  'Ustenciles'
);
searchFilter.insertAdjacentHTML('afterbegin', deviceAdvancedSearch);

const applianceAdvancedSearch = advancedSearchField.createSearchField(
  'Appareils'
);
searchFilter.insertAdjacentHTML('afterbegin', applianceAdvancedSearch);

const ingredientsAdvancedSearch = advancedSearchField.createSearchField(
  'Ingredients'
);
searchFilter.insertAdjacentHTML('afterbegin', ingredientsAdvancedSearch);

/// /DISPLAY ALL RECIPE ON PAGE LOAD/////
resultSection.innerHTML = displayRecipe(recipes);
form.reset();

/// /LISTEN TO THE MAIN INPUT/////
const listIngredient = document.querySelector(
  '.search__filter__list.--Ingredients'
);
const listAppliance = document.querySelector(
  '.search__filter__list.--Appareils'
);
const listDevice = document.querySelector('.search__filter__list.--Ustenciles');

searchInput.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);

  if (inputNormalized.length >= 3) {
    globalSearch = searchQuery(inputNormalized);
    if (globalSearch.length < 1) {
      resultSection.innerHTML = `<p class='error-result'>Pas de recettes à afficher pour cette recherche.</p>`;
      listIngredient.innerHTML = '';
      listAppliance.innerHTML = '';
      listDevice.innerHTML = '';
    } else {
      resultSection.innerHTML = displayRecipe(globalSearch);
      displayIngredients(globalSearch, '');
      displayAppliances(globalSearch, '');
      displayDevices(globalSearch, '');
    }
  } else {
    resultSection.innerHTML = displayRecipe(recipes);
    listIngredient.innerHTML = '';
    listAppliance.innerHTML = '';
    listDevice.innerHTML = '';
  }
});

/// /LISTEN TO THE INGREDIENT ADVANCED SEARCH INPUT/////
const searchInputIngredient = document.querySelector('#IngredientsInput');
searchInputIngredient.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  displayIngredients(globalSearch, inputNormalized);
});

/// /LISTEN TO THE APPLIANCES ADVANCED SEARCH INPUT/////
const searchInputAppliance = document.querySelector('#AppareilsInput');
searchInputAppliance.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  displayAppliances(globalSearch, inputNormalized);
});

/// /LISTEN TO THE DEVICES ADVANCED SEARCH INPUT/////
const searchInputDevice = document.querySelector('#UstencilesInput');
searchInputDevice.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  displayDevices(globalSearch, inputNormalized);
});

const articleIngredient = document.querySelector('.article-Ingredients');
const articleAppliance = document.querySelector('.article-Appareils');
const articleDevice = document.querySelector('.article-Ustenciles');
/// /LISTEN TO THE INGREDIENT ADVANCED SEARCH BUTTON CLICK/////
const filterElementIngredient = document.querySelector(
  '.search__filter__element.--Ingredients'
);

filterElementIngredient.addEventListener('click', () => {
  const listIngr = document.querySelectorAll(
    '.search__filter__list__item.--Ingredients'
  );
  if (listIngr.length > 0) {
    articleIngredient.classList.toggle('larger');
    filterElementIngredient.classList.toggle('open');
    articleAppliance.classList.remove('larger');
    articleDevice.classList.remove('larger');
    searchInputIngredient.value = '';
    searchInputIngredient.focus();
    displayIngredients(globalSearch, '');
  }
});

/// /LISTEN TO THE APPLIANCES ADVANCED SEARCH BUTTON CLICK/////
const filterElementAppliance = document.querySelector(
  '.search__filter__element.--Appareils'
);

filterElementAppliance.addEventListener('click', () => {
  const listApp = document.querySelectorAll(
    '.search__filter__list__item.--Appareils'
  );
  if (listApp.length > 0) {
    articleAppliance.classList.toggle('larger');
    filterElementAppliance.classList.toggle('open');
    articleIngredient.classList.remove('larger');
    articleDevice.classList.remove('larger');
    searchInputAppliance.value = '';
    searchInputAppliance.focus();
    displayAppliances(globalSearch, '');
  }
});

/// /LISTEN TO THE DEVICES ADVANCED SEARCH BUTTON CLICK/////
const filterElementDevice = document.querySelector(
  '.search__filter__element.--Ustenciles'
);
filterElementDevice.addEventListener('click', () => {
  const listDev = document.querySelectorAll(
    '.search__filter__list__item.--Ustenciles'
  );
  if (listDev.length > 0) {
    articleDevice.classList.toggle('larger');
    filterElementDevice.classList.toggle('open');
    articleIngredient.classList.remove('larger');
    articleAppliance.classList.remove('larger');
    searchInputDevice.value = '';
    searchInputDevice.focus();
    displayDevices(globalSearch, '');
  }
});

/// CLOSE DOPDOWN MENU WHEN USER CLICK ELSEWHERE//////
/* const body = document.querySelector('body');
body.addEventListener('click', (event) => {
  const advancedSearch = document.querySelectorAll('article');
  for (const element of advancedSearch) {
    if (!element.contains(event.target)) {
      element.classList.remove('larger');
      const list = document.querySelectorAll('.search__filter__element');
      for (const el of list) {
        el.classList.remove('open');
      }
    }
  }
});
*/

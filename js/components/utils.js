import SearchField from './searchField.js';
import displayRecipe from './displayRecipes.js';
import recipes from './recipes.js';

///////////////NORMALIZE DATAS/////////////////////
function normalizeData(string) {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

///////////////REMOVE DUPLICATE/////////////////////
function removeDuplicate(array) {
  const duplicateItems = [];
  const noDuplicate = array.filter((element) => {
    if (element in duplicateItems) {
      return false;
    }
    duplicateItems[element] = true;
    return true;
  });
  return noDuplicate;
}

///////////////DISPLAY ELEMENTS/////////////////////
function displayElements() {
  const resultSection = document.querySelector('.result');
  const form = document.querySelector('#form');
  const searchFilter = document.querySelector('.search__filter');

  //DISPLAY SEARCH BUTTON:
  const advancedSearchField = new SearchField();

  const deviceAdvancedSearch = advancedSearchField.createSearchField(
    'ustenciles'
  );
  searchFilter.insertAdjacentHTML('afterbegin', deviceAdvancedSearch);

  const applianceAdvancedSearch = advancedSearchField.createSearchField(
    'appareils'
  );
  searchFilter.insertAdjacentHTML('afterbegin', applianceAdvancedSearch);

  const ingredientsAdvancedSearch = advancedSearchField.createSearchField(
    'ingredients'
  );
  searchFilter.insertAdjacentHTML('afterbegin', ingredientsAdvancedSearch);

  //DISPLAY ALL RECIPE ON PAGE LOAD:
  resultSection.innerHTML = displayRecipe(recipes);
  form.reset();
}

////////CLOSE EACH DROPDOWN MENUS WHEN USER CLICK ELESEWHERE///////
function closeSearchFieldWhenUserClickElswhere() {
  const advancedIngredientSearch = document.querySelector(
    '.article-ingredients'
  );
  if (advancedIngredientSearch !== null) {
    document.addEventListener('click', function (event) {
      if (!advancedIngredientSearch.contains(event.target)) {
        advancedIngredientSearch.classList.remove('larger');
        const searchFilterIngredients = document.querySelector(
          '.search__filter__element.ingredients'
        );
        searchFilterIngredients.classList.remove('open');
      }
    });
  }

  const advancedApplianceSearch = document.querySelector('.article-appareils');
  if (advancedApplianceSearch !== null) {
    document.addEventListener('click', function (event) {
      if (!advancedApplianceSearch.contains(event.target)) {
        advancedApplianceSearch.classList.remove('larger');
        const searchFilterAppliances = document.querySelector(
          '.search__filter__element.appareils'
        );
        searchFilterAppliances.classList.remove('open');
      }
    });
  }

  const advancedDeviceSearch = document.querySelector('.article-ustenciles');
  if (advancedDeviceSearch !== null) {
    document.addEventListener('click', function (event) {
      if (!advancedDeviceSearch.contains(event.target)) {
        advancedDeviceSearch.classList.remove('larger');
        const searchFilterDevices = document.querySelector(
          '.search__filter__element.ustenciles'
        );
        searchFilterDevices.classList.remove('open');
      }
    });
  }
}

export {
  normalizeData,
  removeDuplicate,
  closeSearchFieldWhenUserClickElswhere,
  displayElements,
};

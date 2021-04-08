import SearchField from './searchField.js';
import displayRecipe from './displayRecipes.js';
import recipes from './recipes.js';

function normalizeData(string) {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

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

function displayElements() {
  const resultSection = document.querySelector('.result');
  const form = document.querySelector('#form');
  const searchFilter = document.querySelector('.search__filter');
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
}

function observeChangesOnTagSection() {
  const tagSection = document.querySelector('.search__tags');
  const observer = new MutationObserver(() => {
    const tags = document.querySelectorAll('.search__tags__item');
    if (tags !== null) {
      for (let i = 0; i < tags.length; i++) {
        const closeButton = document.querySelectorAll('#close');
        closeButton[i].addEventListener('click', () => {
          tags[i].remove();
          
        });
      }
    }
  });
  observer.observe(tagSection, { subtree: true, childList: true });
}

function closeSearchFieldWhenUserClickElswhere() {
  /// CLOSE DOPDOWN MENU WHEN USER CLICK ELSEWHERE//////
  const advancedIngredientSearch = document.querySelector(
    '.article-Ingredients'
  );
  if (advancedIngredientSearch !== null) {
    document.addEventListener('click', function (event) {
      if (!advancedIngredientSearch.contains(event.target)) {
        advancedIngredientSearch.classList.remove('larger');
        const searchFilterIngredients = document.querySelector(
          '.search__filter__element.--Ingredients'
        );
        searchFilterIngredients.classList.remove('open');
      }
    });
  }

  const advancedApplianceSearch = document.querySelector('.article-Appareils');
  if (advancedApplianceSearch !== null) {
    document.addEventListener('click', function (event) {
      if (!advancedApplianceSearch.contains(event.target)) {
        advancedApplianceSearch.classList.remove('larger');
        const searchFilterAppliances = document.querySelector(
          '.search__filter__element.--Appareils'
        );
        searchFilterAppliances.classList.remove('open');
      }
    });
  }

  const advancedDeviceSearch = document.querySelector('.article-Ustenciles');
  if (advancedDeviceSearch !== null) {
    document.addEventListener('click', function (event) {
      if (!advancedDeviceSearch.contains(event.target)) {
        advancedDeviceSearch.classList.remove('larger');
        const searchFilterDevices = document.querySelector(
          '.search__filter__element.--Ustenciles'
        );
        searchFilterDevices.classList.remove('open');
      }
    });
  }
}

export {
  normalizeData,
  removeDuplicate,
  observeChangesOnTagSection,
  closeSearchFieldWhenUserClickElswhere,
  displayElements,
};

import recipes from './recipes.js';
import { normalizeData, removeDuplicate } from './utils.js';

function searchQuery(input) {
  /// ///FITLER BY NAME
  const searchByName = recipes.filter((element) => {
    const elementNormalized = normalizeData(element.name);
    return elementNormalized.includes(input);
  });

  /// ///FILTER BY INGREDIENTS
  const recipesIngredients = recipes.map((element) => {
    const { ingredients } = element;
    const allIngredient = ingredients.map((el) => el.ingredient);
    return allIngredient.filter((item) => {
      const elementNormalized = normalizeData(item);
      return elementNormalized.includes(input);
    });
  });
  const matchingElementIndex = [];
  const isNotEmpty = (element) => element.length > 0;
  for (const item of recipesIngredients) {
    if (item.findIndex(isNotEmpty) === 0) {
      matchingElementIndex.push(recipesIngredients.indexOf(item));
    }
  }
  const searchByIngredient = [];
  for (const i of matchingElementIndex) {
    searchByIngredient.push(recipes[i]);
  }
  /// ///FILTER BY DESCRIPTION
  const searchByDescription = recipes.filter((element) => {
    const elementNormalized = normalizeData(element.description);
    return elementNormalized.includes(input);
  });

  /// ///REMOVE DUPLICATE
  let globalSearch = searchByName.concat(
    searchByIngredient,
    searchByDescription
  );

  const duplicateItems = [];
  globalSearch = globalSearch.filter((element) => {
    if (element.id in duplicateItems) {
      return false;
    }
    duplicateItems[element.id] = true;
    return true;
  });

  return globalSearch;
}

function selectIngredientTag(arr) {
  for (const item of arr) {
    item.addEventListener('click', () => {
      const tagSection = document.querySelector('.search__tags');
      const tag = document.createElement('span');
      tag.classList = 'search__tags__item --Ingredients';
      tag.innerHTML = item.innerHTML;
      tag.insertAdjacentHTML(
        'beforeend',
        '<i id="close" class="far fa-times-circle"></i>'
      );
      tagSection.insertAdjacentElement('afterbegin', tag);
      const closeButton = document.getElementById('close');
      closeButton.addEventListener('click', () => {
        tag.remove();
      });
    });
  }
}

function displayIngredients(arr, string) {
  const arrayOfrecipes = arr.flatMap((element) => element.ingredients);
  const arrayOfIngredients = arrayOfrecipes.flatMap(
    (element) => element.ingredient
  );
  if (string !== '') {
    const arrayOfIngredient = arrayOfIngredients.filter((element) => {
      const elementNormalized = normalizeData(element);
      return elementNormalized.includes(string);
    });
    const ingredientSearchResultWithoutDuplicate = removeDuplicate(
      arrayOfIngredient
    );
    const resultDisplayed = ingredientSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --Ingredients'>${element}</li>`
      )
      .join('');

    if (resultDisplayed.length > 0) {
      const listIngredient = document.querySelector('.search__filter__list');
      listIngredient.innerHTML = resultDisplayed;
      const result = document.querySelectorAll(
        '.search__filter__list__item.--Ingredients'
      );
      selectIngredientTag(result);
    } else {
      const listIngredient = document.querySelector('.search__filter__list');
      listIngredient.innerHTML = `<li class='search__filter__list__item__error --Ingredients'>Pas de résultats</li>`;
    }
  } else {
    const arrayOfIngredient = arrayOfIngredients.map((element) => element);
    const ingredientSearchResultWithoutDuplicate = removeDuplicate(
      arrayOfIngredient
    );
    const resultDisplayed = ingredientSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --Ingredients'>${element}</li>`
      )
      .join('');

    const listIngredient = document.querySelector(
      '.search__filter__list.--Ingredients'
    );
    listIngredient.innerHTML = resultDisplayed;
    const result = document.querySelectorAll(
      '.search__filter__list__item.--Ingredients'
    );
    selectIngredientTag(result);
  }
}

function displayAppliances(arr, string) {
  const arrayOfAppliances = arr.flatMap((element) => element.appliance);
  if (string !== '') {
    const arrayOfAppliancesFiltered = arrayOfAppliances.filter((element) => {
      const elementNormalized = normalizeData(element);
      return elementNormalized.includes(string);
    });
    const applianceSearchResultWithoutDuplicate = removeDuplicate(
      arrayOfAppliancesFiltered
    );
    const resultDisplayed = applianceSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --Appareils'>${element}</li>`
      )
      .join('');
    if (resultDisplayed.length > 0) {
      const listAppliance = document.querySelector(
        '.search__filter__list.--Appareils'
      );
      listAppliance.innerHTML = resultDisplayed;
      const result = document.querySelectorAll(
        '.search__filter__list__item.--Appareils'
      );
      selectIngredientTag(result);
    } else {
      const listAppliance = document.querySelector(
        '.search__filter__list.--Appareils'
      );
      listAppliance.innerHTML = `<li class="search__filter__list__item__error --Appareils">
              Pas de résultats
            </li>`;
    }
  } else {
    arrayOfAppliances.map((element) => element);
    const applianceSearchResultWithoutDuplicate = removeDuplicate(
      arrayOfAppliances
    );
    const resultDisplayed = applianceSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --Appareils'>${element}</li>`
      )
      .join('');

    const listAppliance = document.querySelector(
      '.search__filter__list.--Appareils'
    );
    listAppliance.innerHTML = resultDisplayed;
    const result = document.querySelectorAll(
      '.search__filter__list__item.--Appareils'
    );
    selectIngredientTag(result);
  }
}

function displayDevices(arr, string) {
  const arrayOfDevices = arr.flatMap((element) => element.devices);
  if (string !== '') {
    const arrayOfDevicesFiltered = arrayOfDevices.filter((element) => {
      const elementNormalized = normalizeData(element);
      return elementNormalized.includes(string);
    });
    const deviceSearchResultWithoutDuplicate = removeDuplicate(
      arrayOfDevicesFiltered
    );
    const resultDisplayed = deviceSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --Ustenciles'>${element}</li>`
      )
      .join('');
    if (resultDisplayed.length > 0) {
      const listDevice = document.querySelector(
        '.search__filter__list.--Ustenciles'
      );
      listDevice.innerHTML = resultDisplayed;
      const result = document.querySelectorAll(
        '.search__filter__list__item.--Ustenciles'
      );
      selectIngredientTag(result);
    } else {
      const listDevice = document.querySelector(
        '.search__filter__list.--Ustenciles'
      );
      listDevice.innerHTML = `<li class="search__filter__list__item__error --Ustenciles">
              Pas de résultats
            </li>`;
    }
  } else {
    arrayOfDevices.map((element) => element);
    const deviceSearchResultWithoutDuplicate = removeDuplicate(arrayOfDevices);
    const resultDisplayed = deviceSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --Ustenciles'>${element}</li>`
      )
      .join('');

    const listDevice = document.querySelector(
      '.search__filter__list.--Ustenciles'
    );
    listDevice.innerHTML = resultDisplayed;
    const result = document.querySelectorAll(
      '.search__filter__list__item.--Ustenciles'
    );
    selectIngredientTag(result);
  }
}

export {
  searchQuery,
  displayIngredients,
  selectIngredientTag,
  displayAppliances,
  displayDevices,
};

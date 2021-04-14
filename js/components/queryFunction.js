import recipes from './recipes.js';
import { normalizeData, removeDuplicate } from './utils.js';

///////////////MAIN SEARCH : SEARCH IN NAME, INGREDIENTS, DESCRIPTION/////////////////////

function algoTwo(arr, input) {
  const nameResult = [];
  const ingredientResult = [];
  const descriptionResult = [];

  for (let i = 0; i < arr.length; i++) {
    //FILTER BY NAME :
    const nameNormalized = normalizeData(arr[i].name);
    nameNormalized.includes(input) ? nameResult.push(arr[i]) : '';

    //FILTER BY INGREDIENTS:
    const allIngredients = arr[i].ingredients;
    for (let z = 0; z < allIngredients.length; z++) {
      const ingredientNormalized = normalizeData(allIngredients[z].ingredient);
      ingredientNormalized.includes(input) ? ingredientResult.push(arr[i]) : '';
    }

    //Filter BY DESCRIPTION:
    const descriptionNormalized = normalizeData(arr[i].description);
    descriptionNormalized.includes(input) ? descriptionResult.push(arr[i]) : '';
 
  }

  const result = nameResult.concat(ingredientResult, descriptionResult);
  const resultWithNoDuplicate = [...new Set(result)];
  return resultWithNoDuplicate;
}
///////////////DISPLAY INGREDIENTS, APPLIANCE, DEVICES IN ADVANCED SEARCH/////////////////////
function displayListElement(arr, type, input, name ) {
    const arrayOfDevices = arr.flatMap((element) => element[type]);
  if (input !== '') {
    const arrayOfDevicesFiltered = arrayOfDevices.filter((element) => {
      const elementNormalized = normalizeData(element);
      return elementNormalized.includes(input);
    });
    const deviceSearchResultWithoutDuplicate = removeDuplicate(
      arrayOfDevicesFiltered
    );
    const resultDisplayed = deviceSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --${name}'>${element}</li>`
      )
      .join('');
    if (resultDisplayed.length > 0) {
      const listDevice = document.querySelector(
        `.search__filter__list.--${name}`
      );
      listDevice.innerHTML = resultDisplayed;
      const result = document.querySelectorAll(
        `.search__filter__list__item.--${name}`
      );
    } else {
      const listDevice = document.querySelector(
        `.search__filter__list.--${name}`
      );
      listDevice.innerHTML = `<li class="search__filter__list__item__error --${name}">
              Pas de résultats
            </li>`;
    }
  } else {
    arrayOfDevices.map((element) => element);
    const deviceSearchResultWithoutDuplicate = removeDuplicate(arrayOfDevices);
    const resultDisplayed = deviceSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --${name}'>${element}</li>`
      )
      .join('');

    const listDevice = document.querySelector(
      `.search__filter__list.--${name}`
    );
    listDevice.innerHTML = resultDisplayed;
    const result = document.querySelectorAll(
      `.search__filter__list__item.--${name}`
    );
  }
  
}


///////////////SEARCH IN INGREDIENTS/////////////////////
function searchIngredient(arr, input) {
  const recipesIngredients = arr.map((element) => {
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
    searchByIngredient.push(arr[i]);
  }

   //REMOVE DUPLICATE
    let search = searchByIngredient;

  const duplicateItems = [];
  search = search.filter((element) => {
    if (element.id in duplicateItems) {
      return false;
    }
    duplicateItems[element.id] = true;
    return true;
  });
  return search;
  
}

///////////////SEARCH IN APPLIANCES/////////////////////
function searchAppliance(arr, input) {
    const recipesAppliances = arr.filter((element) => {
        const allApliances = element.appliance;
        return normalizeData(allApliances).includes(input);  
    });
  //REMOVE DUPLICATE
  let search = recipesAppliances;

  const duplicateItems = [];
  search = search.filter((element) => {
    if (element.id in duplicateItems) {
      return false;
    }
    duplicateItems[element.id] = true;
    return true;
  });
  return search;
}

///////////////SEARCH IN DEVICE/////////////////////
function searchDevice(arr, input) {
    const recipesDevices = arr.map((element) => {
      const { devices } = element;
      return devices.filter((item) => {
        const elementNormalized = normalizeData(item);
        return elementNormalized.includes(input);
      });
    });

    const matchingElementIndex = [];
    const isNotEmpty = (element) => element.length > 0;
    for (const item of recipesDevices) {
      if (item.findIndex(isNotEmpty) === 0) {
        matchingElementIndex.push(recipesDevices.indexOf(item));
      }
    }
    const searchByDevices = [];
    for (const i of matchingElementIndex) {
      searchByDevices.push(arr[i]);
    }
   
  //REMOVE DUPLICATE
  let search = searchByDevices;
  const duplicateItems = [];
  search = search.filter((element) => {
    if (element.id in duplicateItems) {
      return false;
    }
    duplicateItems[element.id] = true;
    return true;
  });
  return search;
}


export { searchQuery, displayListElement, searchIngredient, searchAppliance, searchDevice, algoTwo };

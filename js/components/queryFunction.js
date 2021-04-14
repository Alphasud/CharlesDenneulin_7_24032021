import recipes from './recipes.js';
import { normalizeData, removeDuplicate } from './utils.js';

///////////////MAIN SEARCH : SEARCH IN NAME, INGREDIENTS, DESCRIPTION/////////////////////
function searchQuery(arr, input) {
  //FITLER BY NAME:
  const searchByName = arr.filter((element) => {
    const elementNormalized = normalizeData(element.name);
    return elementNormalized.includes(input);
  });
  
  //FILTER BY INGREDIENTS:
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
    searchByIngredient.push(recipes[i]);
  }
  //FILTER BY DESCRIPTION:
  const searchByDescription = arr.filter((element) => {
    const elementNormalized = normalizeData(element.description);
    return elementNormalized.includes(input);
  });

 
  let search = searchByName.concat(
    searchByIngredient,
    searchByDescription
  );

  //REMOVE DUPLICATE:
  const searchWithNoDuplicate = [...new Set(search)];
  return searchWithNoDuplicate.sort();
}

///////////////DISPLAY INGREDIENTS, APPLIANCE, DEVICES IN ADVANCED SEARCH/////////////////////
function displayListElement(arr, type, input, name ) {
  const arrayOfElement = arr.flatMap((element) => element[type]);
  arrayOfElement.sort();
  if (input !== '') {
    const arrayOfElementFiltered = arrayOfElement.filter((element) => {
      const elementNormalized = normalizeData(element);
      return elementNormalized.includes(input);
    });
    const elementSearchResultWithoutDuplicate = removeDuplicate(
      arrayOfElementFiltered
    );
    const resultDisplayed = elementSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --${name}'>${element}</li>`
      )
      .join('');
    if (resultDisplayed.length > 0) {
      const listElement = document.querySelector(
        `.search__filter__list.--${name}`
      );
      listElement.innerHTML = resultDisplayed;
      
    } else {
      const listElement = document.querySelector(
        `.search__filter__list.--${name}`
      );
      listElement.innerHTML = `<li class="search__filter__list__item__error --${name}">
              Pas de résultats
            </li>`;
    }
  } else {
    arrayOfElement.map((element) => element);
    const elementSearchResultWithoutDuplicate = removeDuplicate(arrayOfElement);
    const resultDisplayed = elementSearchResultWithoutDuplicate
      .map(
        (element) =>
          `<li class='search__filter__list__item  --${name}'>${element}</li>`
      )
      .join('');

    const listElement = document.querySelector(
      `.search__filter__list.--${name}`
    );
    listElement.innerHTML = resultDisplayed;
    
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
    const searchWithNoDuplicate = [...new Set(search)];
    return searchWithNoDuplicate;
}

///////////////SEARCH IN APPLIANCES/////////////////////
function searchAppliance(arr, input) {
    const recipesAppliances = arr.filter((element) => {
        const allApliances = element.appliance;
        return normalizeData(allApliances).includes(input);  
    });
  //REMOVE DUPLICATE
  let search = recipesAppliances;
  const searchWithNoDuplicate = [...new Set(search)];
  return searchWithNoDuplicate;
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
  const searchWithNoDuplicate = [...new Set(search)];
  return searchWithNoDuplicate;
}


export { searchQuery, displayListElement, searchIngredient, searchAppliance, searchDevice };

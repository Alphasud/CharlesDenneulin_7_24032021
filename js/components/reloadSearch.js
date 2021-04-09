import { searchQuery, displayListElement, searchIngredient, searchAppliance, searchDevice } from './queryFunction.js'
import displayRecipe from './displayRecipes.js';
import recipes from './recipes.js'
import { normalizeData } from './utils.js'

function reloadSearch(arr1, arr2, arr3, inputNormalized) {
    const resultSection = document.querySelector('.result');
    let globalSearch;
    let globalAppliance;
    let globalIngredient;
    let globalDevice;
    
  if (arr1.length > 0) {
    console.log('ARR1 > 0');
     globalSearch = searchQuery(recipes, inputNormalized);
    arr1.forEach((element) => {
      const itemNormalized = normalizeData(element);
      globalSearch = searchIngredient(globalSearch, itemNormalized);
      console.log(globalSearch);
      resultSection.innerHTML = displayRecipe(globalSearch);
      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      globalIngredient = globalIngredient.filter(
        (elem) => elem.ingredient !== element
      );
      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');

      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'Appareils');

      globalDevice = globalSearch;
      displayListElement(globalDevice, 'devices', '', 'Ustenciles');
    });
  } else if (arr2.length > 0) {
    console.log('ARR2 > 0');
    globalSearch = searchQuery(recipes, inputNormalized);
    arr2.forEach((element) => {
      const itemNormalized = normalizeData(element);
      globalSearch = searchAppliance(globalSearch, itemNormalized);
      console.log(globalSearch);
      resultSection.innerHTML = displayRecipe(globalSearch);
      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      globalIngredient = globalIngredient.filter(
        (elem) => elem.ingredient !== element
      );
      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');

      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'Appareils');

      globalDevice = globalSearch;
      displayListElement(globalDevice, 'devices', '', 'Ustenciles');
    });
  } else if (arr3.length > 0) {
    console.log('ARR3 > 0');
    globalSearch = searchQuery(recipes, inputNormalized);
    arr3.forEach((element) => {
      const itemNormalized = normalizeData(element);
      globalSearch = searchDevice(globalSearch, itemNormalized);
      console.log(globalSearch);
      resultSection.innerHTML = displayRecipe(globalSearch);
      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      globalIngredient = globalIngredient.filter(
        (elem) => elem.ingredient !== element
      );
      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');

      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'Appareils');

      globalDevice = globalSearch;
      displayListElement(globalDevice, 'devices', '', 'Ustenciles');
    });
  } else {
    console.log('ELSE');
    globalSearch = searchQuery(recipes, inputNormalized);
    console.log(globalSearch);
    resultSection.innerHTML = displayRecipe(globalSearch);
    globalIngredient = globalSearch.flatMap((element) => element.ingredients);
    globalIngredient = globalIngredient.filter(
      (element) => element.ingredient !== inputNormalized
    );
    displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');

    globalAppliance = globalSearch;
    displayListElement(globalAppliance, 'appliance', '', 'Appareils');

    globalDevice = globalSearch;
    displayListElement(globalDevice, 'devices', '', 'Ustenciles');
  }
}

export { reloadSearch };
import {
  algoTwo,
  displayListElement,
  searchIngredient,
  searchAppliance,
  searchDevice,
} from './queryFunction.js';
import displayRecipe from './displayRecipes.js';
import recipes from './recipes.js';
import { normalizeData } from './utils.js';

///////////////REALOAD THE RECIPES DEPENDING ON TAGS///////////////////
function reloadSearch(arr1, arr2, arr3, inputNormalized, globalSearch) {
  const resultSection = document.querySelector('.result');

  let globalAppliance;
  let globalIngredient;
  let globalDevice;
  let device;

  if (arr1.length > 0) {
    console.log('ARR1 > 0');
    globalSearch = algoTwo(recipes, inputNormalized);
    arr1.forEach((element) => {
      const itemNormalized = normalizeData(element);
      globalSearch = searchIngredient(globalSearch, itemNormalized);
      resultSection.innerHTML = displayRecipe(globalSearch);
      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      for (let ingredient of arr1) {
        globalIngredient = globalIngredient.filter(
          (elem) => elem.ingredient !== ingredient
        );
      }
      displayListElement(globalIngredient, 'ingredient', '', 'ingredients');

      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'appareils');

      device = globalSearch.flatMap((element) => element.devices);
      for (let i of arr3) {
        device = device.filter((element) => element !== i);
      }
      globalDevice = [{ devices: device }];
      displayListElement(globalDevice, 'devices', '', 'ustenciles');
    });
  }
  if (arr2.length > 0) {
    console.log('ARR2 > 0');
    globalSearch = algoTwo(recipes, inputNormalized);
    arr2.forEach((element) => {
      const itemNormalized = normalizeData(element);
      globalSearch = searchAppliance(globalSearch, itemNormalized);
      resultSection.innerHTML = displayRecipe(globalSearch);

      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      for (let ingredient of arr1) {
        globalIngredient = globalIngredient.filter(
          (elem) => elem.ingredient !== ingredient
        );
      }
      displayListElement(globalIngredient, 'ingredient', '', 'ingredients');

      globalAppliance = globalSearch.flatMap((element) => element.appliance);
      globalAppliance = globalAppliance.filter((elem) => elem !== element);
      displayListElement(globalAppliance, 'appliance', '', 'appareils');

      device = globalSearch.flatMap((element) => element.devices);
      for (let i of arr3) {
        device = device.filter((element) => element !== i);
      }
      globalDevice = [{ devices: device }];
      displayListElement(globalDevice, 'devices', '', 'ustenciles');
    });
  }
  if (arr3.length > 0) {
    console.log('ARR3 > 0');
    globalSearch = algoTwo(recipes, inputNormalized);
    arr3.forEach((element) => {
      const itemNormalized = normalizeData(element);
      globalSearch = searchDevice(globalSearch, itemNormalized);
      resultSection.innerHTML = displayRecipe(globalSearch);

      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      for (let ingredient of arr1) {
        globalIngredient = globalIngredient.filter(
          (elem) => elem.ingredient !== ingredient
        );
      }
      displayListElement(globalIngredient, 'ingredient', '', 'ingredients');

      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'appareils');

      device = globalSearch.flatMap((element) => element.devices);
      for (let i of arr3) {
        device = device.filter((element) => element !== i);
      }
      globalDevice = [{ devices: device }];
      displayListElement(globalDevice, 'devices', '', 'ustenciles');
    });
  }

  if (arr1.length === 0 && arr2.length === 0 && arr3.length === 0) {
    console.log('ELSE');
    globalSearch = algoTwo(recipes, inputNormalized);
    resultSection.innerHTML = displayRecipe(globalSearch);
    globalIngredient = globalSearch.flatMap((element) => element.ingredients);
    globalIngredient = globalIngredient.filter(
      (element) => element.ingredient !== inputNormalized
    );
    displayListElement(globalIngredient, 'ingredient', '', 'ingredients');

    globalAppliance = globalSearch;
    displayListElement(globalAppliance, 'appliance', '', 'appareils');

    globalDevice = globalSearch;
    displayListElement(globalDevice, 'devices', '', 'ustenciles');
  }

  return globalSearch;
}

export { reloadSearch };

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

function displayIngredient(arr) {
  const ingredientResult = arr.flatMap((element) => {
    const allIngredients = element.ingredients;

    const ingredients = allIngredients.map((el) => {
      const { ingredient } = el;
      return `<span class="custom-option --ingredient">${ingredient}</span>`;
    });
    return ingredients;
  });
  console.log(removeDuplicate(ingredientResult));
  return removeDuplicate(ingredientResult);
}

function searchIngredient(string) {
  const ingredientList = Array.from(
    document.querySelectorAll('.custom-option.--ingredient')
  );
  const IngredientListValue = ingredientList.map(
    (element) => element.innerHTML
  );
  let ingredientFiltered = IngredientListValue.filter((element) =>
    element.includes(string)
  );
  ingredientFiltered = ingredientFiltered
    .map(
      (element) => `<span class='custom-option --ingredient'>${element}</span>`
    )
    .join('');

  const listIngredient = document.querySelector('#listIngredient');
  listIngredient.innerHTML = ingredientFiltered;
}

export { searchQuery, displayIngredient, searchIngredient };

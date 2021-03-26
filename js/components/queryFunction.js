import recipes from './recipes.js';
import normalizeData from './utils.js';

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

export { searchQuery as default };

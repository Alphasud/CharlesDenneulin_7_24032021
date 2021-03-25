import recipes from './recipes.js';
import displayRecipe from './displayRecipes.js';

const searchInput = document.querySelector('#searchInput');
const resultSection = document.querySelector('.result');

resultSection.innerHTML = displayRecipe(recipes);

function searchQuery(input) {
  /// ///FITLER BY NAME
  const searchByName = recipes.filter((element) =>
    element.name.toLowerCase().normalize('NFC').includes(input)
  );

  /// ///FILTER BY INGREDIENTS
  const recipesIngredients = recipes.map((element) => {
    const { ingredients } = element;
    const allIngredient = ingredients.map((el) => el.ingredient);
    return allIngredient.filter((item) => item.toLowerCase().includes(input));
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
  const searchByDescription = recipes.filter((element) =>
    element.description.toLowerCase().normalize('NFC').includes(input)
  );

  /// ///REMOVE DUPLICATE
  let globalSearch = searchByName.concat(
    searchByIngredient,
    searchByDescription
  );
  console.log(globalSearch);
  const duplicateItems = [];
  globalSearch = globalSearch.filter((element) => {
    if (element.id in duplicateItems) {
      return false;
    }
    duplicateItems[element.id] = true;
    return true;
  });

  resultSection.innerHTML = displayRecipe(globalSearch);
}

searchInput.addEventListener('input', (e) => {
  const input = e.target.value.toLowerCase();
  input.normalize('NFC');
  if (input.length >= 3) {
    searchQuery(input);
  } else {
    resultSection.innerHTML = displayRecipe(recipes);
  }
});

import { normalizeData } from './utils.js'
//////////////THIS FUNCTION MAP THROUGH THE RECIPES ARRAY AND DISPLAY THEM///////////////
function displayRecipe(array) {
  const arraySorted = array.sort(function (a, b) {
    let x = normalizeData(a.name);
    let y = normalizeData(b.name);
    if (x > y) return 1;
    if (x < y) return -1;
    return 0;
  });
  const recipeResult = arraySorted
    .map((element) => {
      const { name } = element;
      const { time } = element;
      const allIngredients = element.ingredients;
      const intstruction = element.description;

      const ingredients = allIngredients
        .map((el) => {
          const { ingredient } = el;
          const quantityRaw = el.quantity;
          const unitRaw = el.unit;
          const quantityArray = [];
          const unitArray = [];
          quantityArray.push(quantityRaw);
          unitArray.push(unitRaw);
          const quantity = quantityArray.filter((ele) => ele !== undefined);
          const unit = unitArray.filter((item) => item !== undefined);

          return (quantity.length < 1 && unit.length < 1) ? `<p><b>${ingredient}</b> ${quantity} ${unit}</p>` : `<p><b>${ingredient}:</b> ${quantity} ${unit}</p>`;
          
        })
        .join('');

      return `<article class="recipe">
          <div class="recipe__image">
                <img src="" />
            </div>
          <div class="recipe__info">

            <div class="recipe__info__first-element">
              <h2 class="recipe__info__first-element__title">${name}</h2>
              <span class="recipe__info__first-element__time"><i class="far fa-clock"></i> ${time} minutes</span>
            </div>

            <div class="recipe__info__second-element">
              <div class="recipe__info__second-element__ingredients">${ingredients}</div>
              <p class="recipe__info__second-element__instructions">${intstruction}</p>
            </div>

          </div>
        </article>`;
    }).join('')
    return recipeResult;
}

export { displayRecipe as default };

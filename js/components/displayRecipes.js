function showRecipe(array) {
  const recipeResult = array
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

          return `<p><b>${ingredient}:</b> ${quantity} ${unit}</p>`;
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
    })
    .join('');
  return recipeResult;
}

export { showRecipe as default };

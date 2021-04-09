import recipes from './recipes.js';
import displayRecipe from './displayRecipes.js';
import {
  normalizeData,
  observeChangesOnTagSection,
  closeSearchFieldWhenUserClickElswhere,
  displayElements,
  removeDuplicate,
} from './utils.js';
import {
  searchQuery,
  displayListElement,
  searchIngredient,
  searchAppliance,
  searchDevice,
} from './queryFunction.js';



const searchInput = document.querySelector('#searchInput');
const resultSection = document.querySelector('.result');

let globalSearch;
let globalIngredient;
let globalAppliance;
let globalDevice;
let IngredientTagsArray = [];
let applianceTagsArray = [];
let deviceTagsArray = [];

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

displayElements()


/// /LISTEN TO THE MAIN INPUT/////
const listIngredient = document.querySelector(
  '.search__filter__list.--Ingredients'
);
const listAppliance = document.querySelector(
  '.search__filter__list.--Appareils'
);
const listDevice = document.querySelector('.search__filter__list.--Ustenciles');
const tagSection = document.querySelector('.search__tags__Ingredients');

searchInput.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  tagSection.innerHTML = '';
  IngredientTagsArray = [];
  applianceTagsArray = [];
  deviceTagsArray = [];

  if (inputNormalized.length >= 3) {
    globalSearch = searchQuery(recipes, inputNormalized);
     // console.log(globalSearch);
    if (globalSearch.length < 1) {
      resultSection.innerHTML = `<p class='error-result'>Pas de recettes à afficher pour cette recherche.</p>`;
      listIngredient.innerHTML = '';
      listAppliance.innerHTML = '';
      listDevice.innerHTML = '';
    } else {
      resultSection.innerHTML = displayRecipe(globalSearch);
      globalIngredient = globalSearch.flatMap(
        (element) => element.ingredients
      );
      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');

      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'Appareils');

      globalDevice = globalSearch;
      displayListElement(globalDevice, 'devices', '', 'Ustenciles');
    }
  } else {
    resultSection.innerHTML = displayRecipe(recipes);
    listIngredient.innerHTML = '';
    listAppliance.innerHTML = '';
    listDevice.innerHTML = '';
  }
});


const searchInputIngredient = document.querySelector('#IngredientsInput');
const searchInputAppliance = document.querySelector('#AppareilsInput');
const searchInputDevice = document.querySelector('#UstencilesInput');

/// /LISTEN TO THE INGREDIENT ADVANCED SEARCH INPUT/////

searchInputIngredient.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  //globalIngredient = globalSearch.flatMap((element) => element.ingredients);
  displayListElement(globalIngredient, 'ingredient', inputNormalized, 'Ingredients');
});

/// /LISTEN TO THE APPLIANCES ADVANCED SEARCH INPUT/////
searchInputAppliance.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  displayListElement(globalAppliance, 'appliance', inputNormalized, 'Appareils');
});

/// /LISTEN TO THE DEVICES ADVANCED SEARCH INPUT/////

searchInputDevice.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  displayListElement(globalDevice, 'devices', inputNormalized, 'Ustenciles');
});

const articleIngredient = document.querySelector('.article-Ingredients');
const articleAppliance = document.querySelector('.article-Appareils');
const articleDevice = document.querySelector('.article-Ustenciles');

////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

/// /LISTEN TO THE INGREDIENT ADVANCED SEARCH BUTTON CLICK/////
const filterElementIngredient = document.querySelector(
  '.search__filter__element.--Ingredients'
);

filterElementIngredient.addEventListener('click', () => {
  const listIngr = document.querySelectorAll(
    '.search__filter__list__item.--Ingredients'
  );
  if (listIngr.length > 0) {
    articleIngredient.classList.toggle('larger');
    filterElementIngredient.classList.toggle('open');
    articleAppliance.classList.remove('larger');
    articleDevice.classList.remove('larger');
    searchInputIngredient.value = '';
    searchInputIngredient.focus();
  }
});

/// /LISTEN TO THE APPLIANCES ADVANCED SEARCH BUTTON CLICK/////
const filterElementAppliance = document.querySelector(
  '.search__filter__element.--Appareils'
);
filterElementAppliance.addEventListener('click', () => {
  const listApp = document.querySelectorAll(
    '.search__filter__list__item.--Appareils'
  );
  if (listApp.length > 0) {
    articleAppliance.classList.toggle('larger');
    filterElementAppliance.classList.toggle('open');
    articleIngredient.classList.remove('larger');
    articleDevice.classList.remove('larger');
    searchInputAppliance.value = '';
    searchInputAppliance.focus();
    // displayListElement(globalSearch, 'appliance', '', 'Appareils');
  }
});

/// /LISTEN TO THE DEVICES ADVANCED SEARCH BUTTON CLICK/////
const filterElementDevice = document.querySelector(
  '.search__filter__element.--Ustenciles'
);
filterElementDevice.addEventListener('click', () => {
  const listDev = document.querySelectorAll(
    '.search__filter__list__item.--Ustenciles'
  );
  if (listDev.length > 0) {
    articleDevice.classList.toggle('larger');
    filterElementDevice.classList.toggle('open');
    articleIngredient.classList.remove('larger');
    articleAppliance.classList.remove('larger');
    searchInputDevice.value = '';
    searchInputDevice.focus();
    // displayListElement(globalSearch, 'devices', '', 'Ustenciles');
  }
});

// inputListeners(globalIngredient, globalSearch);

observeChangesOnTagSection();
closeSearchFieldWhenUserClickElswhere()



const IngredientList = document.querySelector(
  `.search__filter__list.--Ingredients`
);

const observer = new MutationObserver(() => {
  const tags = document.querySelectorAll(
    `.search__filter__list__item.--Ingredients`
  );
  for (const item of tags) {
    item.addEventListener('click', () => {
      item.remove();
      globalIngredient = globalIngredient.filter(element => element.ingredient !== item.innerText);
      IngredientTagsArray.push(item.innerText);
      IngredientTagsArray = removeDuplicate(IngredientTagsArray);
      console.log(IngredientTagsArray);
      const tagsDisplayed = IngredientTagsArray.map((element) => {
        return `<span class='search__tags__item --Ingredients'>${element}<i id="close" class="far fa-times-circle"></i></span>`;
      }).join('');

    const tagSection = document.querySelector('.search__tags__Ingredients');
    tagSection.innerHTML = tagsDisplayed;
  
      
    
      const tagInput = normalizeData(item.innerText);
      globalSearch = searchIngredient(globalSearch, tagInput);
      resultSection.innerHTML = displayRecipe(globalSearch);
      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      globalIngredient = globalIngredient.filter(
        (element) => element.ingredient !== item.innerText
      );
      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');
      
      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'Appareils');

      globalDevice = globalSearch;
      displayListElement(globalDevice, 'devices', '', 'Ustenciles');
  });
  }

});
observer.observe(IngredientList, { subtree: true, childList: true });


const applianceList = document.querySelector(
  `.search__filter__list.--Appareils`
);
const observerAppliance = new MutationObserver(() => {
  const tags = document.querySelectorAll(
    `.search__filter__list__item.--Appareils`
  );
  for (const item of tags) {
    item.addEventListener('click', () => {
      item.remove();
      globalAppliance = globalSearch.filter(
        (element) => element.appliance !== item.innerText
      );
      applianceTagsArray.push(item.innerText);
      applianceTagsArray = removeDuplicate(applianceTagsArray);
      console.log(applianceTagsArray);
      const tagsDisplayed = applianceTagsArray
        .map((element) => {
          return `<span class='search__tags__item --Appareils'>${element}<i id="close" class="far fa-times-circle"></i></span>`;
        })
        .join('');

      const tagSection = document.querySelector('.search__tags__Appareils');
      tagSection.innerHTML = tagsDisplayed;

       const tagInput = normalizeData(item.innerText);
    globalSearch = searchAppliance(globalSearch, tagInput);
    resultSection.innerHTML = displayRecipe(globalSearch);
      globalAppliance = globalSearch.filter(
        (element) => element.appliance !== item.innerText
      );
      displayListElement(globalAppliance, 'appliance', '', 'Appareils');
      
      globalDevice = globalSearch;
      displayListElement(globalDevice, 'devices', '', 'Ustenciles');

      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');
  });
  }
});
observerAppliance.observe(applianceList, { subtree: true, childList: true });


const deviceList = document.querySelector(
  `.search__filter__list.--Ustenciles`
);
const observerDevice = new MutationObserver(() => {
  const tags = document.querySelectorAll(
    '.search__filter__list__item.--Ustenciles'
  );
  for (const item of tags) {
    item.addEventListener('click', () => {
      item.remove();
      globalDevice = globalDevice.filter(
        (element) => element.devices !== item.innerText
      );
      deviceTagsArray.push(item.innerText);
      deviceTagsArray = removeDuplicate(deviceTagsArray);
      const tagsDisplayed = deviceTagsArray
        .map((element) => {
          return `<span class='search__tags__item --Ustenciles'>${element}<i id="close" class="far fa-times-circle"></i></span>`;
        })
        .join('');

      const tagSection = document.querySelector('.search__tags__Ustenciles');
      tagSection.innerHTML = tagsDisplayed;

      const tagInput = normalizeData(item.innerText);
      globalSearch = searchDevice(globalSearch, tagInput);
    resultSection.innerHTML = displayRecipe(globalSearch);
      globalDevice = globalSearch.filter(
        (element) => element.devices !== item.innerText
      );
      displayListElement(globalDevice, 'devices', '', 'Ustenciles');
      
      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');

      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'Appareils')

    });
  }
});
observerDevice.observe(deviceList, { subtree: true, childList: true });










import recipes from './recipes.js';
import displayRecipe from './displayRecipes.js';
import {
  normalizeData,
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
import { reloadSearch } from './reloadSearch.js'

const searchInput = document.querySelector('#searchInput');
const resultSection = document.querySelector('.result');

let inputNormalized;
let globalSearch;
let globalIngredient;
let globalAppliance;
let globalDevice;
let ingredientTagsArray = [];
let applianceTagsArray = [];
let deviceTagsArray = [];

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
  }
});

displayElements()


/////////LISTEN TO THE MAIN INPUT//////////
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
  inputNormalized = normalizeData(input);
  tagSection.innerHTML = '';
  ingredientTagsArray = [];
  applianceTagsArray = [];
  deviceTagsArray = [];

  if (inputNormalized.length >= 3) {
    globalSearch = searchQuery(recipes, inputNormalized);
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

/////////LISTEN TO THE INGREDIENT ADVANCED SEARCH INPUT//////////

searchInputIngredient.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  displayListElement(globalIngredient, 'ingredient', inputNormalized, 'Ingredients');
});

///////////LISTEN TO THE APPLIANCES ADVANCED SEARCH INPUT//////////
searchInputAppliance.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  displayListElement(globalAppliance, 'appliance', inputNormalized, 'Appareils');
});

/////////LISTEN TO THE DEVICES ADVANCED SEARCH INPUT////////////

searchInputDevice.addEventListener('input', (e) => {
  const input = e.target.value;
  const inputNormalized = normalizeData(input);
  displayListElement(globalDevice, 'devices', inputNormalized, 'Ustenciles');
});

const articleIngredient = document.querySelector('.article-Ingredients');
const articleAppliance = document.querySelector('.article-Appareils');
const articleDevice = document.querySelector('.article-Ustenciles');

////////////////////////////////DROPDOWN BUTTON CLICK\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//////LISTEN TO THE INGREDIENT ADVANCED SEARCH BUTTON CLICK///////
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

//////LISTEN TO THE APPLIANCES ADVANCED SEARCH BUTTON CLICK///////
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
  }
});

///////LISTEN TO THE DEVICES ADVANCED SEARCH BUTTON CLICK///////
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
  }
});

////////////////////////////////////////ADVANCED SEARCH LIST MANAGER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//////////OBSERVE INGREDIENT LIST CLICKS////////////////
const IngredientList = document.querySelector(
  `.search__filter__list.--Ingredients`
);

const observerIngredients = new MutationObserver(() => {
  const tags = document.querySelectorAll(
    `.search__filter__list__item.--Ingredients`
  );
  for (const item of tags) {
    item.addEventListener('click', () => {
      ingredientTagsArray.push(item.innerText);
      ingredientTagsArray = removeDuplicate(ingredientTagsArray);
      const tagsDisplayed = ingredientTagsArray.map((element) => {
        return `<span class='search__tags__item --Ingredients'>${element}<i id="close" class="far fa-times-circle"></i></span>`;
      }).join('');

    const tagSection = document.querySelector('.search__tags__Ingredients');
    tagSection.innerHTML = tagsDisplayed;
  
      const tagInput = normalizeData(item.innerText);
      globalSearch = searchIngredient(globalSearch, tagInput);
      resultSection.innerHTML = displayRecipe(globalSearch);
      globalIngredient = globalSearch.flatMap((element) => element.ingredients);

      for (let i of ingredientTagsArray) {
        globalIngredient = globalIngredient.filter(
          (element) => element.ingredient !== i
        );
      }

      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');
      
      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'Appareils');

      let device = globalSearch.flatMap((element) => element.devices);
      for (let i of deviceTagsArray) {
        device = device.filter((element) => element !== i);
      }
      globalDevice = [{ devices: device }]
      displayListElement(globalDevice, 'devices', '', 'Ustenciles');

  });
  }

});
observerIngredients.observe(IngredientList, { subtree: true, childList: true });

//////////OBSERVE APPLIANCE LIST CLICKS////////////////
const applianceList = document.querySelector(
  `.search__filter__list.--Appareils`
);
const observerAppliance = new MutationObserver(() => {
  const tags = document.querySelectorAll(
    `.search__filter__list__item.--Appareils`
  );
  for (const item of tags) {
    item.addEventListener('click', () => {
      applianceTagsArray.push(item.innerText);
      applianceTagsArray = removeDuplicate(applianceTagsArray);
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
      
      for (let i of applianceTagsArray) {
        globalAppliance = globalSearch.filter(
          (element) => element.appliance !== i
        );
      }
      displayListElement(globalAppliance, 'appliance', '', 'Appareils');
      
      let device = globalSearch.flatMap((element) => element.devices);
      for (let i of deviceTagsArray) {
        device = device.filter((element) => element !== i);
      }
      globalDevice = [{ devices: device }]
      displayListElement(globalDevice, 'devices', '', 'Ustenciles');

      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      for (let i of ingredientTagsArray) {
        globalIngredient = globalIngredient.filter(
          (element) => element.ingredient !== i
        );
      }
      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');
  });
  }
});
observerAppliance.observe(applianceList, { subtree: true, childList: true });

//////////OBSERVE DEVICES LIST CLICKS////////////////
const deviceList = document.querySelector(
  `.search__filter__list.--Ustenciles`
);
const observerDevice = new MutationObserver(() => {
  const tags = document.querySelectorAll(
    `.search__filter__list__item.--Ustenciles`
  );
  for (const item of tags) {
    item.addEventListener('click', () => {
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

      let device = globalSearch.flatMap((element) => element.devices);
      for (let i of deviceTagsArray) {
        device = device.filter((element) => element !== i);
      }
      globalDevice = [{ devices: device }]

      displayListElement(globalDevice, 'devices', '', 'Ustenciles');
      
      globalIngredient = globalSearch.flatMap((element) => element.ingredients);
      for (let i of ingredientTagsArray) {
        globalIngredient = globalIngredient.filter(
          (element) => element.ingredient !== i
        );
      }
      displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');

      globalAppliance = globalSearch;
      displayListElement(globalAppliance, 'appliance', '', 'Appareils')

    });
  }
});
observerDevice.observe(deviceList, { subtree: true, childList: true });

////////////////////////////////////TAG LIST MANAGER\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

//////////////INGREDIENTS TAG MANAGEMENT///////////////
  const ingredientsTagSection = document.querySelector('.search__tags__Ingredients');
  const ingredientTagObserver = new MutationObserver(() => {
    const tags = document.querySelectorAll('.search__tags__item');
    if (tags !== null) {
      for (let i = 0; i < tags.length; i++) {
        const closeButton = document.querySelectorAll('#close');
        closeButton[i].addEventListener('click', () => {
          tags[i].remove();
          globalIngredient.push({ ingredient: tags[i].innerText, quantity: '', unit: '' });
          ingredientTagsArray = ingredientTagsArray.filter(
            element => element !== tags[i].innerText
          );
        
          displayListElement(globalIngredient, 'ingredient', '', 'Ingredients');
          
          globalSearch = reloadSearch(
            ingredientTagsArray,
            applianceTagsArray,
            deviceTagsArray,
            inputNormalized,
            globalSearch
          );
          
        });
      }
    }
  });
ingredientTagObserver.observe(ingredientsTagSection, {
  subtree: true,
  childList: true,
});

//////////////APPLIANCE TAG MANAGEMENT///////////////
const applianceTagSection = document.querySelector(
  '.search__tags__Appareils'
);
const applianceTagObserver = new MutationObserver(() => {
  const tags = document.querySelectorAll('.search__tags__item');
  if (tags !== null) {
    for (let i = 0; i < tags.length; i++) {
      const closeButton = document.querySelectorAll('#close');
      closeButton[i].addEventListener('click', () => {
        tags[i].remove();
        globalAppliance.push(tags[i].innerText);
        globalAppliance = removeDuplicate(globalAppliance);
        applianceTagsArray = applianceTagsArray.filter(
          (element) => element !== tags[i].innerText
        );

        displayListElement(globalAppliance, 'appliance', '', 'Appareils');

        globalSearch = reloadSearch(
          ingredientTagsArray,
          applianceTagsArray,
          deviceTagsArray,
          inputNormalized,
          globalSearch
        );
      });
    }
  }
});
applianceTagObserver.observe(applianceTagSection, {
  subtree: true,
  childList: true,
});


//////////////DEVICES TAG MANAGEMENT///////////////
const deviceTagSection = document.querySelector('.search__tags__Ustenciles');
const deviceTagObserver = new MutationObserver(() => {
  const tags = document.querySelectorAll('.search__tags__item');
  if (tags !== null) {
    for (let i = 0; i < tags.length; i++) {
      const closeButton = document.querySelectorAll('#close');
      closeButton[i].addEventListener('click', () => {
        tags[i].remove();
       // globalDevice.devices.push(tags[i].innerText);
        for (let el of globalDevice) {
          el.devices.push(tags[i].innerText);
        }
        deviceTagsArray = deviceTagsArray.filter(
          (element) => element !== tags[i].innerText
        );

        displayListElement(globalDevice, 'devices', '', 'Ustenciles');

        globalSearch = reloadSearch(
          ingredientTagsArray,
          applianceTagsArray,
          deviceTagsArray,
          inputNormalized,
          globalSearch
        );
      });
    }
  }
});
deviceTagObserver.observe(deviceTagSection, {
  subtree: true,
  childList: true,
});
  
closeSearchFieldWhenUserClickElswhere();









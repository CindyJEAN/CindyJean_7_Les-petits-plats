import {
  removeDropdownExpansion,
  renderDropdownExpansion,
} from "../components/dropdown.js";
import { renderNoMatchText } from "../components/recipe.js";
import { recipes } from "../content/recipes.js";
import { updateRecipeCards } from "../pages/index.js";
import {
  dropdowns,
  getFilteredRecipes,
  initialRecipes,
} from "./dataManager.js";

/**
 * @type   {HTMLInputElement}
 */
const searchBar = document.querySelector("#searchBar");
const main = document.querySelector("main");

searchBar?.addEventListener("input", handleSearchBarInput);

/**
 * add eventListener on input change and opens or closes dropdown
 * @param   {String}  id  dropdown id
 * @return  {Void}
 */
function addDropdownInputListener(id) {
  /**
   * @type   {HTMLInputElement}
   */
  const dropdown = document?.querySelector("#" + id);
  const input = dropdown.querySelector("input");

  input.addEventListener("input", function (e) {
    renderDropdownExpansion(dropdown);
  });

  const buttons = dropdown.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation;
      e.preventDefault();
      if (dropdown.classList.contains("open")) {
        removeDropdownExpansion(dropdown);
        return;
      }
      renderDropdownExpansion(dropdown);
    });
  });
}

/**
 * displays recipes depending on input :
 * - if more than 3 letters : launches search and displays results
 * - if no match : displays a text
 * - if less letters : displays all the recipes
 * @param   {Event}  e 
 * @return  {Void}   
 */
function handleSearchBarInput(e) {//move to searchBar.js ?
  const noMatchText = document.querySelector("#helperText");
  if (noMatchText) {
    noMatchText.remove();
  }

  const input = searchBar.value;
  if (input.length >= 3) {
    const filteredRecipes = getFilteredRecipes(input, recipes);
    updateRecipeCards(filteredRecipes);

    if (!filteredRecipes.length) {
      renderNoMatchText(main);
    }
  } else updateRecipeCards(initialRecipes);
}



for (const dropdown of dropdowns) {
  addDropdownInputListener(dropdown);
  // handleClickOutsideListener(dropdown);
}

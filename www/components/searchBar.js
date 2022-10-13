import { updateRecipeCards } from "../pages/index.js";
import { applyInput, getFilteredRecipes } from "../utilities/dataManager.js";
import { renderNoMatchText } from "./recipe.js";

const main = document.querySelector("main");

/**
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function renderSearchBar(domTarget) {
  const searchBar = document.createElement("form");
  searchBar.className = "searchBar";

  searchBar.innerHTML = `	
  <label for="recipeSearch" hidden></label>
	<input
		type="search"
		id="searchBar"
		name="recipeSearch"
		placeholder="Rechercher un ingrédient, appareil, ustensile ou une recette"
	/>
  <div></div>
  `;

  domTarget.appendChild(searchBar);
}

/**
 * displays recipes depending on input
 * @description
 * - applies input from user in dataManager
 * - calls getFilteredRecipes to receive recipes with current filters and input
 * - calls updateRecipeCards to display recipes
 * - if it receives no recipes, there is no match with the search :
 *   displays a text instead of recipes
 * @param   {Event}  e
 * @return  {Void}
 */
function handleSearchBarInput(e) {
  /**
   * @type   {HTMLInputElement}
   */
  const searchBar = document.querySelector("#searchBar");
  const noMatchText = document.querySelector("#helperText");
  if (noMatchText) {
    noMatchText.remove();
  }

  const input = searchBar.value;
  applyInput(input);

  const filteredRecipes = getFilteredRecipes();

  if (!filteredRecipes.length) {
    renderNoMatchText(main);
  }
  updateRecipeCards(filteredRecipes);
}

export { renderSearchBar, handleSearchBarInput };

import { updateRecipeCards } from "../pages/index.js";
import { applyInput, getFilteredRecipes } from "../utilities/dataManager.js";
import { renderNoMatchText } from "./recipe.js";
const initialPlaceholder =
  "Rechercher un ingrédient, appareil, ustensile ou une recette";

/**
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function renderSearchBar(domTarget) {
  const searchBar = document.createElement("form");
  searchBar.className = "searchBar";
  const width = document.documentElement.clientWidth;
  const placeholder = getPlaceholder(width);

  searchBar.innerHTML = `	
  <label for="recipeSearch" hidden></label>
	<input
		type="search"
		id="searchBar"
		name="recipeSearch"
		placeholder=""
	/>
  <div></div>
  `;
  searchBar.querySelector("input").placeholder = placeholder;

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
   * @param   {HTMLElement}  recipesContainer  [recipesContainer description]
   */
  const recipesContainer = document.querySelector("#recipesContainer");
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
    // @ts-ignore
    renderNoMatchText(recipesContainer);
  }
  updateRecipeCards(filteredRecipes);
}

export { renderSearchBar, handleSearchBarInput };

window.addEventListener("resize", (event) => {
  const width = document.documentElement.clientWidth;

  /**
   * @type  {HTMLInputElement}              [return description]
   */
  const searchBar = document.querySelector("#searchBar");
  searchBar.placeholder = getPlaceholder(width);
});

/**
 * getSearchBar placeholder depending on 
 *
 * @param   {Number}  width  window width
 * @return  {String}         placeholder
 */
function getPlaceholder(width) {
  let updatedPlaceholder = "";
  if (width >= 480) {
    updatedPlaceholder = initialPlaceholder;
  } else if (width >= 380) {
    updatedPlaceholder = initialPlaceholder.slice(0, 45) + "...";
  } else {
    updatedPlaceholder = initialPlaceholder.slice(0, 34) + "...";
  }

  return updatedPlaceholder;
}

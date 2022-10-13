import { getRecipeById, initialRecipes } from "../utilities/dataManager.js";
import { recipes } from "../content/recipes.js";
import { renderRecipe } from "../components/recipe.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderDropdown } from "../components/dropdown.js";
import { dropdowns } from "../utilities/dataManager.js";

// ----- index elements rendering ----- //
const main = document.querySelector("main");

// --- rendering searchBar --- //
renderSearchBar(main);

// --- rendering filters --- //
const filtersContainer = document.createElement("div");
filtersContainer.className = "container";
filtersContainer.id = "filtersContainer";

main.appendChild(filtersContainer);

// --- rendering dropdowns --- //
const dropdownsContainer = document.createElement("form");
dropdownsContainer.className = "container";

main.appendChild(dropdownsContainer);
for (const dropdown of dropdowns) {
  renderDropdown(dropdownsContainer, dropdown);
}

// --- rendering recipes --- //
for (const recipe of initialRecipes) {
  renderRecipe(main, getRecipeById(recipe));
}

// ----- functions ----- //
/**
 * Updates display of recipes. 
 * @description
 * If there are already recipes displayed, removes them first.
 * Then for every recipe id, renders recipe with the data of the recipe
 * @param   {Array}  recipesToShow  Array of recipe ids
 * @return  {Void}                
 */
function updateRecipeCards(recipesToShow) {
  const articles = main.querySelectorAll("article.recipe");
  if (articles) {
    articles.forEach((article) => article.remove());
  }
  for (const recipeId of recipesToShow) {
    renderRecipe(main, getRecipeById(recipeId));
  }
}

export { updateRecipeCards };


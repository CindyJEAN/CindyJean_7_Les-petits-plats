import { getFilteredRecipes, getRecipeById } from "../utilities/dataManager.js";
import { recipes } from "../content/recipes.js";
import { renderRecipe } from "../components/recipe.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderDropdown } from "../components/dropdown.js";
import { dropdowns } from "../utilities/dataManager.js";

const main = document.querySelector("main");
const filtersContainer = document.createElement("div");
filtersContainer.className = "container";
filtersContainer.id = "filtersContainer";
const dropdownsContainer = document.createElement("form");
dropdownsContainer.className = "container";
// ----- searchbar rendering ----- //
renderSearchBar(main);

// ----- filters rendering ----- //
main.appendChild(filtersContainer);

// ----- dropdown rendering ----- //
main.appendChild(dropdownsContainer);
for (const dropdown of dropdowns) {
  renderDropdown(dropdownsContainer, dropdown);
}

// ----- recipes rendering ----- //
const initialRecipes = [];
//TODO get initialRecipes from DataManager
for (let i = 1; i <= recipes.length; i++) {
  initialRecipes.push(i);
}
//TODO get filteredRecipes from DataManager
const filteredRecipes = [1, 3, 8, 10];

let recipesToShow = initialRecipes;
// let recipesToShow = filteredRecipes;

for (const recipe of recipesToShow) {
  renderRecipe(main, getRecipeById(recipe));
}
export { initialRecipes};
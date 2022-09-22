import { getRecipeById } from "./dataManager.js";
import { recipes } from "../content/recipes.js";
import { renderFilter } from "../components/filter.js";
import { renderRecipe } from "../components/recipe.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderDropdown } from "../components/dropdown.js";
import { dropdowns } from "./dataManager.js";

const main = document.querySelector("main");
const filtersContainer = document.createElement("div");
filtersContainer.className = "container";
const dropdownsContainer = document.createElement("form");
dropdownsContainer.className = "container";
// ----- searchbar rendering ----- //
renderSearchBar(main);

// ----- filters rendering ----- //
main.appendChild(filtersContainer);

const filters = [
  ["Coco", "ingredient"],
  ["Sucre", "ingredient"],
  ["Blender", "appliance"],
];
//TODO get filters from function in dataManager
for (const filter of filters) {
  renderFilter(filtersContainer, filter);
}

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

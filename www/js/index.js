import { getRecipeById } from "./dataManager.js";
import { recipes } from "../content/recipes.js";
import { renderFilter } from "../components/filter.js";
import { renderRecipe } from "../components/recipe.js";
import { renderSearchBar } from "../components/searchBar.js";

const main = document.querySelector("main");
const filtersContainer = document.createElement("div");
filtersContainer.className = "container";
const dropdownsContainer = document.createElement("div");
dropdownsContainer.className = "container";
// const filtersContainer = document.querySelector("#filtersContainer");
// ----- searchbar rendering ----- //
renderSearchBar(main);
/**
 * @type   {HTMLInputElement}
 */
const element = document.querySelector("#searchBar");

element?.addEventListener("input", function (e) {
  console.log(element.value);
  // if (element.value.length >= 3)
});

// ----- filters rendering ----- //
main.appendChild(filtersContainer);

const filters = [
  ["Coco", "ingredient"],
  ["Sucre", "ingredient"],
  ["Blender", "appliance"],
];
for (const filter of filters) {
  renderFilter(filtersContainer, filter);
}

// ----- dropdown rendering ----- //
//TODO dropdown
main.appendChild(dropdownsContainer);

// ----- recipes rendering ----- //
const initialRecipes = [];
for (let i = 1; i <= recipes.length; i++) {
  initialRecipes.push(i);
}

const filteredRecipes = [1, 3, 8, 10];

let recipesToShow = initialRecipes;
// let recipesToShow = filteredRecipes;

for (const recipe of recipesToShow) {
  renderRecipe(main, getRecipeById(recipe));
}

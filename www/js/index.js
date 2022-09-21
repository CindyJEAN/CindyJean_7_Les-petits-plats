import { getRecipeById } from "./dataManager.js";
import { renderRecipe } from "../components/recipe.js";
import { recipes } from "../content/recipes.js";
import {
  renderSearchBar,
  returnSearchBarElement,
} from "../components/searchBar.js";

const main = document.querySelector("main");
// ---- searchbar rendering
//TODO searchbar
renderSearchBar(main);
// const searchBar = returnSearchBarElement();
// main.appendChild(searchBar);
/**
 * @type   {HTMLInputElement}
 */
const element = document.querySelector("#searchBar");

element?.addEventListener("input", function (e) {
  // if (element.value.length >= 3)
  console.log(element.value);
});

// ---- filters rendering
//TODO filters

// ---- dropdown rendering
//TODO dropdown

// ---- recipes rendering
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

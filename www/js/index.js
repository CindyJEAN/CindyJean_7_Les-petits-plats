import { getRecipeById } from "./dataManager.js";
import { renderRecipe } from "../components/recipe.js";
import { recipes } from "../content/recipes.js";

const initialRecipes = [];
for (let i = 1; i <= recipes.length; i++) {
  initialRecipes.push(i);
}

const filteredRecipes = [1, 3, 8, 10];

let recipesToShow = initialRecipes;
// let recipesToShow = filteredRecipes;

const main = document.querySelector("main");
for (const recipe of recipesToShow) {
  renderRecipe(main, getRecipeById(recipe));
}


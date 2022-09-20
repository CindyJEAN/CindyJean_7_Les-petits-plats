import { getRecipeById } from "../js/dataManager.js";
import { renderIngredient } from "./ingredient.js";

const recipe1 = getRecipeById(1);
const recipe2 = getRecipeById(2);

console.log("recipe1", recipe1);
console.log("recipe2", recipe2);

const main = document.querySelector("main");

//TODO add function for rendering card + parameters from recipe

const card = document.createElement("article");
card.className = "recipe";
card.innerHTML = `<div class="photo"></div>`;

const label = document.createElement("h2");
label.innerText = "Limonade de coco";

const time = document.createElement("p");
time.className = "time";
time.innerText = "60" + " min";

const ingredientsContainer = document.createElement("div");
ingredientsContainer.className = "ingredientsContainer";
renderIngredient(ingredientsContainer, recipe1.ingredients[0]);
renderIngredient(ingredientsContainer, recipe1.ingredients[1]);
renderIngredient(ingredientsContainer, recipe1.ingredients[2]);
//TODO loop on ingredients

//TODO add description
card.appendChild(label);
card.appendChild(time);
card.appendChild(ingredientsContainer);

main.appendChild(card);




import { getRecipeById } from "../js/dataManager.js";
import { renderIngredient } from "./ingredient.js";

const recipe1 = getRecipeById(1);
const recipe2 = getRecipeById(2);

console.log("recipe1", recipe1);
console.log("recipe2", recipe2);

const main = document.querySelector("main");

/**
 * @param   {HTMLElement}  domTarget
 * @param   {Object}  recipe
 * @return  {Void}
 */
function renderRecipe(domTarget, recipe) {
  const card = document.createElement("article");
  card.className = "recipe";
  card.innerHTML = `<div class="photo"></div>`;

  const label = document.createElement("h2");
  label.innerText = recipe.name;

  const time = document.createElement("p");
  time.className = "time";
  time.innerText = recipe.time + " min";

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.className = "ingredientsContainer";

  for (const ingredient of recipe.ingredients) {
    renderIngredient(ingredientsContainer, ingredient);
  }

  const steps = document.createElement("p");
  steps.className = "steps";
  steps.innerText = recipe.description;

  card.appendChild(label);
  card.appendChild(time);
  card.appendChild(ingredientsContainer);
  card.appendChild(steps);

  domTarget.appendChild(card);
}

renderRecipe(main, recipe1);
renderRecipe(main, recipe2);

export { renderRecipe };

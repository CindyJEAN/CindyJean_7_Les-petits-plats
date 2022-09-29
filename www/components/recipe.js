import { renderIngredient } from "./ingredient.js";

const noMatchText =
  "Aucune recette ne correspond à votre critère… Vous pouvez chercher « tarte aux pommes », « poisson », etc.";

/**
 * @param   {HTMLElement}  domTarget
 * @param   {Object}  recipe
 * @return  {Void}
 */
function renderRecipe(domTarget, recipe) {
  const card = document.createElement("article");
  card.className = "recipe";
  card.innerHTML = `
  <div class="photo"></div>
  <h2>${recipe.name}</h2>
  <p class="time">${recipe.time + " min"}</p>
  `;

  const ingredientsContainer = document.createElement("div");
  ingredientsContainer.className = "ingredientsContainer";

  for (const ingredient of recipe.ingredients) {
    renderIngredient(ingredientsContainer, ingredient);
  }

  const steps = document.createElement("p");
  steps.className = "steps";
  steps.innerText = recipe.description;

  card.appendChild(ingredientsContainer);
  card.appendChild(steps);

  domTarget.appendChild(card);
}

/**
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function renderNoMatchText (domTarget) {
  const noMatch = document.createElement("p");
  noMatch.innerText = noMatchText;
  noMatch.id = "helperText";
  domTarget.appendChild(noMatch);
}

export { renderRecipe, renderNoMatchText };

/**
 * @param   {HTMLElement}  domTarget
 * @param   {Object}  ingredient  ingredient info
 * @return  {Void}
 */
function renderIngredient(domTarget, ingredient) {
  const element = document.createElement("div");
  element.className = "ingredient";

  const label = document.createElement("h3");
  label.innerText = ingredient.ingredient + " : ";

  const quantity = document.createElement("p");
  quantity.innerText = ingredient.quantity + " " + (ingredient?.unit || "");

  element.appendChild(label);
  element.appendChild(quantity);

  domTarget.appendChild(element);
}

export { renderIngredient };

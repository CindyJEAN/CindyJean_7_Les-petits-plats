/**
 * @param   {HTMLElement}  domTarget
 * @param   {Object}  ingredient  ingredient info
 * @return  {Void}
 */
function renderIngredient(domTarget, ingredient) {
  const element = document.createElement("div");
  element.className = "ingredient";
  const hasQuantity = Boolean(ingredient.quantity);

  const label = document.createElement("p");
  label.className = "keyText";
  label.innerText = ingredient.ingredient + (hasQuantity ? " : " : "");

  element.appendChild(label);

  if (hasQuantity) {
    const quantity = document.createElement("p");
    quantity.innerText = ingredient.quantity + " " + (ingredient?.unit || "");
    element.appendChild(quantity);
  }

  domTarget.appendChild(element);
}

export { renderIngredient };

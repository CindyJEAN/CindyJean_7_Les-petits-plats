import { updateRecipeCards } from "../pages/index.js";
import { getFilteredRecipes, removeFilter } from "../utilities/dataManager.js";
import { renderDropdownExpansion } from "./dropdown.js";

/**
 * @param   {HTMLElement}  domTarget
 * @param   {Array}  filter ex ["lait de coco", "ingredients"]
 * @return  {Void}
 */
function renderFilter(domTarget, filter) {
  const element = document.createElement("button");
  element.className = "filter";
  element.innerText = filter[0];
  element.classList.add(filter[1]);

  //--- removing filter on click
  element.onclick = () => {
    removeFilter(filter);
    element.remove();

    updateRecipeCards(getFilteredRecipes());

    /**
     * @type   {HTMLInputElement}
     */
    const dropdown = document.querySelector("#" + filter[1]);
    renderDropdownExpansion(dropdown);
  };

  domTarget.appendChild(element);
}

export { renderFilter };

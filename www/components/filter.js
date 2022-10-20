import { updateRecipeCards } from "../pages/index.js";
import { getFilteredRecipes, removeFilter } from "../utilities/dataManager.js";
import { renderDropdownExpansion } from "./dropdown.js";

/**
 * @param   {HTMLElement}  domTarget
 * @param   {Array}  filter ex ["lait de coco", "ingredients"]
 * @return  {Void}
 */
function renderFilter(domTarget, filter) {
  const container = document.querySelector("#filtersContainer");
  const element = document.createElement("button");
  element.className = "filter";
  element.innerText = filter[0];
  element.classList.add(filter[1]);
  domTarget.classList.remove("empty");

  //--- removing filter on click
  element.onclick = () => {
    removeFilter(filter);
    element.remove();
    const isContainerEmpty = !container.querySelector("button");
    if (isContainerEmpty) {
      domTarget.classList.add("empty");
    }

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

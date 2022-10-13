import { updateRecipeCards } from "../pages/index.js";
import {
  addFilter,
  getFilteredRecipes,
  getSuggestions,
  translate,
} from "../utilities/dataManager.js";
import { renderFilter } from "./filter.js";

/**
 * Dropdown html
 * @param   {HTMLElement}  domTarget
 * @param   {String}  category
 * @return  {Void}
 */
function renderDropdown(domTarget, category) {
  const dropdown = document.createElement("div");
  dropdown.id = category;
  dropdown.className = "dropdown";
  const label = translate[category];

  dropdown.innerHTML = `
  <fieldset class="dropdownInput">
    <label for=${category + "Input"} class="hidden">
      ${label}
    </label>
    <input type="text" placeholder=${label} name=${category} id=${
    category + "Input"
  } />
    <button class="icon"></button>
  </fieldset>
  `;

  domTarget.appendChild(dropdown);
}

/**
 * @description
 * First creates dropdown expansion if it wasn't already open,
 * changes placeholder name,
 * calls renderSuggestions
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function renderDropdownExpansion(domTarget) {
  const isOpen = domTarget.classList.contains("open");
  let expansion;
  const input = domTarget.querySelector("input");
  const category = domTarget.id;

  if (isOpen) {
    expansion = domTarget.querySelector(".dropdownExpansion");
  } else {
    expansion = document.createElement("div");
    expansion.className = "dropdownExpansion";
    domTarget.appendChild(expansion);
    domTarget.classList.add("open");
    input.setAttribute("placeholder", getPlaceholder(category));
  }

  // @ts-ignore
  renderSuggestions(expansion);
}

/**
 * Displays keyword suggestions.
 * @description
 * If there are already suggestions displayed, removes them first.
 * Calls getSuggestions depending on dropdown category and input from user
 * Then renders every suggestion.
 * Every suggestion is clickable : it adds a filter, 
 * then updates recipes to display and suggestions again
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function renderSuggestions(domTarget) {
  /**
   * @type   {HTMLElement}
   */
  const container = document.querySelector("#filtersContainer");
  const category = domTarget.parentElement.id;

  const buttons = domTarget.querySelectorAll("button");
  if (buttons) {
    buttons.forEach((button) => button.remove());
  }

  /**
   * @type  {HTMLInputElement}
   */
  const input = document.querySelector("#" + category + "Input");

  const suggestions = getSuggestions(category, input.value);

  for (const element of suggestions) {
    const button = document.createElement("button");
    button.innerText = element;
    button.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      renderFilter(container, [element, category]);
      addFilter([element, category]);
      updateRecipeCards(getFilteredRecipes());
      renderDropdownExpansion(domTarget.parentElement);
    };
    domTarget.appendChild(button);
  }
}

/**
 * Closes dropdown
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function removeDropdownExpansion(domTarget) {
  const input = domTarget.querySelector("input");
  const category = domTarget.id;
  input.setAttribute("placeholder", translate[category]);
  domTarget.querySelector(".dropdownExpansion").remove();
  domTarget.classList.remove("open");
}

/**
 * Returns placeholder text depending on dropdown category
 * @param   {String}  category  dropdown category
 * @return  {String}
 */
function getPlaceholder(category) {
  const base = "Rechercher un ";
  switch (category) {
    case "ingredients":
      return base + "ingrédient";
    case "appliance":
      return base + "appareil";
    case "ustensils":
      return base + "ustensile";
  }
}

export { renderDropdown, renderDropdownExpansion, removeDropdownExpansion };

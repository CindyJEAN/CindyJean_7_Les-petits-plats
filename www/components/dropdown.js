import { addFilter, removeFilter, translate } from "../utilities/dataManager.js";
import { renderFilter } from "./filter.js";

/**
 * @param   {HTMLElement}  domTarget
 * @param   {String}  category
 *
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
 * @param   {HTMLElement}  domTarget
 * @param   {Array}  suggestions
 * @return  {Void}
 */
function renderSuggestions(domTarget, suggestions) {
  const container = document.querySelector("#filtersContainer");
  const category = domTarget.parentElement.id;
  const buttons = domTarget.querySelectorAll("button");
  if (buttons) {
    buttons.forEach((button) => button.remove());
  }

  for (const element of suggestions) {
    const button = document.createElement("button");
    button.innerText = element;
    button.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      // @ts-ignore
      renderFilter(container, [element, category]);
      addFilter(element);
    };
    domTarget.appendChild(button);
  }
}

/**
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function renderDropdownExpansion(domTarget) {
  const isOpen = domTarget.classList.contains("open");
  let expansion;
  if (isOpen) {
    expansion = domTarget.querySelector(".dropdownExpansion");
  } else {
    expansion = document.createElement("div");
    expansion.className = "dropdownExpansion";
    domTarget.appendChild(expansion);
    domTarget.classList.add("open");
  }

  //TODO dynamique, et enlever exemple
  const suggestions = ["Lait de coco", "Crème de coco"];
  // @ts-ignore
  renderSuggestions(expansion, suggestions);
}

/**
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function removeDropdownExpansion(domTarget) {
  domTarget.querySelector(".dropdownExpansion").remove();
  domTarget.classList.remove("open");
}

export { renderDropdown, renderDropdownExpansion, removeDropdownExpansion };

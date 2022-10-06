import {
  addFilter,
  getSuggestions,
  removeFilter,
  translate,
} from "../utilities/dataManager.js";
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
  // const isOpen = dropdown.classList.contains("open");
  // console.log(isOpen);
  // const placeholder = isOpen ? "Rechercher un " + label.toLowerCase() : label;

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

  // @ts-ignore
  renderSuggestions(expansion);
}

/**
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function renderSuggestions(domTarget) {
  const suggestions = ["Lait de coco", "Crème de coco"];
  const container = document.querySelector("#filtersContainer");
  const category = domTarget.parentElement.id;

  const tags = getSuggestions(category);
  // console.log("tags", tags);


  const buttons = domTarget.querySelectorAll("button");
  if (buttons) {
    //pas .length?
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
      // @ts-ignore
      addFilter([element, category]);
    };
    domTarget.appendChild(button);
  }
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

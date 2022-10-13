import {
  removeDropdownExpansion,
  renderDropdownExpansion,
} from "../components/dropdown.js";
import { handleSearchBarInput } from "../components/searchBar.js";
import { dropdowns } from "./dataManager.js";

/**
 * @type   {HTMLInputElement}
 */
const searchBar = document.querySelector("#searchBar");

searchBar?.addEventListener("input", handleSearchBarInput);

/**
 * add eventListener on input change to open dropdown,
 *  and add eventListener on dropdown button to open or close dropdown
 * @param   {String}  id  dropdown id
 * @return  {Void}
 */
function addDropdownInputListener(id) {
  /**
   * @type   {HTMLInputElement}
   */
  const dropdown = document?.querySelector("#" + id);
  const input = dropdown.querySelector("input");

  input.addEventListener("input", function (e) {
    renderDropdownExpansion(dropdown);
  });

  const buttons = dropdown.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation;
      e.preventDefault();
      if (dropdown.classList.contains("open")) {
        removeDropdownExpansion(dropdown);
        return;
      }
      renderDropdownExpansion(dropdown);
    });
  });
}

// ----- click outside dropdown management ----- //
for (const dropdown of dropdowns) {
  addDropdownInputListener(dropdown);
  const element = document?.querySelector("#" + dropdown);
  handleClickOutsideListener(element);
}

function handleClickOutsideListener(dropdown) {
  window.addEventListener(
    "click",
    addClickOutsideListener.bind(null, dropdown)
  );
}

function addClickOutsideListener(dropdown, e) {
  if (!dropdown.contains(e.target)) {
    const isOpen = dropdown.classList.contains("open");
    if (isOpen) {
      removeDropdownExpansion(dropdown);
      window.removeEventListener("click", addClickOutsideListener);
    }
  }
}

export { handleClickOutsideListener };

import {
  removeDropdownExpansion,
  renderDropdownExpansion,
} from "../components/dropdown.js";
import { recipes } from "../content/recipes.js";
import { initialRecipes } from "../pages/index.js";
import { dropdowns, getFilteredRecipes } from "./dataManager.js";

/**
 * @type   {HTMLInputElement}
 */
const searchBar = document.querySelector("#searchBar");
searchBar?.addEventListener("input", function (e) {
  const input = searchBar.value;
  if (input.length >= 3) {
    getFilteredRecipes(input, recipes);
  }
  else console.log("recipes", initialRecipes);
});

for (const dropdown of dropdowns) {
  addDropdownInputListener(dropdown);
  // handleClickOutsideListener(dropdown);
}

/**
 * add eventListener on input change and opens or closes dropdown
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





import { getRecipeById, initialRecipes } from "../utilities/dataManager.js";
import { recipes } from "../content/recipes.js";
import { renderRecipe } from "../components/recipe.js";
import { renderSearchBar } from "../components/searchBar.js";
import { renderDropdown } from "../components/dropdown.js";
import { dropdowns } from "../utilities/dataManager.js";

const main = document.querySelector("main");
const filtersContainer = document.createElement("div");
filtersContainer.className = "container";
filtersContainer.id = "filtersContainer";
const dropdownsContainer = document.createElement("form");
dropdownsContainer.className = "container";
// ----- searchbar rendering ----- //
renderSearchBar(main);

// ----- filters rendering ----- //
main.appendChild(filtersContainer);

// ----- dropdown rendering ----- //
main.appendChild(dropdownsContainer);
for (const dropdown of dropdowns) {
  renderDropdown(dropdownsContainer, dropdown);
}

// ----- recipes rendering ----- //
for (const recipe of initialRecipes) {
  renderRecipe(main, getRecipeById(recipe));
}

// ----- functions ----- //
function updateRecipeCards(recipesToShow) {
  const articles = main.querySelectorAll("article.recipe");
  if (articles) { //pas .length?
    articles.forEach((article) => article.remove());
  }
  for (const recipe of recipesToShow) {
    renderRecipe(main, getRecipeById(recipe));
  }
}
export { updateRecipeCards };


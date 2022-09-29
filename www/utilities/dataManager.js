import { recipes } from "../content/recipes.js";
import { getIsInString } from "./helper.js";
/**  ------- variables ------- */
const translate = {
  appliance: "Appareil",
  ustensils: "Ustensiles",
  ingredients: "Ingrédients",
};
const dropdowns = ["ingredients", "appliance", "ustensils"];
const initialRecipes = [];
for (let i = 1; i <= recipes.length; i++) {
  initialRecipes.push(i);
}

let data;
const filters = [];
let recipesFilteredFromSearchData = [];

/**  ------- functions ------- */
function initData() {
  data = [...recipes];
}

/**
 * get recipe information
 * @param   {Number}  id
 * @return  {Object}

 */
function getRecipeById(id) {
  if (data === undefined || null) initData();
  for (const recipe of data) {
    if (recipe.id === id) return recipe;
  }
}

// ----- filters functions ----- //
/**
 * Remove filter from filters array
 * @param   {Array}  filter
 * @return  {Void}
 */
function removeFilter(filter) {
  const index = filters.indexOf(filter);
  filters.splice(index, 1);
}

/**
 * add filter to filters array
 * @param   {Array}  filter
 * @return  {Void}
 */
function addFilter(filter) {
  filters.push(filter);
  // console.log(filters);
}

// ----- search ----- //
/**
 * @param   {String}  input    search input
 * @return  {Array}           array of recipe ids
 */
function getFilteredRecipes(input, recipes) {
  const updatedRecipes = [];
  console.log("start", updatedRecipes);
  const searchedString = input.toLowerCase();

  // V1 (foreach)
  recipes.forEach((recipe) => {
    const isInName = getIsInString(searchedString, recipe.name);
    if (isInName) {
      updatedRecipes.push(recipe.id);
    }

    if (!isInName) {
      const isInDescription = getIsInString(searchedString, recipe.description);
      if (isInDescription) {
        updatedRecipes.push(recipe.id);
      }

      if (!isInDescription) {
        const isInIngredients = recipe.ingredients.some((element) => {
          return getIsInString(searchedString, element.ingredient);
        });
        if (isInIngredients) {
          updatedRecipes.push(recipe.id);
        }
      }
    }
  });

  // V2 (for loop)
  // for (let i = 0; i < recipes.length; i++) {
  //   const recipe = recipes[i];
  //   const isInName = getIsInString(searchedString, recipe.name);
  //   if (isInName) {
  //     updatedRecipes.push(recipe.id);
  //   }

  //   if (!isInName) {
  //     const isInDescription = getIsInString(searchedString, recipe.description);
  //     if (isInDescription) {
  //       updatedRecipes.push(recipe.id);
  //     }

  //     if (!isInDescription) {
  //       for (let j = 0; j < recipe.ingredients.length; j++) {
  //         const ingredient = recipe.ingredients[j].ingredient;
  //         const isInIngredient = getIsInString(searchedString, ingredient);
  //         if (isInIngredient) {
  //           updatedRecipes.push(recipe.id);
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }

  console.log("updatedRecipes", updatedRecipes);
  recipesFilteredFromSearchData = [...updatedRecipes];
  return updatedRecipes;
}

export {
  initData,
  getRecipeById,
  dropdowns,
  translate,
  removeFilter,
  addFilter,
  getFilteredRecipes,
  // recipesFilteredFromSearchData,
  initialRecipes,
};

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
let recipesToShow = [...initialRecipes];
let searchInput = "";

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
 * add filter to filters array
 * @param   {Array}  filter
 * @return  {Void}
 */
function addFilter(filter) {
  filters.push(filter);
}

/**
 * Remove filter from filters array
 * @param   {Array}  filter
 * @return  {Void}
 */
function removeFilter(filter) {
  const index = filters.findIndex(
    (element) => element[0] === filter[0] && element[0] === filter[0]
  );
  filters.splice(index, 1);
}

// ----- search ----- //
function applyInput(input) {
  searchInput = input;
}

/**
 * Searches input in each recipe's name, description, and ingredients
 * @description
 * - searches in name
 * - if it wasn't in name : searches in description
 * - if it wasn't in description : searches in ingredients
 * If a match was found at any step, the id of the recipe is pushed in an array
 * @return  {Array}  Filtered recipes' ids
 */
function filterRecipesFromInput() {
  const updatedRecipes = [];
  const searchedString = searchInput.toLowerCase();

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

  return updatedRecipes;
}

/**
 * Filters recipes given with current filters
 * @description
 * For every recipe :
 *   for every filter:
 *   - search in the category of the filter
 *   - if there is a match, it's pushed in an array of tags
 * If the recipe found at least one match in tags, its id is pushed in an array of recipes
 *
 * @param   {Array}  recipeIds  ids of recipes to search tags in
 * @return  {Array}             recipe ids that match the tags
 */
function filterRecipesFromTags(recipeIds) {
  const updatedRecipes = [];

  for (const id of recipeIds) {
    const recipe = recipes.find((recipe) => recipe.id === id);
    const tagsFound = [];

    for (const element of filters) {
      const tag = element[0].toLowerCase();
      const category = element[1];

      switch (category) {
        case "appliance":
          if (recipe.appliance.toLowerCase() === tag) tagsFound.push(tag);
          break;
        case "ustensils":
          const index = recipe.ustensils.findIndex(
            (el) => el.toLowerCase() === tag
          );
          if (index >= 0) tagsFound.push(tag);
          break;
        case "ingredients":
          const isInIngredients = recipe.ingredients.some(
            (el) => el.ingredient.toLowerCase() === tag
          );
          if (isInIngredients) tagsFound.push(tag);
          break;
      }
    }
    const hasTags = tagsFound.length === filters.length;
    if (hasTags) updatedRecipes.push(id);
  }

  return updatedRecipes;
}

// ----- functions that return data ----- //
/**
 * @description
 * - calls function to filter recipes from current input if the input is at least 3 letters long
 * - calls function to filter recipes from current filters
 * Then it applies and returns recipes to show (filtered or initial recipes).
 * @return  {Array}  
 */
function getFilteredRecipes() {
  let updatedRecipes = [];

  if (searchInput.length >= 3) {
    updatedRecipes = filterRecipesFromInput();
  } else updatedRecipes = [...initialRecipes];

  if (filters.length) {
    updatedRecipes = filterRecipesFromTags(updatedRecipes);
  }

  recipesToShow = updatedRecipes;
  return updatedRecipes;
}

/**
 * Gets suggestions for category of dropdown
 * @description
 * For each current filtered recipes :
 *  - depending on category, searches input in the category
 *  - if there is a match or if there was no input,
 *  the category's elements are pushed in an array
 * @param   {String}  category  dropdown category
 * @param   {String}  input
 * @return  {Object}            suggestions (without duplicates)
 */
function getSuggestions(category, input) {
  let suggestions = [];
  const searchedInput = input?.toLowerCase();

  recipesToShow.forEach((el) => {
    const recipe = recipes.find((recipe) => recipe.id === el);
    switch (category) {
      case "appliance":
        if (!searchedInput || getIsInString(searchedInput, recipe.appliance)) {
          suggestions.push(recipe.appliance);
        }
        break;
      case "ustensils":
        recipe.ustensils.forEach((ustensil) => {
          if (!searchedInput || getIsInString(searchedInput, ustensil)) {
            suggestions.push(ustensil);
          }
        });
        break;
      case "ingredients":
        recipe.ingredients.forEach((el) => {
          if (!searchedInput || getIsInString(searchedInput, el.ingredient)) {
            suggestions.push(el.ingredient);
          }
        });
        break;
    }
  });

  return new Set(suggestions);
}

export {
  initData,
  getRecipeById,
  dropdowns,
  translate,
  removeFilter,
  addFilter,
  filterRecipesFromInput,
  initialRecipes,
  getSuggestions,
  getFilteredRecipes,
  applyInput,
};

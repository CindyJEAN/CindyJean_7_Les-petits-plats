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

/**
 * add filter to filters array
 * @param   {Array}  filter
 * @return  {Void}
 */
function addFilter(filter) {
  filters.push(filter);
}

// ----- search ----- //
function applyInput(input) {
  searchInput = input;
}

function filterRecipesFromInput() {
  const updatedRecipes = [];
  // console.log("start", updatedRecipes);
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
 * @param   {Array}  recipeIds  ids of recipes to search tags in
 * @return  {Array}             recipe ids that match the tags
 */
function filterRecipesFromTags(recipeIds) {
  // const recipesToFilter = recipes.filter((recipe) =>
  //   recipeIds.includes(recipe.id)
  // );
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
          //TODO more simple way to count?
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
function getFilteredRecipes() {
  let updatedRecipes = [];
  if (searchInput !== "") {
    updatedRecipes = filterRecipesFromInput();
  } else updatedRecipes = [...initialRecipes];

  if (filters.length) {
    updatedRecipes = filterRecipesFromTags(updatedRecipes);
  }
  console.log(updatedRecipes);

  recipesToShow = updatedRecipes;
  return updatedRecipes;
}

function getSuggestions(category) {
  const suggestions = [];
  console.log("recipesToShow", recipesToShow);
  recipesToShow.forEach((el) => {
    const recipe = recipes.find((recipe) => recipe.id === el);
    switch (category) {
      case "appliance":
        suggestions.push(recipe.appliance);
        break;
        case "ustensils":
          suggestions.push(...recipe.ustensils);
          break;
          case "ingredients":
            suggestions.push(...recipe.ingredients.map(el => el.ingredient));
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

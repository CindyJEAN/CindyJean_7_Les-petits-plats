import { recipes } from "../content/recipes.js";
import { getIsInString } from "./helper.js";
const translate = {
  appliance: "Appareil",
  ustensils: "Ustensiles",
  ingredients: "Ingrédients",
};
let data;

const dropdowns = ["ingredients", "appliance", "ustensils"];

const initialRecipes = [];
for (let i = 1; i <= recipes.length; i++) {
  initialRecipes.push(i);
}

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

  //try 1 (foreach)
  // recipes.forEach((recipe) => {
  //   const isIncludedInName = recipe.name.toLowerCase().includes(searchedString);
  //   if (isIncludedInName) {
  //     updatedRecipes.push(recipe.id);
  //   }

  //   if (!isIncludedInName) {
  //     const isIncludedInDescription = recipe.description
  //       .toLowerCase()
  //       .includes(searchedString);
  //     if (isIncludedInDescription) {
  //       updatedRecipes.push(recipe.id);
  //     }

  //     if (!isIncludedInDescription) {
  //       const isIncludedInIngredients = recipe.ingredients.some((element) => {
  //         return element.ingredient.toLowerCase().includes(searchedString);
  //       });
  //       if (isIncludedInIngredients) {
  //         updatedRecipes.push(recipe.id);
  //       }
  //     }
  //   }
  // });

  //try 2 (for loop - same algo as foreach)
  // for (let i = 0; i < recipes.length; i++) {
  //   const recipe = recipes[i];
  //   const isIncludedInName = recipe.name.toLowerCase().includes(searchedString);
  //   if (isIncludedInName) {
  //     updatedRecipes.push(recipe.id);
  //   }

  //   if (!isIncludedInName) {
  //     const isIncludedInDescription = recipe.description
  //       .toLowerCase()
  //       .includes(searchedString);
  //     if (isIncludedInDescription) {
  //       updatedRecipes.push(recipe.id);
  //     }

  //     if (!isIncludedInDescription) {
  //       //replaced array.some with for loop
  //       for (let j = 0; j < recipe.ingredients.length; j++) {
  //         const ingredient = recipe.ingredients[j].ingredient;
  //         const isIncludedInIngredient = ingredient
  //           .toLowerCase()
  //           .includes(searchedString);
  //         if (isIncludedInIngredient) {
  //           updatedRecipes.push(recipe.id);
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }

  //try 3 (foreach - simplified : added function + else)
  recipes.forEach((recipe) => {
    const isInName = getIsInString(searchedString, recipe.name);
    if (isInName) {
      updatedRecipes.push(recipe.id);
    }
    //
    else {
      const isInDescription = getIsInString(searchedString, recipe.description);
      if (isInDescription) {
        updatedRecipes.push(recipe.id);
      }
      //
      else {
        const isInIngredients = recipe.ingredients.some((element) => {
          return getIsInString(searchedString, element.ingredient);
        });
        if (isInIngredients) {
          updatedRecipes.push(recipe.id);
        }
      }
    }
  });

  //try 4 (for loop - simplified : added function + else)
  // for (let i = 0; i < recipes.length; i++) {
  //   const recipe = recipes[i];
  //   const isInName = getIsInString(searchedString, recipe.name);
  //   if (isInName) {
  //     updatedRecipes.push(recipe.id);
  //   }
  //   //
  //   else {
  //     const isInDescription = getIsInString(searchedString, recipe.description);
  //     if (isInDescription) {
  //       updatedRecipes.push(recipe.id);
  //     }
  //     //
  //     else {
  //       //replaced array.some with for loop
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
  recipesFilteredFromSearchData,
  initialRecipes
};

import { recipes } from "../content/recipes.js";
const translate = {
  appliance: "Appareil",
  ustensils: "Ustensiles",
  ingredients: "Ingrédients",
};
let data;
// const initialRecipes = [...recipes];
const filters = [];
const dropdowns = ["ingredients", "appliance", "ustensils"];

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
  console.log(filters);
}

// ----- search ----- //
/**
 * @param   {String}  input    search input
 * @return  {Array}           array of recipe ids
 */
function getFilteredRecipes(input, recipes) {
  const updatedRecipes = [];
  // let updatedRecipes = [];
  console.log("start", updatedRecipes);
  const searchedString = input.toLowerCase();
  //--- search in recipe name
  //try 1
  // updatedRecipes = recipes.filter((recipe) => {
  //   const isIncluded = recipe.name.toLowerCase().includes(searchedString);
  //   console.log(searchedString, recipe.name.toLowerCase(), isIncluded)
  // });

  //try 2
  // recipes.forEach((recipe) => {
  //   const isIncluded = recipe.name.toLowerCase().includes(searchedString);
  //   if (isIncluded) {
  //     updatedRecipes.push(recipe.id);
  //   }
  // });
  // console.log("after name search", updatedRecipes);
  // recipes.forEach((recipe) => {
  //   const isIncluded = recipe.description.toLowerCase().includes(searchedString);
  //   if (isIncluded) {
  //     updatedRecipes.push(recipe.id);
  //   }
  // });
  // console.log("after description search", updatedRecipes);

  //try 3 (foreach)
  // recipes.forEach((recipe) => {
  //   const isIncludedInName = recipe.name.toLowerCase().includes(searchedString);
  //   if (isIncludedInName) {
  //     updatedRecipes.push(recipe.id);
  //   }
  //   console.log("after name search", updatedRecipes);
  //   if (!isIncludedInName) {
  //     const isIncludedInDescription = recipe.description
  //       .toLowerCase()
  //       .includes(searchedString);
  //     if (isIncludedInDescription) {
  //       updatedRecipes.push(recipe.id);
  //     }
  //     console.log("after description search", updatedRecipes);

  //     if (!isIncludedInDescription) {
  //       const isIncludedInIngredients = recipe.ingredients.some((element) => {
  //         return element.ingredient.toLowerCase().includes(searchedString);
  //       });
  //       if (isIncludedInIngredients) {
  //         updatedRecipes.push(recipe.id);
  //       }
  //       console.log("after ingredients search", updatedRecipes);
  //     }
  //   }
  // });

  //try 4 (for loop - same as foreach)
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const isIncludedInName = recipe.name.toLowerCase().includes(searchedString);
    console.log(isIncludedInName);
    if (isIncludedInName) {
      updatedRecipes.push(recipe.id);
    }
    if (!isIncludedInName) {
      const isIncludedInDescription = recipe.description
        .toLowerCase()
        .includes(searchedString);
      if (isIncludedInDescription) {
        updatedRecipes.push(recipe.id);
      }

      if (!isIncludedInDescription) {
        const isIncludedInIngredients = recipe.ingredients.some((element) => {
          return element.ingredient.toLowerCase().includes(searchedString);
        });
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j].ingredient;
          const isIncludedInIngredient = ingredient
            .toLowerCase()
            .includes(searchedString);
          if (isIncludedInIngredient) {
            updatedRecipes.push(recipe.id);
          }
        }
      }
    }
  }

  //try 5 (for loop with breaks - same as foreach)

  //try 6 (while)
  // for (let i = 0; i < recipes.length; i++) {
  //   let isIncludedInRecipe = false;

  //   const recipe = recipes[i];
  //   const isIncludedInName = recipe.name.toLowerCase().includes(searchedString);
  //   console.log(isIncludedInName);
  //   if (isIncludedInName) {
  //     updatedRecipes.push(recipe.id);
  //     return;
  //   }
  // }

  //TODO simplify isIncluded?
  //TODO add for loop version

  console.log("updatedRecipes", updatedRecipes);
  return updatedRecipes;
}

// function getIsIncludedInString (string, )

export {
  initData,
  getRecipeById,
  dropdowns,
  translate,
  removeFilter,
  addFilter,
  getFilteredRecipes,
};

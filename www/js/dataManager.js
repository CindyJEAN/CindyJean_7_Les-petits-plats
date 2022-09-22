// TODO write typedef recipe
import { recipes } from "../content/recipes.js";
const translate = {
  appliance: "Appareil",
  ustensils: "Ustensiles",
  ingredients: "Ingrédients",
};
let data;
let filters = [];
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

function search(input) {}

export { initData, getRecipeById, dropdowns, translate };

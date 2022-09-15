import { getRecipeById } from "../js/dataManager.js"

const recipe1 = getRecipeById(1);
const recipe2 = getRecipeById(2);

console.log("recipe1", recipe1);
console.log("recipe2", recipe2);

/**
 * @param   {HTMLElement}  domTarget 
 * @param   {String}  category   
 *
 * @return  {Void}             
 */
function renderDropdown(domTarget, category) {
  const dropdown = document.createElement("div");
  dropdown.id = category;
  dropdown.className = "dropdown";
  const label = getTranslation(category);
  // const fieldset = document.createElement("fieldset");
  // fieldset.className = "dropdownInput";

  dropdown.innerHTML = `
  <fieldset class="dropdownInput">
    <label for=${category+"Input"} class="hidden">
      ${label}
    </label>
    <input type="text" placeholder=${label} name=${category} id=${category+"Input"} />
    <button class="icon"></button>
  </fieldset>
  `;

  const expansion = document.createElement("div");
  expansion.className = "dropdownExpansion";

  if (dropdown.classList.contains("open")) {
    //TODO dynamique, et enlever exemple
    const suggestions = ["Lait de coco", "Crème de coco"];
    renderSuggestions(expansion, suggestions);
    dropdown.appendChild(expansion);
  }

  domTarget.appendChild(dropdown);
}

/**
 * @param   {String}  text
 * @return  {String}        translated text for display
 */
function getTranslation(text) {
  let translation;
  switch (text) {
    case "appliance":
      translation = "Appareil";
      break;
    case "ustensils":
      translation = "Ustensiles";
      break;
    case "ingredients":
      translation = "Ingrédients";
      break;
    default:
      translation = "";
  }
  return translation;
}

/**
 * @param   {HTMLElement}  domTarget    
 * @param   {Array}  suggestions  
 * @return  {Void}             
 */
function renderSuggestions(domTarget, suggestions) {
  for (const element of suggestions) {
    const button = document.createElement("button");
    button.innerText = element;
    domTarget.appendChild(button);
  }
}

export { renderDropdown };

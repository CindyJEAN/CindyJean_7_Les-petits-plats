/**
 * @param   {HTMLElement}  domTarget
 * @return  {Void}
 */
function renderSearchBar(domTarget) {
  const searchBar = document.createElement("form");
  searchBar.className = "searchBar";

  searchBar.innerHTML = `	
  <label for="recipeSearch" hidden></label>
	<input
		type="search"
		id="searchBar"
		name="recipeSearch"
		placeholder="Rechercher un ingrédient, appareil, ustentsile ou une recette"
	/>
  <button></button>
  `;

  domTarget.appendChild(searchBar);
}

export { renderSearchBar };

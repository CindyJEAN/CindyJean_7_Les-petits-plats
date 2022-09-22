/**
 * @param   {HTMLElement}  domTarget
 * @param   {Array}  filter
 * @return  {Void}
 */
function renderFilter(domTarget, filter) {
  const element = document.createElement("button");
  element.className = "filter";
  element.innerText = filter[0];
  element.classList.add(filter[1]);

  domTarget.appendChild(element);
}

export { renderFilter };

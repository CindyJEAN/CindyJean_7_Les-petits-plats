/**
 * check if searchedString is included in other string
 * @param   {String}  searchedString  in lower case
 * @param   {String}  string
 * @return  {Boolean}
 */
function getIsInString(searchedString, string) {
  return string.toLowerCase().includes(searchedString);
}

function checkAndRemove(elements) {
  if (elements) {
    elements.forEach((element) => element.remove());
  }
}

export { getIsInString };

import { dropdowns } from "./dataManager.js";

/**
 * @type   {HTMLInputElement}
 */
const searchBar = document.querySelector("#searchBar");
searchBar?.addEventListener("input", function (e) {
  console.log(searchBar.value);
  // if (element.value.length >= 3)
});


for (const dropdown of dropdowns) {
  addInputListener(dropdown);
  // handleClickOutsideListener(dropdown);
}

/**
 * add eventListener on input change and opens or closes dropdown
 * @param   {String}  id  dropdown id
 * @return  {Void}
 */
function addInputListener(id) {
  /**
   * @type   {HTMLInputElement}
   */
  const form = document?.querySelector("#" + id);
  const input = form.querySelector("input");

  input.addEventListener("input", function (e) {
    // console.log(input.value);
    if (input.value.length < 3) {
      form.classList.remove("open");
      return;
    }
    form.classList.add("open");
  });
}

//TODO close dropdown when clickaway
const handleClickOutside = (event, element) => {
  const isClickInside = element?.contains(event.target);
  if (!isClickInside) {
    element.classList.remove("open");
  }
};

// function handleClickOutsideListener(id) {
//   const form = document.querySelector("#" + id);
//   document.addEventListener("click", handleClickOutside(form));
//   function cleanup() {
//     document.removeEventListener("click", handleClickOutside(form));
//   }
//   cleanup();
// }

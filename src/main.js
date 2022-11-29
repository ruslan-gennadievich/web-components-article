import "/components/my-button/my-button.js";
import "/components/my-dropdown/my-dropdown.js";
import "/components/my-dropdown-option/my-dropdown-option.js";

const main = () => {
  const myDropdown = document.querySelector("my-dropdown");
  myDropdown.addEventListener("myDropdownChange", (event) => {
    console.log(event.type, event.detail);
    document.querySelector("html").dataset.theme = event.detail;
  });
};
window.addEventListener("DOMContentLoaded", main);

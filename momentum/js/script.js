import * as timeMod  from "./time.js";
import * as greeting from "./greeting.js"
import * as images from "./images.js"
import * as weather from "./weather.js"
import * as quotes from "./quotes.js"
import * as player from "./player.js"
import * as options from "./options.js"


window.imgApi = "git";


function setLocalStorage() {
  localStorage.setItem("city", weather.cityInput.value);
  localStorage.setItem("language", options.langSelect.value);
  localStorage.setItem("name", greeting.name.value);
  localStorage.setItem("imageTags", options.tagsInput.value);
  localStorage.setItem("imageApi", options.imageApiSelect.value);

  options.elemVisibilityInputs.forEach((elem, index) => {
    localStorage.setItem(options.elementNames[index], elem.checked)
  })
}
function getLocalStorage() {
  if (localStorage.getItem("city")) {
    weather.cityInput.value = localStorage.getItem("city");
  }
  if (localStorage.getItem("name")) {
    greeting.name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("language")) {
    options.langSelect.value = localStorage.getItem("language");
    window.langSelected = options.langSelect.value;
  }
  if (localStorage.getItem("imageTags")) {
    options.tagsInput.value = localStorage.getItem("imageTags");
  }
  if (localStorage.getItem("imageApi")) {
    options.imageApiSelect.value = localStorage.getItem("imageApi");
    window.imgApi = options.imageApiSelect.value;
  }

  options.elemVisibilityInputs.forEach((elem, index) => {
    if (localStorage.getItem(options.elementNames[index])){
      let checked = JSON.parse(
        localStorage.getItem(options.elementNames[index])
      );
      elem.checked = checked;
      if (!checked) {
        document.querySelector(options.elementNames[index]).style.visibility =
          "hidden";
      }
    }
  });
}


window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", () => {
  getLocalStorage();
  setTimeout(() => {
    weather.drawOnResponse();
  }, 500);
  quotes.printOnResponse();
  options.translateOptions();
  images.setBg();
});
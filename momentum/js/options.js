import { printOnResponse } from "./quotes.js";
import { drawOnResponse } from "./weather.js"
import { setBg } from "./images.js";

const options = document.querySelector(".options-panel");
const optionsBtn = document.querySelector(".options-button");
export const langSelect = document.querySelector('.language');
export const tagsInput = document.querySelector(".tags");
export const imageApiSelect = document.querySelector(".image-api");
const captions = document.querySelectorAll('.caption');
const optionTranslation = {
  en: {
    lang: "Language",
    img: "Image Source",
    tags: "Image tags",
    tagsDescr: "(english only, separated by coma)",
  },
  ru: {
    lang: "Язык",
    img: "Источник изображений",
    tags: "Теги изображений",
    tagsDescr: "(только английский, разделены запятыми)",
  },
};

export function constructQuerry () {
  return tagsInput.value.replace(/ /g, "").toLowerCase();
}

window.langSelected = langSelect.value;

export function translateOptions() {
  captions[0].textContent = optionTranslation[window.langSelected].lang;
  captions[1].textContent = optionTranslation[window.langSelected].img;
  captions[2].textContent = optionTranslation[window.langSelected].tags;
  captions[3].textContent = optionTranslation[window.langSelected].tagsDescr;
}

// window.onclick = (e) => {
//   if (e.target != options && e.target != optionsBtn && e.target != document.querySelector('.option-icon')) {
//     options.classList.remove('active');
//     console.log(e.target);
//   }
// }
optionsBtn.onclick = () => {
  options.classList.toggle("active");
};

langSelect.onchange = () => {
  window.langSelected = langSelect.value;
  printOnResponse();
  drawOnResponse();
  translateOptions();
}

tagsInput.onchange = () => {
  console.log(constructQuerry());
}
imageApiSelect.onchange = () => {
  window.imgApi = imageApiSelect.value;
  setBg();
}
import { printOnResponse } from "./quotes.js";
import { drawOnResponse, cityInput } from "./weather.js"
import { setBg, unsplashPhotos, flickrPhotos } from "./images.js";
import { name } from "./greeting.js";


const options = document.querySelector(".options-panel");
const optionsBtn = document.querySelector(".options-button");
export const langSelect = document.querySelector('.language');
export const tagsInput = document.querySelector(".tags");
export const imageApiSelect = document.querySelector(".image-api");
const captions = document.querySelectorAll('.caption');
export const elemVisibilityInputs = document.querySelectorAll(".visibility");
export const elementNames = ['.player', '.weather', '.time', '.date', '.greeting-container', '.quotes'];
const optionTranslation = {
  en: {
    lang: "Language",
    img: "Image Source",
    tags: "Image tags",
    tagsDescr: "(english only, separated by coma)",
    visib: "Element visibility",
    player: "Player",
    weather: "Weather",
    time: "Time",
    date: "Date",
    greeting: "Greeting",
    quotes: "Quotes",
    name: "[Your name]",
    city: "[Enter city]",
  },
  ru: {
    lang: "Язык",
    img: "Источник изображений",
    tags: "Теги изображений",
    tagsDescr: "(только английский, разделены запятыми)",
    visib: "Видимость элементов",
    player: "Плеер",
    weather: "Погода",
    time: "Время",
    date: "Дата",
    greeting: "Приветствие",
    quotes: "Цитаты",
    name: "[Ваше имя]",
    city: "[Введите город]",
  },
};
window.langSelected = langSelect.value;

export function constructQuerry () {
  return tagsInput.value.replace(/ /g, "").toLowerCase();
}

export function hideElem(elem) {
  elem.style.opacity = '0';
  setTimeout(() => {
    elem.style.visibility = 'hidden';
  }, 500);
}
export function showElem(elem) {
  elem.style.opacity = "0";
  setTimeout(() => {
    elem.style.visibility = "visible";
    elem.style.opacity = "1";
  }, 500);
}

export function translateOptions() {
  cityInput.placeholder = optionTranslation[window.langSelected].city;
  name.placeholder = optionTranslation[window.langSelected].name;

  captions[0].textContent = optionTranslation[window.langSelected].lang;
  captions[1].textContent = optionTranslation[window.langSelected].img;
  captions[2].textContent = optionTranslation[window.langSelected].tags;
  captions[3].textContent = optionTranslation[window.langSelected].tagsDescr;
  captions[4].textContent = optionTranslation[window.langSelected].visib;
  captions[5].textContent = optionTranslation[window.langSelected].player;
  captions[6].textContent = optionTranslation[window.langSelected].weather;
  captions[7].textContent = optionTranslation[window.langSelected].time;
  captions[8].textContent = optionTranslation[window.langSelected].date;
  captions[9].textContent = optionTranslation[window.langSelected].greeting;
  captions[10].textContent = optionTranslation[window.langSelected].quotes;
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

// tagsInput.onchange = () => {
//   setBg();
// }
imageApiSelect.onchange = () => {
  window.imgApi = imageApiSelect.value;
  setBg();
}
elemVisibilityInputs.forEach((elem, index) => {
  elem.onchange = () => {
    if (elem.checked) {
      showElem(document.querySelector(elementNames[index]));
    } else {
      hideElem(document.querySelector(elementNames[index]));
    }
  }
})
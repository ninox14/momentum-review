const greetingElem = document.querySelector(".greeting");
export const name = document.querySelector(".name");
const greeting = {
  en: 'Good',
  ru: 'Добр'
}
const traslatedTimeOfDay = {
  night: "ой ночь",
  morning: "ое утро",
  afternoon: "ый день",
  evening: "ый вечер",
};

export function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  switch (Math.floor(hours / 6)) {
    case 0: return "night";
    case 1: return "morning";
    case 2: return "afternoon";
    case 3: return "evening";
  }
}
export function printGreeting(lang = 'en') {
  let timeOfday;
  if (!lang) lang = 'en';
  if (lang == 'en') {
    timeOfday = ` ${getTimeOfDay()}`;
  } else {
    timeOfday = `${traslatedTimeOfDay[getTimeOfDay()]}`;
  }

  greetingElem.textContent = `${greeting[lang]}${timeOfday},`;
}
function setLocalStorage() {
  localStorage.setItem("name", name.value);
}
function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}


window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);
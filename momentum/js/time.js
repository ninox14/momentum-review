import { printGreeting } from "./greeting.js";

const timeElem = document.querySelector('.time');
const dateElem = document.querySelector('.date');

export function showTime () {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  timeElem.textContent = currentTime;
  showDate();
  printGreeting(window.langSelected);
  setTimeout(showTime, 1000);
}
showTime();

function showDate () {
  const date = new Date();
  const options = {
    weekday: 'long',
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  let lang;
  if (!window.langSelected) {
    lang = 'en-US';
  } else {
    lang = window.langSelected == "en" ? "en-US" : "ru-RU";
  }
  const currentDate = date.toLocaleDateString(lang, options);
  dateElem.textContent = currentDate;
}
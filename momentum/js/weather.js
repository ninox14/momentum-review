export const cityInput = document.querySelector('.city');
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector('.wind');
const humidity = document.querySelector(".humidity");
const weatherError = document.querySelector(".weather-error");

async function getWeather(lang = 'en') {
  let city = cityInput.value;
  if (localStorage.getItem('city') === null && !cityInput.value) {
    city = cityInput.dataset.city;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=39f22f01cd236dc4f5f50624afc22468&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  return new Promise(resolve => {
    resolve(data);
  });
}

function drawWeather(data) {
  if (data.cod == "404" || !data.name) {
    weatherIcon.className = "weather-icon owf";
    weatherError.textContent = !cityInput.value ? `${window.langSelected == 'en'? 'Type in your city' : 'Укажите ваш город'}` : data.message;
    temperature.textContent = ``;
    weatherDescription.textContent = "";
    wind.textContent = ``;
    humidity.textContent = ``;
    return;
  }
  weatherIcon.className = "weather-icon owf";
  weatherError.textContent = '';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.ceil(data.main.temp)} °C`;
  weatherDescription.textContent = data.weather[0].description;
  cityInput.value = data.name;
  wind.textContent = `${
    window.langSelected == "en" ? "Wind speed" : "Скорость ветра"
  }: ${Math.ceil(data.wind.speed)} ${
    window.langSelected == "en" ? "m/s" : "м/с"
  }`;
  humidity.textContent = `${
    window.langSelected == "en" ? "Humidity" : "Влажность"
  }: ${data.main.humidity} %`;
}



export async function drawOnResponse() {
  let data = await getWeather(window.langSelected);
  drawWeather(data);
}


// window.addEventListener("load", () => {
//   drawOnResponse();
// });

cityInput.addEventListener('change', function (e) {
  if (!cityInput.value) {
    drawWeather({ cod: "404" });
    return;
  }
  drawOnResponse();
});


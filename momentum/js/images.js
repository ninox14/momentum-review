import { getTimeOfDay } from "./greeting.js";
import { constructQuerry, tagsInput } from "./options.js";

const body = document.querySelector("body");
const prevButton = document.querySelector(".slide-prev");
const nextButton = document.querySelector(".slide-next");
export let flickrPhotos;
export let unsplashPhotos;

let timeOfDay = getTimeOfDay();
let bgNum = getRandomNum().toString().padStart(2, "0");

export function getRandomNum(max = 20) {
  return Math.floor(Math.random() * max) + 1;
}

async function getLinkToImageUsplash() {
  if (unsplashPhotos) {
    return unsplashPhotos[getRandomNum(unsplashPhotos.length)].urls.regular;
  }
  let query = `${timeOfDay},${constructQuerry()}`;
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${query}&count=30&client_id=zOHIq58LlPlqR_BJTYWmw_Rh6m616AHHDL0OnRTEoVc`;
  const res = await fetch(url);
  const data = await res.json();
  unsplashPhotos = data;
  return unsplashPhotos[getRandomNum(unsplashPhotos.length)].urls.regular;
}

async function getFlickrColection() {
  let query = `${timeOfDay},${constructQuerry()}`;
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a954f51c969e6cf4c5e356d56bcd9d6d&tags=${query}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data.photos.photo;
}

export async function setBg(bgNum) {
  let link;
  if (!bgNum) {
    bgNum = getRandomNum().toString().padStart(2, "0");
  }
  const img = new Image();

  switch (window.imgApi) {
    case "git":
      img.src = `https://raw.githubusercontent.com/ninox14/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
      break;
    case "unsplash":
      link = await getLinkToImageUsplash();
      link = link.slice(0, link.length - 4) + "1900";
      img.src = link;
      break;
    case "flickr":
      if (!flickrPhotos) {
        flickrPhotos = await getFlickrColection();
        link = flickrPhotos[getRandomNum(flickrPhotos.length)].url_l;
        img.src = !link
          ? flickrPhotos[getRandomNum(flickrPhotos.length)].url_l
          : link;
        break;
      } else {
        link = flickrPhotos[getRandomNum(flickrPhotos.length)].url_l;
        img.src = !link
          ? flickrPhotos[getRandomNum(flickrPhotos.length)].url_l
          : link;
      }
  }

  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  };
}
setBg(bgNum);

function getSlidePrev() {
  let bgNumInt = parseInt(bgNum) - 1;
  if (bgNumInt == 0) {
    bgNum = `20`;
    setBg(bgNum);
    return;
  }
  bgNum = bgNumInt.toString().padStart(2, "0");
  setBg(bgNum);
}
function getSlideNext() {
  let bgNumInt = parseInt(bgNum) + 1;
  if (bgNumInt == 20) {
    bgNum = `01`;
    setBg(bgNum);
    return;
  }
  bgNum = bgNumInt.toString().padStart(2, "0");
  setBg(bgNum);
}

prevButton.addEventListener("click", function (e) {
  getSlidePrev();
  prevButton.disabled = true;
  setTimeout(function () {
    prevButton.disabled = false;
  }, 1000);
});
nextButton.addEventListener("click", function (e) {
  getSlideNext();
  nextButton.disabled = true;
  setTimeout(function () {
    nextButton.disabled = false;
  }, 1000);
});
tagsInput.onchange = () => {
  flickrPhotos = null;
  unsplashPhotos = null;
  setBg();
}
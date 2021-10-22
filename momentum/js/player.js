import playlist from "./playList.js";


const audio = document.querySelector("audio");
const playBtn = document.querySelector('.play');
const playNextBtn = document.querySelector(".play-next");
const playPrevBtn = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-filled');
const volumeBtn = document.querySelector(".volume-button");
const volume = document.querySelector(".volume-slider");
const volumeBar = document.querySelector(".volume-percentage");
const duration = document.querySelector('.duration');
const currentTime = document.querySelector(".current");
const songName = document.querySelector(".song-name");

let playIndex = 0;

playlist.forEach((el) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = el.title;
  const span = document.createElement('span');
  span.classList.add("play-item-mask");
  li.append(span);
  playListContainer.append(li);
});

const playlistCildern = playListContainer.querySelectorAll(".play-item");
const playMasks = playListContainer.querySelectorAll(".play-item-mask");
const playlistNode = (index) => {
  return playListContainer.children[index];
}


function toggleAudio () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
function playNext() {
  updateListBtn();
  playlistNode(playIndex).classList.remove("item-active");
  playIndex++;
  if (playIndex > playlist.length - 1) {
    playIndex = 0;
  }
  playlistNode(playIndex).classList.add("item-active");
  audio.src = playlist[playIndex].src;
}
function playPrev() {
  updateListBtn();
  playlistNode(playIndex).classList.remove("item-active");
  playIndex--;
  if (playIndex < 0) {
    playIndex = playlist.length - 1;
  }
  playlistNode(playIndex).classList.add("item-active");
  audio.src = playlist[playIndex].src;
}
function updateButton() {
  const icon = audio.paused
    ? 'url("../assets/svg/play.svg")'
    : 'url("../assets/svg/pause.svg")';
  playlistNode(playIndex).style.setProperty("--playButton", icon);
  if (playBtn.classList.contains('active') && audio.paused) {
    playBtn.classList.remove('active');
    return;
  } else if (playBtn.classList.contains("active") && !audio.paused) {
    return;
  }
  playBtn.classList.toggle("active");
}
function updateListBtn() {
  playlistNode(playIndex).style.setProperty(
    "--playButton",
    'url("../assets/svg/play.svg")'
  );
}
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}
function handleVolumeBtn() {
  const volumeEl = volumeBtn.firstElementChild;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
}


playNextBtn.onclick = () => {
  playNext();
  playBtn.classList.remove("active");
}

playPrevBtn.onclick = () => {
  playPrev();
  playBtn.classList.remove("active");
};

playBtn.onclick = () => {
  toggleAudio();
  playlistNode(playIndex).classList.add("item-active");
}
audio.addEventListener("play", updateButton);
audio.addEventListener("pause", updateButton);

volume.addEventListener('click', function (e) {
  const sliderWidth = window.getComputedStyle(volume).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audio.volume = newVolume;
  volumeBar.style.width = newVolume * 100 + "%";
  audio.muted = false;
  handleVolumeBtn();
});

volumeBtn.onclick = () => {
  audio.muted = !audio.muted;
  handleVolumeBtn();
}

progress.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(progress).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

audio.addEventListener('loadeddata', function (e) {
  duration.textContent = getTimeCodeFromNum(audio.duration);
  songName.textContent = playlist[playIndex].title;
  audio.volume = 0.4;
});
window.onload = () => {
  duration.textContent = playlist[playIndex].duration;
  audio.volume = 0.4;
}


audio.ontimeupdate = () => {
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
}


playlistCildern.forEach((el, index) => {
  el.addEventListener('click', function (e) {
    playlistCildern[playIndex].classList.remove('item-active');
    updateListBtn();
    playIndex = index;
    this.classList.add("item-active");
    if (audio.src.match(/[ \w-]+\./)[0] == playlist[playIndex].src.match(/[ \w-]+\./)[0]) {
      return;
    }
    audio.src = playlist[playIndex].src;
  });
})

playMasks.forEach(el => {
  el.addEventListener('click', function (e) {
    setTimeout(() => {
      toggleAudio();
    }, 100);
  });
})
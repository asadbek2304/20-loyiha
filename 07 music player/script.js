const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
  {
    name: "aaa1",
    displayName: "sdafl",
    artist: "sadfsd",
  },
  {
    name: "aaa2",
    displayName: "sdfas",
    artist: "RyZe",
  },
  {
    name: "aaa3",
    displayName: "sadfas",
    artist: "asdfsd",
  },
];

let isPlaying = false;

function playMusic() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseMusic() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", () =>
  isPlaying ? pauseMusic() : playMusic()
);

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

let currentSong = 0;

//oldingi qo'shiq
function prevSong() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }
  loadSong(songs[currentSong]);
  playMusic();
}

//keyingi qo'shiq
function nextSong() {
  currentSong++;
  if (currentSong > songs.length - 1) {
    currentSong = 0;
  }
  loadSong(songs[currentSong]);
  playMusic();
}

loadSong(songs[currentSong]);
let durationMinutes, durationSeconds;

function CalcTime(time, element) {
  durationMinutes = Math.floor(time / 60);
  durationSeconds = Math.floor(time % 60);
  if (durationSeconds < 10) {
    durationSeconds = `0${durationSeconds}`;
  }

  if (durationSeconds) {
    element.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    CalcTime(duration, durationEl);

    CalcTime(currentTime, currentTimeEl)
  }
};

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener('ended', nextSong)
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener('click', setProgress)
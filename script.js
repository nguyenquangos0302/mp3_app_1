const musicSongTitleElm = document.querySelector(".music__song--title");
const musicSongImgElm = document.querySelector(".music__song--img");
const musicTitleElm = document.querySelector(".music__title");
const musicAuthorElm = document.querySelector(".music__author");
const songElm = document.querySelector("#song");
const playBtnElm = document.querySelector(".music__play");
const playBackwardElm = document.querySelector(".music__function--backward");
const playForwardElm = document.querySelector(".music__function--forward");
const musicTimmerDurationElm = document.querySelector(
  ".music__timmer--duration"
);
const musicTimmerRemaing = document.querySelector(".music__timmer--remaing");
const rangeBar = document.querySelector(".range");

const listMusic = [
  {
    song: "BeautifulInWhite",
    title: "Beautiful In White",
    author: "Shane Filan",
    image:
      "https://images.unsplash.com/photo-1641621393945-881745ee9978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    song: "MuaTrenPhoBayXa",
    title: "Mua Tren Pho Bay Xa",
    author: "Thuy Chi",
    image:
      "https://images.unsplash.com/photo-1641670715335-f05e1f6bb2ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    song: "MyHeartWillGoOn",
    title: "My Heart Will Go On",
    author: "Céline Dion",
    image:
      "https://images.unsplash.com/photo-1641728718768-d3598c6639b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
  },
];

let isPlaying = false;

let isRepeat = false;

let indexSong = 0;

let timmer;

const setSongCurrent = (index) => {
  if (index >= listMusic.length - 1) {
    musicSongTitleElm.innerHTML = listMusic[0].title;
  } else {
    musicSongTitleElm.innerHTML = listMusic[index + 1].title;
  }

  musicSongImgElm.setAttribute("src", listMusic[index].image);
  musicAuthorElm.innerHTML = listMusic[index].author;
  songElm.setAttribute("src", `./music/${listMusic[index].song}.mp3`);
  musicTitleElm.innerHTML = listMusic[index].title;
  rangeBar.value = 0;
};

const playSong = (isPlaying) => {
  if (isPlaying) {
    songElm.play();
    playBtnElm.classList.remove("fa-play");
    playBtnElm.classList.add("fa-pause");
    musicSongImgElm.classList.add("playing");
    timmer = setInterval(() => displayTimmer(songElm), 500);
  } else {
    songElm.pause();
    playBtnElm.classList.add("fa-play");
    playBtnElm.classList.remove("fa-pause");
    musicSongImgElm.classList.remove("playing");
    clearInterval(timmer);
  }
};

const changeSong = (dir) => {
  indexSong += dir;
  if (indexSong >= listMusic.length) {
    indexSong = 0;
  } else if (indexSong < 0) {
    indexSong = listMusic.length - 1;
  }
  setSongCurrent(indexSong);
  playSong(isPlaying);
};

const formatTimmer = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
};

const displayTimmer = (songElm) => {
  const { duration, currentTime } = songElm;
  musicTimmerRemaing.innerHTML = formatTimmer(currentTime);
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  if (!duration) {
    musicTimmerDurationElm.innerHTML = "00:00";
  } else {
    musicTimmerDurationElm.innerHTML = formatTimmer(duration - currentTime);
  }
};

playBtnElm.addEventListener("click", (event) => {
  event.preventDefault();
  isPlaying = !isPlaying;
  playSong(isPlaying);
});

playBackwardElm.addEventListener("click", (event) => {
  event.preventDefault();
  changeSong(-1);
});

playForwardElm.addEventListener("click", (event) => {
  event.preventDefault();
  changeSong(1);
});

rangeBar.addEventListener("input", (event) => {
  event.preventDefault();
  song.currentTime = rangeBar.value;
  displayTimmer(songElm);
});

song.addEventListener("loadedmetadata", (event) => {
  displayTimmer(songElm);
});

song.addEventListener("ended", (event) => {
  event.preventDefault();

  if (isRepeat) {
  } else {
    changeSong(1);
  }
});

(function startApp() {
  setSongCurrent(indexSong);
})();

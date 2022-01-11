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
const musicFunctionSpecialElm = document.querySelector(
  ".music__function--special"
);

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

// countFunctionSpecial = 0 -> next
// countFunctionSpecial = 1 -> random
// countFunctionSpecial = 2 -> next + repeat
// countFunctionSpecial = 3 -> repeat
let countFunctionSpecial = 0;

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

const changeSongRandom = (song) => {
  setSongCurrent(song);
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

const handlerSongNext = (dir) => {
  changeSong(dir);
};

const randomSong = (indexSongCurrent) => {
  let index = Math.floor(Math.random() * listMusic.length);
  while (index === indexSongCurrent) {
    index = Math.floor(Math.random() * listMusic.length);
  }
  return index;
};

const handlerSongRandom = () => {
  const randomIndex = randomSong(indexSong);
  indexSong = randomIndex;
  changeSongRandom(indexSong);
};

const handlerSongRepeatAndLoop = (dir) => {
  changeSong(dir);
};

const handlerSongRepeat = () => {
  changeSong(indexSong);
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

  switch (countFunctionSpecial) {
    case 0:
      if (indexSong === listMusic.length - 1) {
        isPlaying = !isPlaying;
        playSong(isPlaying);
        break;
      }
      handlerSongNext(1);
      break;
    case 1:
      handlerSongRandom();
      break;
    case 2:
      handlerSongRepeatAndLoop(1);
      break;
    case 3:
      handlerSongRepeat();
      break;
  }
});

musicFunctionSpecialElm.addEventListener("click", (event) => {
  event.preventDefault();
  musicFunctionSpecialElm.classList.remove("fa-long-arrow-alt-right");
  musicFunctionSpecialElm.classList.remove("fa-random");
  musicFunctionSpecialElm.classList.remove("fa-redo-alt");
  musicFunctionSpecialElm.classList.remove("fa-retweet");
  switch (countFunctionSpecial) {
    case 0:
      musicFunctionSpecialElm.classList.add("fa-random");
      break;
    case 1:
      musicFunctionSpecialElm.classList.add("fa-redo-alt");
      break;
    case 2:
      musicFunctionSpecialElm.classList.add("fa-retweet");
      break;
    case 3:
      musicFunctionSpecialElm.classList.add("fa-long-arrow-alt-right");
      break;
  }
  countFunctionSpecial++;
  if (countFunctionSpecial > 3) {
    countFunctionSpecial = 0;
  }
});

(function startApp() {
  setSongCurrent(indexSong);
})();

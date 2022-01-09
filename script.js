const musicSongTitleElm = document.querySelector(".music__song--title");
const musicSongImgElm = document.querySelector(".music__song--img");
const musicTitleElm = document.querySelector(".music__title");
const musicAuthorElm = document.querySelector(".music__author");
const songElm = document.querySelector("#song");
const playBtnElm = document.querySelector(".music__play");
const playBackwardElm = document.querySelector(".music__function--backward");
const playForwardElm = document.querySelector(".music__function--forward");

let isPlaying = false;
let indexSong = 0;
const listMusic = [
  {
    song: "BeautifulInWhite",
    title: "Beautiful In White",
    author: "Shane Filan",
    image:
      "https://images.unsplash.com/photo-1640301319184-b8c03be02126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MTcyODg0Nw&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    song: "MuaTrenPhoBayXa",
    title: "Mua Tren Pho Bay Xa",
    author: "Thuy Chi",
    image:
      "https://images.unsplash.com/photo-1639425341863-7844372c3c08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MTcyODg3NA&ixlib=rb-1.2.1&q=80&w=1080",
  },
  {
    song: "MyHeartWillGoOn",
    title: "My Heart Will Go On",
    author: "Céline Dion",
    image:
      "https://images.unsplash.com/photo-1641615676781-d5b6ae7c8a4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY0MTcyODg5OQ&ixlib=rb-1.2.1&q=80&w=1080",
  },
];

const setSongCurrent = (index) => {
  if (index >= listMusic.length - 1) {
    musicSongTitleElm.innerHTML = listMusic[0].title;
  } else {
    musicSongTitleElm.innerHTML = listMusic[index + 1].title;
  }

  musicSongImgElm.innerHTML = listMusic[index].image;
  musicAuthorElm.innerHTML = listMusic[index].author;
  songElm.setAttribute("src", `./music/${listMusic[index].song}.mp3`);
  musicTitleElm.innerHTML = listMusic[index].title;
};

const playSong = () => {
  if (isPlaying) {
    songElm.play();
    playBtnElm.classList.remove("fa-play");
    playBtnElm.classList.add("fa-pause");
    musicSongImgElm.classList.add("playing");
  } else {
    songElm.pause();
    playBtnElm.classList.add("fa-play");
    playBtnElm.classList.remove("fa-pause");
    musicSongImgElm.classList.remove("playing");
  }
};

playBtnElm.addEventListener("click", (event) => {
  event.preventDefault();
  isPlaying = !isPlaying;
  playSong(isPlaying);
});

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

playBackwardElm.addEventListener("click", (event) => {
  event.preventDefault();
  changeSong(-1);
});

playForwardElm.addEventListener("click", (event) => {
  event.preventDefault();
  changeSong(1);
});

(function startApp() {
  setSongCurrent(indexSong);
})();

console.log('start to write the logic');


// logic starts
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
playPauseBtn = wrapper.querySelector(".play-pause"),
prevBtn = wrapper.querySelector("#prev"),
nextBtn = wrapper.querySelector("#next"),
mainAudio = wrapper.querySelector("#main-audio"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
moreMusicBtn = wrapper.querySelector("#more-music"),
closemoreMusic = musicList.querySelector("#close");


let musicIndex = Math.floor((Math.random() * allMusic.length) + 1)

isMusicPaused = true;


window.addEventListener("load" , ()=> {
    loadMusic(musicIndex);
    playingSong();
})

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

playPauseBtn.addEventListener("click", ()=> {
    const isMusicPaused = wrapper.classList.contains("paused");  
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPaused ? pauseMusic() : playMusic();
    
  });

  //play music function
  function playMusic() {
      wrapper.classList.add("paused");
      playPauseBtn.querySelector("i").innerText = "pause";
      mainAudio.play();
      playingSong();
    }



function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
  }

  prevBtn.addEventListener("click", ()=> {
    prevMusic();
  });
  
  //next music button event
  nextBtn.addEventListener("click", ()=> {
    nextMusic();
  });

  function prevMusic() {
      musicIndex--
      
      musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex
      loadMusic(musicIndex);
      playMusic();
      playingSong();
  }

  function nextMusic() {
      musicIndex++
           
      musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
      loadMusic(musicIndex);
      playMusic();
      playingSong();
  }

  mainAudio.addEventListener('timeupdate', (e)=> {
      const currentTime = e.target.currentTime;
      const duration = e.target.duration;

      let progressWidth = (currentTime / duration) *100;
      progressBar.style.width = `${progressWidth}%`

      //update dong total duration
      const musicCurrentTime = wrapper.querySelector('.current-time'),
      musicDuration = wrapper.querySelector('.max-duration')

     // update song total duration
    let mainAdDuration = mainAudio.duration;

    let totalMin = Math.floor(mainAdDuration / 60);
    let totalSec = Math.floor(mainAdDuration % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;

    //update currentTime duration
    let currentmin = Math.floor(currentTime / 60)
    let currentsec = Math.floor(currentTime % 60)

    if(currentsec < 10) {
        currentsec = `0${currentsec}`
    }

    musicCurrentTime.innerText = `${currentmin}:${currentsec}`
  });


  progressArea.addEventListener('click', (e) => {
      const progressWidth = progressArea.clientWidth;
      const clickedoffsetX = e.offsetX
      let  songDuration = mainAudio.duration;

      mainAudio.currentTime = (clickedoffsetX / progressWidth ) * songDuration;
      playMusic();      
      playingSong();
  });

  moreMusicBtn.addEventListener('click', ()=> {
    musicList.classList.toggle('show')
  });

  closemoreMusic.addEventListener('click', ()=> {
    moreMusicBtn.click();
  })

  let ulTag = wrapper.querySelector('ul');

  for (let i = 0; i < allMusic.length; i++) {
    const liTag = ` <li li-index = ${i+1}>
    <div class="row">
      <span>${allMusic[i].name}</span>
      <p>${allMusic[i].artist}</p>
    </div>
    <span id = "${allMusic[i].src}" class="audio-duration">
      3:40
    </span>
    <audio class= "${allMusic[i].src}" src= "songs/${allMusic[i].src}.mp3"
  </li>`

  ulTag.insertAdjacentHTML('beforeend', liTag)


  const liaudioDurationTag = ulTag.querySelector(`#${allMusic[i].src}`)
  const liaudioTag = ulTag.querySelector(`.${allMusic[i].src}`)

  liaudioTag.addEventListener('loadeddata', ()=> {
    const duartion = liaudioTag.duration;

  let totalMin = Math.floor(duartion / 60);
    let totalSec = Math.floor(duartion % 60);
    if(totalSec < 10){ //if sec is less than 10 then add 0 before it
      totalSec = `0${totalSec}`;
    }
   liaudioDurationTag.innerText = `${totalMin}:${totalSec}`;

   liaudioDurationTag.setAttribute("t-duration", `${totalMin}:${totalSec}`);
  })
  }

  function playingSong(){
    const allLiTag = ulTag.querySelectorAll("li");
    
    for (let j = 0; j < allLiTag.length; j++) {
      let audioTag = allLiTag[j].querySelector(".audio-duration");
      
      if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing");
        let adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
      }
  
      //if the li tag index is equal to the musicIndex then add playing class in it
      if(allLiTag[j].getAttribute("li-index") == musicIndex){
        allLiTag[j].classList.add("playing");
        audioTag.innerText = "Playing";
      }
  
      allLiTag[j].setAttribute("onclick", "clicked(this)");
    }
  }


 function clicked(element) {
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}


// last thing loop / repeat and all songs repeat

const repeatBtn = wrapper.querySelector('#repeat-plist')
 
repeatBtn.addEventListener('click', ()=> {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      repeatBtn.innerText = 'repeat_one'
      repeatBtn.setAttribute('title', "song looped")
      break;
    case "repeat_one":
      repeatBtn.innerText = 'shuffle'
      repeatBtn.setAttribute('title', "Playback shuffled")
      break;
    case "shuffle":
      repeatBtn.innerText = 'repeat'
      repeatBtn.setAttribute('title', "Playlist Looped")
      break;
  }
});


mainAudio.addEventListener('ended', ()=> {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      nextMusic();
      break;

    case "repeat_one":
     mainAudio.currentTime = 0;
     loadMusic(musicIndex)
     playMusic();
      break;

    case "shuffle":
      let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      do {
        randIndex = Math.floor((Math.random() * allMusic.length) + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex
      loadMusic(musicIndex);
      playMusic();
      playingSong();
      break;


      
  }
})
  




  
  
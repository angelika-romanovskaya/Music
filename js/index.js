const player = document.querySelector('#player');
const volume= document.querySelector('.volume');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const repeatBtn = document.querySelector('#repeat');
const shuffleBtn = document.querySelector('#shuffle');
const volumeBtn = document.querySelector('#volume');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const volumeProgress = document.querySelector('#volume__progress');
const timelineProgress = document.querySelector('#timeline__progress');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const currentValue = document.querySelector('#currentValue');
const maxValue = document.querySelector('#maxValue')
const track__img = document.querySelector('.track__img')

const songs = ["А лето цвета неба", "Двигаться", "Царица"];
const songsAuthor = ["Юрий Шатунов", "Raim", "Анна Асти"];

let songIndex = 0
let currentVolume = 0;

function loadSong(song){
    title.innerHTML = song;
    author.innerHTML = songsAuthor[songs.indexOf(song)];
    audio.src = `./audio/${song}.mp3`
    track__img.src = `./audio/img/${song}.jpg`
    volumeProgress.value = audio.volume
    currentVolume = audio.volume;
    if(volumeProgress.value > 0){
        volume.classList.remove('null')
    }
}

function playSong(){
    player.classList.add('play')
    audio.play()
    playBtn.setAttribute('src', './img/icon/Pause.svg' );
    track__img.classList.add('track__active')
}

function pauseSong(){
    player.classList.remove('play')
    audio.pause()
    playBtn.setAttribute('src', './img/icon/Play.svg' );
    track__img.classList.remove('track__active')
}

function nextSong(){
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

function prevSong(){
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex])
    playSong()
}

function updateTimeline(e){
    const {duration, currentTime} = e.srcElement;
    timelineProgress.setAttribute('max', duration)
    timelineProgress.value = currentTime
    let min = Math.trunc(audio.currentTime/60);
    let sec = Math.floor(audio.currentTime - (Math.trunc(audio.currentTime/60) * 60))
    currentValue.innerHTML = `${min}:${sec > 9 ? sec : '0' + sec}`
}

function setTimeline(e){
    const width = timelineProgress.clientWidth
    const click = e.offsetX
    const duration = audio.duration
    audio.currentTime = (click/width) * duration
    let min = Math.trunc(audio.currentTime/60);
    let sec = Math.floor(audio.currentTime - (Math.trunc(audio.currentTime/60) * 60))
    currentValue.innerHTML = `${min}:${sec > 9 ? sec : '0' + sec}`
}

function repeatSong(){
    const isRepeat = repeatBtn.classList.contains('active')
    if(isRepeat){
        repeatBtn.classList.remove('active')
    } else{
        repeatBtn.classList.add('active')
    }
}

function shuffleSong(){
    const isShuffle = shuffleBtn.classList.contains('active')
    if(isShuffle){
        shuffleBtn.classList.remove('active')
    } else{
        shuffleBtn.classList.add('active')
    }
}

function volumeNull(){
    volume.classList.add('null')
    audio.volume = 0
}

function volumePlay(){
    volume.classList.remove('null')
    audio.volume = currentVolume
}

function updateVolume(e){
    const {volume} = e.srcElement;
    volumeProgress.setAttribute('max', '1')
    volumeProgress.value = volume
}

function setVolume(e){
    const width = volumeProgress.clientWidth
    const click = e.offsetX
    audio.volume = (click/width) * 1
    currentVolume = (click/width) * 1
    if(volume.classList.contains('null')){
        volume.classList.remove('null')
    }
}

loadSong(songs[songIndex]) 

audio.addEventListener('canplaythrough', ()=>{
    let min = Math.trunc(audio.currentTime/60);
    let sec = Math.floor(audio.currentTime - (Math.trunc(audio.currentTime/60) * 60))
    currentValue.innerHTML = `${min}:${sec > 9 ? sec : '0' + sec}`
    maxValue.innerHTML = `${Math.trunc(audio.duration/60)}:${Math.floor(audio.duration - (Math.trunc(audio.duration/60) * 60))}`;
})

playBtn.addEventListener('click', ()=>{
   const isPlay = player.classList.contains('play')
   if(isPlay){
    pauseSong()
   } else{
    playSong()
   }
})

nextBtn.addEventListener('click', nextSong)

prevBtn.addEventListener('click', prevSong)

audio.addEventListener('timeupdate', updateTimeline)

timelineProgress.addEventListener("click", setTimeline)

audio.addEventListener('ended', ()=>{
    const isRepeat = repeatBtn.classList.contains('active')
    const isShuffle = shuffleBtn.classList.contains('active')
    if(isRepeat){
        loadSong(songs[songIndex])
        playSong()
    } else{
        if(isShuffle){
            songIndex = Math.floor(Math.random() * songs.length)
            loadSong(songs[songIndex])
            playSong()
        } else{
            nextSong();
        }
    }
})

repeatBtn.addEventListener('click', repeatSong)

shuffleBtn.addEventListener('click', shuffleSong)

volumeBtn.addEventListener('click', ()=>{
    const isVolume = volume.classList.contains('null')
   if(isVolume){
    volumePlay()
   } else{
    volumeNull()
   }
})

audio.addEventListener('volumechange', updateVolume)

volumeProgress.addEventListener("click", setVolume)
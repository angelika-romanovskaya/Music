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
const maxValue = document.querySelector('#maxValue');
const track__img = document.querySelector('.track__img');


let songIndex = 0;
let currentVolume = 0;


function loadSong(song, songAuthor){
    title.innerHTML = song;
    author.innerHTML = songAuthor;
    audio.src = `./audio/${song}.mp3`;
    track__img.src = `./audio/img/${song}.jpg`;
    volumeProgress.value = audio.volume;
    currentVolume = audio.volume;
    if(volumeProgress.value > 0){
        volume.classList.remove('null');
    }
}

function playSong(){
    player.classList.add('play');
    audio.play();
    playBtn.setAttribute('src', './img/icon/Pause.svg' );
    track__img.classList.add('track__active');
}

function pauseSong(){
    player.classList.remove('play');
    audio.pause();
    playBtn.setAttribute('src', './img/icon/Play.svg' );
    track__img.classList.remove('track__active');
}

function nextSong(){
    songIndex++;
    const albums__item = albums.querySelectorAll('.albums__item');
    if(songIndex > albums__item.length - 1){
        songIndex = 0;
    }
    const title = albums__item[songIndex].querySelector('.albums__title').innerHTML;
    const author = albums__item[songIndex].querySelector('.albums__author').innerHTML;
    loadSong(title, author);
    playSong();
}

function prevSong(){
    songIndex--;
    const albums__item = albums.querySelectorAll('.albums__item');
    if(songIndex < 0){
        songIndex =  albums__item.length - 1;
    }
    const title = albums__item[songIndex].querySelector('.albums__title').innerHTML;
    const author = albums__item[songIndex].querySelector('.albums__author').innerHTML;
    loadSong(title, author);
    playSong();
}

function updateTimeline(e){
    const {duration, currentTime} = e.srcElement;
    timelineProgress.setAttribute('max', duration);
    timelineProgress.value = currentTime;
    const min = Math.trunc(audio.currentTime/60);
    const sec = Math.floor(audio.currentTime - (Math.trunc(audio.currentTime/60) * 60));
    currentValue.innerHTML = `${min}:${sec > 9 ? sec : '0' + sec}`;
}

function setTimeline(e){
    const width = timelineProgress.clientWidth;
    const click = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (click/width) * duration;
    const min = Math.trunc(audio.currentTime/60);
    const sec = Math.floor(audio.currentTime - (Math.trunc(audio.currentTime/60) * 60));
    currentValue.innerHTML = `${min}:${sec > 9 ? sec : '0' + sec}`;
}

function repeatSong(){
    const isRepeat = repeatBtn.classList.contains('active');
    isRepeat ? repeatBtn.classList.remove('active') :  repeatBtn.classList.add('active');
}

function shuffleSong(){
    const isShuffle = shuffleBtn.classList.contains('active');
    isShuffle ? shuffleBtn.classList.remove('active') :  shuffleBtn.classList.add('active');
}

function volumeNull(){
    volume.classList.add('null');
    audio.volume = 0;
}

function volumePlay(){
    volume.classList.remove('null');
    audio.volume = currentVolume;
}

function updateVolume(e){
    const {volume} = e.srcElement;
    volumeProgress.setAttribute('max', '1');
    volumeProgress.value = volume;
}

function setVolume(e){
    const width = volumeProgress.clientWidth;
    const click = e.offsetX;
    audio.volume = (click/width) * 1;
    currentVolume = (click/width) * 1;
    if(volume.classList.contains('null')){
        volume.classList.remove('null');
    }
}

function playAlbumsSong(e){
    const item = e.target.closest('.albums__item');
    const albums__item = albums.querySelectorAll('.albums__item');
    title.innerHTML = item.querySelector('.albums__title').innerHTML;
    author.innerHTML = item.querySelector('.albums__author').innerHTML;
    track__img.src = item.querySelector('.albums__img').src;
    audio.src = item.querySelector('.albums__play').getAttribute('data-id');
    volumeProgress.value = audio.volume;
    currentVolume = audio.volume;
    albums__item.forEach((element, i)=>{
        if(element.getAttribute('id') === item.getAttribute('id')){
            songIndex = i;
        }
    })
    if(volumeProgress.value > 0){
        volume.classList.remove('null');
    }
    playSong();
}

function audioEnded(){
    const isRepeat = repeatBtn.classList.contains('active');
    const isShuffle = shuffleBtn.classList.contains('active');
    const albums__item = albums.querySelectorAll('.albums__item');
    if(isRepeat){
        const title = albums__item[songIndex].querySelector('.albums__title').innerHTML;
        const author = albums__item[songIndex].querySelector('.albums__author').innerHTML;
        loadSong(title, author);
        playSong();
    } else{
        if(isShuffle){
            songIndex = Math.floor(Math.random() * albums__item.length);
            const title = albums__item[songIndex].querySelector('.albums__title').innerHTML;
            const author = albums__item[songIndex].querySelector('.albums__author').innerHTML;
            loadSong(title, author);
            playSong();
        } else{
            nextSong();
        }
    }
}

function audioSetTime(){
    const min = Math.trunc(audio.currentTime/60);
    const sec = Math.floor(audio.currentTime - (Math.trunc(audio.currentTime/60) * 60));
    currentValue.innerHTML = `${min}:${sec > 9 ? sec : '0' + sec}`;
    maxValue.innerHTML = `${Math.trunc(audio.duration/60)}:${Math.floor(audio.duration - (Math.trunc(audio.duration/60) * 60))}`;
}

function isPLaySong(){
    const isPlay = player.classList.contains('play');
    isPlay ? pauseSong() : playSong();
}

function isVolumeSong(){
    const isVolume = volume.classList.contains('null');
    isVolume ? volumePlay() : volumeNull();
}


loadSong("А лето цвета неба", "Юрий Шатунов");


albums.addEventListener('click', playAlbumsSong);
audio.addEventListener('canplaythrough', audioSetTime);
playBtn.addEventListener('click', isPLaySong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateTimeline);
timelineProgress.addEventListener("click", setTimeline);
audio.addEventListener('ended', audioEnded);
repeatBtn.addEventListener('click', repeatSong);
shuffleBtn.addEventListener('click', shuffleSong);
volumeBtn.addEventListener('click', isVolumeSong);
audio.addEventListener('volumechange', updateVolume);
volumeProgress.addEventListener("click", setVolume);
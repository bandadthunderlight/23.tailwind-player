const musicList = [
    { id: 1, sound: './musics/forest-lullaby-110624.mp3', cover: './images/cover-1.png', title: 'forest lullaby', singer: 'cosmo sheldrake' },
    { id: 2, sound: './musics/lost-in-city-lights-145038.mp3', cover: './images/cover-2.png', title: 'lost in city lights', singer: 'edd Sheren' },
]
let selectedId = 1
let audioElement = document.querySelector('#musicPlayer-audioElement')
let musicPlayerImg = document.querySelector('.musicPlayer-img')
let musicPlayerTitle = document.querySelector('.musicPlayer-title')
let musicPlayerSubtitle = document.querySelector('.musicPlayer-subtitle')
let musicPlayerPlayBtn = document.querySelector('.musicPlayer-playBtn')

let musicPlayerProgress = document.querySelector('.musicPlayer-progress')
let selectedTrack
let myInterval

function setSelectedTrack(id) {
    selectedTrack = musicList[id - 1]
    audioElement.setAttribute('src', selectedTrack.sound)
    musicPlayerImg.setAttribute('src', selectedTrack.cover)
    musicPlayerTitle.innerHTML = selectedTrack.title
    musicPlayerSubtitle.innerHTML = selectedTrack.singer
    console.log(selectedTrack);
}

function playPrevTrack() {
    if (selectedId == 1) {
        selectedId = musicList.length
    } else {
        selectedId--;
    }
    setSelectedTrack(selectedId)
    setTimeout(() => {
        playTheTrack()
    }, 500);
}

function playNextTrack() {
    if (selectedId == musicList.length) {
        selectedId = 1
    } else {
        selectedId++;
    }
    setSelectedTrack(selectedId)
    setTimeout(() => {
        playTheTrack()
    }, 1000);
}


function playTheTrack() {
    console.log(audioElement.duration);
    if (audioElement.duration > 0 && !audioElement.paused) {
        audioElement.pause();
        musicPlayerPlayBtn.innerHTML = ` 
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                 d="M21.941 14.244L14.119 10.236C12.686 9.50176 11 10.5696 11 12.2115V19.7885C11 21.4304 12.686 22.4982 14.119 21.764L21.941 17.756C23.353 17.0325 23.353 14.9675 21.941 14.244Z"
                fill="#E5E7EB" />
        </svg>
                `
        console.log('pausing...');
    } else {
        audioElement.play();
        musicPlayerPlayBtn.innerHTML = ` 
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.1864 14.2517L8.30466 10.9841C6.9716 10.2435 5.33337 11.2074 5.33337 12.7324V19.2676C5.33337 20.7926 6.9716 21.7566 8.30466 21.016L14.1864 17.7483C15.558 16.9863 15.558 15.0137 14.1864 14.2517Z"
                fill="#4D5562" />
            <path d="M21.3334 22.6667L21.3334 9.33335" stroke="#4D5562" stroke-width="2"
                stroke-linecap="round" />
            <path d="M26.6667 22.6667L26.6667 9.33335" stroke="#4D5562" stroke-width="2"
                stroke-linecap="round" />
        </svg>
                `
        console.log('playing...');
        progressHandler();
    }

}


function progressHandler() {

    clearInterval(myInterval);
    // console.log(audioElement);
    let timePercent = audioElement.duration * 10
    let currentWidth = 0
    musicPlayerProgress.style.width = '0%';

    myInterval = setInterval(() => {
        currentWidth++;
        musicPlayerProgress.style.width = `${currentWidth}%`;
        console.log(`${currentWidth}%`);
        if (currentWidth == 100) {
            clearInterval(myInterval);
            musicPlayerProgress.style.width = '0%';
        }
    }, timePercent);
}

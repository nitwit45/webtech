const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const frame = document.querySelector("#lyrics");

//Intially load song details
loadSong(songs[songIndex]);

// updat song details 
function loadSong(song) {

    title.innerText = songTitle[song];
    audio.src = `../musics/${song}.mp3`;
    cover.src = `../images/${song}.jfif`;
    let e = new CustomEvent("myCustomEvent", {
        detail: {
            play: true,
            song: song,
            default_song
        },
    });
    frame.contentDocument.dispatchEvent(e);
}

//play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

//prev song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}

//next song
function nextSong() {
    songIndex++;
    if (songIndex > (songs.length - 1)) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

// update progress
function updateProgress(e) {
    const {
        duration,
        currentTime
    } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

}


//event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
        let e = new CustomEvent("myCustomEvent", {
            detail: {
                play: false,
                default_song
            },
        });
        frame.contentDocument.dispatchEvent(e);
    } else {
        playSong();
        let e = new CustomEvent("myCustomEvent", {
            detail: {
                play: true,
                default_song
            },
        });
        frame.contentDocument.dispatchEvent(e);
    }
});

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;

}

//change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);


//click n progress bar
progressContainer.addEventListener('click', setProgress);

//song ends
audio.addEventListener('ended', nextSong)
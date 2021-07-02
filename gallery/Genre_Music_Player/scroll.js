// Functionality to scroll the lyrics genrated and update animation at top.
const scroll = () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

window.onscroll = scroll;


class TxtRotate {
    constructor(el, toRotate, period, song) {
        this.toRotate = toRotate;
        this.el = el;
        this.period = parseInt(period, 10) || 200;
        this.txt = "";
        this.song = song;
        this.tick();
    }

    tick = function () {
        // If song has changed dont continue
        if (currSong != "" && this.song != currSong) {
            return;
        }
        // If paused then wait for 100 ms and check whether it is not paused
        if (!play) {
            setTimeout(() => this.tick(), 100);
            return;
        }
        // Adds extra letter and if all lyrics are diplayed then return.
        if (this.txt.length < this.toRotate.length) {
            this.txt = this.toRotate.substring(0, this.txt.length + 1);
        }

        // Put text in container and call this function again
        this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

        let delta = 200 - Math.random() * 100;

        setTimeout(() => this.tick(), delta);
    };
}


let currText;
let currSong = "";


const lyrics_generator = (song) => {
    let elements = document.querySelector(".txt-rotate");
    let toRotate = lyrics[song];
    if (toRotate) {
        currText = new TxtRotate(elements, toRotate, "400", song);
    }
};


const handleE = (e) => {
    play = e.detail["play"];
    let song = e.detail["song"];
    let default_song = e.detail["default_song"];
    // Song is not availableor if itis thefirst time play default song
    if (!song) {
        if (currSong == "") {
            song = default_song;
        } else {
            song = currSong;
        }
    }
    // If song has changed then make a new lyrcs generator 
    if (song && (song != currSong)) {
        currSong = song;
        lyrics_generator(song);
    }
}

// Cutom event to check whenever a user hits pause, play or a song has changed.
window.document.addEventListener("myCustomEvent", handleE, false);
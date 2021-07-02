let testmusic = document.getElementById("testmusic"); //accessing the testmusic div tag in html
let playbutton = document.getElementById("playbutton"); //accessing the play button div tag in html


//Play & Pause Function
playbutton.onclick = function() {
    if (testmusic.paused) {
        testmusic.play();
        playbutton.src = "./mainpage/mainpageresources/images/pause-button.png";
    } else {
        testmusic.pause();
        playbutton.src = "./mainpage/mainpageresources/images/play-button.png";
    }
}
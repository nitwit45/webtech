class AudioVisualizer {
    INTERVAL = null;
    FFT_SIZE = 512;
    TYPE = {
        lounge: "renderLounge"
    };

    constructor(initialDict) {
        this.isPlaying = false;
        this.autoplay = initialDict.autoplay || false;
        this.loop = initialDict.loop || false;
        this.audio = document.getElementById(initialDict.audio) ;
        this.canvas = document.getElementById(initialDict.canvas) ;
        this.canvasCtx = this.canvas.getContext("2d") ;
        this.author = this.audio.getAttribute("data-author") ;
        this.title = this.audio.getAttribute("data-title") ;
        this.ctx = null;
        this.analyser = null;
        this.sourceNode = null;
        this.frequencyData = [];
        this.audioSrc = null;
        this.duration = 0;
        this.minutes = "00";
        this.seconds = "00";
        this.style = initialDict.style;
        this.barWidth = initialDict.barWidth;
        this.barHeight = initialDict.barHeight;
        this.barSpacing = initialDict.barSpacing;
        this.barColor = initialDict.barColor;
        this.shadowBlur = initialDict.shadowBlur;
        this.shadowColor = initialDict.shadowColor;
        this.font = initialDict.font ;
        this.gradient = null;
    }

    setContext = function () {
        try {
            // create an AudioContext object.
            this.ctx = new window.AudioContext();
            return this;
        } catch (e) {
            console.info("Web Audio API is not supported.", e);
        }
    };

    setAnalyser = function () {
        // Creates an Analyzer node to get Audio time and frequency
        this.analyser = this.ctx.createAnalyser();
        // Set the average time between last buffer and current buffer
        this.analyser.smoothingTimeConstant = 0.6;
        // Assigns window size of FFT to get frequency data.
        this.analyser.fftSize = this.FFT_SIZE;
        return this;
    };

    setFrequencyData = function () {
        // Create an unsigned 8 bit array
        // Store the number of data avalues from this.analyser
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
        return this;
    };

    setBufferSourceNode = function () {
        // Create audio buffer node to play audio
        this.sourceNode = this.ctx.createBufferSource();
        this.sourceNode.loop = this.loop;
        // Connect Analyser node to buffer node
        this.sourceNode.connect(this.analyser);
        this.sourceNode.connect(this.ctx.destination);

        // This is when the audio is finished playing
        // Had to bind this because this changes.
        this.sourceNode.onended = function () {
            clearInterval(INTERVAL);
            // Disconnect audio node
            this.sourceNode.disconnect();
            // reset timer
            this.resetTimer();
            this.isPlaying = false;
            // Create a new buffer node
            this.sourceNode = this.ctx.createBufferSource();
        }.bind(this);

        return this;
    };

    setMediaSource = function () {
        // set the audio source to the current song
        this.audioSrc = this.audio.getAttribute("src");
        return this;
    };

    setCanvasStyles = function () {
        // create a gradient for the canvas
        this.gradient = this.canvasCtx.createLinearGradient(0, 0, 0, 300);
        // adds the stop color
        this.gradient.addColorStop(1, this.barColor);
        // Set gradient in canvas
        this.canvasCtx.fillStyle = this.gradient;
        // Applya shadowblur anda shadow color
        this.canvasCtx.shadowBlur = this.shadowBlur;
        this.canvasCtx.shadowColor = this.shadowColor;
        this.canvasCtx.font = this.font.join(" ");
        this.canvasCtx.textAlign = "center";
        return this;
    };

    pausePlay = function () {
        // function to pause or play when toggled
        if (!this.isPlaying) {
            return this.ctx.state === "suspended" ? this.playSound() : this.loadSound();
        } else {
            return this.pauseSound();
        }
    };

    autoLoad = function () {
        // load sound if autolay is true
        if (this.autoplay) {
            this.loadSound();
        }
        return this;
    };

    loadSound = function () {
        // Request an binary data buffer from audio element
        // True to pass to make sure it is async
        let req = new XMLHttpRequest();
        req.open("GET", this.audioSrc, true);
        req.responseType = "arraybuffer";
        // put loading text initilialy in canvas
        this.canvasCtx.fillText(
            "Loading...",
            this.canvas.width / 2 + 10,
            this.canvas.height / 2
        );

        // Call function after request is complete
        // To decode audio data
        // If succesful play audio
        // If not handle error
        req.onload = function () {
            this.ctx.decodeAudioData(
                req.response,
                this.playSound.bind(this),
                this.onError.bind(this)
            );
        }.bind(this);

        // Send the request
        req.send();
    };

    playSound = function (buffer) {
        this.isPlaying = true;

        if (this.ctx.state === "suspended") {
            return this.ctx.resume();
        }

        this.sourceNode.buffer = buffer;
        // Begin playback
        this.sourceNode.start(0);
        this.resetTimer();
        this.startTimer();
        this.renderFrame();
        this.ctx.suspend();
        this.isPlaying = false;
    };

    pauseSound = function () {
        // pause player
        this.ctx.suspend();
        this.isPlaying = false;
    };

    startTimer = function () {
        // Used to provide the timer functionality for each song
        this.INTERVAL = setInterval(() => {
            if (this.isPlaying) {
                let now = new Date(this.duration);
                let min = now.getHours();
                let sec = now.getMinutes();
                this.minutes = min < 10 ? "0" + min : min;
                this.seconds = sec < 10 ? "0" + sec : sec;
                this.duration = now.setMinutes(sec + 1);
            }
        }, 1000);
    };

    resetTimer = function () {
        // Rest timer after song
        let time = new Date(0, 0);
        this.duration = time.getTime();
    };

    onError = (e) => {
        // Error handler for XMLHttpRequest
        console.info("Error decoding audio file. -- ", e);
    };

    renderFrame = function () {
        // repeatedly call anmation after each frame
        try {
            requestAnimationFrame(this.renderFrame.bind(this));

            // Copy the frequency data to analyser to analyser node
            this.analyser.getByteFrequencyData(this.frequencyData);
            // Erase piels in speicifed area for the specific animation
            this.canvasCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.renderTime();
            this.renderText();
            this.renderByStyleType();
        } catch (e) {}
    };

    renderText = function () {
        // Function display author  and song name
        let cx = this.canvas.width / 2;
        let cy = this.canvas.height / 2;
        let correction = 10;

        // Set curent baseline
        this.canvasCtx.textBaseline = "top";
        this.canvasCtx.fillText("by " + this.author, cx + correction, cy);
        // radix parsed to 10 in numeral system
        this.canvasCtx.font = parseInt(this.font[0], 10) + 8 + "px " + this.font[1];
        this.canvasCtx.textBaseline = "bottom";
        this.canvasCtx.fillText(this.title, cx + correction, cy);
        this.canvasCtx.font = this.font.join(" ");
    };

    renderTime = function () {
        // This takes the calculated time in startTimer and display in canvas
        let time = this.minutes + ":" + this.seconds;
        this.canvasCtx.fillText(
            time,
            this.canvas.width / 2 + 10,
            this.canvas.height / 2 + 40
        );
    };

    renderByStyleType = function () {
        // to call render renderLounge animation
        return this[this.TYPE[this.style]]();
    };

    renderLounge = function () {
        let cx = this.canvas.width / 2;
        let cy = this.canvas.height / 2;
        let radius = 140;
        // Calculate max number of bars
        let maxBarNum = Math.floor(
            (radius * 2 * Math.PI) / (this.barWidth + this.barSpacing)
        );
        let slicedPercent = Math.floor((maxBarNum * 25) / 100);
        let barNum = maxBarNum - slicedPercent;
        // Used as interval jumper withinin frequencies to be displayed
        let freqJump = Math.floor(this.frequencyData.length / maxBarNum);

        // logic to draw each bar
        for (let i = 0; i < barNum; i++) {
            // Get amplitude from binary array
            let amplitude = this.frequencyData[i * freqJump];
            let alfa = (i * 2 * Math.PI) / maxBarNum;
            let beta = ((3 * 45 - this.barWidth) * Math.PI) / 180;
            // Calculate x, y, width, height
            let x = 0;
            let y = radius - (amplitude / 12 - this.barHeight);
            let w = this.barWidth;
            let h = amplitude / 6 + this.barHeight;

            // Save current state of canvas
            this.canvasCtx.save();
            this.canvasCtx.translate(cx + this.barSpacing, cy + this.barSpacing);
            this.canvasCtx.rotate(alfa - beta);
            this.canvasCtx.fillRect(x, y, w, h);
            // Resaves the last saved canvas after applying all tranformationss
            this.canvasCtx.restore();
        }
    };

}

const createVisualizer = (initialDict) => {
    let visualizer = new AudioVisualizer(initialDict);

    // Simulated a method chaining effect because 'this' was returned from each method.
    visualizer
        .setContext()
        .setAnalyser()
        .setFrequencyData()
        .setBufferSourceNode()
        .setMediaSource()
        .setCanvasStyles()
        .autoLoad();

    return visualizer;
}
let autoPlay = true
startVideo = () => {
    let videoUrl = `${apiData.VideoSource}.m3u8`
    if (Hls.isSupported()) {
        let hls = new Hls()
        hls.loadSource(videoUrl)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play()
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoUrl
        video.addEventListener('canplay', function () {
            video.play()
        });
    }
    document.querySelector('#playPause p').innerHTML = 'Pause'
    document.querySelector('#playPause img').src = 'assets/pause.png'

    let deletePoster = document.getElementById("posterVideo")
    deletePoster.classList.remove("videoLink");

    let startVideoIcon = document.getElementById('startVideoIcon');
    startVideoIcon.parentNode.removeChild(startVideoIcon);
}

//start video on click poster
let anchors = document.getElementsByClassName("videoLink");
for (let i = 0; i < anchors.length; i++) {
    let current = anchors[i];
    current.addEventListener('click', startVideo, false)
}

//Play Pause Control
onPlayPauseVideo = () => {
    if (video.paused) {
        if (video.src === '') {
            startVideo()
        }
        document.querySelector('#playPause p').innerHTML = 'Pause'
        document.querySelector('#playPause img').src = 'assets/pause.png'
        video.play()
    }
    else {
        document.querySelector('#playPause p').innerHTML = 'Play'
        document.querySelector('#playPause img').src = 'assets/play.png'
        video.pause()
    }
}


onMuteUnmuteVideo = () => {
    if (video.muted) {
        document.querySelector('#muteUnmute p').innerHTML = 'Mute'
        document.querySelector('#muteUnmute img').src = 'assets/mute.png'
        video.muted = false
    }
    else {
        document.querySelector('#muteUnmute p').innerHTML = 'Unmute'
        document.querySelector('#muteUnmute img').src = 'assets/unmute.png'
        video.muted = true
    }
}

seekVideo = (type) => {
    if (type === 'back') {
        video.currentTime = video.currentTime < 10 ? 0 : video.currentTime - 10
        video.play()
    }
    else {
        let isLessThan10ToEnd = apiData.VideoDuration - video.currentTime
        video.currentTime = isLessThan10ToEnd < 10 ? apiData.VideoDuration : video.currentTime + 10
        video.play()
    }
}

//FullScreen Control for different browsers
fullScreenControl = () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
}

autoPlayControl = () => {
    autoPlay = !autoPlay
    document.querySelector('#autoPlay p').innerHTML = autoPlay ? 'Autoplay: On' : 'Autoplay: Off'
}

//event on ending video
video.addEventListener('ended', () => {
    if (autoPlay) {
        onFetchData(apiData.Related[0].EntityId).then(result => {
            startVideo()
        })
    }
}, false);
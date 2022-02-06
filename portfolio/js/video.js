function videoFunc() {
  const video = document.querySelector('video');
  const plaBtnBig = document.querySelector('.button__play');
  const playBtn = document.querySelector('.play-control');
  const pauseBtn = document.querySelector('.pause-control');
  const volumeBtn = document.querySelector('.volume-control');
  const fullScreenBtn = document.querySelector('.fullscreen-control');
  const volumeBar = document.querySelector('.volume-bar');
  const progressBar = document.querySelector('.progress-bar');
  const currentPlayTime = document.querySelector('.current-time');
  const totalTime = document.querySelector('.total-time');

  let progressId = null;
  let wasVideoPlaying = false;
  let currentVolume = volumeBar.value;

  window.addEventListener('load', () => {
    progressBar.min = 0;
    progressBar.max = video.duration;
    totalTime.textContent = video.duration;
  });

  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      progressId = setInterval(changeProgress, 100);
    } else if (!video.paused) {
      video.pause();
      clearInterval(progressId);
    }
  });

  playBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      progressId = setInterval(changeProgress, 100);
    }
  });

  pauseBtn.addEventListener('click', () => {
    if (!video.paused) {
      video.pause();
      clearInterval(progressId);
    }
  });

  progressBar.addEventListener('mousedown', () => {
    wasVideoPlaying = !video.paused;
    if (wasVideoPlaying) {
      video.pause();
      clearInterval(progressId);
    }
  });

  progressBar.addEventListener('change', () => {
    video.currentTime = progressBar.value;
    if (wasVideoPlaying) {
      video.play();
      progressId = setInterval(changeProgress, 100);
    } else {
      changeProgress();
    }
  });

  const changeProgress = () => {
    progressBar.value = video.currentTime;
    currentPlayTime.innerText = video.currentTime;
  };

  video.addEventListener('ended', () => {
    clearInterval(progressId);
  });

  volumeBar.addEventListener('change', () => {
    video.volume = volumeBar.value;
    currentVolume = volumeBar.value;
    console.log(currentVolume);
  });

  volumeBtn.addEventListener('click', () => {
    if (!video.muted) {
      video.muted = true;
      currentVolume = volumeBar.value;
      volumeBar.value = 0;
      // volumeBtn.style.background-image = 'url(./assets/svg/volume-muted.svg)'
      volumeBtn.src = './assets/svg/mute.svg';
    } else if (video.muted) {
      video.muted = false;
      volumeBar.value = currentVolume;
      volumeBtn.src = './assets/svg/volume.svg';
    }
  });

  const openFullscreen = () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  fullScreenBtn.addEventListener('click', () => {
    openFullscreen();
  });
}

export default videoFunc;

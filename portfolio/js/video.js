function videoFunc() {
  console.log(`total 70/70
  1. Вёрстка +10
  2. Кнопка Play/Pause на панели управления +10
  3. Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка +10
  4. При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка +10
  5. При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля +10
  6. Кнопка Play/Pause в центре видео +10
  7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
    Доп. функционал:
      - кнопка fullscreen
      - отображение текущего времени / полного времени записи
      - запустить/остановить видео можно кликнув в любом месте видео
  `);

  const video = document.querySelector('video');
  const playBtnBig = document.querySelector('.play__icon');
  const playBtn = document.querySelector('.play-control');
  const volumeBtn = document.querySelector('.volume-control');
  const fullScreenBtn = document.querySelector('.fullscreen-control');
  const volumeBar = document.querySelector('.volume-bar');
  const progressBar = document.querySelector('.progress-bar');

  const currentMinutes = document.querySelector('.current-minutes');
  const currentSeconds = document.querySelector('.current-seconds');
  const totalMinutes = document.querySelector('.total-minutes');
  const totalSeconds = document.querySelector('.total-seconds');

  let progressId = null;
  let wasVideoPlaying = false;
  let currentVolume = volumeBar.value;

  // video.muted = true; //remove

  window.addEventListener('load', () => {
    progressBar.min = 0;
    progressBar.max = video.duration;
    setTotalTime(video.duration);

    const setTotalTime = (totalTIme) => {
      const minutes = Math.floor((totalTIme / 60) % 60);
      const seconds = Math.floor(totalTIme % 60);
      totalMinutes.textContent = `${minutes}`;
      totalSeconds.textContent = setZero(`${seconds}`);
    }; 
  });

  const changeProgressBarColor = () => {
    const max = progressBar.max;
    const value = (progressBar.value * 100) / max;
    progressBar.style.background = `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${value}%, #fff ${value}%, white 100%)`;
  };

  progressBar.addEventListener('input', changeProgressBarColor);

  const changeVolumeBarColor = () => {
    const max = volumeBar.max;
    const value = (volumeBar.value * 100) / max;
    volumeBar.style.background = `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${value}%, #fff ${value}%, white 100%)`;
  };

  volumeBar.addEventListener('input', changeVolumeBarColor);

  const openFullscreen = () => {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    }
  };

  const toggleBigPlay = () => {
    playBtnBig.classList.toggle('display');
  };

  const pauseVideo = () => {
    video.pause();
    clearInterval(progressId);
    toggleBigPlay();
  };

  const playVideo = () => {
    video.play();
    progressId = setInterval(changeProgress, 100);
    toggleBigPlay();
  };

  video.addEventListener('click', () => {
    if (video.paused) {
      playVideo();
      playBtn.src = './assets/svg/pause.svg';
    } else if (!video.paused) {
      pauseVideo();
      playBtn.src = './assets/svg/play.svg';
    }
  });

  const setZero = (num) => {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  };

  const changeTimePlaying = () => {
    setCurrentTimer(video.currentTime);
  };

  const setCurrentTimer = (currentTime) => {
    const minutes = Math.floor((currentTime / 60) % 60);
    const seconds = Math.floor(currentTime % 60);
    currentMinutes.textContent = `${minutes}`;
    currentSeconds.textContent = setZero(`${seconds}`);
  };

  const changeProgress = () => {
    progressBar.value = video.currentTime;
    changeTimePlaying();
    changeProgressBarColor();
  };

  playBtnBig.addEventListener('click', () => {
    if (video.paused) {
      playVideo();
      playBtn.src = './assets/svg/pause.svg';
    }
  });

  playBtn.addEventListener('click', () => {
    if (video.paused) {
      playVideo();
      playBtn.src = './assets/svg/pause.svg';
    } else if (!video.paused) {
      pauseVideo();
      playBtn.src = './assets/svg/play.svg';
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

  video.addEventListener('ended', () => {
    clearInterval(progressId);
    toggleBigPlay();
    playBtn.src = './assets/svg/play.svg';
  });

  volumeBar.addEventListener('change', () => {
    video.volume = volumeBar.value;
    if (volumeBar.value == 0) {
      video.muted = true;
      volumeBtn.src = './assets/svg/mute.svg';
    } else {
      video.muted = false;
      volumeBtn.src = './assets/svg/volume.svg';
    }
  });

  volumeBtn.addEventListener('click', () => {
    if (!video.muted) {
      video.muted = true;
      currentVolume = volumeBar.value;
      volumeBar.value = 0;
      volumeBtn.src = './assets/svg/mute.svg';
      changeVolumeBarColor();
    } else if (video.muted) {
      video.muted = false;
      volumeBar.value = currentVolume;
      video.volume = currentVolume;
      volumeBtn.src = './assets/svg/volume.svg';
      changeVolumeBarColor();
    }
  });

  fullScreenBtn.addEventListener('click', () => {
    openFullscreen();
  });
}

export default videoFunc;

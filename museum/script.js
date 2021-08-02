const progressBar = () => {
  const controls = document.querySelector('.control-bar');

  controls.addEventListener('input', function(event) {
    const value = event.target.value;
    event.target.style.background = linear-gradient(to right, #24809e 0%, #24809e ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%);
  });
};

progressBar();
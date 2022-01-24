console.log("Привет!\n Если у тебя монитор 1440px и меньше, уменьши, пожалуйста, масштаб при проверке :)\n Хорошего дня тебе!\n Общий балл: 110/110\n Вёрстка валидная +10\n Вёрстка семантическая +20\n Вёрстка соответствует макету +48\n Требования к css +12\n Интерактивность, реализуемая через css +20\n");

const burger = document.querySelector(".main-nav-burger"),
  nav = document.querySelector(".main-nav"),
  navLinks = document.querySelectorAll(".main-nav__link");

const navSlide = () => {
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("cross_maker");
  });
};

navSlide();

navLinks.forEach((element) => element.addEventListener("click", closeMenu));
nav.addEventListener('click', closeMenu);

const closeMenu = (event) => {
  if (event.target.classList.contains("main-nav__link")) {
    nav.classList.remove("nav-active");
    console.log('click');
  }
};

closeMenu();

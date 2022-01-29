import i18Obj from './translate.js';

console.log(` TOTAL: 85 / 85 \n `);

/* BURGER MENU */

const burger = document.querySelector('.main-nav-burger');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav__link');
const logoLink = document.querySelector('.logo__icon');

function toggleBurgerClass() {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('burger-x');
  });
}

navLinks.forEach((element) =>
  element.addEventListener('click', () => {
    removeMenuClasses();
  })
);

function logoClickListener() {
  logoLink.addEventListener('click', () => {
    removeMenuClasses();
  });
}

function removeMenuClasses() {
  burger.classList.remove('burger-x');
  nav.classList.remove('nav-active');
}

toggleBurgerClass();
logoClickListener();

/* IMAGE TABS */

const portfolioBtnsParent = document.querySelector('.portfolio__buttons');
const portfolioBtns = document.querySelectorAll('.portfolio__button');
const portfolioImages = document.querySelectorAll('.portfolio__image');

function changeImage(event) {
  const target = event.target;
  if (target.classList.contains('portfolio__button')) {
    portfolioImages.forEach((img, index) => {
      img.src = `./assets/img/${target.dataset.season}/${index + 1}.jpg`;
    });
    changeImageActiveClass(event);
  }
}

function changeImageActiveClass(event) {
  const target = event.target;
  portfolioBtns.forEach((element) => {
    element.classList.remove('portfolio__button-active');
  });
  target.classList.add('portfolio__button-active');
}

portfolioBtnsParent.addEventListener('click', changeImage);

/* PRELOAD IMAGES */

const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadImages() {
  seasons.forEach((element) => {
    //MUST BE 6 IMAGES!!
    //TODO: refactor this to unlim images
    for (let i = 1; i <= 6; i++) {
      const img = new Image();
      img.src = `./assets/img/${element}/${i}.jpg`;
    }
  });
}
preloadImages();

/* LIGHT/DARK THEME SWITCHER */

const themeButton = document.querySelector('.theme-switch__button');
const pageBody = document.querySelector('.body');
const heroSection = document.querySelector('.hero');
const contactsSection = document.querySelector('.contacts');

function switchTheme() {
  pageBody.classList.toggle('light-theme');
  heroSection.classList.toggle('hero-light');
  contactsSection.classList.toggle('contacts-light');
  themeButton.classList.toggle('theme-switch__button-light');
}

themeButton.addEventListener('click', switchTheme);

/* TRANSLATE */

const langParent = document.querySelector('.lang-wrapper');
const langBtns = document.querySelectorAll('.lang-wrapper__item');
const langArray = document.querySelectorAll('[data-i18n]');

function getTranslate(lang) {
  const langSwitcher = () => {
    langArray.forEach((element) => {
      element.textContent = i18Obj[lang.target.textContent][element.dataset.i18n];
    });
  };

  if (lang.target.classList.contains('lang-wrapper__item')) {
    langBtns.forEach((element) => {
      element.classList.remove('lang-wrapper__item-active');
    });
    lang.target.classList.add('lang-wrapper__item-active');

    if (lang.target.textContent === 'ru') {
      langSwitcher();
    }
    if (lang.target.textContent === 'en') {
      langSwitcher();
    }
  }
}

langParent.addEventListener('click', getTranslate);

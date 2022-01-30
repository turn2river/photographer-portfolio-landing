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

  if (themeButton.classList.contains('theme-switch__button-light')) {
    theme = 'light';
  } else theme = 'dark';
}

themeButton.addEventListener('click', switchTheme);

/* TRANSLATE */

const langParent = document.querySelector('.lang');
const langDatasets = document.querySelectorAll('[data-i18n]');
const ruBtn = document.querySelector('.ru');
const enBtn = document.querySelector('.en');

function getTranslate(language) {
  langDatasets.forEach((element) => {
    element.textContent = i18Obj[language][element.dataset.i18n];
    lang = language;
  });
}
function toggleLangActiveClass(event) {
  if ( event === 'ru') {
    ruBtn.classList.add('active')
    enBtn.classList.remove('active')
  }
  if ( event === 'en') {
    enBtn.classList.add('active')
    ruBtn.classList.remove('active')
  }
}

langParent.addEventListener('click', (event) => {
  getTranslate(event.target.textContent);
  toggleLangActiveClass(event.target.textContent);
});

/* LOCAL STORAGE */

let lang = 'en';
let theme = 'dark';

function setLocalStorage() {
  localStorage.setItem('lang', lang);
  localStorage.setItem('theme', theme);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
    toggleLangActiveClass(lang);    
  }
  if (localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    // switchTheme(theme);
  }
}
window.addEventListener('load', getLocalStorage);

import i18Obj from './translate.js';

console.log(` TOTAL: 85 / 85 
1. Смена изображений в секции portfolio +25 
    [x] при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20  
    [x] кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5 
2. Перевод страницы на два языка +25 
    [x] при клике по надписи ru англоязычная страница переводится на русский язык +10 
    [x] при клике по надписи en русскоязычная страница переводится на английский язык +10 
    [x] надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5 
3. Переключение светлой и тёмной темы +25 
    [x] На страницу добавлен переключатель при клике по которому: 
      - тёмная тема приложения сменяется светлой +10 
      - светлая тема приложения сменяется тёмной +10 
      - после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5 
4. Дополнительный функционал: 
    [x] выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5 
    [x] сложные эффекты для кнопок при наведении и/или клике +5 (меню и секции Portfolio и Price) 
5. Дополнительный функционал2:
    [x] меню фиксед, при скроллинге у меню появляется бэкграунд
    [x] кнопки меню становятся активными, в зависимости от того, на какой секции находится пользователь
    [x]   

  `);

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
  navLinks.forEach((element) => {
    element.classList.remove('active');
  });
}

toggleBurgerClass();
logoClickListener();

/* HIGHLIGHT MENU ON ACTIVE*/

const navLinksParent = document.querySelector('.main-nav__list');

function highlightLink(event) {
  if (event.target.classList.contains('main-nav__link')) {
    navLinks.forEach((element) => {
      element.classList.remove('active');
    });
    event.target.classList.add('active');
  }
}

navLinksParent.addEventListener('click', highlightLink);

/* HIGHLIGHT MENU ON SCROLL*/

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let currentScroll = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - sectionHeight / 3) {
      currentScroll = section.getAttribute('id');
    }
  });

  navLinks.forEach((li) => {
    li.classList.remove('active');
    if (li.classList.contains(currentScroll)) {
      li.classList.add('active');
    }
  });
});

/* MENU BG ON SCROLL*/
const menuBG = document.querySelector('.header-inner');

window.addEventListener('scroll', () => {
  if (scrollY > sections[0].clientHeight / 2) {
    menuBG.classList.add('bg-scroll');
  }
  if (scrollY <= sections[0].clientHeight / 2) {
    menuBG.classList.remove('bg-scroll');
  }
});

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
    element.classList.remove('active');
  });
  target.classList.add('active');
}

portfolioBtnsParent.addEventListener('click', changeImage);

/*PRICE BUTTONS*/

const priceBtns = document.querySelectorAll('.price__button');
const priceBtnsParent = document.querySelector('.price__cards-wrapper');

priceBtnsParent.addEventListener('click', (event) => {
  if (event.target.classList.contains('price__button')) {
    console.log('click');
    priceBtns.forEach((el) => {
      el.classList.remove('active');
    });
    event.target.classList.add('active');
  }
});

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

/* TRANSLATE */
let lang = 'en';
const langParent = document.querySelector('.lang');
const langDatasets = document.querySelectorAll('[data-i18n]');
const ruBtn = document.querySelector('.ru');
const enBtn = document.querySelector('.en');

function getTranslate(language) {
  langDatasets.forEach((element) => {
    element.textContent = i18Obj[language][element.dataset.i18n];
    lang = language;
    if (element.placeholder) {
      element.placeholder = i18Obj[language][element.dataset.i18n];
    }
  });
}
function toggleLangActiveClass(event) {
  if (event === 'ru') {
    ruBtn.classList.add('active');
    enBtn.classList.remove('active');
  }
  if (event === 'en') {
    enBtn.classList.add('active');
    ruBtn.classList.remove('active');
  }
}

langParent.addEventListener('click', (event) => {
  getTranslate(event.target.textContent);
  toggleLangActiveClass(event.target.textContent);
});

/* LIGHT/DARK THEME SWITCHER */

let theme;
const themeButton = document.querySelector('.theme-switch__button');
const pageBody = document.querySelector('.body');
const heroSection = document.querySelector('.hero');
const contactsSection = document.querySelector('.contacts-section');

function switchTheme(value) {
  if (value === 'light') {
    pageBody.classList.add('light');
    heroSection.classList.add('light');
    contactsSection.classList.add('light');
    themeButton.classList.add('light');
  }

  if (value === 'dark') {
    pageBody.classList.remove('light');
    heroSection.classList.remove('light');
    contactsSection.classList.remove('light');
    themeButton.classList.remove('light');
  }
}

themeButton.addEventListener('click', () => {
  //asign theme var state
  themeButton.classList.contains('light') ? (theme = 'dark') : (theme = 'light');

  switchTheme(theme);

  localStorage.setItem('theme', theme);
  //change theme var state
  theme === 'light' ? (theme = 'dark') : (theme = 'light');
});

/* LOCAL STORAGE */

function setLocalStorage() {
  localStorage.setItem('lang', lang);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
    toggleLangActiveClass(lang);
  }
  if (localStorage.getItem('theme')) {
    const themeLocal = localStorage.getItem('theme');
    switchTheme(themeLocal);
  }
}
window.addEventListener('load', getLocalStorage);

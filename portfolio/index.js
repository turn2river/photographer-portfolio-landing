console.log(` TOTAL: 85 / 85 \n `);

/* BURGER MENU */

const burger = document.querySelector('.main-nav-burger'),
  nav = document.querySelector('.main-nav'),
  navLinks = document.querySelectorAll('.main-nav__link'),
  logoLink = document.querySelector('.logo__icon');

const toggleBurgerClass = () => {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('burger-x');
  });
};

navLinks.forEach((element) =>
  element.addEventListener('click', () => {
    removeMenuClasses();
  })
);

const logoClickListener = () => {
  logoLink.addEventListener('click', () => {
    removeMenuClasses();
  });
};

function removeMenuClasses() {
  burger.classList.remove('burger-x');
  nav.classList.remove('nav-active');
}

toggleBurgerClass();
logoClickListener();

/* IMAGE TABS */

const portfolioBtns = document.querySelectorAll('.portfolio__button'),
  portfolioBtnsParent = document.querySelector('.portfolio__buttons'),
  portfolioImages = document.querySelectorAll('.portfolio__image');

const seasons = ['winter', 'spring', 'summer', 'autumn'];

portfolioBtnsParent.addEventListener('click', (event) => {
  const target = event.target;
  portfolioBtns.forEach((element) => {
    element.classList.remove('portfolio__button-active');
  });
  if (target && target.classList.contains('portfolio__button')) {
    portfolioImages.forEach((img, index) => {
      img.src = `./assets/img/${target.dataset.season}/${index + 1}.jpg`;
    });
    target.classList.add('portfolio__button-active');
  }
});



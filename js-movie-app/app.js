console.log(`
total 70/70

1. Вёрстка +10
  - на странице есть несколько карточек фильмов и строка поиска. На каждой карточке фильма есть постер и название фильма. Также на карточке может быть другая информация, которую предоставляет API, например, описание фильма, его рейтинг на IMDb и т.д. +5
  - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. При загрузке приложения на странице отображаются карточки фильмов с полученными от API данными +10
3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся карточки фильмов, в названиях которых есть это слово, если такие данные предоставляет API +10
4. Поиск +30
  - при открытии приложения курсор находится в поле ввода +5
  - есть placeholder +5
  - автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
  - поисковый запрос можно отправить нажатием клавиши Enter +5
  - после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
  - в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
5.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
  - высокое качество оформления приложения предполагает собственное оригинальное оформление равное или отличающееся в лучшую сторону по сравнению с демо
  - дополнительным функционалом может быть, например, наличие на карточке фильма его описания и рейтинга на IMDb
`)



const urlIMG = 'https://image.tmdb.org/t/p/w1280';
const upcomingURL = 'https://api.themoviedb.org/3/movie/upcoming?api_key=dd7331cca3d42d6219e14ab06fd6d0b6&language=en-US&page=1';
const popularURL = 'https://api.themoviedb.org/3/movie/popular?api_key=dd7331cca3d42d6219e14ab06fd6d0b6&language=en-US&page=1';
const searchAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=dd7331cca3d42d6219e14ab06fd6d0b6&query=';
const genreURL = 'https://api.themoviedb.org/3/genre/movie/list?api_key=dd7331cca3d42d6219e14ab06fd6d0b6&language=en-US';

const body = document.querySelector('.body')
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const promo = document.getElementById('promo');
const modal = document.getElementById('modal');
const promoIMG = document.getElementById('promo-img');
const modalIMG = document.getElementById('modal-img');
const logo = document.querySelector('.logo');
const searchBtn = document.querySelector('.search-btn');
const closeModal = document.querySelector('.close-modal');

const getMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  // console.log(data);

  renderCards(data.results);
  renderPromo(data.results);
};

const getDetails = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data); 

  renderModal(data);
};

const renderCards = (result) => {
  main.innerHTML = '';

  result.forEach((item) => {
    const { poster_path, title, vote_average, id } = item;

    let imgFullPath = '';
    if (poster_path === null) {
      imgFullPath = './assets/no-poster.jpg';
    } else {
      imgFullPath = `${urlIMG + poster_path}`;
    }

    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${imgFullPath}" alt="${title}" />
      <div class="card__inner">
        <h2 class="card__title">${title}</h2>
        <div class="movie-id">${id}</div>
        <div class="card__footer">        
        <div class="card__info">RATING</div>
        <p class="card__rating">${vote_average}</p>
        </div>
      </div>
      `;

    main.appendChild(card);
  });
  const cardItems = document.querySelectorAll('.card');
  cardItems.forEach((e) => {
    e.addEventListener('click', () => {
      const id = e.childNodes[3].childNodes[3].textContent;

      const movieIdURL = `https://api.themoviedb.org/3/movie/${id}?api_key=dd7331cca3d42d6219e14ab06fd6d0b6&language=en-US`;
      getDetails(movieIdURL);      
    });
  });
};

const renderPromo = (result) => {
  promo.innerHTML = '';
  try {
    const { backdrop_path, title, overview, vote_average } = result[0];
    const promoRender = document.createElement('div');
    promoRender.classList.add('promo__inner');
    promoRender.innerHTML = `
    <h2 class="promo__title">${title}</h2>
    <p class="promo__description">${overview}</p>
    <p class="promo__rating">RATING: <span>${vote_average}</span></p>
    `;
    promoIMG.src = urlIMG + backdrop_path;

    promo.append(promoRender);
  } catch {
    promo.innerHTML = '';

    const promoRender = document.createElement('div');
    promoRender.classList.add('promo__inner');
    promoRender.innerHTML = `
    <h2 class="promo__title">OUCH! We dont know this movie :(</h2>
    `;
    promoIMG.src = '';
    promo.append(promoRender);
  }
};

const renderModal = (details) => {
  modal.innerHTML = '';
  const { backdrop_path, title, overview, vote_average, genres } = details;
  modal.classList.remove('hide');
  modal.classList.add('show');
  body.classList.add('scroll-lock')
  modalIMG.src = urlIMG + backdrop_path;

  let genresList = '';
  genres.map((e) => (genresList = `${genresList} ${e.name},`));  

  const modalRender = document.createElement('div');

  modalRender.classList.add('modal__inner');
  modalRender.classList.add('modal-container');
  modalRender.innerHTML = `
    <img class="modal__img container" src="${modalIMG.src}" alt="" id="modal-img" >
    <h2 class="modal__title">${title}.</h2>
    <p class="modal__desc">${overview}</p>
    <div class="modal__footer">
      <p class="modal__genre">genre: ${genresList.slice(0, -1)}</p>
      <p class="modal__rating">RATING: <span>${vote_average}</span></p>      
    </div>    
    <div class="close-modal"></div>`;

  modal.append(modalRender);
};

window.addEventListener('click', () => {
  modal.classList.add('hide');
  modal.classList.remove('show');
  body.classList.remove('scroll-lock')
});

window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    modal.classList.add('hide');
    modal.classList.remove('show');
    body.classList.remove('scroll-lock')
  }
});

//submit-search
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = search.value;
  if (query) {
    getMovies(searchAPI + query);
  }
});

logo.addEventListener('click', () => {
  getMovies(upcomingURL);
});

searchBtn.addEventListener('click', () => {
  const query = search.value;
  if (search.value) {
    getMovies(searchAPI + query);
  }
});

getMovies(upcomingURL);

//

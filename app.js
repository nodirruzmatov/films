"use stri";

const elFilmList = document.querySelector(".film_list");
const elInput = document.querySelector(".input");
const elFilmPages = document.querySelector(".film_pages");

const API_KEY = "b1566df1";
let srcName = "hulk";
let page = 1;

// !----------
elFilmPages.addEventListener("click", (ent) => {
  const pageBtn = ent.target.dataset.page * 1;
  page = pageBtn;

  getMovuesData();
});

// todo: get data from backend
const getMovuesData = async () => {
  const request = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${srcName}&page=${page}`
  );

  const data = await request.json();

  if (data.Response && data.totalResults > 0) {
    renderMovie(data.Search, elFilmList);

    const pageNum = Math.ceil(data.totalResults / 10);
    addPage(pageNum, elFilmPages);

    console.log(data);

    if (page === 1) {
      prevBtn.classList.add("hidden");
      nextBtn.classList.remove("hidden");
    } else if (page === Math.ceil(data.totalResults / 10)) {
      nextBtn.classList.add("hidden");
      prevBtn.classList.remove("hidden");
    } else {
      prevBtn.classList.remove("hidden");
      nextBtn.classList.remove("hidden");
    }
  }
};

getMovuesData();

// todo: add elements into html
const renderMovie = (filmData, htmlElement) => {
  elFilmList.innerHTML = null;
  elFilmPages.innerHTML = null;

  filmData.forEach((muvie) => {
    html = `
      <li class="film-item">
        <img class="film-img" src="${muvie.Poster}" width="200" height="200" alt="">
        <h3 class="film-title">${muvie.Title}</h3>
        <p class="film-year">${muvie.Year}</p>
        <p class="film-category">${muvie.Type}</p>
      </li>
    `;

    htmlElement.insertAdjacentHTML("beforeend", html);
  });
};

// !-----------------
const addPage = (num, elHtml) => {
  for (i = 1; i <= num; i++) {
    html = `
      <button class="film_page" data-page="${i}">${i}</button>
    `;

    elHtml.insertAdjacentHTML("beforeend", html);
  }
};

// todo: get name of muvie via input
elInput.addEventListener("change", () => {
  page = 1;
  const inputValue = elInput.value;
  srcName = inputValue;

  getMovuesData();
});

nextBtn.addEventListener("click", () => {
  page++;

  getMovuesData();
});

prevBtn.addEventListener("click", () => {
  page--;

  getMovuesData();
});

import axios from 'axios';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

import { renderCardsList } from './home_categories-api';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

const refs = {
  formExtraFilters: document.querySelector('.extra-filters-form'),
  inputExtraFiltersForm: document.querySelector('.extra-filters-form-input'),
  searchResetBtnInputExtraFiltersForm: document.querySelector(
    '[data-search-reset]'
  ),
  timeSelectorFiltersForm: document.querySelector('#time'),
  areaSelectorFiltersForm: document.querySelector('#area'),
  ingredientsSelectorFiltersForm: document.querySelector('#ingredients'),
  resetBtnTotalExtraFiltersForm: document.querySelector(
    '.extra-filters-reset-btn'
  ),
  allCategoriesGallery: document.querySelector('.pictures-gallery'),
};

let limitCount = 0;
if (document.documentElement.clientWidth < 768) {
  limitCount = 6;
} else if (
  document.documentElement.clientWidth > 768 &&
  document.documentElement.clientWidth < 1280
) {
  limitCount = 8;
} else if (document.documentElement.clientWidth > 1280) {
  limitCount = 9;
}

const {
  formExtraFilters,
  inputExtraFiltersForm,
  searchResetBtnInputExtraFiltersForm,
  timeSelectorFiltersForm,
  areaSelectorFiltersForm,
  ingredientsSelectorFiltersForm,
  resetBtnTotalExtraFiltersForm,
  allCategoriesGallery,
} = refs;

// const recipes = document.querySelector('.nav-scroller__item');
// console.log(recipes);
//================================================================
//                  управління
//================================================================

resetBtnTotalExtraFiltersForm.addEventListener('click', () => {
  timeSelectorFiltersForm.value = '';
  areaSelectorFiltersForm.value = '';
  ingredientsSelectorFiltersForm.value = '';
  allCategoriesGallery.innerHTML = '';
});

searchResetBtnInputExtraFiltersForm.addEventListener('click', () => {
  inputExtraFiltersForm.value = '';
  searchResetBtnInputExtraFiltersForm.hidden = true;
  allCategoriesGallery.innerHTML = '';
});

searchResetBtnInputExtraFiltersForm.hidden = true;

export function onFetchError(error) {
  console.log(error);
  Notiflix.Report.failure(
    '&#128532; Something went wrong!',
    'Try reloading the page!',
    'And try Again'
  );
}

//================================================================
//                  отримуємо інфо з API у розмітку
//================================================================

// async function getOptions(api) {
//   const response = await axios.get(`${BASE_URL}/${api}`);
//   return response.data;
// }

// async function markUpOptionsArr(api) {
//   const data = await getOptions(api);
//   return data.reduce((markUp, currentName) => {
//     return markUp + `<option class="option">${currentName.name}</option>`;
//   }, '');
// }

// async function addOptions(api, input) {
//   const data = await markUpOptionsArr(api);

//   input.insertAdjacentHTML('beforeend', data);
// }

// addOptions('areas', areaSelectorFiltersForm);
// addOptions('ingredients', ingredientsSelectorFiltersForm);

//================================================================
//                 запит
//================================================================

formExtraFilters.addEventListener('click', event => {
  event.preventDefault();
});

inputExtraFiltersForm.addEventListener(
  'input',
  debounce(handleSearchInput, 300)
);

const recipes1 = [];

async function getRecipesByKeyword(keyword = '', category, ingredients, area) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes`, {
      params: {
        title: keyword,
        category: category,
        area: area,
        ingredients: ingredients,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    onFetchError();
  }
}

getRecipesByKeyword().then(data => {
  let response = data.results;
  // console.log(response);
  response.forEach(resipe => {
    // recipes1.push(resipe);
    // console.log(recipes1);
    // return recipes1;
    resipe;
  });
});

// function getOptions(keyWord, recipes) {
//   return recipes.filter(recipe => {
//     // console.log();

//     const equal = recipe.title;

//     // Определить совпадает ли то что мы вбили в input
//     // тегам внутри массива

//     const regex = new RegExp(keyWord, 'gi');
//     return equal
//       .map(el => el)
//       .join(' ')
//       .match(regex);
//   });
// }

// function handleSearchInput(event) {
//   searchValue = event.target.value.trim();
//   const options = getOptions(searchValue, recipes1);
//   const html = options
//     .map(recipe => {
//       const regex = new RegExp(`${searchValue}`, 'gi');

//       console.log(regex);
//       const recipeName = recipe.title.replise(
//         regex,
//         `
//           <h2 class="card-title">${pictures[0].results[i].searchValue}}</h2>`
//       );
//       // return renderCardsList(recipe);
//       return `<h2 class="card-title">${pictures[0].results[i].searchValue}}</h2>`;
//     })
//     .slice(0, 10)
//     .join('');
//   allCategoriesGallery.innerHTML = renderCardsList(filteredCardsData).join('');;
// }

// async function handleSearchInput(event) {
//   searchValue = event.target.value.trim();
//   // console.log(searchValue);
//   filteredSearch();
// }

// //функция фильтрации товаров

// function filteredSearch() {
//   const rgx = new RegExp(searchValue);
//   let filteredCardsData = cards.filter(card => {
//     if (rgx.test(card.tags)) {
//       return true;
//     }
//     return false;
//   });
//   allCategoriesGallery.innerHTML = renderCardsList(filteredCardsData).join('');
// }

// async function getRecipesByKeyword(keyword = '', category, ingredients, area) {
//   try {
//     const response = await axios.get(`${BASE_URL}/recipes`, {
//       params: {
//         tags: keyword,
//         category: category,
//         area: area,
//         ingredients: ingredients,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     // onFetchError();
//   }
// }
async function handleSearchInput() {
  const keyWord = inputExtraFiltersForm.value.trim();
  if (keyWord === '') {
    //   getRecipes()
    //     .then(data => {
    //       renderCardsList(data);
    //       searchResetBtnInputExtraFiltersForm.hidden = true;
    //     })
    //     .catch(onFetchError);
  }
  if (keyWord !== '') {
    searchResetBtnInputExtraFiltersForm.hidden = false;

    await getRecipesByKeyword(keyWord).then(data => {
      let response = data.results;
      // let response = JSON.stringify(data.results);
      // console.log(response);

      response
        .map(resipes => {
          if (!resipes.tags.includes(keyWord)) {
            return;
          }

          const { _id, preview, title, description, rating } = resipes;

          allCategoriesGallery.innerHTML = '';
          allCategoriesGallery
            .insertAdjacentHTML(
              'beforeend',
              `<li class="cards__item items-set"
   data-id="${_id}">
    <img src="${preview}" alt="${title}" class="cards__img" />
    <button class="cards__fav-btn">
      <svg
        class="cards__heart"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.1031 4.2258C18.6349 3.75739 18.079 3.38581 17.4672 3.13229C16.8554 2.87878 16.1996 2.74829 15.5373 2.74829C14.875 2.74829 14.2192 2.87878 13.6074 3.13229C12.9955 3.38581 12.4396 3.75739 11.9715 4.2258L10.9998 5.19746L10.0281 4.2258C9.0824 3.28008 7.79973 2.74878 6.46228 2.74878C5.12484 2.74878 3.84217 3.28008 2.89645 4.2258C1.95073 5.17152 1.41943 6.45418 1.41943 7.79163C1.41943 9.12908 1.95073 10.4117 2.89645 11.3575L3.86812 12.3291L10.9998 19.4608L18.1315 12.3291L19.1031 11.3575C19.5715 10.8893 19.9431 10.3334 20.1966 9.72154C20.4501 9.1097 20.5806 8.45391 20.5806 7.79163C20.5806 7.12935 20.4501 6.47356 20.1966 5.86172C19.9431 5.24988 19.5715 4.69399 19.1031 4.2258V4.2258Z"
          stroke="#F8F8F8"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="cards__descr">
      <h4 class="cards__title">${title}</h4>
      <p class="cards__text">
        ${description}
      </p>
      <div class="cards__info">
        <div class="cards__rating rating">
          <div class="rating__value">${rating}</div>
          <div class="rating__body">
            <div class="rating__active"></div>
            <div class="rating__items">
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="1"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="2"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="3"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="4"
              />
              <input
                type="radio"
                class="rating__item"
                name="rating"
                value="5"
              />
            </div>
          </div>
        </div>
        <button class="btn btn-primary cards__btn">See recipe</button>
      </div>
    </div>
  </li>
    `
            )
            .join('');
        })
        .catch(error => {
          // onFetchError(error);
          console.log(error);
        });
    });
  }
}

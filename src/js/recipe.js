// import { Loader } from './loader';
// import { markUpRating } from './ratings';
// import localStorage from './localstorage';
// import { KEY } from './addToFavorites';
// import { addToFavorites, removeFromFavorites } from './addToFavorites';
// // Всі посилання
// let refs = {
//   closeBtn: document.querySelector('.modal-close-recipe'),
//   closeVideo: document.querySelector('.tiezer-close-btn'),
//   tiezer: document.querySelector('.tiezer'),
//   trailerBox: document.querySelector('.trailer-box'),
//   btnOpenYouTube: document.querySelector('.js-btn-openYouTube'),
//   preview: document.querySelector('.recipes'),
//   video: document.querySelector('iframe'),
//   title: document.querySelector('.js-title'),
//   time: document.querySelector('.js-minute'),
//   modalRecipe: document.querySelector('.js-modal-recipe'),
//   backdropRecipe: document.querySelector('.js-backdrop-recipe'),
//   ratingBox: document.querySelector('.js-rating-recipe-wrapper'),
//   IngredientBox: document.querySelector('.recipes-list'),
//   hashtagsBox: document.querySelector('.hashtags-list'),
//   textContentBox: document.querySelector('.cooking-recipes'),
//   addToFavoriteBtn: document.querySelector('.js-addToFavorite-btn'),
//   removeFromFavoriteBtn: document.querySelector('.js-removeFromFavorite-btn'),
// };

// let recipeId;

// refs.closeBtn.addEventListener('click', closeModalClose);
// refs.backdropRecipe.addEventListener('click', clickBackdropClick);
// function openModalOpen() {
//   setTimeout(() => {
//     window.addEventListener('keydown', onEscPress);
//     document.body.classList.add('overflowHidden');
//     refs.backdropRecipe.classList.add('active');
//     refs.modalRecipe.classList.add('active');
//   }, 50);
// }
// function closeModalClose() {
//   window.removeEventListener('keydown', onEscPress);
//   document.body.classList.remove('overflowHidden');
//   refs.backdropRecipe.classList.remove('active');
//   refs.modalRecipe.classList.remove('active');
// }
// function clickBackdropClick(e) {
//   if (e.currentTarget === e.target) {
//     stopVideos();
//     closeModalClose();
//   }
// }
// function onEscPress(e) {
//   if (e.code === 'Escape') {
//     closeModalClose();
//   }
// }

// export function finallInitPage(id) {
//   fetchRecipeById(id).then(data => {
//     isFavorite(data._id);
//     renderVIDEO(data);
//     renderRanting(data);
//     markUpRating();
//     renderIngridient(data);
//     renderHashtags(data);
//     renderText(data);
//     openModalOpen();
//     recipeId = data._id;
//   });
// }

// async function fetchRecipeById(id) {
//   const resp = await fetch(
//     `https://tasty-treats-backend.p.goit.global/api/recipes/${id}`
//   );
//   const data = await resp.json();
//   return data;
// }

// refs.closeVideo.addEventListener('click', stopVideos);
// refs.btnOpenYouTube.addEventListener('click', openPlayer);

// function stopVideos() {
//   refs.trailerBox.classList.remove('active');

//   document.querySelectorAll('iframe').forEach(video => {
//     video.src = video.src;
//   });
//   document.querySelectorAll('video').forEach(video => {
//     video.pause();
//   });
// }
// function openPlayer() {
//   refs.trailerBox.classList.add('active');
// }

// function getKeyYouTybe(url) {
//   let indexLast = url.split('').length;

//   let key = url.split('').splice(32, indexLast).join('');
//   return key;
// }
// function renderVIDEO(data) {
//   const markUp = `
//    <iframe
//                 width="100%"
//                 height="100%"
//                 src="https://www.youtube.com/embed/${getKeyYouTybe(
//                   data.youtube
//                 )}?origin=https://mrcolti4.github.io"

// title = "YouTube video player"
// frameborder = "0"
// allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// allowfullscreen
//   ></iframe >
// `;
//   refs.tiezer.innerHTML = markUp;
// }
// function renderRanting(data) {
//   let markupR = `
//   <div class="cards__rating rating">
//           <div class="rating__value detail">${data.rating}</div>
//           <div class="rating__body">
//             <div class="rating__active"></div>
//             <div class="rating__items">
//               <input
//                 type="radio"
//                 class="rating__item"
//                 name="rating"
//                 value="1"
//               />
//               <input
//                 type="radio"
//                 class="rating__item"
//                 name="rating"
//                 value="2"
//               />
//               <input
//                 type="radio"
//                 class="rating__item"
//                 name="rating"
//                 value="3"
//               />
//               <input
//                 type="radio"
//                 class="rating__item"
//                 name="rating"
//                 value="4"
//               />
//               <input
//                 type="radio"
//                 class="rating__item"
//                 name="rating"
//                 value="5"
//               />
//             </div>
//           </div>
//         </div>`;
//   refs.ratingBox.innerHTML = markupR;
// }
// function renderIngridient(data) {
//   const markup = data.ingredients
//     .map(({ measure, name }) => {
//       return `<li class="recipes-subtitle">
//                 ${name}
//                 <p class="recipes-inf" p>${measure}</p>
//               </li>`;
//     })
//     .join('');

//   refs.IngredientBox.innerHTML = markup;
// }
// function renderHashtags(data) {
//   if (data.tags.length === 0) {
//     return;
//   }
//   const markup = data.tags
//     .map(tag => {
//       return ` <li class="hashtags">#${tag}</li>`;
//     })
//     .join('');

//   refs.hashtagsBox.innerHTML = markup;
// }
// function renderText(data) {
//   refs.preview.src = data.preview;
//   refs.title.textContent = data.title;
//   refs.textContentBox.textContent = data.instructions;
//   refs.time.textContent = data.time + ' min';
// }

// // Реалізцація кнопок додавання та видалення з блоку favorites
// refs.addToFavoriteBtn.addEventListener('click', onAddToFavClick);
// refs.removeFromFavoriteBtn.addEventListener('click', onRemoveFromFavClick);

// function onAddToFavClick(e) {
//   const listItem = document.querySelector(`li[data-id='${recipeId}']`);

//   addToFavorites(localStorage.load(KEY), recipeId);

//   listItem.classList.add('onFavorites');
//   refs.addToFavoriteBtn.classList.add('hidden');
//   refs.removeFromFavoriteBtn.classList.remove('hidden');
// }

// function onRemoveFromFavClick(e) {
//   const listItem = document.querySelector(
//     `li.cards__item[data-id='${recipeId}']`
//   );

//   removeFromFavorites(localStorage.load(KEY), recipeId);

//   listItem.classList.remove('onFavorites');
//   refs.addToFavoriteBtn.classList.remove('hidden');
//   refs.removeFromFavoriteBtn.classList.add('hidden');
// }

// function isFavorite(id) {
//   const favCards = localStorage.load(KEY) || {};
//   if (Object.keys(favCards).includes(id)) {
//     refs.removeFromFavoriteBtn.classList.remove('hidden');
//     refs.addToFavoriteBtn.classList.add('hidden');
//     return;
//   }
//   refs.removeFromFavoriteBtn.classList.add('hidden');
//   refs.addToFavoriteBtn.classList.remove('hidden');
// }
const modal = document.querySelector('.modal-recipes');

// Function to dynamically populate the modal with recipe data
function populateModal(recipe) {
  const iframeWrapper = modal.querySelector('.recipes-iframe-wrapper');
  const title = modal.querySelector('.recipes-title');
  const ratingValue = modal.querySelector('.rating-value');
  const ratingStars = modal.querySelector('.modal-rating-star-list');
  const cookingTime = modal.querySelector('.recipes-cooking-time');
  const ingredientsList = modal.querySelector('.recipes-components-list');
  const hashtagsList = modal.querySelector('.recipes-hashtags-list');
  const description = modal.querySelector('.recipes-description');

  // Populate the iframe for video or image (you may need to check if the video exists)
  if (recipe.youtube) {
    const iframe = document.createElement('iframe');
    iframe.classList.add('recipes-iframe-video');
    iframe.src = recipe.youtube.replace('_ID_', getYoutubeId(recipe.youtube));
    iframe.allow =
      'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframeWrapper.appendChild(iframe);
  } else if (recipe.preview) {
    const image = document.createElement('img');
    image.src = recipe.preview;
    image.alt = recipe.title;
    image.classList.add('recipes-iframe-video');
    iframeWrapper.appendChild(image);
  }

  // Populate other recipe details
  title.textContent = recipe.title;
  ratingValue.textContent = recipe.rating.toFixed(1);
  cookingTime.textContent = `${recipe.time} min`;

  // Populate the rating stars (assuming "rating" is a number from 1 to 5)
  const ratingStarsCount = 5;
  ratingStars.innerHTML = '';
  for (let i = 1; i <= ratingStarsCount; i++) {
    const starIcon = document.createElement('svg');
    starIcon.classList.add('modal-rating-star-icon');
    if (i <= recipe.rating) {
      // Filled star
      starIcon.innerHTML =
        '<use href="/src/images/sprite/icons.svg#icon-Star-1"></use>';
    } else {
      // Empty star
      starIcon.innerHTML =
        '<use href="/src/images/sprite/icons.svg#star-1"></use>';
    }
    ratingStars.appendChild(starIcon);
  }

  // Populate the ingredients list
  ingredientsList.innerHTML = '';
  recipe.ingredients.forEach(ingredient => {
    const ingredientItem = document.createElement('li');
    ingredientItem.classList.add('recipes-components-item');
    ingredientItem.innerHTML = `
      <p class="recipes-components-item_name">${ingredient.name}</p>
      <p class="recipes-components-item_quantity">${ingredient.measure}</p>
    `;
    ingredientsList.appendChild(ingredientItem);
  });

  hashtagsList.innerHTML = '';
  recipe.tags.forEach(tag => {
    const hashtagItem = document.createElement('li');
    hashtagItem.classList.add('recipes-hashtags-item');
    hashtagItem.textContent = tag;
    hashtagsList.appendChild(hashtagItem);
  });

  description.textContent = recipe.description;
}

function getYoutubeId(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : '';
}

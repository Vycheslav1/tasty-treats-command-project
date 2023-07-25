import axios from 'axios';

const backdrop = document.querySelector('.backdrop-recipes');
const modal = document.querySelector('.modal-recipe');
const closeBtn = document.querySelector('.modal-close-btn-recipe');

closeBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', onEscKeyPress);
backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

function openModal() {
  if (modal) {
    modal.classList.remove('is-hidden');
    backdrop.classList.remove('is-hidden');
    backdrop.removeEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
  }
}

function closeModal() {
  if (modal) {
    modal.classList.add('is-hidden');
    document.removeEventListener('keydown', onEscKeyPress);
    backdrop.removeEventListener('click', closeModal);
    backdrop.classList.add('is-hidden');
  }
}

function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

async function fetchRecipe(recipeId) {
  console.log(recipeId);
  const url = `https://tasty-treats-backend.p.goit.global/api/recipe/${recipeId}`;
  try {
    const response = await axios.get(url);
    const recipe = response.data;
    displayRecipeVideo(recipe);
    displayRecipeTitle(recipe);
    displayRecipeDescription(recipe);
    displayRecipeTimeCooking(recipe);
    displayRecipeRating(recipe);
    displayRecipeHashtags(recipe);
    displayRecipeIngredients(recipe);
    displayStarRating(recipe);
    return recipe;
  } catch (error) {
    console.log(error);
  }
}

function displayRecipeVideo(recipe) {
  const recipeVideoIframe = document.querySelector('.recipe-iframe-video');
  const youtubeLink = recipe.youtube;
  const videoId = getVideoIdFromLink(youtubeLink);
  recipeVideoIframe.src = `https://www.youtube.com/embed/${videoId}`;
}

function getVideoIdFromLink(link) {
  const regex =
    /(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([\w-]+)/i;
  const matches = link.match(regex);
  return matches && matches[1] ? matches[1] : '';
}

function displayRecipeTitle(recipe) {
  const recipeTitleEl = document.querySelector('.recipe-title');
  recipeTitleEl.textContent = recipe.title;
}

function displayRecipeDescription(recipe) {
  const recipeTitleEl = document.querySelector('.recipe-description');
  recipeTitleEl.textContent = recipe.instructions;
}

function displayRecipeTimeCooking(recipe) {
  const tmeCookingEl = document.querySelector('.recipe-cooking-time');
  tmeCookingEl.textContent = recipe.time;
}

function displayRecipeRating(recipe) {
  const recipeRatingEl = document.querySelector('.rating-value');
  recipeRatingEl.textContent = recipe.rating;
}

function displayRecipeHashtags(recipe) {
  const recipeHashtagsEl = document.querySelector('.recipe-hashtags-list');
  recipeHashtagsEl.innerHTML = recipe.tags
    .map(tag => `<li class="recipe-hashtags-item">#${tag}</li>`)
    .join('');
}

function displayRecipeIngredients(recipe) {
  const recipeIngredientsEl = document.querySelector('.recipe-components-list');
  recipeIngredientsEl.innerHTML = recipe.ingredients
    .map(
      ({ measure, name }) => `
    <li class="recipe-components-item">
      <p class="recipe-components-item_name">${name}</p>
      <p class="recipe-components-item_quantity">${measure}</p>
    </li>
  `
    )
    .join('');
}

function displayStarRating(recipe) {
  const ratingValue = parseFloat(recipe.rating);
  const starElements = document.querySelectorAll('.modal-rating-star-icon');

  for (let i = 0; i < starElements.length; i++) {
    if (i < ratingValue) {
      starElements[i].classList.add('active');
    } else {
      starElements[i].classList.remove('active');
    }
  }
}

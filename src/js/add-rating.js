import Notiflix from 'notiflix';

const ratingInputs = document.querySelectorAll(".star-rating__input");
const ratingValue = document.querySelector(".rating-value");

  ratingInputs.forEach((input) => {
      input.addEventListener("click", () => {
          let rating = input.value;
      ratingValue.textContent = `${rating}.0`;
    });
  });


// Send rating to backend
const base_URL = 'https://tasty-treats-backend.p.goit.global/api'

function sendRatingToBackend(rating, email, id) {

    const dataToSend = {
    rate: rating,
    email: email,
    };

    fetch(`${base_URL/recipes/{id}/rating}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          Notiflix.Notify.success('Rating added successfully!');
        } else {
          Notiflix.Notify.failure('Error adding rating. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const ratingForm = document.querySelector('.rating-form');
  const emailInput = document.querySelector('.rating-email');

  ratingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let ratingValue = 0;
    for (const input of ratingInputs) {
      if (input.checked) {
        ratingValue = input.value;
        break;
      }
    }

    if (ratingValue === 0) {
      Notiflix.Notify.warning('Please select a rating.');
      return;
    }

    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Notiflix.Notify.warning('Please enter a valid email address.');
      return;
    }

    sendRatingToBackend(ratingValue, email, /*тут має бути id страви*/);
  });

  // MODAL open-close

  (() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();
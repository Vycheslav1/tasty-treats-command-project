// навісити на extra-filters-form-select новий клас, коли опція обрана option-choosed
// навісити клас , коли починаємо писати в інпуті Сьорч формт extra-filters-search-icon-close
import axios from 'axios';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

const refs = {
  formExtraFilters: document.querySelector('.extra-filters-form'),
  inputExtraFiltersForm: document.querySelector('.extra-filters-form-input'),
  searchResetBtnInputExtraFiltersForm: document.querySelector(
    '[data-search-reset]'
  ),
  timeExtraFiltersForm: document.querySelector('#time'),
  areaExtraFiltersForm: document.querySelector('#area'),
  ingredientsExtraFiltersForm: document.querySelector('#ingredients'),
  resetBtnTotalExtraFiltersForm: document.querySelector(
    '.extra-filters-reset-btn'
  ),
};

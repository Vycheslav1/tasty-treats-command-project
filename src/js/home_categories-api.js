import axios from 'axios';

import Pagination from 'tui-pagination';

import 'tui-pagination/dist/tui-pagination.css';

let url;

let stop;

let searchParam;

let pictures = [];

let loadPage;

let pageNumber;

loadPage = 1;


const recipes = document.querySelector(".nav-scroller");

const gallery = document.querySelector(".section-elements .pictures-gallery");


const fetchObjects = async () => {
  console.log(url);
  const response = await axios.get(url);
  const results = await response;
  return results;
};

function renderCardsList(results) {

  let markup = ``;
 
  for (let i = 0; i < pictures[0].results.length; i += 1) {
   

    markup += `<li><div class="photo-card"><img class="picture"  src=${pictures[0].results[i].preview} alt=${pictures[0].results[i].tags[0]} loading="lazy" />
  </div></li>`;
  };//};
  gallery.innerHTML = markup;

  gallery.insertAdjacentHTML("beforeend", `<section class="pagination-wrapper"><div id="tui-pagination-container" class="tui-pagination"></section></div>`);
 
  const container = document.getElementById('tui-pagination-container');
  
  const options = {
    totalItems: results.data.totalPages,
    itemsPerPage: 9,
    visiblePages: 3,
    page: loadPage,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:

        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>'
    }
  };
  const pagination = new Pagination(container, options);
  const instance = new Pagination(container, options);
  instance.getCurrentPage();
  instance.on('afterMove', (event) => {
   
    loadPage = event.page;

    const searchParams = new URLSearchParams({
      category: "",
      limit: 9,
      page: loadPage


    });
    

    if (loadPage * searchParams.get("limit") >= results.data.totalPages) {
      pageNumber = (results.data.totalPages) % ((loadPage - 1) * searchParams.get("limit"));

      searchParams.set("limit", pageNumber);

    }
    if (loadPage > Number.parseInt((results.data.totalPages) % stop) + 1) {
      return;
    }

    url = `${base_url}?${searchParams}`;
    fetchObjects().then(results => {
      
      pictures.splice(0,1);
      alert(pictures.length);
      pictures.push(results.data);
      
      renderCardsList(results);

    });

  });
 


}

const base_url = "https://tasty-treats-backend.p.goit.global/api/recipes?categories";

const searchParams = new URLSearchParams({
  category: "",
  page: 1,
  limit: 9

});
stop = searchParams.get("limit");

url = `${base_url}?${searchParams}`;

fetchObjects().then(results => {
  
  if (results.data.totalPages === 0) {
  
    gallery.innerHTML = ``;

    gallery.innerHTML = `<div class="plug"><svg class="icon-plug"><use href="./images/sprite/icons.svg#icon-elements"></use></svg>
   <p class="plug-text">Sorry, there are no images matching your search query. Please try again</p></div>`;


    return;
  } else {

    pictures.push(results.data);

   

  }

  renderCardsList(results);


})
  .catch(error => {
    console.log(error);

      

  });


axios.get(url).then((response) => console.log(response));

const category_url = "https://tasty-treats-backend.p.goit.global/api/categories";

axios.get(category_url).then(response => {
  const recipes_markup = response.data.map((category) =>

    `<a class="nav-scroller__item" href="#">${category.name}</a>`
  ).join("");
  recipes.innerHTML = recipes_markup;
  

  recipes.addEventListener("click", (evt) => {
    
    for (const item of response.data) {
      if (item.name === evt.target.innerText) {
        

        const searchParams = new URLSearchParams({
          category: "",
          page: 1,
          limit: 9,
        });
        
        url = `${base_url}?${searchParams}`;

        pictures.splice(0, 1);
      
        fetchObjects().then(results => {

          searchParams.set("limit", results.data.totalPages);
          fetchObjects().then(results => console.log(results.data));
        
              if(results.data.totalPages===0)
              {
         

               gallery.innerHTML=``;

               gallery.innerHTML=`<div class="plug"><svg class="icon-plug"><use href="./images/sprite/icons.svg#icon-elements"></use></svg>
              <p class="plug-text">Sorry, there are no images matching your search query. Please try again</p></div>`;


               return;
               }else{
          
          renderCardsList(results);

         
             }

             


        })
          .catch(error => {
            console.log(error);

             

          });



      }
    }
  });
});



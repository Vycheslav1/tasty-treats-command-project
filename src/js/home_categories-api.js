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

let region;

let constituent;

let period;

let sort;

let perPage;

const recipes = document.querySelector(".nav-scroller");

const gallery = document.querySelector(".photos .pictures-gallery");
const things = document.querySelector(".photos");
const allCategories=document.querySelector(".all-categories");

const plugCover=document.querySelector(".plug");

const chapter=document.querySelector(".section-elements");

perPage=9;

stop=perPage;

period=0;

region="";

constituent="";

sort="";
//const fetchObjects = async () => {
 // console.log(url);
 // const response = await axios.get(url,{params:{}});
//  const results = await response;
//  return results;
//};

function renderCardsList(foods) {
console.log(foods);

  let markup = ``;
 
  for (let i = 0; i < pictures[0].results.length; i += 1) {
   

    markup += `<li><div class="photo-card"><img class="picture"  src=${pictures[0].results[i].preview} alt=${pictures[0].results[i].tags[0]} loading="lazy" />
 <!-- <h2 class="card-title">${pictures[0].results[i].title}</h2><p class="recipe-description">${pictures[0].results[i].description}</p>
  <ul class="rating"><li class="recipe-rating">${pictures[0].results[i].rating}</li><li class="stars"></li><li class="recipe-button">
  <button type="button" class="get-recipes">See recipe</button></li></ul>--></div></li>`;
  };//};
  gallery.innerHTML = markup;

  gallery.insertAdjacentHTML("beforeend", `<section class="pagination-wrapper"><div id="tui-pagination-container" class="tui-pagination"></section></div>`);
 
  const container = document.getElementById('tui-pagination-container');
  
  const options = {
    totalItems: foods.totalPages,
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

      

    if (loadPage * stop >= foods.totalPages) {
      perPage = (foods.totalPages) % ((loadPage - 1) * stop);

    

    }
    if (loadPage > Number.parseInt((foods.totalPages) % stop) + 1) {

       return;
    }

   
    axios.get(base_url,{params:{category:sort,page:loadPage,limit:perPage}}).then(response => {
      
      pictures.splice(0,1);
      
      pictures.push(response.data);
      
      renderCardsList(response.data);

    });

  });
 
  perPage=stop;

}

const base_url = "https://tasty-treats-backend.p.goit.global/api/recipes?categories";



axios.get(base_url,{params:{category:sort,page:loadPage,limit:perPage}}).then(response => {
  
  if (response.data.totalPages===0) {
  
    galllery.innerHTML = ``;
   // things.innerHTML=``;
 //  gallery.innerHTML = `<div class="plug"><svg class="icon-plug"><use href="./images/sprite/icons.svg#icon-elements"></use></svg>
//  /<p class="plug-text">Sorry, there are no images matching your search query. Please try again</p></div>`;
//plugCover.classList.toggle(".is-hidden");
 
    return;
  } else {

    pictures.push(response.data);

   

  }

  renderCardsList(response.data);


})
  .catch(error => {
    console.log(error);

      

  });



const category_url = "https://tasty-treats-backend.p.goit.global/api/categories";

axios.get(category_url).then(response => {
  const recipes_markup = response.data.map((category) =>

    `<a class="nav-scroller__item" href="#">${category.name}</a>`
  ).join("");
  recipes.innerHTML = recipes_markup;
  
  

  recipes.addEventListener("click", (evt) => {
 
    for (const item of response.data) {
      if (item.name === evt.target.innerText) {
        
       sort=evt.target.innerText;
     
       loadPage=1;
    

        pictures.splice(0, 1);
      
        axios.get(base_url,{params:{category:sort,page:loadPage,limit:perPage}}).then(response => {
      console.log(response);
       
       
              if(response.data.totalPages===0)
              {
         

               gallery.innerHTML=``;

           //    gallery.innerHTML=`<div class="plug"><svg class="icon-plug"><use href="./images/sprite/icons.svg#icon-elements"></use></svg>
          //    <p class="plug-text">Sorry, there are no images matching your search query. Please try again</p></div>`;


               return;
               }else{
                pictures.push(response.data);

          renderCardsList(response.data);
         
        
             }


        })
          .catch(error => {
            console.log(error);

             

          });



      }
    }
  });
});

allCategories.addEventListener("click",()=>{

  loadPage=1;

  sort="";
  pictures.splice(0, 1);
  axios.get(base_url,{params:{category:sort,page:loadPage,limit:perPage}}).then(response => {
  
    if (response.data.totalPages === 0) {
    
      gallery.innerHTML = ``;
  
  //    gallery.innerHTML = `<div class="plug"><svg class="icon-plug"><use href="./images/sprite/icons.svg#icon-elements"></use></svg>
  //   <p class="plug-text">Sorry, there are no images matching your search query. Please try again</p></div>`;
  
  
      return;
    } else {
  
      pictures.push(response.data);
  
     
  
    }
  
    renderCardsList(response.data);
  
  
  })
    .catch(error => {
      console.log(error);
  
        
  
    });

});

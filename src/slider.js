import axios from "axios";

const tastyTreats = axios.create({
    baseURL:"https://tasty-treats-backend.p.goit.global/api",
});

function getAllEvents(){
    return tastyTreats.get("/events");
}

const refs={
    images: document.querySelector('.images'),
}

getAllEvents().then(({data})=>{
    console.log(data)
    const markup = createMarkup(data);
    refs.images.insertAdjacentHTML('beforeend',markup);     
    
    const swiper = new Swiper('.swiper', {    
      // Optional parameters     
    loop: true,  
    effect: 'cube',
    cubeEffect: {
    slideShadows: false,     
    },
    autoplay: {
    delay: 3000,
    disableOnInteraction:false,    
    },
    mousewheel: {
    invert: true,    
    },     
    pagination: {
        el: '.swiper-pagination',  
        clickable: true,        
    },      
    });
})

function createMarkup(events){
return events.map(({cook,topic:{name,area,imgUrl,previewUrl}}) =>{
  const markup = `
<div class="swiper-container swiper-slide">
  <div class="image cook">
    <img class="cook-img" src="${cook.imgUrl}" alt="${cook.name}">
    </div>
    <div class="image first-dish">
    <img class="first-dish-img" src="${previewUrl}" alt="${name}">
      <div class="dish-desc">
      <h3 class="dish-name">${name}</h3>
      <p class="dish-area">${area}</p>
      </div>
    </div>
    <div class="image second-dish">
    <img class="second-dish-img" src="${imgUrl}" alt="${name}" >
    </div>
</div>
  ` ;
  return markup; 
}).join("");
};


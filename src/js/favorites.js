// const localStorageRecipes = localStorage.getItem("recipes");

// if (localStorageRecipes) {
//   const recipeList = document.querySelector(".recipe-list");

//   const recipes = JSON.parse(localStorageRecipes);
//   recipes.forEach(recipe => {
//     const recipeItem = document.createElement("li");
//     recipeItem.textContent = recipe.title;
//     recipeList.appendChild(recipeItem);
//   });
// } else {
//   document.querySelector(".favorites").textContent = "No favorites found.";
// }

// const localStorageRecipes = localStorage.getItem("recipes");

// if (localStorageRecipes) {
//   const recipeList = document.querySelector(".recipe-list");

//   const recipes = JSON.parse(localStorageRecipes);
//   recipes.forEach(recipe => {
//     const recipeItem = document.createElement("li");
//     recipeItem.textContent = recipe.title;
//     recipeList.appendChild(recipeItem);
//   });
// } else {
//   document.querySelector(".favorites").textContent = "No favorites found.";
// }

// {
//   area: 'Italian';
//   category: 'Seafood';
//   description: 'A salad made with pasta, vegetables (such as tomatoes, cucumbers, and olives), feta cheese, and a dressing made with olive oil and lemon juice.';
//   ingredients: [];
//   instructions: 'Bring a large saucepan of salted water to the boil\r\nAdd the pasta, stir once and cook for about 10 minutes or as directed on the packet.\r\nMeanwhile, wash the tomatoes and cut into quarters. Slice the olives. Wash the basil.\r\nPut the tomatoes into a salad bowl and tear the basil leaves over them. Add a tablespoon of olive oil and mix.\r\nWhen the pasta is ready, drain into a colander and run cold water over it to cool it quickly.\r\nToss the pasta into the salad bowl with the tomatoes and basil.\r\nAdd the sliced olives, drained mozzarella balls, and chunks of tuna. Mix well and let the salad rest for at least half an hour to allow the flavours to mingle.\r\nSprinkle the pasta with a generous grind of black pepper and drizzle with the remaining olive oil just before serving.';
//   preview: 'https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560402/mwtf7uqrnsxvlpjqtslc.jpg';
//   rating: 4.36;
//   tags: [];
//   thumb: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg';
//   time: '27';
//   title: 'Mediterranean Pasta Salad';
//   youtube: 'https://www.youtube.com/watch?v=e52IL8zYmaE';
//   _id: '6462a8f74c3d0ddd28897fb8';
// }

function loadFavorites() {
  const recipes = localStorage.getItem('favorites');
  if (!recipes) {
    document.getElementById('favorites').innerHTML = 'No favorites found.';
    return;
  }
  const recipeList = document.getElementById('recipe-list');
  for (const i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeItem = document.createElement('li');
    recipeItem.textContent = recipe.title;
    recipeList.appendChild(recipeItem);
  }
}

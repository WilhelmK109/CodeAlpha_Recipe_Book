const recipes = [];

// Function to display recipes in the "Recipes" section
const displayRecipes = () => {
  const recipesList = document.getElementById('recipes-list');
  recipesList.innerHTML = '';

  if (recipes.lenght === 0) {
    recipesList.innerHTML = '<p>No recipes available.</p>';
  } else {
    recipes.forEach((recipe) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<img src="${recipe.url}" alt="${recipe.name}"><h3>${recipe.name}</h3><p>${recipe.description}</p>`;
      recipesList.appendChild(listItem);
    });
  }
};

// Function to reset the add recipe form
const resetForm = () => {
  document.getElementById('recipe-url').value = '';
  document.getElementById('recipe-name').value = '';
  document.getElementById('recipe-description').value = '';
};

// Function to display search results
const displaySearchResults = (results) => {
  const recipesList = document.getElementById('recipes-list');
  recipesList.innerHTML = '';

  if (results.length === 0) {
    recipesList.innerHTML = '<p>No matching recipes found.</p>';
  } else {
    results.forEach((recipe) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<img src="${recipe.url}" alt="${recipe.name}"><h3>${recipe.name}</h3><p>${recipe.description}</p>`;
      recipesList.appendChild(listItem);
    });
  }
};

// Function to search recipes
const searchRecipes = () => {
  const searchInput = document.querySelector('.search-box').value.toLowerCase();
  const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchInput)
  || recipe.description.toLowerCase().includes(searchInput));
  displaySearchResults(filteredRecipes);
};

searchRecipes();

// Function to add a recipe
const addRecipe = (event) => {
  event.preventDefault();

  const recipeUrl = document.getElementById('recipe-url').value;
  const recipeName = document.getElementById('recipe-name').value;
  const recipeDescription = document.getElementById('recipe-description').value;

  if (recipeUrl && recipeName && recipeDescription) {
    const newRecipe = {
      id: recipes.length + 1,
      url: recipeUrl,
      name: recipeName,
      description: recipeDescription,
    };

    recipes.push(newRecipe);
    displayRecipes();
    resetForm();
  } else {
    alert('Please fill in all fields');
  }
};

addRecipe();

// Event listener for submitting the add recipe form
// document.getElementById('recipe-form').addEventListener('submit', addRecipe);

// Initial display of recipes
displayRecipes();

let recipes = [];

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
}

// Function to display recipes in the "Recipes" section
const displayRecipes = () => {
  const recipesSection = document.getElementById('recipes');
  recipesSection.innerHTML = '<h2>My Recipes</h2>';

  if (recipes.lenght === 0) {
    recipesSection.innerHTML += '<p>No recipes available.</p>';
  } else {
    recipesSection.innerHTML += '<ul>';
    recipes.forEach((recipe) => {
      recipesSection.innerHTML += `<li><img src="${recipe.url}" alt="${recipe.name}"><h3>${recipe.name}</h3><p>${recipe.description}</p></li>`;
    });
    recipesSection.innerHTML += '</ul>';
  }
}

// Function to reset the add recipe form
const resetForm = () => {
  document.getElementById('recipe-url').value = '';
  document.getElementById('recipe-name').value = '';
  document.getElementById('recipe-description').value = '';
}

// Event listener for submitting the add recipe form
document.getElementById('recipe-form').addEventListener('submit', addRecipe);

// Initial display of recipes
displayRecipes();
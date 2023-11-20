// Mobile menu
const hamburgerMenu = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburgerMenu.addEventListener('click', () => {
  hamburgerMenu.classList.toggle('active');
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', () => {
  hamburgerMenu.classList.remove('active');
  navMenu.classList.remove('active');
}));

const recipes = [];

// Save recipes to local storage
const saveToLocalStorage = () => {
  localStorage.setItem('recipes', JSON.stringify(recipes));
};

// Load recipes from local storage
const loadFromLocalStorage = () => {
  const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
  if (storedRecipes) {
    recipes.push(...storedRecipes);
  }
};

// Function to display recipes in the "Recipes" section
const displayRecipes = () => {
  const recipesList = document.getElementById('recipes-list');
  recipesList.innerHTML = '';

  if (recipes.length === 0) {
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

// searchRecipes();

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
    saveToLocalStorage();
  } else {
    alert('Please fill in all fields');
  }
};

// Function to display recipes in the "Edit/Delete Recipes" section
const displayEditDeleteRecipes = () => {
  const editDeleteList = document.getElementById('edit-delete-list');
  editDeleteList.innerHTML = '';

  if (recipes.length === 0) {
    editDeleteList.innerHTML = '<p>No recipes available.</p>';
  } else {
    recipes.forEach((recipe) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<img src="${recipe.url}" alt="${recipe.name}">
                            <h3>${recipe.name}</h3>
                            <p>${recipe.description}</p>
                            <button class="edit-button" onclick="handleEditDelete(${recipe.id}, 'edit')">Edit</button>
                            <button class="delete-button" onclick="handleEditDelete(${recipe.id}, 'delete')">Delete</button>`;
      editDeleteList.appendChild(listItem);
    });
  }
};

// Function to delete a recipe
const deleteRecipe = (recipeId) => {
  const confirmation = window.confirm('Are you sure you want to delete this recipe?');
  if (confirmation) {
    const index = recipes.findIndex((recipe) => recipe.id === recipeId);
    if (index !== -1) {
      recipes.splice(index, 1);
      displayEditDeleteRecipes();
      saveToLocalStorage();
    }
  }
};

// Function to edit a recipe
const editRecipe = (recipeId) => {
  // Find the recipe to edited
  const recipeToEdit = recipes.find((recipe) => recipe.id === recipeId);

  // Pre-fill the form with existing values
  document.getElementById('recipe-url').value = recipeToEdit.url;
  document.getElementById('recipe-name').value = recipeToEdit.name;
  document.getElementById('recipe-description').value = recipeToEdit.description;

  // Update the recipe in the array when the is submitted
  document.getElementById('recipe-form').onsubmit = (event) => {
    event.preventDefault();

    // Update the existing recipe
    recipeToEdit.url = document.getElementById('recipe-url').value;
    recipeToEdit.name = document.getElementById('recipe-name').value;
    recipeToEdit.description = document.getElementById('recipe-description').value;

    // Display the updated list of rcipes
    displayEditDeleteRecipes();
    // resetForm();
    saveToLocalStorage();
  };
};

// Function to handle edit/delete actions
// eslint-disable-next-line no-unused-vars
const handleEditDelete = (recipeId, action) => {
  if (action === 'edit') {
    editRecipe(recipeId);
  } else if (action === 'delete') {
    deleteRecipe(recipeId);
  }
};

loadFromLocalStorage();
displayRecipes();
displayEditDeleteRecipes();
addRecipe();
searchRecipes();

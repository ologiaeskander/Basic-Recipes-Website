// Fetch recipes from MealDB API and display them
document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch recipes from MealDB API
    function fetchRecipes(url, containerId) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Display recipes
                displayRecipes(data.meals, containerId);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
            });
    }

    // Function to display recipes
    function displayRecipes(recipes, containerId) {
        const recipeContainer = document.getElementById(containerId);

        // Clear existing content
        recipeContainer.innerHTML = '';

        // Loop through recipes and create recipe cards
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');

            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = recipe.strMeal;

            const recipeIngredients = document.createElement('p');
            recipeIngredients.textContent = 'Ingredients: ' + getIngredients(recipe);

            const recipeInstructions = document.createElement('p');
            recipeInstructions.textContent = 'Instructions: ' + recipe.strInstructions;

            recipeCard.appendChild(recipeTitle);
            recipeCard.appendChild(recipeIngredients);
            recipeCard.appendChild(recipeInstructions);

            recipeContainer.appendChild(recipeCard);
        });
    }

    // Function to get list of ingredients from a recipe object
    function getIngredients(recipe) {
        let ingredients = [];
        for (let i = 1; i <= 20; i++) {
            if (recipe['strIngredient' + i]) {
                ingredients.push(recipe['strIngredient' + i]);
            }
        }
        return ingredients.join(', ');
    }

    // Function to fetch random recipe from MealDB API
    function fetchRandomRecipe(url, containerId) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Display random recipe
                displayRandomRecipe(data.meals[0], containerId);
            })
            .catch(error => {
                console.error('Error fetching random recipe:', error);
            });
    }

    // Function to display random recipe
    function displayRandomRecipe(recipe, containerId) {
        const randomCarousel = document.getElementById(containerId).querySelector('.carousel-inner');
    
        // Create carousel item for random recipe
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (!randomCarousel.querySelector('.carousel-item.active')) {
            carouselItem.classList.add('active');
        }
    
        // Create recipe card
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card', 'col-8', 'mx-auto'); // Applying Bootstrap grid classes
    
        const recipeTitle = document.createElement('h3');
        recipeTitle.textContent = recipe.strMeal;
    
        const recipeIngredients = document.createElement('p');
        recipeIngredients.textContent = 'Ingredients: ' + getIngredients(recipe);
    
        const recipeInstructions = document.createElement('p');
        recipeInstructions.textContent = 'Instructions: ' + recipe.strInstructions;
    
        recipeCard.appendChild(recipeTitle);
        recipeCard.appendChild(recipeIngredients);
        recipeCard.appendChild(recipeInstructions);
    
        carouselItem.appendChild(recipeCard);
        randomCarousel.appendChild(carouselItem);
    }
    
    // Function to generate pagination links using Bootstrap pagination
    function generatePaginationLinks(containerId) {
        const paginationContainer = document.getElementById(containerId);
    
        // Clear existing pagination links
        paginationContainer.innerHTML = '';
    
        // Create the pagination list element
        const paginationList = document.createElement('ul');
        paginationList.classList.add('pagination');
    
        // Generate pagination links for each letter from 'a' to 'z'
        for (let i = 97; i <= 122; i++) {
            const letter = String.fromCharCode(i);
            const pageItem = document.createElement('li');
            pageItem.classList.add('page-item');
            const pageLink = document.createElement('a');
            pageLink.classList.add('page-link');
            pageLink.href = '#';
            pageLink.textContent = letter.toUpperCase();
            pageLink.addEventListener('click', function() {
                fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`, 'recipe-cards-container');
            });
            pageItem.appendChild(pageLink);
            paginationList.appendChild(pageItem);
        }
    
        // Append the pagination list to the container
        paginationContainer.appendChild(paginationList);
    }

    document.addEventListener('DOMContentLoaded', function() {
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const searchResultsContainer = document.getElementById('searchResults');
    
        // Function to handle form submission
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                fetchRecipes(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`, 'searchResults');
            }
        });
    
        // Function to fetch and display search results
        function fetchRecipes(url, containerId) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    displayRecipes(data.meals, containerId);
                })
                .catch(error => {
                    console.error('Error fetching recipes:', error);
                });
        }
    
        // Function to display search results
        function displayRecipes(recipes, containerId) {
            const recipeContainer = document.getElementById(containerId);
            recipeContainer.innerHTML = ''; // Clear existing content
    
            if (recipes) {
                recipes.forEach(recipe => {
                    const recipeCard = document.createElement('div');
                    recipeCard.classList.add('recipe-card');
    
                    const recipeTitle = document.createElement('h3');
                    recipeTitle.textContent = recipe.strMeal;
    
                    const recipeIngredients = document.createElement('p');
                    recipeIngredients.textContent = 'Ingredients: ' + getIngredients(recipe);
    
                    const recipeInstructions = document.createElement('p');
                    recipeInstructions.textContent = 'Instructions: ' + recipe.strInstructions;
    
                    recipeCard.appendChild(recipeTitle);
                    recipeCard.appendChild(recipeIngredients);
                    recipeCard.appendChild(recipeInstructions);
    
                    recipeContainer.appendChild(recipeCard);
                });
            } else {
                recipeContainer.innerHTML = '<p>No recipes found.</p>';
            }
        }
    
        // Function to get list of ingredients from a recipe object
        function getIngredients(recipe) {
            let ingredients = [];
            for (let i = 1; i <= 20; i++) {
                if (recipe['strIngredient' + i]) {
                    ingredients.push(recipe['strIngredient' + i]);
                }
            }
            return ingredients.join(', ');
        }
    });
    

    // Call the function to generate pagination links
    generatePaginationLinks('pagination-container');

    // Fetch random recipe
    fetchRandomRecipe('https://www.themealdb.com/api/json/v1/1/random.php', 'random-recipes');

    // Fetch all recipes
    fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?f=', 'all-recipes'); // Fetch all recipes
});
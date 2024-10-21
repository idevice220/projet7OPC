// JE RECUPERE LES ELEMENTS
const filtresIngredient = document.getElementById("filtresIngredient");
const filtresAppareil = document.getElementById("filtresAppareil");
const filtresUstensiles = document.getElementById("filtresUstensiles");

const searchFilters = document.getElementById("searchInput");

// Filtrage en fonction des valeurs des filtres
const applyFilters = () => {
    const filterValueIngredient = filtresIngredient.value;
    const filterValueAppareil = filtresAppareil.value;
    const filterValueUstensiles = filtresUstensiles.value;

    // Si aucun filtre n'est sélectionné, afficher toutes les recettes
    if (!filterValueIngredient && !filterValueAppareil && !filterValueUstensiles) {
        displayFilteredData(recipes);
        return;
    }

    // Filtrage par ingrédients
    let filteredRecipes = recipes;
    if (filterValueIngredient) {
        filteredRecipes = filteredRecipes.filter((recipe) => {
            return recipe.ingredients.some((ingredient) => 
                ingredient.ingredient.toLowerCase().includes(filterValueIngredient.toLowerCase()));
        });
    }

    // Filtrage par appareil
    if (filterValueAppareil) {
        filteredRecipes = filteredRecipes.filter((recipe) => {
            return recipe.appliance.toLowerCase().includes(filterValueAppareil.toLowerCase());
        });
    }

    // Filtrage par ustensiles
    if (filterValueUstensiles) {
        filteredRecipes = filteredRecipes.filter((recipe) => {
            return recipe.ustensils.some((ustensil) => 
                ustensil.toLowerCase().includes(filterValueUstensiles.toLowerCase()));
        });
    }

    displayFilteredData(filteredRecipes);
};

// Écouter les changements sur les filtres
filtresIngredient.addEventListener('change', applyFilters);
filtresAppareil.addEventListener('change', applyFilters);
filtresUstensiles.addEventListener('change', applyFilters);

// Recherche en fonction du texte entré dans la barre de recherche
searchFilters.addEventListener('input', () => {
    const searchValue = searchFilters.value.trim().toLowerCase();
    
    // Si la longueur de la recherche est inférieure à 3 caractères, ne rien faire
    if (searchValue.length < 3) {
        displayFilteredData(recipes); // Afficher toutes les recettes
        return;
    }

    // Si la recherche contient plus de 3 caractères, filtrer les recettes
    const filteredRecipes = recipes.filter((recipe) => {
        showNumberOfRecipes(recipes); // Afficher le nombre de recettes
        return recipe.name.toLowerCase().includes(searchValue) ||
            recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchValue)) ||
            recipe.appliance.toLowerCase().includes(searchValue) ||
            recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(searchValue));
    });

    displayFilteredData(filteredRecipes);
    // displayFilterdLabels(searchValue);
});

// Fonction pour afficher les recettes filtrées
async function displayFilteredData(filteredRecipes) {
    const recipesSection = document.querySelector(".cards-gallery");
    showNumberOfRecipes(filteredRecipes); // Afficher le nombre de recettes
    recipesSection.innerHTML = "";  // Vider la galerie avant d'afficher les nouvelles recettes
    filteredRecipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

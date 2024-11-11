// Récupérer les éléments
const filtresIngredient = document.getElementById("filtresIngredient");
const filtresAppareil = document.getElementById("filtresAppareil");
const filtresUstensiles = document.getElementById("filtresUstensiles");
const searchFilters = document.getElementById("searchInput");

// Stocker les filtres actifs pour chaque type
let activeIngredientFilters = [];
let activeAppareilFilter = null;
let activeUstensilesFilters = [];

// Fonction pour générer une carte pour chaque filtre actif avec bouton de suppression
function createFilterCard(data, type) {
    const card = document.createElement("div");
    card.classList.add("filter-card");

    const textFilter = document.createElement("p");
    textFilter.textContent = data;
    card.appendChild(textFilter);

    // Bouton de suppression pour enlever le filtre
    const removeButton = document.createElement("button");
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    removeButton.appendChild(closeIcon);
    removeButton.classList.add("remove-button");

    // Événement pour supprimer le filtre
    removeButton.addEventListener("click", () => {
        if (type === 'ingredient') {
            activeIngredientFilters = activeIngredientFilters.filter(item => item !== data);
        } else if (type === 'appareil') {
            activeAppareilFilter = null;
        } else if (type === 'ustensile') {
            activeUstensilesFilters = activeUstensilesFilters.filter(item => item !== data);
        }
        applyFilters(); // Mettre à jour l'affichage après suppression d'un filtre
        displayFiltersCards(); // Rafraîchir l'affichage des cartes de filtres
    });

    card.appendChild(removeButton);
    return card;
}

// Fonction pour afficher toutes les cartes de filtres actifs sous la section de sélection
function displayFiltersCards() {
    const filterSection = document.getElementById("filtresCards");
    filterSection.innerHTML = ""; // Vider la section avant d'ajouter les nouveaux filtres

    // Ajouter les cartes pour chaque filtre actif
    activeIngredientFilters.forEach(ingredient => {
        filterSection.appendChild(createFilterCard(ingredient, 'ingredient'));
    });

    if (activeAppareilFilter) {
        filterSection.appendChild(createFilterCard(activeAppareilFilter, 'appareil'));
    }

    activeUstensilesFilters.forEach(ustensile => {
        filterSection.appendChild(createFilterCard(ustensile, 'ustensile'));
    });
}

// Fonction applyFilters pour filtrer les recettes en fonction des critères
const applyFilters = () => {
    const searchValue = searchFilters.value.trim().toLowerCase();
    let filteredRecipes = recipes;

    

    if (searchValue.length >= 3) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return (
                recipe.name.toLowerCase().includes(searchValue) ||
                recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(searchValue)) ||
                recipe.appliance.toLowerCase().includes(searchValue) ||
                recipe.ustensils.some(ust => ust.toLowerCase().includes(searchValue))
            );
        });
    }

    if (activeIngredientFilters.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            activeIngredientFilters.every(filter =>
                recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(filter))
            )
        );
    }

    if (activeAppareilFilter) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            recipe.appliance.toLowerCase().includes(activeAppareilFilter)
        );
    }

    if (activeUstensilesFilters.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe =>
            activeUstensilesFilters.every(filter =>
                recipe.ustensils.some(ust => ust.toLowerCase().includes(filter))
            )
        );
    }

    displayFilteredData(filteredRecipes);
    updateFilterOptions(filteredRecipes);
    displayFiltersCards(); // Afficher les cartes de filtres actifs
};

searchFilters.addEventListener('input', (event) => {
    if (event.target.value.length >= 3) {
        applyFilters();
    } else if (event.target.value.length <3 ) {
        displayFilteredData(recipes);
        updateFilterOptions(recipes);
    }
});




// Gestion des événements pour l'ajout des filtres et application des filtres
filtresIngredient.addEventListener('change', (event) => {
    const value = event.target.value.toLowerCase();
    if (value && !activeIngredientFilters.includes(value)) {
        activeIngredientFilters.push(value);
    }
    applyFilters();
});

filtresAppareil.addEventListener('change', (event) => {
    activeAppareilFilter = event.target.value.toLowerCase() || null;
    applyFilters();
});

filtresUstensiles.addEventListener('change', (event) => {
    const value = event.target.value.toLowerCase();
    if (value && !activeUstensilesFilters.includes(value)) {
        activeUstensilesFilters.push(value);
    }
    applyFilters();
});

// Fonction pour mettre à jour les options de filtres selon les résultats de recherche
const updateFilterOptions = (filteredRecipes) => {
    const uniqueIngredients = [...new Set(filteredRecipes.flatMap(r => r.ingredients.map(i => i.ingredient)))];
    const uniqueAppareils = [...new Set(filteredRecipes.map(r => r.appliance))];
    const uniqueUstensiles = [...new Set(filteredRecipes.flatMap(r => r.ustensils))];

    getFilteredIngredient(uniqueIngredients); 
    getFilteredAppareil(uniqueAppareils); 
    getFilteredUstensiles(uniqueUstensiles); 
};

// Fonction pour afficher les recettes filtrées
async function displayFilteredData(filteredRecipes) {
    const recipesSection = document.querySelector(".cards-gallery");
    showNumberOfRecipes(filteredRecipes);
    recipesSection.innerHTML = ""; 

    filteredRecipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

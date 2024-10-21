const filtresIngredients = document.getElementById("filtresIngredient");
const filtresAppareils = document.getElementById("filtresAppareil");
const filtresUstensile = document.getElementById("filtresUstensiles");

const texteIngredient = "Ingrédients";
const texteAppareil = "Appareils";
const texteUstensile = "Ustensiles";

function addEnteteIngredient(texteIngredient) {
    const filterDOM = document.createElement("option");
    filterDOM.value = ""; // Assigner la valeur de l'ingrédient
    filterDOM.textContent = texteIngredient; // Le texte à afficher dans l'option
    filtresIngredients.append(filterDOM); // Ajouter l'option dans le <select>
}

function addEnteteAppareil(texteAppareil) {
    const filterDOM = document.createElement("option");
    filterDOM.value = ""; // Assigner la valeur de l'appareil
    filterDOM.textContent = texteAppareil; // Le texte à afficher dans l'option
    filtresAppareils.append(filterDOM); // Ajouter l'option dans le <select>
}

function addEnteteUstensile(texteUstensile) {
    const filterDOM = document.createElement("option");
    filterDOM.value = ""; // Assigner la valeur de l'ustensile
    filterDOM.textContent = texteUstensile; // Le texte à afficher dans l'option
    filtresUstensile.append(filterDOM); // Ajouter l'option dans le <select>
}


const getFiltersIngredient = (recipes) => {
    // Récupérer tous les ingrédients depuis les recettes
    const ingredients = recipes.flatMap((recipe) => recipe.ingredients);
    // Filtrer les ingrédients uniques
    const uniqueIngredients = [...new Set(ingredients.map((ingredient) => ingredient.ingredient))];

    addEnteteIngredient(texteIngredient);
    addEnteteAppareil(texteAppareil);
    addEnteteUstensile(texteUstensile);
    // Créer les options pour chaque ingrédient unique
    uniqueIngredients.forEach((ingredient) => {
        filterTemplateIngredient(ingredient); // Appel de la fonction pour chaque ingrédient
    });
};

const getFiltersAppareil = (recipes) => {
    // Récupérer tous les appareils depuis les recettes
    const appliances = recipes.map((recipe) => recipe.appliance);
    // Filtrer les appareils uniques
    const uniqueAppliance = [...new Set(appliances)];
    // Créer les options pour chaque appareil unique
    uniqueAppliance.forEach((appliance) => {
        filterTemplateAppareil(appliance); // Appel de la fonction pour chaque appareil
    });
};

const getFiltersUstensiles = (recipes) => {
    // Utiliser flatMap pour aplatir tous les ustensiles dans un tableau unique
    const ustensils = recipes.flatMap((recipe) => recipe.ustensils);
    // Filtrer les ustensiles uniques
    const uniqueUstensils = [...new Set(ustensils)];
    // Créer les options pour chaque ustensile unique
    uniqueUstensils.forEach((ustensil) => {
        filterTemplateUstensil(ustensil); // Appel de la fonction pour chaque ustensile
    });
};


// Fonction pour créer le DOM pour chaque ingrédient et l'ajouter au <select>
function filterTemplateIngredient(ingredient) {
    const filterDOM = document.createElement("option");
    //créer une première ligne sans valeurs :
    texte = "Ingrédients";

    filterDOM.value = ingredient; // Assigner la valeur de l'ingrédient
    filterDOM.textContent = ingredient; // Le texte à afficher dans l'option

    filtresIngredients.appendChild(filterDOM); // Ajouter l'option dans le <select>
}


// Fonction pour créer le DOM pour chaque appareil et l'ajouter au <select>
function filterTemplateAppareil(appliance) {
    const filterDOM = document.createElement("option");

    texte = "Appareils";

    filterDOM.value = appliance; // Assigner la valeur de l'appareil
    filterDOM.textContent = appliance; // Le texte à afficher dans l'option

    filtresAppareils.appendChild(filterDOM); // Ajouter l'option dans le <select>
}

// Fonction pour créer le DOM pour chaque ustensile et l'ajouter au <select>
function filterTemplateUstensil(ustensil) {
    const filterDOM = document.createElement("option");

    texte = "Ustensiles";

    filterDOM.value = ustensil; // Assigner la valeur de l'ustensile
    filterDOM.textContent = ustensil; // Le texte à afficher dans l'option

    filtresUstensile.appendChild(filterDOM); // Ajouter l'option dans le <select>
}

// Appeler la fonction pour afficher les filtres
getFiltersIngredient(recipes);
getFiltersAppareil(recipes);
getFiltersUstensiles(recipes);

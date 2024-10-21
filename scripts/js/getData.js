async function getData() {
    return { recipes }; // Retourner les données directemen
}

// Fonction pour afficher les recettes
async function showNumberOfRecipes(recipes) {
    let nbRecipes = document.getElementById("nbRecettes");
    console.log(nbRecipes);
    nbRecipes.textContent = recipes.length + " recettes";
}

async function displayData(recipes) {
    const recipesSection = document.querySelector(".cards-gallery");
    // Afficher le nombre de recettes
    showNumberOfRecipes(recipes);
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}


async function init() {
    // Récupère les datas des recettes
    const { recipes } = await getData();
    displayData(recipes);
    // console.log(recipes);
}

init();
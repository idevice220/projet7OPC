async function getData() {
    return { recipes }; // Retourner les données directemen
}

async function displayData(recipes) {
    const recipesSection = document.querySelector(".cards-gallery");
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
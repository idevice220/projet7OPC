//////PARTIE FILTRES/////


// JE RECUPERE LES ELEMENTS
const filter = document.getElementById("filtresIngredient");


const filterValue = addEventListener('change', () => {
    const filterValue = filter.value;
    console.log(filterValue);
    console.log(recipes);
    filteredRecipes = recipes.filter((recipe) => {
        return recipe.ingredients.some((ingredient) => {
            return ingredient.ingredient.includes(filterValue);
        });
    });
    console.log(filteredRecipes);

    displayFilteredData(filteredRecipes);
}
);


async function displayFilteredData(filteredRecipes) {
    const recipesSection = document.querySelector(".cards-gallery");
    recipesSection.innerHTML = "";
    filteredRecipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}


// JE RELANCE LA FONCTION DE GENERATION DES CARDS LORSQUE L'UTILISATEUR CLIQUE SUR UN FILTRE
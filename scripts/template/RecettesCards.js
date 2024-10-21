function recipeTemplate(data) {
    const {id, image, name, servings, ingredients, time, description, appliance, ustensils} = data;

    const picture = `/src/recettes/${image}`;

    function getRecipeCardDOM(){

        const card = document.createElement("div");
        card.classList.add("card");

        const cardImg = document.createElement("div");
        cardImg.classList.add("cardImg");

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        const dureRecette = document.createElement("span");
        dureRecette.textContent = time + "min";
        dureRecette.classList.add("dureeRecette");

        const cardText = document.createElement("div");
        cardText.classList.add("cardText");

        const cardTextTitle = document.createElement("h3");
        cardTextTitle.textContent = name;

        const cardTextRecette = document.createElement("h4");
        cardTextRecette.textContent = "Recette";

        const cardTextDescription = document.createElement("p");
        cardTextDescription.textContent = description;

        const cardTextIngredients = document.createElement("h4");
        cardTextIngredients.textContent = "ingredients";

        const divIngredients = document.createElement("div");
        divIngredients.classList.add("ingredients");

        ingredients.forEach((ingredient) => {
            const ingredientSpan = document.createElement("p");
            ingredientSpan.textContent = ingredient.ingredient;
            divIngredients.appendChild(ingredientSpan);

            const quantity = document.createElement("h5");
            const unit = ingredient.unit;
            if (!unit){
                quantity.textContent = ingredient.quantity || "";
                ingredientSpan.appendChild(quantity);

            } else { 
                quantity.textContent = ingredient.quantity + " " + unit;
                ingredientSpan.appendChild(quantity);
            }
        }
        );


        card.appendChild(cardImg);
        cardImg.appendChild(img);
        card.appendChild(dureRecette);
        card.appendChild(cardText);
        cardText.appendChild(cardTextTitle);
        cardText.appendChild(cardTextRecette);
        cardText.appendChild(cardTextDescription);
        cardText.appendChild(cardTextIngredients);
        cardText.appendChild(divIngredients);


        return card;
    }
    return {id, picture, name, servings, ingredients, time, description, appliance, ustensils, getRecipeCardDOM};
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './SelectedRecipes.module.css'; // Імпортуємо CSS модулі

const SelectedRecipes = ({ selectedRecipeIds }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const responses = await Promise.all(
        selectedRecipeIds.map(id => axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`))
      );
      setRecipes(responses.map(response => response.data.meals[0]));
    };

    fetchRecipes();
  }, [selectedRecipeIds]);

  const allIngredients = recipes.flatMap(meal => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  });

  return (
    <div className={styles.selectedRecipes}>
      <h2>Selected Recipes</h2>
      <div className={styles.recipesContainer}>
        {recipes.map(meal => (
          <div key={meal.idMeal} className={styles.recipeCard}>
            <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.recipeImage} />
            <div className={styles.recipeContent}>
              <h3>{meal.strMeal}</h3>
              <h4>Ingredients:</h4>
              <ul>
                {Array.from({ length: 20 }, (_, i) => {
                  const ingredient = meal[`strIngredient${i + 1}`];
                  const measure = meal[`strMeasure${i + 1}`];
                  return ingredient ? <li key={i}>{`${measure} ${ingredient}`}</li> : null;
                })}
              </ul>
              <h4>Instructions:</h4>
              <p>{meal.strInstructions}</p>
            </div>
          </div>
        ))}
      </div>

      <h3>Combined Ingredients List:</h3>
      <ul>
        {Array.from(new Set(allIngredients)).map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedRecipes;

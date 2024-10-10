import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from './RecipeDetail.module.css'; // Імпорт стилів

const fetchRecipeById = async (id) => {
  const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  return data.meals[0];
};

const RecipeDetail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['recipe', id], 
    queryFn: () => fetchRecipeById(id)
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data) return <div>No recipe found</div>; // Додаткова перевірка

  // Отримання інгредієнтів
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} ${measure}`);
    }
  }

  return (
    <div className={styles.recipeDetail}> {/* Використання CSS модуля */}
      <h2>{data.strMeal}</h2>
      <img src={data.strMealThumb} alt={data.strMeal} />
      
      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Instructions:</h3>
      <p>{data.strInstructions}</p>
      {/* Можна додати інші поля */}
    </div>
  );
};

export default RecipeDetail;

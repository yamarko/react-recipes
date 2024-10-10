import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination'; 
import styles from './Recipes.module.css'; // Імпорт стилів

const fetchRecipes = async (searchTerm) => {
  const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
  return data.meals || []; // Повертаємо пустий масив, якщо meals null
};

const fetchCategories = async () => {
  const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
  return data.categories;
};

const Recipes = ({ toggleRecipeSelection, selectedRecipeIds, searchTerm }) => {
  const { data: categories } = useQuery({
    queryKey: ['categories'], 
    queryFn: fetchCategories
  });

  // Використовуємо searchTerm для запиту рецептів
  const { data: recipes = [], error, isLoading } = useQuery({
    queryKey: ['recipes', searchTerm], 
    queryFn: () => fetchRecipes(searchTerm)
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Фільтрація рецептів за вибраною категорією
  const filteredRecipes = selectedCategory 
    ? recipes.filter(meal => meal.strCategory === selectedCategory)
    : recipes;

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  // Визначення поточних рецептів для відображення на сторінці
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={styles.recipesContainer}>
      <CategoryFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      {/* Перевірка чи є рецепти у вибраній категорії */}
      {currentRecipes.length === 0 ? (
        <p>{selectedCategory ? "Not found" : "Not found"}</p>
      ) : (
        <div className={styles.recipesGrid}>
          {currentRecipes.map((meal) => (
            <div key={meal.idMeal} className={styles.recipeCard}>
              <Link to={`/recipe/${meal.idMeal}`}>
                <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.recipeImage} />
                <h3 className={styles.recipeTitle}>{meal.strMeal}</h3>
                <p className={styles.recipeDetails}>{meal.strCategory} - {meal.strArea}</p>
              </Link>
              <button onClick={() => toggleRecipeSelection(meal.idMeal)} className={styles.selectButton}>
                {selectedRecipeIds.includes(meal.idMeal) ? 'Remove from Selected' : 'Add to Selected'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Пагінація */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        setPage={setCurrentPage} 
      />
    </div>
  );
};

export default Recipes;

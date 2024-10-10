import React from 'react';
import styles from './CategoryFilter.module.css'; // Імпортуємо CSS модулі

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className={styles.categoryFilter}>
      <label htmlFor="category-select" className={styles.label}>Choose category:</label>
      <select 
        id="category-select" 
        className={styles.select} // Додаємо клас для стилізації
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All categories</option>
        {categories?.map(category => (
          <option key={category.idCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;

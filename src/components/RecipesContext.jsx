import React, { createContext, useContext, useState } from 'react';

const RecipesContext = createContext();

export const useRecipes = () => {
  return useContext(RecipesContext);
};

export const RecipesProvider = ({ children }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const toggleRecipeSelection = (mealId) => {
    setSelectedRecipes((prevSelected) => {
      if (prevSelected.includes(mealId)) {
        return prevSelected.filter((id) => id !== mealId); // Remove recipe
      } else {
        return [...prevSelected, mealId]; // Add recipe
      }
    });
  };

  return (
    <RecipesContext.Provider value={{ selectedRecipes, toggleRecipeSelection }}>
      {children}
    </RecipesContext.Provider>
  );
};

import React, { useState } from 'react';
import MainHeader from './components/MainHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Recipes from './pages/Recipes';
import RecipeDetail from './pages/RecipeDetail';
import SelectedRecipes from './pages/SelectedRecipes';

function App() {
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Додаємо стан для пошукового терміна

  const toggleRecipeSelection = (mealId) => {
    setSelectedRecipeIds((prevSelected) => {
      if (prevSelected.includes(mealId)) {
        return prevSelected.filter((id) => id !== mealId); // Видалення з вибраних
      } else {
        return [...prevSelected, mealId]; // Додавання до вибраних
      }
    });
  };

  return (
    <Router>
      <MainHeader setSearchTerm={setSearchTerm} /> {/* Передаємо пошуковий термін */}
      <Routes>
        <Route path="/" element={<Recipes searchTerm={searchTerm} toggleRecipeSelection={toggleRecipeSelection} selectedRecipeIds={selectedRecipeIds} />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/selected-recipes" element={<SelectedRecipes selectedRecipeIds={selectedRecipeIds} />} />
      </Routes>
    </Router>
  );
}

export default App;

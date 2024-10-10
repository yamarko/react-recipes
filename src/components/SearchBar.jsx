import { useState } from 'react';
import styles from './MainHeader.module.css'; // Імпорт стилів

const SearchBar = ({ setSearchTerm }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    setSearchTerm(query);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search for recipes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.input} // Додаємо клас для стилізації
      />
      <button onClick={handleSearch} className={styles.button}> {/* Додаємо клас для стилізації */}
        Search
      </button>
    </div>
  );
};

export default SearchBar;

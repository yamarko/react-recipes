import { Link } from 'react-router-dom';
import SearchBar from './SearchBar'; // Імпорт компонента пошуку
import styles from './MainHeader.module.css'; // Імпорт стилів

const MainHeader = ({ setSearchTerm }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Recipe Finder</h1>
      <nav>
        <ul className={styles.nav}>
          <li>
            <Link to="/" className={styles.link}>Home</Link>
          </li>
          <li>
            <Link to="/selected-recipes" className={styles.link}>Selected Recipes</Link>
          </li>
        </ul>
      </nav>
      <SearchBar setSearchTerm={setSearchTerm} /> {/* Додаємо пошуковий компонент */}
    </header>
  );
};

export default MainHeader;

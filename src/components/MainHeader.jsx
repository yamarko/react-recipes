import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from './MainHeader.module.css';

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
      <SearchBar setSearchTerm={setSearchTerm} />
    </header>
  );
};

export default MainHeader;

import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, setPage }) => {
  const handlePageChange = (page) => {
    setPage(page);
  };

  const renderPageNumbers = () => {
    let pages = [];

    // Якщо сторінок менше або дорівнює 3
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={i === currentPage ? 'active' : ''}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Якщо сторінок більше 3
      for (let i = 1; i <= 3; i++) {
        pages.push(
          <button
            key={i}
            className={i === currentPage ? 'active' : ''}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      pages.push(<span key="ellipsis">...</span>);

      pages.push(
        <button
          key={totalPages}
          className={totalPages === currentPage ? 'active' : ''}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}> {/* Додайте клас з стилів */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;

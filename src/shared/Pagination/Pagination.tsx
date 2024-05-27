const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages < 2) return null;

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          className={
            currentPage === index + 1
              ? "pagination-button pagination-button--active"
              : "pagination-button"
          }
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

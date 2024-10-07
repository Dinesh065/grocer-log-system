import React from 'react';

const InventoryPagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
      <span>{currentPage} / {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default InventoryPagination;

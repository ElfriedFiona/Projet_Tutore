import React from 'react';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange, 
  siblingCount = 1,
  className = '' 
}) => {
  // If there is only one page, don't render pagination
  if (totalPages <= 1) return null;

  const generatePageLinks = () => {
    const pageNumbers = [];
    const totalPageNumbers = siblingCount * 2 + 3; // Including first, current, and last page
    
    // If we have enough space to show all pages
    if (totalPages <= totalPageNumbers) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // Calculate left and right sibling indices
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    // Whether to show ellipsis
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
    // Always show first page
    pageNumbers.push(1);
    
    // Show left dots if needed
    if (shouldShowLeftDots) {
      pageNumbers.push('...');
    }
    
    // Add page numbers between dots
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }
    
    // Show right dots if needed
    if (shouldShowRightDots) {
      pageNumbers.push('...');
    }
    
    // Always show last page
    pageNumbers.push(totalPages);
    
    return pageNumbers;
  };
  
  const pageLinks = generatePageLinks();

  return (
    <nav className={`flex justify-center mt-4 ${className}`} aria-label="Pagination">
      <ul className="inline-flex -space-x-px">
        <li>          <button
            className="px-3 py-2 ml-0 leading-tight text-text-secondary bg-surface-card border border-r-0 border-surface-border rounded-l-lg hover:bg-surface-hover hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        
        {pageLinks.map((page, index) => (
          <li key={`${page}-${index}`}>            {page === '...' ? (
              <span className="px-3 py-2 leading-tight text-text-secondary bg-surface-card border border-surface-border">
                ...
              </span>
            ) : (              <button
                className={`px-3 py-2 leading-tight border ${
                  page === currentPage
                    ? 'text-primary-600 border-primary-300 bg-primary-50 hover:bg-primary-100 hover:text-primary-700'
                    : 'text-text-secondary bg-surface-card border-surface-border hover:bg-surface-hover hover:text-text-primary'
                }`}
                onClick={() => page !== currentPage && onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        <li>          <button
            className="px-3 py-2 leading-tight text-text-secondary bg-surface-card border border-surface-border rounded-r-lg hover:bg-surface-hover hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

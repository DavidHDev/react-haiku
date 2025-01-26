import { useState } from 'react';

interface IUsePagination {
  currentPage: number;
  setPage: (page: number) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  nextPageDisabled: boolean;
  previousPageDisabled: boolean;
}

export function usePagination(totalPages: number): IUsePagination {
  const [currentPage, setCurrentPage] = useState(1);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const nextPageDisabled = currentPage === totalPages;
  const previousPageDisabled = currentPage === 1;

  const setPage = (page: number) => {
    if (page < 1) {
      setCurrentPage(1);
    } else if (page > totalPages) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    setPage,
    goToPreviousPage,
    goToNextPage,
    nextPageDisabled,
    previousPageDisabled,
  };
}

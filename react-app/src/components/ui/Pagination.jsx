import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Pagination component following Apple design principles
 *
 * @param {Object} props
 * @param {number} props.currentPage - Current active page
 * @param {number} props.totalPages - Total number of pages
 * @param {function} props.onPageChange - Page change handler
 * @param {number} props.siblingCount - Number of pages to show on each side
 * @param {string} props.className - Additional classes
 */
const Pagination = ({ currentPage = 1, totalPages = 10, onPageChange, siblingCount = 1, className }) => {
  const { isDark } = useTheme();

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';

  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const paginationRange = () => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, '...', totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [firstPageIndex, '...', ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }
  };

  const pages = paginationRange();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className={cn('flex items-center gap-2', className)}>
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-[14px] border transition-all ease-[0.3s]',
          bgColor,
          themeBg,
          currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[rgba(58,109,240,0.1)]'
        )}
      >
        <ChevronLeft className={cn('w-5 h-5', inactiveColor)} />
      </button>

      {/* Page Numbers */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={index} className={cn('w-10 h-10 flex items-center justify-center', inactiveColor)}>
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={cn(
              'w-10 h-10 rounded-[14px] border text-[15px] font-medium transition-all ease-[0.3s]',
              isActive
                ? 'bg-[#3a6df0] border-[#3a6df0] text-white'
                : `${bgColor} ${themeBg} ${textColor} hover:bg-[rgba(58,109,240,0.1)]`
            )}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          'flex items-center justify-center w-10 h-10 rounded-[14px] border transition-all ease-[0.3s]',
          bgColor,
          themeBg,
          currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[rgba(58,109,240,0.1)]'
        )}
      >
        <ChevronRight className={cn('w-5 h-5', inactiveColor)} />
      </button>
    </nav>
  );
};

export default Pagination;

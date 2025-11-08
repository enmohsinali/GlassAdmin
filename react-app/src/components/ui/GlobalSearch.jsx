import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp, File, Users, Package } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

/**
 * Global Search Component with autocomplete and suggestions
 * Follows Apple design principles
 *
 * @param {Object} props
 * @param {Array} props.data - Array of searchable items
 * @param {Function} props.onSelect - Callback when item is selected
 * @param {string} props.placeholder - Placeholder text
 * @param {Array} props.recentSearches - Recent searches array
 * @param {Array} props.trendingSearches - Trending searches array
 */
const GlobalSearch = ({
  data = [],
  onSelect,
  placeholder = 'Search...',
  recentSearches = [],
  trendingSearches = [],
}) => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';
  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';
  const hoverBg = isDark ? 'hover:bg-[rgba(146,151,179,0.2)]' : 'hover:bg-[rgba(0,0,0,0.05)]';

  // Filter results based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredResults(filtered.slice(0, 10)); // Limit to 10 results
  }, [searchTerm, data]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
        handleSelect(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelect = (item) => {
    setSearchTerm('');
    setIsOpen(false);
    onSelect?.(item);
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'user':
        return <Users className="w-4 h-4" />;
      case 'product':
        return <Package className="w-4 h-4" />;
      case 'file':
        return <File className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className={cn('relative flex items-center rounded-[14px] border transition-all ease-[0.3s]', bgColor, themeBg)}>
        <Search className={cn('w-5 h-5 ml-4', mutedColor)} />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            'w-full px-4 py-2.5 bg-transparent text-[15px] outline-none',
            textColor
          )}
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setFilteredResults([]);
            }}
            className={cn('mr-4 p-1 rounded-lg transition-all ease-[0.3s]', hoverBg)}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && (searchTerm || recentSearches.length > 0 || trendingSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute top-full left-0 right-0 mt-2 rounded-[14px] border backdrop-blur-[20px] overflow-hidden shadow-lg z-50',
              bgColor,
              themeBg
            )}
          >
            <div className="max-h-96 overflow-y-auto">
              {/* Search Results */}
              {searchTerm && filteredResults.length > 0 && (
                <div className="p-2">
                  <div className={cn('px-3 py-2 text-[12px] font-medium uppercase tracking-wide', mutedColor)}>
                    Results
                  </div>
                  {filteredResults.map((item, index) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 4 }}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ease-[0.3s]',
                        selectedIndex === index ? 'bg-primary/10' : hoverBg
                      )}
                    >
                      <div className={cn('p-2 rounded-lg', bgColor)}>
                        {getIconForType(item.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={cn('text-[15px] font-medium truncate', textColor)}>
                          {item.title}
                        </div>
                        {item.description && (
                          <div className={cn('text-[13px] truncate', mutedColor)}>
                            {item.description}
                          </div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchTerm && filteredResults.length === 0 && (
                <div className="p-8 text-center">
                  <div className={cn('text-[15px] font-medium mb-1', textColor)}>
                    No results found
                  </div>
                  <div className={cn('text-[13px]', mutedColor)}>
                    Try searching with different keywords
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {!searchTerm && recentSearches.length > 0 && (
                <div className="p-2">
                  <div className={cn('px-3 py-2 text-[12px] font-medium uppercase tracking-wide', mutedColor)}>
                    Recent Searches
                  </div>
                  {recentSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 4 }}
                      onClick={() => setSearchTerm(search)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ease-[0.3s]',
                        hoverBg
                      )}
                    >
                      <Clock className={cn('w-4 h-4', mutedColor)} />
                      <div className={cn('text-[15px]', textColor)}>{search}</div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Trending Searches */}
              {!searchTerm && trendingSearches.length > 0 && (
                <div className="p-2">
                  <div className={cn('px-3 py-2 text-[12px] font-medium uppercase tracking-wide', mutedColor)}>
                    Trending
                  </div>
                  {trendingSearches.map((search, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ x: 4 }}
                      onClick={() => setSearchTerm(search)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ease-[0.3s]',
                        hoverBg
                      )}
                    >
                      <TrendingUp className={cn('w-4 h-4', mutedColor)} />
                      <div className={cn('text-[15px]', textColor)}>{search}</div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;

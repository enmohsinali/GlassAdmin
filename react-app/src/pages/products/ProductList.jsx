import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';
import { Card, Button, Input, Badge } from '../../components/ui';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Grid,
  List,
} from 'lucide-react';

/**
 * Product List Page
 * Apple iOS 26 Liquid Glass UI inspired design
 */
const ProductList = () => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      category: 'Electronics',
      price: '$999',
      stock: 145,
      status: 'Active',
      image: 'https://ui-avatars.com/api/?name=iPhone&background=3a6df0&color=fff&size=128',
      sales: 1234,
    },
    {
      id: 2,
      name: 'MacBook Pro M3',
      category: 'Electronics',
      price: '$1,999',
      stock: 87,
      status: 'Active',
      image: 'https://ui-avatars.com/api/?name=MacBook&background=3bf083&color=fff&size=128',
      sales: 856,
    },
    {
      id: 3,
      name: 'AirPods Pro',
      category: 'Accessories',
      price: '$249',
      stock: 342,
      status: 'Active',
      image: 'https://ui-avatars.com/api/?name=AirPods&background=8b5cf6&color=fff&size=128',
      sales: 2341,
    },
    {
      id: 4,
      name: 'Apple Watch Ultra',
      category: 'Wearables',
      price: '$799',
      stock: 12,
      status: 'Low Stock',
      image: 'https://ui-avatars.com/api/?name=Watch&background=ff705c&color=fff&size=128',
      sales: 567,
    },
    {
      id: 5,
      name: 'iPad Air',
      category: 'Electronics',
      price: '$599',
      stock: 234,
      status: 'Active',
      image: 'https://ui-avatars.com/api/?name=iPad&background=fbbf24&color=fff&size=128',
      sales: 987,
    },
    {
      id: 6,
      name: 'Magic Keyboard',
      category: 'Accessories',
      price: '$129',
      stock: 0,
      status: 'Out of Stock',
      image: 'https://ui-avatars.com/api/?name=Keyboard&background=ec4899&color=fff&size=128',
      sales: 445,
    },
  ];

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={cn(
              'text-3xl font-bold',
              isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
            )}
          >
            Products
          </h1>
          <p
            className={cn(
              'mt-2',
              isDark ? 'text-inactive-dark' : 'text-inactive-light'
            )}
          >
            Manage your product inventory and catalog.
          </p>
        </div>
        <Button variant="glass" leftIcon={<Plus className="w-4 h-4" />}>
          Add Product
        </Button>
      </div>

      {/* Filters and Actions */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="md" leftIcon={<Filter className="w-4 h-4" />}>
              Filter
            </Button>
            <Button variant="ghost" size="md" leftIcon={<Download className="w-4 h-4" />}>
              Export
            </Button>
            <div
              className={cn(
                'flex gap-1 p-1 rounded-lg',
                isDark ? 'bg-theme-dark-bg' : 'bg-theme-light-bg'
              )}
            >
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-lg transition-all duration-300',
                  viewMode === 'grid'
                    ? 'bg-primary-blue text-white'
                    : isDark
                    ? 'text-inactive-dark hover:text-[#f9fafb]'
                    : 'text-inactive-light hover:text-[#1a1a1a]'
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 rounded-lg transition-all duration-300',
                  viewMode === 'list'
                    ? 'bg-primary-blue text-white'
                    : isDark
                    ? 'text-inactive-dark hover:text-[#f9fafb]'
                    : 'text-inactive-light hover:text-[#1a1a1a]'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Products Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3
                      className={cn(
                        'font-semibold text-lg',
                        isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                      )}
                    >
                      {product.name}
                    </h3>
                    <p
                      className={cn(
                        'text-sm',
                        isDark ? 'text-inactive-dark' : 'text-inactive-light'
                      )}
                    >
                      {product.category}
                    </p>
                  </div>
                  <Badge variant={getStatusBadgeVariant(product.status)} size="sm">
                    {product.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className={cn(
                        'text-2xl font-bold',
                        isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                      )}
                    >
                      {product.price}
                    </p>
                    <p
                      className={cn(
                        'text-sm',
                        isDark ? 'text-inactive-dark' : 'text-inactive-light'
                      )}
                    >
                      Stock: {product.stock}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className={cn(
                        'p-2 rounded-lg transition-all duration-300',
                        isDark
                          ? 'hover:bg-theme-dark-bg text-primary-blue'
                          : 'hover:bg-theme-light-bg text-primary-blue'
                      )}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className={cn(
                        'p-2 rounded-lg transition-all duration-300',
                        isDark
                          ? 'hover:bg-theme-dark-bg text-primary-green'
                          : 'hover:bg-theme-light-bg text-primary-green'
                      )}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div
                  className={cn(
                    'pt-3 border-t',
                    isDark ? 'border-border-dark' : 'border-border-light'
                  )}
                >
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={cn(
                        isDark ? 'text-inactive-dark' : 'text-inactive-light'
                      )}
                    >
                      Sales
                    </span>
                    <span
                      className={cn(
                        'font-medium',
                        isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                      )}
                    >
                      {product.sales} units
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Products List View */}
      {viewMode === 'list' && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className={cn(
                    'border-b',
                    isDark ? 'border-border-dark' : 'border-border-light'
                  )}
                >
                  <th
                    className={cn(
                      'text-left py-3 px-4 text-sm font-medium',
                      isDark ? 'text-inactive-dark' : 'text-inactive-light'
                    )}
                  >
                    Product
                  </th>
                  <th
                    className={cn(
                      'text-left py-3 px-4 text-sm font-medium',
                      isDark ? 'text-inactive-dark' : 'text-inactive-light'
                    )}
                  >
                    Category
                  </th>
                  <th
                    className={cn(
                      'text-left py-3 px-4 text-sm font-medium',
                      isDark ? 'text-inactive-dark' : 'text-inactive-light'
                    )}
                  >
                    Price
                  </th>
                  <th
                    className={cn(
                      'text-left py-3 px-4 text-sm font-medium',
                      isDark ? 'text-inactive-dark' : 'text-inactive-light'
                    )}
                  >
                    Stock
                  </th>
                  <th
                    className={cn(
                      'text-left py-3 px-4 text-sm font-medium',
                      isDark ? 'text-inactive-dark' : 'text-inactive-light'
                    )}
                  >
                    Status
                  </th>
                  <th
                    className={cn(
                      'text-left py-3 px-4 text-sm font-medium',
                      isDark ? 'text-inactive-dark' : 'text-inactive-light'
                    )}
                  >
                    Sales
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={cn(
                      'border-b transition-colors duration-200',
                      isDark
                        ? 'border-border-dark hover:bg-theme-dark-bg'
                        : 'border-border-light hover:bg-theme-light-bg'
                    )}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p
                            className={cn(
                              'font-medium',
                              isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                            )}
                          >
                            {product.name}
                          </p>
                          <p
                            className={cn(
                              'text-sm',
                              isDark ? 'text-inactive-dark' : 'text-inactive-light'
                            )}
                          >
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td
                      className={cn(
                        'py-4 px-4',
                        isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                      )}
                    >
                      {product.category}
                    </td>
                    <td
                      className={cn(
                        'py-4 px-4 font-medium',
                        isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                      )}
                    >
                      {product.price}
                    </td>
                    <td
                      className={cn(
                        'py-4 px-4',
                        isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                      )}
                    >
                      {product.stock}
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant={getStatusBadgeVariant(product.status)}>
                        {product.status}
                      </Badge>
                    </td>
                    <td
                      className={cn(
                        'py-4 px-4',
                        isDark ? 'text-inactive-dark' : 'text-inactive-light'
                      )}
                    >
                      {product.sales} units
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className={cn(
                            'p-2 rounded-lg transition-all duration-300',
                            isDark
                              ? 'hover:bg-theme-dark-bg text-primary-blue'
                              : 'hover:bg-theme-light-bg text-primary-blue'
                          )}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className={cn(
                            'p-2 rounded-lg transition-all duration-300',
                            isDark
                              ? 'hover:bg-theme-dark-bg text-primary-green'
                              : 'hover:bg-theme-light-bg text-primary-green'
                          )}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className={cn(
                            'p-2 rounded-lg transition-all duration-300',
                            isDark
                              ? 'hover:bg-theme-dark-bg text-primary-red'
                              : 'hover:bg-theme-light-bg text-primary-red'
                          )}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div
            className={cn(
              'flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-4 border-t',
              isDark ? 'border-border-dark' : 'border-border-light'
            )}
          >
            <p
              className={cn(
                'text-[13px] sm:text-sm',
                isDark ? 'text-inactive-dark' : 'text-inactive-light'
              )}
            >
              Showing 1 to 6 of 6 products
            </p>
            <div className="flex gap-1 sm:gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProductList;

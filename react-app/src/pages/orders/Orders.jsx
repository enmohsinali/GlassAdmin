import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/PageWrapper';
import { Card, Badge, Button, SearchInput, Pagination } from '../../components/ui';
import { Eye, Download, Filter } from 'lucide-react';

/**
 * Orders List Page
 */
const Orders = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';

  // Mock orders data
  const orders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2024-11-06', total: 299.99, status: 'Completed', items: 3 },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2024-11-05', total: 549.50, status: 'Processing', items: 5 },
    { id: '#ORD-003', customer: 'Bob Johnson', date: '2024-11-05', total: 129.99, status: 'Shipped', items: 2 },
    { id: '#ORD-004', customer: 'Alice Brown', date: '2024-11-04', total: 899.00, status: 'Completed', items: 7 },
    { id: '#ORD-005', customer: 'Charlie Wilson', date: '2024-11-04', total: 199.99, status: 'Pending', items: 1 },
    { id: '#ORD-006', customer: 'Diana Prince', date: '2024-11-03', total: 449.99, status: 'Processing', items: 4 },
    { id: '#ORD-007', customer: 'Ethan Hunt', date: '2024-11-03', total: 799.00, status: 'Shipped', items: 6 },
    { id: '#ORD-008', customer: 'Fiona Gallagher', date: '2024-11-02', total: 349.50, status: 'Completed', items: 3 },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Completed': 'green',
      'Processing': 'blue',
      'Shipped': 'purple',
      'Pending': 'gray',
      'Cancelled': 'red',
    };
    return colors[status] || 'gray';
  };

  return (
    <PageWrapper title="Orders">
      <div className="space-y-6 mt-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchInput
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${borderColor}`}>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Order ID</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Customer</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Date</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Items</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Total</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Status</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} className={`border-b ${borderColor} last:border-b-0 hover:${bgColor} transition-all ease-[0.3s]`}>
                    <td className={`p-4 text-[15px] font-medium ${textColor}`}>{order.id}</td>
                    <td className={`p-4 text-[15px] ${textColor}`}>{order.customer}</td>
                    <td className={`p-4 text-[15px] ${textColor}`}>{order.date}</td>
                    <td className={`p-4 text-[15px] ${textColor}`}>{order.items}</td>
                    <td className={`p-4 text-[15px] font-medium ${textColor}`}>${order.total.toFixed(2)}</td>
                    <td className="p-4">
                      <Badge color={getStatusColor(order.status)}>{order.status}</Badge>
                    </td>
                    <td className="p-4">
                      <Link to={`/dashboard/orders/${order.id}`}>
                        <Button variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-dark">
            <p className={`text-[14px] ${textColor}`}>
              Showing 1-8 of 124 orders
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={16}
              onPageChange={setCurrentPage}
            />
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default Orders;

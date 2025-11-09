import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/PageWrapper';
import { Card, Badge, Button, SearchInput, Pagination } from '../../components/ui';
import { Eye, Download, Plus, Filter } from 'lucide-react';

/**
 * Invoices List Page
 */
const Invoices = () => {
  const { isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';

  // Mock invoices data
  const invoices = [
    { id: 'INV-001', client: 'Acme Corp', date: '2024-11-06', due: '2024-11-20', amount: 1250.00, status: 'Paid' },
    { id: 'INV-002', client: 'Tech Solutions', date: '2024-11-05', due: '2024-11-19', amount: 3500.00, status: 'Pending' },
    { id: 'INV-003', client: 'Design Studio', date: '2024-11-04', due: '2024-11-18', amount: 2100.00, status: 'Overdue' },
    { id: 'INV-004', client: 'Marketing Inc', date: '2024-11-03', due: '2024-11-17', amount: 1800.00, status: 'Paid' },
    { id: 'INV-005', client: 'Startup Labs', date: '2024-11-02', due: '2024-11-16', amount: 4200.00, status: 'Pending' },
    { id: 'INV-006', client: 'Global Enterprises', date: '2024-11-01', due: '2024-11-15', amount: 5600.00, status: 'Paid' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Paid': 'green',
      'Pending': 'blue',
      'Overdue': 'red',
      'Draft': 'gray',
    };
    return colors[status] || 'gray';
  };

  return (
    <PageWrapper title="Invoices">
      <div className="space-y-6 mt-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <SearchInput
            placeholder="Search invoices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              New Invoice
            </Button>
          </div>
        </div>

        {/* Invoices Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${borderColor}`}>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Invoice #</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Client</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Date</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Due Date</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Amount</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Status</th>
                  <th className={`text-left p-4 text-[15px] font-medium ${textColor}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={index} className={`border-b ${borderColor} last:border-b-0 hover:${bgColor} transition-all ease-[0.3s]`}>
                    <td className={`p-4 text-[15px] font-medium ${textColor}`}>{invoice.id}</td>
                    <td className={`p-4 text-[15px] ${textColor}`}>{invoice.client}</td>
                    <td className={`p-4 text-[15px] ${textColor}`}>{invoice.date}</td>
                    <td className={`p-4 text-[15px] ${textColor}`}>{invoice.due}</td>
                    <td className={`p-4 text-[15px] font-medium ${textColor}`}>${invoice.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <Badge color={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Link to={`/dashboard/invoices/${invoice.id}`}>
                          <Button variant="ghost" size="sm" leftIcon={<Eye className="w-4 h-4" />}>
                            View
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                          PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-border-dark">
            <p className={`text-[13px] sm:text-[14px] ${textColor}`}>
              Showing 1-6 of 42 invoices
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={7}
              onPageChange={setCurrentPage}
            />
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default Invoices;

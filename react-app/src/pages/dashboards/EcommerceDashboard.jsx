import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';
import { Card } from '../../components/ui';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Package,
  CreditCard,
} from 'lucide-react';
import Chart from 'react-apexcharts';

/**
 * E-commerce Dashboard
 * Apple iOS 26 Liquid Glass UI inspired design
 */
const EcommerceDashboard = () => {
  const { isDark } = useTheme();

  // Theme-aware colors with WCAG AA compliant contrast ratios
  const subtitleColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const labelColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#5a5a5a]';
  const secondaryTextColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const timestampColor = isDark ? 'text-[#3a6df0]' : 'text-[#2563eb]';

  // Sales Chart Configuration
  const salesChartOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
      background: 'transparent',
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    colors: ['#3a6df0', '#3bf083'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      labels: {
        style: {
          colors: isDark ? '#f9fafb' : '#1a1a1a',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#f9fafb' : '#1a1a1a',
        },
        formatter: (value) => `$${value}k`,
      },
    },
    grid: {
      borderColor: isDark ? 'rgba(113, 119, 144, 0.25)' : 'rgba(255, 255, 255, 0.35)',
    },
    legend: {
      labels: {
        colors: isDark ? '#f9fafb' : '#1a1a1a',
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
  };

  const salesChartSeries = [
    {
      name: 'Revenue',
      data: [45, 52, 38, 65, 70, 95],
    },
    {
      name: 'Profit',
      data: [35, 41, 28, 51, 56, 75],
    },
  ];

  // Category Sales Chart
  const categoryChartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent',
      horizontal: true,
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: true,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `$${val}k`,
      style: {
        colors: ['#fff'],
      },
    },
    colors: ['#3a6df0'],
    xaxis: {
      categories: ['Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books'],
      labels: {
        style: {
          colors: isDark ? '#f9fafb' : '#1a1a1a',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: isDark ? '#f9fafb' : '#1a1a1a',
        },
      },
    },
    grid: {
      borderColor: isDark ? 'rgba(113, 119, 144, 0.25)' : 'rgba(255, 255, 255, 0.35)',
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
    },
  };

  const categoryChartSeries = [
    {
      name: 'Sales',
      data: [85, 72, 68, 54, 42],
    },
  ];

  // Top Products
  const topProducts = [
    { name: 'iPhone 15 Pro', sold: 1234, revenue: '$1,234,000', trend: 'up' },
    { name: 'MacBook Pro M3', sold: 856, revenue: '$1,712,000', trend: 'up' },
    { name: 'AirPods Pro', sold: 2341, revenue: '$584,250', trend: 'up' },
    { name: 'Apple Watch', sold: 1567, revenue: '$626,800', trend: 'down' },
    { name: 'iPad Air', sold: 987, revenue: '$592,200', trend: 'up' },
  ];

  // Recent Orders
  const recentOrders = [
    { id: '#12345', customer: 'John Doe', amount: '$1,234', status: 'Completed', date: '2 min ago' },
    { id: '#12346', customer: 'Jane Smith', amount: '$856', status: 'Processing', date: '15 min ago' },
    { id: '#12347', customer: 'Mike Johnson', amount: '$2,341', status: 'Shipped', date: '1 hour ago' },
    { id: '#12348', customer: 'Sarah Williams', amount: '$567', status: 'Pending', date: '2 hours ago' },
    { id: '#12349', customer: 'Tom Brown', amount: '$987', status: 'Completed', date: '3 hours ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'text-primary-green bg-primary-green';
      case 'Processing':
        return 'text-primary-blue bg-primary-blue';
      case 'Shipped':
        return 'text-purple-500 bg-purple-500';
      case 'Pending':
        return 'text-yellow-500 bg-yellow-500';
      default:
        return 'text-gray-500 bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1
          className={cn(
            'text-3xl font-bold',
            isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
          )}
        >
          E-commerce Dashboard
        </h1>
        <p className={cn('mt-2 text-[15px]', subtitleColor)}>
          Track your store performance and manage your online business.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className={cn('text-sm font-semibold', labelColor)}>
                Total Sales
              </p>
              <p
                className={cn(
                  'text-3xl font-bold mt-2',
                  isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                )}
              >
                $95.4k
              </p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-semibold text-primary-green">+18.2%</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-primary-blue bg-opacity-20">
              <DollarSign className="w-6 h-6 text-primary-blue" />
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className={cn('text-sm font-semibold', labelColor)}>
                Total Orders
              </p>
              <p
                className={cn(
                  'text-3xl font-bold mt-2',
                  isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                )}
              >
                6,985
              </p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-semibold text-primary-green">+12.5%</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-primary-green bg-opacity-20">
              <ShoppingCart className="w-6 h-6 text-primary-green" />
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className={cn('text-sm font-semibold', labelColor)}>
                Products Sold
              </p>
              <p
                className={cn(
                  'text-3xl font-bold mt-2',
                  isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                )}
              >
                12,453
              </p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-semibold text-primary-green">+9.8%</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-purple-500 bg-opacity-20">
              <Package className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p className={cn('text-sm font-semibold', labelColor)}>
                Conversion Rate
              </p>
              <p
                className={cn(
                  'text-3xl font-bold mt-2',
                  isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                )}
              >
                3.2%
              </p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingDown className="w-4 h-4 text-primary-red" />
                <span className="text-sm font-semibold text-primary-red">-2.1%</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-primary-red bg-opacity-20">
              <CreditCard className="w-6 h-6 text-primary-red" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Sales Overview">
          <Chart
            options={salesChartOptions}
            series={salesChartSeries}
            type="line"
            height={300}
          />
        </Card>

        <Card title="Sales by Category">
          <Chart
            options={categoryChartOptions}
            series={categoryChartSeries}
            type="bar"
            height={300}
          />
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card title="Top Products">
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
                      'text-left py-3 px-2 text-sm font-semibold uppercase tracking-wide',
                      labelColor
                    )}
                  >
                    Product
                  </th>
                  <th
                    className={cn(
                      'text-right py-3 px-2 text-sm font-semibold uppercase tracking-wide',
                      labelColor
                    )}
                  >
                    Sold
                  </th>
                  <th
                    className={cn(
                      'text-right py-3 px-2 text-sm font-semibold uppercase tracking-wide',
                      labelColor
                    )}
                  >
                    Revenue
                  </th>
                  <th className="text-right py-3 px-2 text-sm font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={cn(
                      'border-b',
                      isDark ? 'border-border-dark' : 'border-border-light'
                    )}
                  >
                    <td
                      className={cn(
                        'py-3 px-2 text-sm font-medium',
                        isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                      )}
                    >
                      {product.name}
                    </td>
                    <td className={cn('py-3 px-2 text-sm text-right font-medium', secondaryTextColor)}>
                      {product.sold}
                    </td>
                    <td
                      className={cn(
                        'py-3 px-2 text-sm font-medium text-right',
                        isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                      )}
                    >
                      {product.revenue}
                    </td>
                    <td className="py-3 px-2 text-right">
                      {product.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-primary-green inline" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-primary-red inline" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Orders */}
        <Card title="Recent Orders">
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className={cn(
                  'flex items-center justify-between pb-4',
                  index !== recentOrders.length - 1 && 'border-b',
                  isDark ? 'border-border-dark' : 'border-border-light'
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                      )}
                    >
                      {order.id}
                    </p>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium bg-opacity-20',
                        getStatusColor(order.status)
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className={cn('text-sm mt-1 font-medium', secondaryTextColor)}>
                    {order.customer}
                  </p>
                  <p className={cn('text-xs mt-1 font-medium', timestampColor)}>{order.date}</p>
                </div>
                <p
                  className={cn(
                    'text-lg font-bold',
                    isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                  )}
                >
                  {order.amount}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EcommerceDashboard;

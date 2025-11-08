import { useState } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PageWrapper from '../components/PageWrapper';
import { Card, Select, Badge } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  CreditCard,
} from 'lucide-react';

const FinancialPage = () => {
  const { isDark } = useTheme();
  const [timeRange, setTimeRange] = useState('6m');

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';
  const gridColor = isDark ? 'rgba(249,250,251,0.1)' : 'rgba(0,0,0,0.1)';

  // Sample data
  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 32000, profit: 13000 },
    { month: 'Feb', revenue: 52000, expenses: 35000, profit: 17000 },
    { month: 'Mar', revenue: 48000, expenses: 33000, profit: 15000 },
    { month: 'Apr', revenue: 61000, expenses: 38000, profit: 23000 },
    { month: 'May', revenue: 55000, expenses: 36000, profit: 19000 },
    { month: 'Jun', revenue: 67000, expenses: 40000, profit: 27000 },
  ];

  const categoryData = [
    { name: 'Products', value: 45, color: 'rgb(var(--color-primary))' },
    { name: 'Services', value: 30, color: 'rgb(var(--color-success))' },
    { name: 'Subscriptions', value: 15, color: 'rgb(var(--color-warning))' },
    { name: 'Other', value: 10, color: 'rgb(var(--color-danger))' },
  ];

  const salesData = [
    { day: 'Mon', sales: 1200 },
    { day: 'Tue', sales: 1900 },
    { day: 'Wed', sales: 1500 },
    { day: 'Thu', sales: 2200 },
    { day: 'Fri', sales: 2800 },
    { day: 'Sat', sales: 3200 },
    { day: 'Sun', sales: 2500 },
  ];

  const customerGrowthData = [
    { month: 'Jan', customers: 1200 },
    { month: 'Feb', customers: 1450 },
    { month: 'Mar', customers: 1600 },
    { month: 'Apr', customers: 1850 },
    { month: 'May', customers: 2100 },
    { month: 'Jun', customers: 2450 },
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 shadow-lg">
          <p className={cn('text-[13px] font-medium mb-2', textColor)}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className={cn('text-[12px]', mutedColor)}>
              <span style={{ color: entry.color }}>●</span> {entry.name}: $
              {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <PageWrapper title="Financial Dashboard">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={cn('text-[28px] font-bold mb-2', textColor)}>Financial Dashboard</h1>
            <p className={cn('text-[15px]', mutedColor)}>
              Track your revenue, expenses, and financial metrics
            </p>
          </div>
          <div className="w-[150px]">
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              options={[
                { value: '1m', label: 'Last Month' },
                { value: '3m', label: 'Last 3 Months' },
                { value: '6m', label: 'Last 6 Months' },
                { value: '1y', label: 'Last Year' },
              ]}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 rounded-full bg-primary/10">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <Badge variant="success" className="bg-success/10 text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5%
              </Badge>
            </div>
            <p className={cn('text-[13px] mb-1', mutedColor)}>Total Revenue</p>
            <p className={cn('text-[24px] font-bold', textColor)}>$328,000</p>
          </Card>

          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 rounded-full bg-success/10">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <Badge variant="success" className="bg-success/10 text-success">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2%
              </Badge>
            </div>
            <p className={cn('text-[13px] mb-1', mutedColor)}>Profit</p>
            <p className={cn('text-[24px] font-bold', textColor)}>$114,000</p>
          </Card>

          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 rounded-full bg-danger/10">
                <CreditCard className="w-6 h-6 text-danger" />
              </div>
              <Badge variant="danger" className="bg-danger/10 text-danger">
                <TrendingDown className="w-3 h-3 mr-1" />
                +5.1%
              </Badge>
            </div>
            <p className={cn('text-[13px] mb-1', mutedColor)}>Expenses</p>
            <p className={cn('text-[24px] font-bold', textColor)}>$214,000</p>
          </Card>

          <Card>
            <div className="flex items-start justify-between mb-3">
              <div className="p-3 rounded-full bg-warning/10">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <Badge variant="warning" className="bg-warning/10 text-warning">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.3%
              </Badge>
            </div>
            <p className={cn('text-[13px] mb-1', mutedColor)}>Customers</p>
            <p className={cn('text-[24px] font-bold', textColor)}>2,450</p>
          </Card>
        </div>

        {/* Revenue & Profit Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card title="Revenue & Profit">
              <div className="h-[350px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgb(58, 109, 240)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="rgb(58, 109, 240)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgb(59, 240, 131)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="rgb(59, 240, 131)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="month" stroke={mutedColor} style={{ fontSize: '12px' }} />
                    <YAxis stroke={mutedColor} style={{ fontSize: '12px' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: '13px', color: textColor }} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="rgb(58, 109, 240)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="rgb(59, 240, 131)"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorProfit)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Revenue by Category */}
          <Card title="Revenue by Category">
            <div className="h-[350px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card p-3 shadow-lg">
                            <p className={cn('text-[13px] font-medium', textColor)}>
                              {payload[0].name}
                            </p>
                            <p className={cn('text-[12px]', mutedColor)}>
                              {payload[0].value}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className={cn('text-[13px]', textColor)}>{item.name}</span>
                    </div>
                    <span className={cn('text-[13px] font-medium', textColor)}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Weekly Sales & Customer Growth */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Sales */}
          <Card title="Weekly Sales">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="day" stroke={mutedColor} style={{ fontSize: '12px' }} />
                  <YAxis stroke={mutedColor} style={{ fontSize: '12px' }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card p-3 shadow-lg">
                            <p className={cn('text-[13px] font-medium', textColor)}>
                              {payload[0].payload.day}
                            </p>
                            <p className={cn('text-[12px]', mutedColor)}>
                              Sales: ${payload[0].value.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="sales" fill="rgb(58, 109, 240)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Customer Growth */}
          <Card title="Customer Growth">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="month" stroke={mutedColor} style={{ fontSize: '12px' }} />
                  <YAxis stroke={mutedColor} style={{ fontSize: '12px' }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card p-3 shadow-lg">
                            <p className={cn('text-[13px] font-medium', textColor)}>
                              {payload[0].payload.month}
                            </p>
                            <p className={cn('text-[12px]', mutedColor)}>
                              Customers: {payload[0].value.toLocaleString()}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    stroke="rgb(59, 240, 131)"
                    strokeWidth={3}
                    dot={{ fill: 'rgb(59, 240, 131)', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card title="Recent Transactions">
          <div className="mt-4">
            <div className="space-y-3">
              {[
                {
                  id: 1,
                  description: 'Product Sale - Premium Plan',
                  amount: '+$299.00',
                  date: 'Nov 7, 2025',
                  type: 'income',
                },
                {
                  id: 2,
                  description: 'Expense - Marketing Campaign',
                  amount: '-$1,240.00',
                  date: 'Nov 6, 2025',
                  type: 'expense',
                },
                {
                  id: 3,
                  description: 'Product Sale - Basic Plan',
                  amount: '+$99.00',
                  date: 'Nov 6, 2025',
                  type: 'income',
                },
                {
                  id: 4,
                  description: 'Expense - Office Supplies',
                  amount: '-$180.00',
                  date: 'Nov 5, 2025',
                  type: 'expense',
                },
                {
                  id: 5,
                  description: 'Service Payment - Consulting',
                  amount: '+$2,500.00',
                  date: 'Nov 5, 2025',
                  type: 'income',
                },
              ].map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-[14px] hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'p-2 rounded-full',
                        transaction.type === 'income'
                          ? 'bg-success/10'
                          : 'bg-danger/10'
                      )}
                    >
                      {transaction.type === 'income' ? (
                        <TrendingUp className="w-5 h-5 text-success" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-danger" />
                      )}
                    </div>
                    <div>
                      <p className={cn('text-[14px] font-medium', textColor)}>
                        {transaction.description}
                      </p>
                      <p className={cn('text-[12px]', mutedColor)}>{transaction.date}</p>
                    </div>
                  </div>
                  <span
                    className={cn(
                      'text-[16px] font-semibold',
                      transaction.type === 'income' ? 'text-success' : 'text-danger'
                    )}
                  >
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default FinancialPage;

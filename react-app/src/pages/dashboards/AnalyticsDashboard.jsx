import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';
import { Card, Stats } from '../../components/ui';
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Activity,
} from 'lucide-react';
import Chart from 'react-apexcharts';

/**
 * Analytics Dashboard
 * Apple iOS 26 Liquid Glass UI inspired design
 */
const AnalyticsDashboard = () => {
  const { isDark } = useTheme();

  // Revenue Chart Configuration
  const revenueChartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: false },
      background: 'transparent',
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    colors: ['#3a6df0'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
      strokeDashArray: 5,
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (value) => `$${value}k`,
      },
    },
  };

  const revenueChartSeries = [
    {
      name: 'Revenue',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 140, 165, 180],
    },
  ];

  // Traffic Sources Chart
  const trafficChartOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    labels: ['Direct', 'Organic Search', 'Social Media', 'Referral', 'Email'],
    colors: ['#3a6df0', '#3bf083', '#ff705c', '#fbbf24', '#8b5cf6'],
    legend: {
      position: 'bottom',
      labels: {
        colors: isDark ? '#f9fafb' : '#1a1a1a',
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
        },
      },
    },
    tooltip: {
      theme: isDark ? 'dark' : 'light',
      y: {
        formatter: (value) => `${value}%`,
      },
    },
  };

  const trafficChartSeries = [35, 28, 18, 12, 7];

  // Visitors Chart
  const visitorsChartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
      background: 'transparent',
    },
    theme: {
      mode: isDark ? 'dark' : 'light',
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '50%',
      },
    },
    dataLabels: { enabled: false },
    colors: ['#3bf083'],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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

  const visitorsChartSeries = [
    {
      name: 'Visitors',
      data: [4400, 5500, 4100, 6700, 5900, 7200, 6800],
    },
  ];

  // Recent activity data
  const recentActivity = [
    { user: 'John Doe', action: 'Created new project', time: '2 minutes ago', avatar: 'JD' },
    { user: 'Jane Smith', action: 'Updated user profile', time: '15 minutes ago', avatar: 'JS' },
    { user: 'Mike Johnson', action: 'Added 5 new products', time: '1 hour ago', avatar: 'MJ' },
    { user: 'Sarah Williams', action: 'Processed 12 orders', time: '2 hours ago', avatar: 'SW' },
    { user: 'Tom Brown', action: 'Generated sales report', time: '3 hours ago', avatar: 'TB' },
  ];

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
          Analytics Dashboard
        </h1>
        <p
          className={cn(
            'mt-2',
            isDark ? 'text-inactive-dark' : 'text-inactive-light'
          )}
        >
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p
                className={cn(
                  'text-sm font-medium',
                  isDark ? 'text-inactive-dark' : 'text-inactive-light'
                )}
              >
                Total Revenue
              </p>
              <p
                className={cn(
                  'text-3xl font-bold mt-2',
                  isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                )}
              >
                $180k
              </p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-primary-green">+12.5%</span>
                <span
                  className={cn(
                    'text-sm',
                    isDark ? 'text-inactive-dark' : 'text-inactive-light'
                  )}
                >
                  vs last month
                </span>
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
              <p
                className={cn(
                  'text-sm font-medium',
                  isDark ? 'text-inactive-dark' : 'text-inactive-light'
                )}
              >
                Total Users
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
                <span className="text-sm font-medium text-primary-green">+8.2%</span>
                <span
                  className={cn(
                    'text-sm',
                    isDark ? 'text-inactive-dark' : 'text-inactive-light'
                  )}
                >
                  vs last month
                </span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-primary-green bg-opacity-20">
              <Users className="w-6 h-6 text-primary-green" />
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p
                className={cn(
                  'text-sm font-medium',
                  isDark ? 'text-inactive-dark' : 'text-inactive-light'
                )}
              >
                Total Orders
              </p>
              <p
                className={cn(
                  'text-3xl font-bold mt-2',
                  isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                )}
              >
                8,542
              </p>
              <div className="flex items-center mt-2 gap-1">
                <TrendingUp className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-primary-green">+15.3%</span>
                <span
                  className={cn(
                    'text-sm',
                    isDark ? 'text-inactive-dark' : 'text-inactive-light'
                  )}
                >
                  vs last month
                </span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-purple-500 bg-opacity-20">
              <ShoppingCart className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>

        <Card className="hover:scale-105 transition-all duration-300">
          <div className="flex items-start justify-between">
            <div>
              <p
                className={cn(
                  'text-sm font-medium',
                  isDark ? 'text-inactive-dark' : 'text-inactive-light'
                )}
              >
                Active Sessions
              </p>
              <p
                className={cn(
                  'text-3xl font-bold mt-2',
                  isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                )}
              >
                1,234
              </p>
              <div className="flex items-center mt-2 gap-1">
                <Activity className="w-4 h-4 text-primary-blue" />
                <span className="text-sm font-medium text-primary-blue">Live</span>
                <span
                  className={cn(
                    'text-sm',
                    isDark ? 'text-inactive-dark' : 'text-inactive-light'
                  )}
                >
                  right now
                </span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-primary-red bg-opacity-20">
              <Activity className="w-6 h-6 text-primary-red" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card title="Revenue Overview">
          <Chart
            options={revenueChartOptions}
            series={revenueChartSeries}
            type="area"
            height={300}
          />
        </Card>

        {/* Traffic Sources */}
        <Card title="Traffic Sources">
          <Chart
            options={trafficChartOptions}
            series={trafficChartSeries}
            type="donut"
            height={300}
          />
        </Card>
      </div>

      {/* Visitors and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Visitors */}
        <Card title="Weekly Visitors" className="lg:col-span-2">
          <Chart
            options={visitorsChartOptions}
            series={visitorsChartSeries}
            type="bar"
            height={300}
          />
        </Card>

        {/* Recent Activity */}
        <Card title="Recent Activity">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium',
                    isDark
                      ? 'bg-theme-dark-bg text-[#f9fafb]'
                      : 'bg-theme-light-bg text-[#1a1a1a]',
                    'backdrop-blur-glass border',
                    isDark ? 'border-border-dark' : 'border-border-light'
                  )}
                >
                  {activity.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      'text-sm font-medium',
                      isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]'
                    )}
                  >
                    {activity.user}
                  </p>
                  <p
                    className={cn(
                      'text-sm',
                      isDark ? 'text-inactive-dark' : 'text-inactive-light'
                    )}
                  >
                    {activity.action}
                  </p>
                  <p className="text-xs text-primary-blue mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

import { useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/PageWrapper';
import { Card, Badge, Button, StepProgress } from '../../components/ui';
import { Printer, Download, Mail, Package } from 'lucide-react';

/**
 * Order Details Page
 */
const OrderDetails = () => {
  const { id } = useParams();
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';

  // Mock order data
  const order = {
    id: id || '#ORD-001',
    date: 'November 6, 2024',
    status: 'Shipped',
    customer: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
    },
    shipping: {
      address: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'United States',
    },
    items: [
      { name: 'Wireless Headphones Pro', sku: 'WHP-PRO-001', quantity: 1, price: 299.99 },
      { name: 'USB-C Cable', sku: 'CAB-USBC-001', quantity: 2, price: 15.00 },
      { name: 'Phone Case', sku: 'PC-SLIM-001', quantity: 1, price: 29.99 },
    ],
    subtotal: 359.98,
    shipping: 10.00,
    tax: 36.00,
    total: 405.98,
  };

  const orderSteps = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  const currentStep = 3; // Shipped

  return (
    <PageWrapper title="Order Details">
      <div className="space-y-6 mt-6">
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className={`text-[20px] font-medium mb-2 ${textColor}`}>Order {order.id}</h2>
            <p className={`text-[15px] ${inactiveColor}`}>
              Placed on {order.date}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" leftIcon={<Printer className="w-4 h-4" />}>
              Print
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
              Download
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Mail className="w-4 h-4" />}>
              Email
            </Button>
          </div>
        </div>

        {/* Order Progress */}
        <Card title="Order Status">
          <div className="mb-4">
            <Badge color="blue" className="text-[15px]">{order.status}</Badge>
          </div>
          <StepProgress
            currentStep={currentStep}
            totalSteps={orderSteps.length}
            labels={orderSteps}
          />
        </Card>

        {/* Order Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Info */}
          <Card title="Customer Information">
            <div className="space-y-2">
              <div>
                <div className={`text-[14px] ${inactiveColor}`}>Name</div>
                <div className={`text-[15px] ${textColor}`}>{order.customer.name}</div>
              </div>
              <div>
                <div className={`text-[14px] ${inactiveColor}`}>Email</div>
                <div className={`text-[15px] ${textColor}`}>{order.customer.email}</div>
              </div>
              <div>
                <div className={`text-[14px] ${inactiveColor}`}>Phone</div>
                <div className={`text-[15px] ${textColor}`}>{order.customer.phone}</div>
              </div>
            </div>
          </Card>

          {/* Shipping Address */}
          <Card title="Shipping Address">
            <div className={`text-[15px] ${textColor}`}>
              <div>{order.shipping.address}</div>
              <div>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</div>
              <div>{order.shipping.country}</div>
            </div>
          </Card>
        </div>

        {/* Order Items */}
        <Card title="Order Items">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${borderColor}`}>
                  <th className={`text-left p-3 text-[15px] font-medium ${textColor}`}>Product</th>
                  <th className={`text-left p-3 text-[15px] font-medium ${textColor}`}>SKU</th>
                  <th className={`text-right p-3 text-[15px] font-medium ${textColor}`}>Quantity</th>
                  <th className={`text-right p-3 text-[15px] font-medium ${textColor}`}>Price</th>
                  <th className={`text-right p-3 text-[15px] font-medium ${textColor}`}>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className={`border-b ${borderColor} last:border-b-0`}>
                    <td className={`p-3 text-[15px] ${textColor}`}>{item.name}</td>
                    <td className={`p-3 text-[15px] ${inactiveColor}`}>{item.sku}</td>
                    <td className={`p-3 text-[15px] text-right ${textColor}`}>{item.quantity}</td>
                    <td className={`p-3 text-[15px] text-right ${textColor}`}>${item.price.toFixed(2)}</td>
                    <td className={`p-3 text-[15px] text-right font-medium ${textColor}`}>
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Totals */}
          <div className={`mt-6 pt-4 border-t ${borderColor} space-y-2`}>
            <div className="flex justify-between">
              <span className={`text-[15px] ${inactiveColor}`}>Subtotal</span>
              <span className={`text-[15px] ${textColor}`}>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-[15px] ${inactiveColor}`}>Shipping</span>
              <span className={`text-[15px] ${textColor}`}>${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-[15px] ${inactiveColor}`}>Tax</span>
              <span className={`text-[15px] ${textColor}`}>${order.tax.toFixed(2)}</span>
            </div>
            <div className={`flex justify-between pt-2 border-t ${borderColor}`}>
              <span className={`text-[17px] font-medium ${textColor}`}>Total</span>
              <span className={`text-[17px] font-medium ${textColor}`}>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default OrderDetails;

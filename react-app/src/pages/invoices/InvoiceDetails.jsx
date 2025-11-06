import { useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import PageWrapper from '../../components/PageWrapper';
import { Card, Badge, Button } from '../../components/ui';
import { Printer, Download, Mail, Check } from 'lucide-react';

/**
 * Invoice Details Page
 */
const InvoiceDetails = () => {
  const { id } = useParams();
  const { isDark } = useTheme();

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';
  const borderColor = isDark ? 'border-border-dark' : 'border-border-light';

  // Mock invoice data
  const invoice = {
    id: id || 'INV-001',
    status: 'Paid',
    date: 'November 6, 2024',
    dueDate: 'November 20, 2024',
    from: {
      name: 'Your Company Name',
      address: '123 Business Street',
      city: 'San Francisco, CA 94102',
      email: 'billing@yourcompany.com',
      phone: '+1 (555) 123-4567',
    },
    to: {
      name: 'Acme Corporation',
      contact: 'John Smith',
      address: '456 Client Avenue',
      city: 'New York, NY 10001',
      email: 'john.smith@acme.com',
      phone: '+1 (555) 987-6543',
    },
    items: [
      { description: 'Website Design & Development', quantity: 1, rate: 5000.00, amount: 5000.00 },
      { description: 'Logo Design', quantity: 1, rate: 800.00, amount: 800.00 },
      { description: 'Monthly Hosting (12 months)', quantity: 12, rate: 50.00, amount: 600.00 },
      { description: 'Domain Registration', quantity: 1, rate: 15.00, amount: 15.00 },
    ],
    subtotal: 6415.00,
    tax: 641.50,
    total: 7056.50,
    notes: 'Thank you for your business! Payment is due within 14 days.',
  };

  return (
    <PageWrapper title="Invoice Details">
      <div className="space-y-6 mt-6">
        {/* Actions */}
        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" size="sm" leftIcon={<Printer className="w-4 h-4" />}>
            Print
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Download PDF
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Mail className="w-4 h-4" />}>
            Email
          </Button>
          {invoice.status !== 'Paid' && (
            <Button variant="primary" size="sm" leftIcon={<Check className="w-4 h-4" />}>
              Mark as Paid
            </Button>
          )}
        </div>

        {/* Invoice Card */}
        <Card>
          {/* Invoice Header */}
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div>
              <h1 className={`text-[32px] font-medium mb-2 ${textColor}`}>INVOICE</h1>
              <div className="flex items-center gap-3">
                <p className={`text-[17px] ${textColor}`}>#{invoice.id}</p>
                <Badge color={invoice.status === 'Paid' ? 'green' : invoice.status === 'Pending' ? 'blue' : 'red'}>
                  {invoice.status}
                </Badge>
              </div>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <div className={`text-[15px] ${inactiveColor} mb-1`}>Invoice Date</div>
              <div className={`text-[15px] ${textColor} mb-3`}>{invoice.date}</div>
              <div className={`text-[15px] ${inactiveColor} mb-1`}>Due Date</div>
              <div className={`text-[15px] ${textColor}`}>{invoice.dueDate}</div>
            </div>
          </div>

          {/* From / To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* From */}
            <div>
              <div className={`text-[15px] font-medium mb-3 ${textColor}`}>From</div>
              <div className={`text-[15px] ${textColor} space-y-1`}>
                <div className="font-medium">{invoice.from.name}</div>
                <div className={inactiveColor}>{invoice.from.address}</div>
                <div className={inactiveColor}>{invoice.from.city}</div>
                <div className={inactiveColor}>{invoice.from.email}</div>
                <div className={inactiveColor}>{invoice.from.phone}</div>
              </div>
            </div>

            {/* To */}
            <div>
              <div className={`text-[15px] font-medium mb-3 ${textColor}`}>To</div>
              <div className={`text-[15px] ${textColor} space-y-1`}>
                <div className="font-medium">{invoice.to.name}</div>
                <div className={inactiveColor}>Attn: {invoice.to.contact}</div>
                <div className={inactiveColor}>{invoice.to.address}</div>
                <div className={inactiveColor}>{invoice.to.city}</div>
                <div className={inactiveColor}>{invoice.to.email}</div>
                <div className={inactiveColor}>{invoice.to.phone}</div>
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${borderColor}`}>
                  <th className={`text-left p-3 text-[15px] font-medium ${textColor}`}>Description</th>
                  <th className={`text-right p-3 text-[15px] font-medium ${textColor}`}>Qty</th>
                  <th className={`text-right p-3 text-[15px] font-medium ${textColor}`}>Rate</th>
                  <th className={`text-right p-3 text-[15px] font-medium ${textColor}`}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => (
                  <tr key={index} className={`border-b ${borderColor} last:border-b-0`}>
                    <td className={`p-3 text-[15px] ${textColor}`}>{item.description}</td>
                    <td className={`p-3 text-[15px] text-right ${textColor}`}>{item.quantity}</td>
                    <td className={`p-3 text-[15px] text-right ${textColor}`}>${item.rate.toFixed(2)}</td>
                    <td className={`p-3 text-[15px] text-right font-medium ${textColor}`}>
                      ${item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full md:w-80 space-y-2">
              <div className="flex justify-between py-2">
                <span className={`text-[15px] ${inactiveColor}`}>Subtotal</span>
                <span className={`text-[15px] ${textColor}`}>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className={`text-[15px] ${inactiveColor}`}>Tax (10%)</span>
                <span className={`text-[15px] ${textColor}`}>${invoice.tax.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between py-3 border-t ${borderColor}`}>
                <span className={`text-[17px] font-medium ${textColor}`}>Total</span>
                <span className={`text-[17px] font-medium ${textColor}`}>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className={`mt-8 pt-6 border-t ${borderColor}`}>
              <div className={`text-[15px] font-medium mb-2 ${textColor}`}>Notes</div>
              <p className={`text-[15px] ${inactiveColor}`}>{invoice.notes}</p>
            </div>
          )}
        </Card>
      </div>
    </PageWrapper>
  );
};

export default InvoiceDetails;

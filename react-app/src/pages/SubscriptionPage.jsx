import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { Card, Button, Badge, Alert, Progress } from '../components/ui';
import { CreditCard, Calendar, Download, AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Subscription Management Page
 * Displays current subscription details and management options
 */
const SubscriptionPage = () => {
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  // Mock subscription data
  const subscription = {
    plan: 'Professional',
    status: 'active',
    billingCycle: 'monthly',
    nextBillingDate: '2025-12-08',
    amount: 29,
    paymentMethod: {
      type: 'Visa',
      last4: '4242',
      expiryDate: '12/2026',
    },
    usage: {
      projects: { used: 8, limit: 'unlimited' },
      storage: { used: 45, limit: 100 }, // in GB
      teamMembers: { used: 5, limit: 10 },
    },
  };

  const billingHistory = [
    {
      date: '2025-11-08',
      amount: 29,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      date: '2025-10-08',
      amount: 29,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      date: '2025-09-08',
      amount: 29,
      status: 'paid',
      invoiceUrl: '#',
    },
  ];

  const handleCancelSubscription = () => {
    setShowCancelAlert(true);
  };

  const handleUpgrade = () => {
    // Navigate to pricing page or open upgrade modal
    window.location.href = '/dashboard/pricing';
  };

  return (
    <PageWrapper
      title="Subscription Management"
      description="Manage your subscription and billing"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Subscription', path: '/dashboard/subscription' },
      ]}
    >
      {/* Cancellation Alert */}
      {showCancelAlert && (
        <Alert
          type="warning"
          title="Cancel Subscription"
          dismissible
          onDismiss={() => setShowCancelAlert(false)}
        >
          <p className="mb-3">
            Are you sure you want to cancel your subscription? You'll lose access to all premium features at the end of your billing period.
          </p>
          <div className="flex gap-2">
            <Button variant="danger" size="sm">
              Confirm Cancellation
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setShowCancelAlert(false)}>
              Keep Subscription
            </Button>
          </div>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Plan */}
          <Card title="Current Plan">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold">{subscription.plan}</h3>
                  <Badge variant={subscription.status === 'active' ? 'success' : 'warning'}>
                    {subscription.status}
                  </Badge>
                </div>
                <p className="text-muted text-sm">
                  Billed {subscription.billingCycle} • ${subscription.amount}/{subscription.billingCycle === 'monthly' ? 'mo' : 'yr'}
                </p>
              </div>
              <Button variant="primary" onClick={handleUpgrade}>
                Upgrade Plan
              </Button>
            </div>

            {/* Next Billing */}
            <div className="flex items-center gap-2 p-4 bg-muted/5 rounded-lg">
              <Calendar className="w-5 h-5 text-muted" />
              <div>
                <p className="text-sm font-medium">Next billing date</p>
                <p className="text-sm text-muted">
                  {new Date(subscription.nextBillingDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </Card>

          {/* Usage Statistics */}
          <Card title="Usage This Month">
            <div className="space-y-6">
              {/* Projects */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Projects</span>
                  <span className="text-sm text-muted">
                    {subscription.usage.projects.used} / {subscription.usage.projects.limit}
                  </span>
                </div>
                {subscription.usage.projects.limit !== 'unlimited' && (
                  <Progress
                    value={(subscription.usage.projects.used / subscription.usage.projects.limit) * 100}
                    color="primary"
                  />
                )}
              </div>

              {/* Storage */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Storage</span>
                  <span className="text-sm text-muted">
                    {subscription.usage.storage.used} GB / {subscription.usage.storage.limit} GB
                  </span>
                </div>
                <Progress
                  value={(subscription.usage.storage.used / subscription.usage.storage.limit) * 100}
                  color={subscription.usage.storage.used / subscription.usage.storage.limit > 0.8 ? 'danger' : 'primary'}
                />
              </div>

              {/* Team Members */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Team Members</span>
                  <span className="text-sm text-muted">
                    {subscription.usage.teamMembers.used} / {subscription.usage.teamMembers.limit}
                  </span>
                </div>
                <Progress
                  value={(subscription.usage.teamMembers.used / subscription.usage.teamMembers.limit) * 100}
                  color="primary"
                />
              </div>
            </div>
          </Card>

          {/* Billing History */}
          <Card title="Billing History">
            <div className="space-y-4">
              {billingHistory.map((invoice, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-muted/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {invoice.status === 'paid' ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-warning" />
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(invoice.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-muted">
                        {subscription.plan} Plan • {subscription.billingCycle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold">${invoice.amount}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      leftIcon={<Download className="w-4 h-4" />}
                    >
                      Invoice
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Method */}
          <Card title="Payment Method">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-muted/10 rounded-lg">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{subscription.paymentMethod.type} •••• {subscription.paymentMethod.last4}</p>
                <p className="text-sm text-muted">Expires {subscription.paymentMethod.expiryDate}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" className="w-full">
              Update Payment Method
            </Button>
          </Card>

          {/* Quick Actions */}
          <Card title="Quick Actions">
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Change Billing Cycle
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Download All Invoices
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-danger hover:text-danger"
                onClick={handleCancelSubscription}
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Cancel Subscription
              </Button>
            </div>
          </Card>

          {/* Support */}
          <Card title="Need Help?">
            <p className="text-sm text-muted mb-4">
              Have questions about your subscription or billing? Our support team is here to help.
            </p>
            <Button variant="primary" className="w-full">
              Contact Support
            </Button>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SubscriptionPage;

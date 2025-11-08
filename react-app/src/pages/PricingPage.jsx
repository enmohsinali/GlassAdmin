import PageWrapper from '../components/PageWrapper';
import { Card, Button, Badge, Switch } from '../components/ui';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

/**
 * Pricing Page Component
 * Displays pricing plans with monthly/annual toggle
 */
const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        { text: 'Up to 3 projects', included: true },
        { text: '5GB storage', included: true },
        { text: 'Basic analytics', included: true },
        { text: 'Email support', included: true },
        { text: 'Advanced features', included: false },
        { text: 'Priority support', included: false },
        { text: 'Custom integrations', included: false },
      ],
      recommended: false,
      badge: null,
    },
    {
      name: 'Professional',
      description: 'Best for growing teams and businesses',
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        { text: 'Unlimited projects', included: true },
        { text: '100GB storage', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Advanced features', included: true },
        { text: '24/7 support', included: true },
        { text: 'Custom integrations', included: false },
      ],
      recommended: true,
      badge: 'Most Popular',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        { text: 'Unlimited everything', included: true },
        { text: 'Unlimited storage', included: true },
        { text: 'Enterprise analytics', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'All advanced features', included: true },
        { text: 'Priority support 24/7', included: true },
        { text: 'Custom integrations', included: true },
      ],
      recommended: false,
      badge: 'Enterprise',
    },
  ];

  const calculatePrice = (plan) => {
    if (plan.monthlyPrice === 0) return 'Free';
    const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
    return `$${price}`;
  };

  const calculateSavings = (plan) => {
    if (plan.monthlyPrice === 0) return null;
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.annualPrice;
    const percentage = Math.round((savings / monthlyTotal) * 100);
    return { amount: savings, percentage };
  };

  return (
    <PageWrapper
      title="Pricing Plans"
      description="Choose the perfect plan for your needs"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Pricing', path: '/dashboard/pricing' },
      ]}
    >
      {/* Billing Toggle */}
      <div className="mb-8 flex items-center justify-center gap-4">
        <span className={`text-sm font-medium ${!isAnnual ? 'text-primary' : 'text-muted'}`}>
          Monthly
        </span>
        <Switch
          checked={isAnnual}
          onChange={setIsAnnual}
          label=""
        />
        <span className={`text-sm font-medium ${isAnnual ? 'text-primary' : 'text-muted'}`}>
          Annual
        </span>
        {isAnnual && (
          <Badge variant="success" size="sm">
            Save up to 17%
          </Badge>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative ${plan.recommended ? 'ring-2 ring-primary shadow-lg' : ''}`}
          >
            {/* Badge */}
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant={plan.recommended ? 'primary' : 'default'}>
                  {plan.badge}
                </Badge>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted text-sm mb-4">{plan.description}</p>

              {/* Price */}
              <div className="mb-2">
                <span className="text-4xl font-bold">{calculatePrice(plan)}</span>
                {plan.monthlyPrice > 0 && (
                  <span className="text-muted text-sm ml-2">
                    / {isAnnual ? 'year' : 'month'}
                  </span>
                )}
              </div>

              {/* Savings Badge */}
              {isAnnual && plan.monthlyPrice > 0 && (
                <div className="text-xs text-success">
                  Save ${calculateSavings(plan).amount} ({calculateSavings(plan).percentage}% off)
                </div>
              )}
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                  )}
                  <span className={feature.included ? 'text-text' : 'text-muted line-through'}>
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              variant={plan.recommended ? 'primary' : 'secondary'}
              className="w-full"
              size="lg"
            >
              {plan.monthlyPrice === 0 ? 'Get Started' : 'Choose Plan'}
            </Button>
          </Card>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-12">
        <Card title="Frequently Asked Questions">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Can I change plans later?</h4>
              <p className="text-muted text-sm">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-muted text-sm">
                We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-muted text-sm">
                Yes! All paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What happens when I reach my limits?</h4>
              <p className="text-muted text-sm">
                We'll notify you when you're approaching your plan limits. You can upgrade at any time to continue using the service.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
};

export default PricingPage;

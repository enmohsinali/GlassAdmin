import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import {
  AnimatedButton,
  GlassCard,
  GlassCardGradient,
  FormWizard,
  GlobalSearch,
  PulsingLoader,
  BouncingDots,
  WaveLoader,
  FadeIn,
  ScaleIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  Input,
} from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { Sparkles, Rocket, Heart } from 'lucide-react';

const ComponentsDemo = () => {
  const { isDark } = useTheme();
  const [selectedSearch, setSelectedSearch] = useState(null);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  // Sample data for global search
  const searchData = [
    { id: 1, title: 'User Management', description: 'Manage users and permissions', type: 'user' },
    { id: 2, title: 'Product Catalog', description: 'View and edit products', type: 'product' },
    { id: 3, title: 'Order #12345', description: 'Recent order details', type: 'file' },
    { id: 4, title: 'Analytics Dashboard', description: 'View analytics and reports', type: 'file' },
    { id: 5, title: 'Settings', description: 'Configure application settings', type: 'file' },
  ];

  // Form wizard steps
  const wizardSteps = [
    {
      title: 'Personal Information',
      description: 'Enter your basic details',
      content: (
        <div className="space-y-4">
          <Input label="Full Name" placeholder="John Doe" />
          <Input label="Email" type="email" placeholder="john@example.com" />
          <Input label="Phone" type="tel" placeholder="+1 (555) 123-4567" />
        </div>
      ),
    },
    {
      title: 'Account Details',
      description: 'Set up your account',
      content: (
        <div className="space-y-4">
          <Input label="Username" placeholder="johndoe" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Input label="Confirm Password" type="password" placeholder="••••••••" />
        </div>
      ),
    },
    {
      title: 'Preferences',
      description: 'Customize your experience',
      content: (
        <div className="space-y-4">
          <Input label="Company Name" placeholder="Acme Inc." />
          <Input label="Job Title" placeholder="Software Engineer" />
        </div>
      ),
    },
  ];

  return (
    <PageWrapper title="Phase 4 Components Demo">
      <div className="p-6 space-y-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <h1 className={cn('text-[28px] font-bold mb-2', textColor)}>
              Phase 4: Advanced Features Demo
            </h1>
            <p className={cn('text-[15px]', mutedColor)}>
              Explore the new animation components, interactions, and advanced UI elements
            </p>
          </div>
        </FadeIn>

        {/* Animated Buttons */}
        <FadeIn delay={0.1}>
          <GlassCard title="Animated Buttons">
            <div className="flex flex-wrap gap-4">
              <AnimatedButton variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
                Primary Button
              </AnimatedButton>
              <AnimatedButton variant="secondary">Secondary Button</AnimatedButton>
              <AnimatedButton variant="outline">Outline Button</AnimatedButton>
              <AnimatedButton variant="success" rightIcon={<Heart className="w-4 h-4" />}>
                Success
              </AnimatedButton>
              <AnimatedButton variant="danger">Danger</AnimatedButton>
              <AnimatedButton variant="primary" loading>
                Loading
              </AnimatedButton>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Loading Animations */}
        <FadeIn delay={0.2}>
          <GlassCard title="Loading Animations">
            <div className="flex flex-wrap items-center gap-8">
              <div className="text-center">
                <PulsingLoader size="md" color="blue" />
                <p className={cn('text-[13px] mt-3', mutedColor)}>Pulsing Loader</p>
              </div>
              <div className="text-center">
                <BouncingDots size="md" color="green" />
                <p className={cn('text-[13px] mt-3', mutedColor)}>Bouncing Dots</p>
              </div>
              <div className="text-center">
                <WaveLoader size="md" color="red" />
                <p className={cn('text-[13px] mt-3', mutedColor)}>Wave Loader</p>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        {/* Glass Cards with Effects */}
        <ScaleIn delay={0.3}>
          <div>
            <h2 className={cn('text-[20px] font-semibold mb-4', textColor)}>
              Glass Cards with Hover Effects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassCard hover animate delay={0.1}>
                <div className="text-center py-4">
                  <div className="text-[32px] mb-2">🎨</div>
                  <h3 className={cn('text-[17px] font-semibold mb-2', textColor)}>Design</h3>
                  <p className={cn('text-[14px]', mutedColor)}>
                    Beautiful glassmorphic effects
                  </p>
                </div>
              </GlassCard>

              <GlassCardGradient gradient="blue" animate delay={0.2}>
                <div className="text-center py-4">
                  <div className="text-[32px] mb-2">⚡</div>
                  <h3 className={cn('text-[17px] font-semibold mb-2', textColor)}>Performance</h3>
                  <p className={cn('text-[14px]', mutedColor)}>
                    Smooth animations with Framer Motion
                  </p>
                </div>
              </GlassCardGradient>

              <GlassCardGradient gradient="green" animate delay={0.3}>
                <div className="text-center py-4">
                  <div className="text-[32px] mb-2">🚀</div>
                  <h3 className={cn('text-[17px] font-semibold mb-2', textColor)}>Interactive</h3>
                  <p className={cn('text-[14px]', mutedColor)}>
                    Micro-interactions everywhere
                  </p>
                </div>
              </GlassCardGradient>
            </div>
          </div>
        </ScaleIn>

        {/* Scroll Animations */}
        <div className="space-y-4">
          <h2 className={cn('text-[20px] font-semibold mb-4', textColor)}>
            Scroll-based Animations
          </h2>

          <StaggerContainer>
            <StaggerItem>
              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="text-[32px]">📱</div>
                  <div>
                    <h3 className={cn('text-[17px] font-semibold', textColor)}>Fade In</h3>
                    <p className={cn('text-[14px]', mutedColor)}>
                      Elements fade in as you scroll
                    </p>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>

            <StaggerItem>
              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="text-[32px]">🎯</div>
                  <div>
                    <h3 className={cn('text-[17px] font-semibold', textColor)}>Scale In</h3>
                    <p className={cn('text-[14px]', mutedColor)}>
                      Cards scale up smoothly
                    </p>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>

            <StaggerItem>
              <GlassCard>
                <div className="flex items-center gap-4">
                  <div className="text-[32px]">✨</div>
                  <div>
                    <h3 className={cn('text-[17px] font-semibold', textColor)}>Stagger</h3>
                    <p className={cn('text-[14px]', mutedColor)}>
                      Items appear in sequence
                    </p>
                  </div>
                </div>
              </GlassCard>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Global Search */}
        <SlideIn direction="up">
          <GlassCard title="Global Search with Autocomplete">
            <div className="max-w-2xl">
              <GlobalSearch
                data={searchData}
                onSelect={(item) => setSelectedSearch(item)}
                placeholder="Search pages, users, products..."
                recentSearches={['Analytics', 'User Management']}
                trendingSearches={['Dashboard', 'Reports', 'Settings']}
              />
              {selectedSearch && (
                <div className={cn('mt-4 p-3 rounded-[14px] bg-[rgba(58,109,240,0.1)]', textColor)}>
                  Selected: {selectedSearch.title}
                </div>
              )}
            </div>
          </GlassCard>
        </SlideIn>

        {/* Form Wizard */}
        <SlideIn direction="up" delay={0.1}>
          <GlassCard title="Multi-step Form Wizard">
            <FormWizard
              steps={wizardSteps}
              onComplete={() => alert('Form completed!')}
              onStepChange={() => {}}
            />
          </GlassCard>
        </SlideIn>
      </div>
    </PageWrapper>
  );
};

export default ComponentsDemo;

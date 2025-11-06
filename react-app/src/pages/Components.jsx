import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import {
  Button,
  AnimatedButton,
  Input,
  SearchInput,
  Select,
  Textarea,
  Checkbox,
  Switch,
  Card,
  GlassCard,
  GlassCardGradient,
  Breadcrumbs,
  Tabs,
  Accordion,
  Drawer,
  Modal,
  Badge,
  Avatar,
  Stats,
  Tag,
  Tooltip,
  EmptyState,
  Pagination,
  Progress,
  CircularProgress,
  StepProgress,
  Alert,
  Spinner,
  DotsSpinner,
  PulseSpinner,
  Skeleton,
  SkeletonCard,
  SkeletonTable,
  PulsingLoader,
  BouncingDots,
  WaveLoader,
  FormWizard,
  GlobalSearch,
  FadeIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
} from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import {
  Home,
  User,
  Settings,
  Heart,
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  X,
} from 'lucide-react';

const Components = () => {
  const { isDark } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [progressValue, setProgressValue] = useState(60);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';
  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';
  const themeBg = isDark ? 'border-theme-dark-bg' : 'border-theme-light-bg';

  // Sample data
  const breadcrumbItems = [
    { label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Components' },
  ];

  const tabItems = [
    { label: 'Overview', content: 'Overview content goes here' },
    { label: 'Analytics', content: 'Analytics content goes here' },
    { label: 'Settings', content: 'Settings content goes here' },
  ];

  const accordionItems = [
    { title: 'What is GlassAdmin?', content: 'GlassAdmin is a modern admin template with glassmorphic design.' },
    { title: 'How do I customize themes?', content: 'Use the theme toggle in the top right corner to switch between light and dark modes.' },
    { title: 'Is it mobile responsive?', content: 'Yes! All components are fully responsive and work great on mobile devices.' },
  ];

  const searchData = [
    { id: 1, title: 'Dashboard', description: 'View analytics', type: 'file' },
    { id: 2, title: 'Users', description: 'Manage users', type: 'user' },
    { id: 3, title: 'Products', description: 'Product catalog', type: 'product' },
  ];

  const wizardSteps = [
    {
      title: 'Step 1',
      description: 'Basic information',
      content: <Input label="Name" placeholder="Enter your name" />,
    },
    {
      title: 'Step 2',
      description: 'Contact details',
      content: <Input label="Email" type="email" placeholder="Enter your email" />,
    },
    {
      title: 'Step 3',
      description: 'Confirmation',
      content: <div className={textColor}>Review and submit your information</div>,
    },
  ];

  return (
    <PageWrapper title="Components Showcase">
      <div className="p-6 space-y-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <h1 className={cn('text-[28px] font-bold mb-2', textColor)}>
              Components Showcase
            </h1>
            <p className={cn('text-[15px]', mutedColor)}>
              Complete library of all available UI components with live examples
            </p>
          </div>
        </FadeIn>

        {/* Table of Contents */}
        <ScaleIn>
          <Card title="Quick Navigation">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Buttons', 'Forms', 'Cards', 'Navigation', 'Data Display', 'Feedback', 'Progress', 'Animations'].map((section) => (
                <a
                  key={section}
                  href={`#${section.toLowerCase().replace(' ', '-')}`}
                  className={cn(
                    'p-3 rounded-[14px] text-center transition-all ease-[0.3s]',
                    bgColor,
                    'hover:bg-[rgba(58,109,240,0.1)]',
                    textColor
                  )}
                >
                  {section}
                </a>
              ))}
            </div>
          </Card>
        </ScaleIn>

        {/* BUTTONS SECTION */}
        <section id="buttons">
          <FadeIn>
            <h2 className={cn('text-[24px] font-bold mb-4', textColor)}>Buttons</h2>

            {/* Standard Buttons */}
            <Card title="Button Variants" className="mb-4">
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
              </div>
            </Card>

            {/* Button Sizes */}
            <Card title="Button Sizes" className="mb-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </Card>

            {/* Buttons with Icons */}
            <Card title="Buttons with Icons" className="mb-4">
              <div className="flex flex-wrap gap-3">
                <Button leftIcon={<Heart className="w-4 h-4" />}>With Left Icon</Button>
                <Button rightIcon={<Star className="w-4 h-4" />}>With Right Icon</Button>
                <Button leftIcon={<User className="w-4 h-4" />} rightIcon={<Settings className="w-4 h-4" />}>
                  Both Icons
                </Button>
              </div>
            </Card>

            {/* Animated Buttons */}
            <Card title="Animated Buttons (Hover Me!)">
              <div className="flex flex-wrap gap-3">
                <AnimatedButton variant="primary">Animated Primary</AnimatedButton>
                <AnimatedButton variant="secondary">Animated Secondary</AnimatedButton>
                <AnimatedButton variant="success" leftIcon={<CheckCircle className="w-4 h-4" />}>
                  Success
                </AnimatedButton>
                <AnimatedButton variant="primary" loading>Loading...</AnimatedButton>
              </div>
            </Card>
          </FadeIn>
        </section>

        {/* FORMS SECTION */}
        <section id="forms">
          <FadeIn delay={0.1}>
            <h2 className={cn('text-[24px] font-bold mb-4', textColor)}>Form Components</h2>

            {/* Inputs */}
            <Card title="Input Fields" className="mb-4">
              <div className="space-y-4 max-w-md">
                <Input label="Text Input" placeholder="Enter text..." />
                <Input label="Email Input" type="email" placeholder="email@example.com" />
                <Input label="Password Input" type="password" placeholder="••••••••" />
                <Input label="With Error" placeholder="Enter value" error="This field is required" />
                <Input label="Disabled Input" placeholder="Disabled" disabled />
                <SearchInput placeholder="Search components..." />
              </div>
            </Card>

            {/* Select */}
            <Card title="Select Dropdown" className="mb-4">
              <div className="max-w-md">
                <Select
                  label="Choose Option"
                  options={[
                    { value: '1', label: 'Option 1' },
                    { value: '2', label: 'Option 2' },
                    { value: '3', label: 'Option 3' },
                  ]}
                />
              </div>
            </Card>

            {/* Textarea */}
            <Card title="Textarea" className="mb-4">
              <div className="max-w-md">
                <Textarea
                  label="Message"
                  placeholder="Enter your message..."
                  rows={4}
                />
              </div>
            </Card>

            {/* Checkbox & Switch */}
            <Card title="Checkbox & Switch">
              <div className="space-y-4">
                <Checkbox
                  label="I agree to the terms and conditions"
                  checked={checkboxChecked}
                  onChange={(e) => setCheckboxChecked(e.target.checked)}
                />
                <div className="flex items-center gap-3">
                  <Switch
                    checked={switchChecked}
                    onChange={setSwitchChecked}
                  />
                  <span className={textColor}>Enable notifications</span>
                </div>
              </div>
            </Card>
          </FadeIn>
        </section>

        {/* CARDS SECTION */}
        <section id="cards">
          <FadeIn delay={0.2}>
            <h2 className={cn('text-[24px] font-bold mb-4', textColor)}>Cards</h2>

            {/* Standard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card title="Standard Card">
                <p className={mutedColor}>This is a standard card component with glassmorphic styling.</p>
              </Card>
              <Card title="Card with Hover" hover>
                <p className={mutedColor}>Hover over this card to see the effect!</p>
              </Card>
              <Card>
                <p className={textColor}>Card without title</p>
              </Card>
            </div>

            {/* Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <GlassCard title="Glass Card" hover animate>
                <p className={mutedColor}>Enhanced glass card with hover and animation effects.</p>
              </GlassCard>
              <GlassCardGradient title="Blue Gradient" gradient="blue">
                <p className={mutedColor}>Card with blue gradient overlay.</p>
              </GlassCardGradient>
              <GlassCardGradient title="Green Gradient" gradient="green">
                <p className={mutedColor}>Card with green gradient overlay.</p>
              </GlassCardGradient>
            </div>
          </FadeIn>
        </section>

        {/* NAVIGATION SECTION */}
        <section id="navigation">
          <FadeIn delay={0.3}>
            <h2 className={cn('text-[24px] font-bold mb-4', textColor)}>Navigation Components</h2>

            {/* Breadcrumbs */}
            <Card title="Breadcrumbs" className="mb-4">
              <Breadcrumbs items={breadcrumbItems} />
            </Card>

            {/* Tabs */}
            <Card title="Tabs" className="mb-4">
              <Tabs
                tabs={tabItems}
                activeTab={selectedTab}
                onChange={setSelectedTab}
              />
            </Card>

            {/* Accordion */}
            <Card title="Accordion" className="mb-4">
              <Accordion items={accordionItems} />
            </Card>

            {/* Drawer */}
            <Card title="Drawer" className="mb-4">
              <Button onClick={() => setDrawerOpen(true)}>Open Drawer</Button>
              <Drawer
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="Drawer Title"
                position="right"
              >
                <p className={textColor}>This is drawer content. You can put any content here.</p>
              </Drawer>
            </Card>

            {/* Modal */}
            <Card title="Modal">
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
              <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Modal Title"
              >
                <p className={textColor}>This is modal content. Modals are great for focused interactions.</p>
                <div className="flex justify-end gap-3 mt-6">
                  <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={() => setModalOpen(false)}>Confirm</Button>
                </div>
              </Modal>
            </Card>
          </FadeIn>
        </section>

        {/* DATA DISPLAY SECTION */}
        <section id="data-display">
          <FadeIn delay={0.4}>
            <h2 className={cn('text-[24px] font-bold mb-4', textColor)}>Data Display</h2>

            {/* Badges */}
            <Card title="Badges" className="mb-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </Card>

            {/* Avatars */}
            <Card title="Avatars" className="mb-4">
              <div className="flex flex-wrap items-center gap-4">
                <Avatar src="https://i.pravatar.cc/150?img=1" alt="User 1" size="sm" />
                <Avatar src="https://i.pravatar.cc/150?img=2" alt="User 2" size="md" />
                <Avatar src="https://i.pravatar.cc/150?img=3" alt="User 3" size="lg" />
                <Avatar src="https://i.pravatar.cc/150?img=4" alt="User 4" status="online" />
                <Avatar src="https://i.pravatar.cc/150?img=5" alt="User 5" status="away" />
                <Avatar src="https://i.pravatar.cc/150?img=6" alt="User 6" status="offline" />
              </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Stats
                title="Total Users"
                value="12,543"
                change="+12.5%"
                trend="up"
                icon={<User className="w-6 h-6" />}
              />
              <Stats
                title="Revenue"
                value="$45,231"
                change="+8.2%"
                trend="up"
                icon={<Star className="w-6 h-6" />}
              />
              <Stats
                title="Bounce Rate"
                value="3.2%"
                change="-2.4%"
                trend="down"
                icon={<AlertCircle className="w-6 h-6" />}
              />
            </div>

            {/* Tags */}
            <Card title="Tags" className="mb-4">
              <div className="flex flex-wrap gap-2">
                <Tag>Default</Tag>
                <Tag color="blue">Blue</Tag>
                <Tag color="green">Green</Tag>
                <Tag color="red">Red</Tag>
                <Tag color="yellow">Yellow</Tag>
                <Tag removable onRemove={() => alert('Tag removed!')}>
                  Removable
                </Tag>
              </div>
            </Card>

            {/* Tooltips */}
            <Card title="Tooltips (Hover Me!)" className="mb-4">
              <div className="flex flex-wrap gap-4">
                <Tooltip content="Tooltip on top" position="top">
                  <Button variant="outline">Top</Button>
                </Tooltip>
                <Tooltip content="Tooltip on right" position="right">
                  <Button variant="outline">Right</Button>
                </Tooltip>
                <Tooltip content="Tooltip on bottom" position="bottom">
                  <Button variant="outline">Bottom</Button>
                </Tooltip>
                <Tooltip content="Tooltip on left" position="left">
                  <Button variant="outline">Left</Button>
                </Tooltip>
              </div>
            </Card>

            {/* Empty State */}
            <Card title="Empty State" className="mb-4">
              <EmptyState
                title="No data available"
                description="There are no items to display at the moment."
                action={<Button variant="primary">Add New Item</Button>}
              />
            </Card>

            {/* Pagination */}
            <Card title="Pagination">
              <Pagination
                currentPage={currentPage}
                totalPages={10}
                onPageChange={setCurrentPage}
              />
            </Card>
          </FadeIn>
        </section>

        {/* FEEDBACK SECTION */}
        <section id="feedback">
          <FadeIn delay={0.5}>
            <h2 className={cn('text-[24px] font-bold mb-4', textColor)}>Feedback Components</h2>

            {/* Alerts */}
            <Card title="Alerts" className="mb-4">
              <div className="space-y-3">
                <Alert type="info" title="Information">
                  This is an informational message.
                </Alert>
                <Alert type="success" title="Success">
                  Your changes have been saved successfully!
                </Alert>
                <Alert type="warning" title="Warning">
                  Please review your inputs before submitting.
                </Alert>
                <Alert type="error" title="Error">
                  An error occurred while processing your request.
                </Alert>
              </div>
            </Card>

            {/* Spinners */}
            <Card title="Spinners" className="mb-4">
              <div className="flex flex-wrap items-center gap-8">
                <div className="text-center">
                  <Spinner size="sm" />
                  <p className={cn('text-[13px] mt-2', mutedColor)}>Small</p>
                </div>
                <div className="text-center">
                  <Spinner size="md" />
                  <p className={cn('text-[13px] mt-2', mutedColor)}>Medium</p>
                </div>
                <div className="text-center">
                  <Spinner size="lg" />
                  <p className={cn('text-[13px] mt-2', mutedColor)}>Large</p>
                </div>
                <div className="text-center">
                  <DotsSpinner />
                  <p className={cn('text-[13px] mt-2', mutedColor)}>Dots</p>
                </div>
                <div className="text-center">
                  <PulseSpinner />
                  <p className={cn('text-[13px] mt-2', mutedColor)}>Pulse</p>
                </div>
              </div>
            </Card>

            {/* Skeletons */}
            <Card title="Skeleton Loaders">
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <SkeletonCard />
                <SkeletonTable rows={3} />
              </div>
            </Card>
          </FadeIn>
        </section>

        {/* PROGRESS SECTION */}
        <section id="progress">
          <FadeIn delay={0.6}>
            <h2 className={cn('text-[24px] font-bold mb-4', textColor)}>Progress Components</h2>

            {/* Linear Progress */}
            <Card title="Linear Progress" className="mb-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className={cn('text-[14px]', textColor)}>Progress</span>
                    <span className={cn('text-[14px]', mutedColor)}>{progressValue}%</span>
                  </div>
                  <Progress value={progressValue} />
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>
                    -10%
                  </Button>
                  <Button size="sm" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>
                    +10%
                  </Button>
                </div>
                <Progress value={30} color="green" />
                <Progress value={75} color="blue" />
                <Progress value={90} color="red" />
              </div>
            </Card>

            {/* Circular Progress */}
            <Card title="Circular Progress" className="mb-4">
              <div className="flex flex-wrap items-center gap-8">
                <CircularProgress value={25} size={80} />
                <CircularProgress value={50} size={80} color="green" />
                <CircularProgress value={75} size={80} color="blue" />
                <CircularProgress value={100} size={80} color="red" />
              </div>
            </Card>

            {/* Step Progress */}
            <Card title="Step Progress">
              <StepProgress
                steps={[
                  { label: 'Step 1', status: 'completed' },
                  { label: 'Step 2', status: 'completed' },
                  { label: 'Step 3', status: 'active' },
                  { label: 'Step 4', status: 'pending' },
                ]}
              />
            </Card>
          </FadeIn>
        </section>

        {/* ANIMATIONS SECTION */}
        <section id="animations">
          <FadeIn delay={0.7}>
            <h2 className={cn('text-[24px] font-bold mb-4', textColor)}>Advanced Animations</h2>

            {/* Loading Animations */}
            <Card title="Loading Animations" className="mb-4">
              <div className="flex flex-wrap items-center gap-8">
                <div className="text-center">
                  <PulsingLoader size="md" color="blue" />
                  <p className={cn('text-[13px] mt-3', mutedColor)}>Pulsing</p>
                </div>
                <div className="text-center">
                  <BouncingDots size="md" color="green" />
                  <p className={cn('text-[13px] mt-3', mutedColor)}>Bouncing</p>
                </div>
                <div className="text-center">
                  <WaveLoader size="md" color="red" />
                  <p className={cn('text-[13px] mt-3', mutedColor)}>Wave</p>
                </div>
              </div>
            </Card>

            {/* Scroll Animations */}
            <Card title="Scroll Animations" className="mb-4">
              <p className={cn('mb-4', mutedColor)}>Scroll down to see animations trigger</p>
              <StaggerContainer>
                {[1, 2, 3, 4].map((num) => (
                  <StaggerItem key={num}>
                    <div className={cn('p-4 mb-3 rounded-[14px]', bgColor, textColor)}>
                      Staggered Item {num}
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Card>

            {/* Global Search */}
            <Card title="Global Search" className="mb-4">
              <GlobalSearch
                data={searchData}
                onSelect={(item) => console.log('Selected:', item)}
                placeholder="Search for anything..."
                recentSearches={['Dashboard', 'Users']}
                trendingSearches={['Analytics', 'Reports']}
              />
            </Card>

            {/* Form Wizard */}
            <Card title="Form Wizard">
              <FormWizard
                steps={wizardSteps}
                onComplete={() => alert('Wizard completed!')}
                onStepChange={(step) => console.log('Step:', step)}
              />
            </Card>
          </FadeIn>
        </section>
      </div>
    </PageWrapper>
  );
};

export default Components;

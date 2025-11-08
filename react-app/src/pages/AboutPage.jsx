import PageWrapper from '../components/PageWrapper';
import { Card, Badge, Avatar, Button } from '../components/ui';
import { Users, Target, Award, Heart, Mail, MapPin, Phone } from 'lucide-react';

/**
 * About Page Component
 * Company information, team, mission, and values
 */
const AboutPage = () => {
  const stats = [
    { label: 'Team Members', value: '50+', icon: Users },
    { label: 'Projects Completed', value: '1000+', icon: Target },
    { label: 'Awards Won', value: '25+', icon: Award },
    { label: 'Happy Clients', value: '500+', icon: Heart },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: '15+ years experience in tech leadership',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Expert in software architecture and innovation',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      bio: 'Award-winning UX/UI designer',
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Full-stack development expert',
    },
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.',
      icon: Target,
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from code quality to customer service.',
      icon: Award,
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and open communication to achieve great results.',
      icon: Users,
    },
    {
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. Their success is our success.',
      icon: Heart,
    },
  ];

  return (
    <PageWrapper
      title="About Us"
      description="Learn more about our company, team, and mission"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'About', path: '/dashboard/about' },
      ]}
    >
      {/* Hero Section */}
      <Card className="mb-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Building the Future of Admin Dashboards</h2>
          <p className="text-muted text-lg mb-6">
            We're a passionate team of designers and developers creating beautiful, functional,
            and accessible admin templates that empower businesses to manage their operations efficiently.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="primary" leftIcon={<Mail className="w-4 h-4" />}>
              Get in Touch
            </Button>
            <Button variant="secondary">View Our Work</Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <div className="flex justify-center mb-3">
              <div className="p-3 bg-primary/10 rounded-full">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-muted text-sm">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card title="Our Mission">
          <p className="text-muted mb-4">
            To empower businesses of all sizes with world-class admin templates that are beautiful,
            accessible, and easy to customize. We believe that great design shouldn't be
            expensive or complicated.
          </p>
          <p className="text-muted">
            Every template we create is built with modern best practices, WCAG compliance,
            and developer experience in mind.
          </p>
        </Card>

        <Card title="Our Vision">
          <p className="text-muted mb-4">
            To become the go-to platform for premium admin templates and dashboard solutions,
            trusted by developers and businesses worldwide.
          </p>
          <p className="text-muted">
            We envision a future where every business has access to professional-grade admin
            interfaces that help them work smarter and achieve their goals faster.
          </p>
        </Card>
      </div>

      {/* Values */}
      <Card title="Our Values" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h4 className="font-semibold mb-2">{value.title}</h4>
              <p className="text-muted text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Team */}
      <Card title="Meet Our Team" className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <Avatar
                src={member.image}
                alt={member.name}
                size="xl"
                className="mx-auto mb-3"
              />
              <h4 className="font-semibold mb-1">{member.name}</h4>
              <Badge variant="secondary" className="mb-2">
                {member.role}
              </Badge>
              <p className="text-muted text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Contact Info */}
      <Card title="Get in Touch">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-muted text-sm">hello@glassadmin.com</p>
              <p className="text-muted text-sm">support@glassadmin.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Phone</h4>
              <p className="text-muted text-sm">+1 (555) 123-4567</p>
              <p className="text-muted text-sm">Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Address</h4>
              <p className="text-muted text-sm">123 Design Street</p>
              <p className="text-muted text-sm">San Francisco, CA 94102</p>
            </div>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
};

export default AboutPage;

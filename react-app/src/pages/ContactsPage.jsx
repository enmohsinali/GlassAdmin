import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { Card, Input, Button, Badge, Avatar, Modal } from '../components/ui';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import {
  Plus,
  Search,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Building2,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  Upload,
  MoreVertical,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactsPage = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isNewContactModalOpen, setIsNewContactModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-[rgba(249,250,251,0.7)]' : 'text-[#2a2a2a]';

  // Sample contacts data
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Inc.',
      position: 'Marketing Director',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'active',
      tags: ['VIP', 'Partner'],
      deals: 3,
      lastContact: '2025-11-05',
      source: 'Website',
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@innovate.io',
      phone: '+1 (555) 234-5678',
      company: 'Innovate Solutions',
      position: 'CEO',
      avatar: 'https://i.pravatar.cc/150?img=2',
      status: 'active',
      tags: ['Lead', 'Enterprise'],
      deals: 5,
      lastContact: '2025-11-06',
      source: 'Referral',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@designstudio.com',
      phone: '+1 (555) 345-6789',
      company: 'Design Studio',
      position: 'Creative Lead',
      avatar: 'https://i.pravatar.cc/150?img=5',
      status: 'active',
      tags: ['Customer'],
      deals: 2,
      lastContact: '2025-11-04',
      source: 'LinkedIn',
    },
    {
      id: 4,
      name: 'David Kumar',
      email: 'david.kumar@startup.com',
      phone: '+1 (555) 456-7890',
      company: 'Startup Ventures',
      position: 'Product Manager',
      avatar: 'https://i.pravatar.cc/150?img=12',
      status: 'inactive',
      tags: ['Lead'],
      deals: 1,
      lastContact: '2025-10-28',
      source: 'Conference',
    },
    {
      id: 5,
      name: 'Jessica Williams',
      email: 'jessica.w@enterprise.com',
      phone: '+1 (555) 567-8901',
      company: 'Enterprise Corp',
      position: 'VP of Sales',
      avatar: 'https://i.pravatar.cc/150?img=9',
      status: 'active',
      tags: ['VIP', 'Enterprise'],
      deals: 7,
      lastContact: '2025-11-07',
      source: 'Cold Outreach',
    },
    {
      id: 6,
      name: 'Alex Thompson',
      email: 'alex.t@digitalagency.com',
      phone: '+1 (555) 678-9012',
      company: 'Digital Agency',
      position: 'Account Executive',
      avatar: 'https://i.pravatar.cc/150?img=14',
      status: 'active',
      tags: ['Partner'],
      deals: 4,
      lastContact: '2025-11-03',
      source: 'Website',
    },
  ]);

  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
  });

  const filteredContacts = contacts.filter((contact) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.company.toLowerCase().includes(searchLower)
    );
  });

  const handleViewContact = (contact) => {
    navigate(`/dashboard/contacts/${contact.id}`);
  };

  const handleDeleteContact = (contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setContacts(contacts.filter((c) => c.id !== selectedContact.id));
    setIsDeleteModalOpen(false);
    setSelectedContact(null);
  };

  const handleCreateContact = () => {
    if (newContact.name && newContact.email) {
      const contact = {
        id: contacts.length + 1,
        ...newContact,
        avatar: `https://i.pravatar.cc/150?img=${contacts.length + 1}`,
        status: 'active',
        tags: ['Lead'],
        deals: 0,
        lastContact: new Date().toISOString().split('T')[0],
        source: 'Manual Entry',
      };
      setContacts([...contacts, contact]);
      setIsNewContactModalOpen(false);
      setNewContact({ name: '', email: '', phone: '', company: '', position: '' });
    }
  };

  const statusColors = {
    active: 'bg-success text-white',
    inactive: 'bg-[rgba(249,250,251,0.2)] text-[rgba(249,250,251,0.7)]',
  };

  const tagColors = {
    VIP: 'bg-purple text-white',
    Partner: 'bg-primary text-white',
    Lead: 'bg-warning text-white',
    Customer: 'bg-success text-white',
    Enterprise: 'bg-danger text-white',
  };

  return (
    <PageWrapper title="CRM - Contacts">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className={cn('text-[28px] font-bold mb-2', textColor)}>Contacts</h1>
            <p className={cn('text-[15px]', mutedColor)}>
              Manage your contacts and relationships
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" leftIcon={<Upload className="w-4 h-4" />}>
              Import
            </Button>
            <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
              Export
            </Button>
            <Button
              variant="primary"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => setIsNewContactModalOpen(true)}
            >
              Add Contact
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Total Contacts</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>{contacts.length}</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-success/10">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Active Deals</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  {contacts.reduce((sum, c) => sum + c.deals, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-warning/10">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Tasks Due</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>12</p>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple/10">
                <CheckCircle className="w-6 h-6 text-purple" />
              </div>
              <div>
                <p className={cn('text-[13px]', mutedColor)}>Active Contacts</p>
                <p className={cn('text-[20px] font-semibold', textColor)}>
                  {contacts.filter((c) => c.status === 'active').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search contacts by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-4 h-4" />}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
                Filter
              </Button>
              <div className="glass-card p-1 flex gap-1">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="px-3"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="px-3"
                >
                  List
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Contacts Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:scale-[1.02] transition-all">
                <div className="flex flex-col h-full">
                  {/* Contact Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={contact.avatar} alt={contact.name} size="lg" />
                      <div>
                        <h3 className={cn('text-[16px] font-semibold', textColor)}>
                          {contact.name}
                        </h3>
                        <p className={cn('text-[13px]', mutedColor)}>{contact.position}</p>
                      </div>
                    </div>
                    <Badge className={statusColors[contact.status]}>
                      {contact.status}
                    </Badge>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 className={cn('w-4 h-4', mutedColor)} />
                      <p className={cn('text-[13px]', mutedColor)}>{contact.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className={cn('w-4 h-4', mutedColor)} />
                      <p className={cn('text-[13px]', mutedColor)}>{contact.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className={cn('w-4 h-4', mutedColor)} />
                      <p className={cn('text-[13px]', mutedColor)}>{contact.phone}</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {contact.tags.map((tag, index) => (
                      <Badge key={index} className={tagColors[tag]}>
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 pb-4 border-t border-[rgba(249,250,251,0.1)]">
                    <div>
                      <p className={cn('text-[11px]', mutedColor)}>Deals</p>
                      <p className={cn('text-[15px] font-semibold', textColor)}>
                        {contact.deals}
                      </p>
                    </div>
                    <div>
                      <p className={cn('text-[11px]', mutedColor)}>Last Contact</p>
                      <p className={cn('text-[15px] font-semibold', textColor)}>
                        {new Date(contact.lastContact).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      className="flex-1"
                      leftIcon={<Eye className="w-4 h-4" />}
                      onClick={() => handleViewContact(contact)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteContact(contact)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(249,250,251,0.1)]">
                    <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                      Contact
                    </th>
                    <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                      Company
                    </th>
                    <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                      Email
                    </th>
                    <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                      Phone
                    </th>
                    <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                      Status
                    </th>
                    <th className={cn('text-left py-3 px-4 text-[13px] font-semibold', textColor)}>
                      Deals
                    </th>
                    <th className={cn('text-right py-3 px-4 text-[13px] font-semibold', textColor)}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="border-b border-[rgba(249,250,251,0.05)] hover:bg-[rgba(249,250,251,0.03)] transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar src={contact.avatar} alt={contact.name} />
                          <div>
                            <p className={cn('text-[14px] font-medium', textColor)}>
                              {contact.name}
                            </p>
                            <p className={cn('text-[12px]', mutedColor)}>{contact.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className={cn('py-3 px-4 text-[13px]', mutedColor)}>
                        {contact.company}
                      </td>
                      <td className={cn('py-3 px-4 text-[13px]', mutedColor)}>
                        {contact.email}
                      </td>
                      <td className={cn('py-3 px-4 text-[13px]', mutedColor)}>
                        {contact.phone}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={statusColors[contact.status]}>
                          {contact.status}
                        </Badge>
                      </td>
                      <td className={cn('py-3 px-4 text-[13px] font-medium', textColor)}>
                        {contact.deals}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => handleViewContact(contact)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleDeleteContact(contact)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* New Contact Modal */}
        <Modal
          isOpen={isNewContactModalOpen}
          onClose={() => setIsNewContactModalOpen(false)}
          title="Add New Contact"
          size="md"
        >
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter full name..."
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter email address..."
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
            />

            <Input
              label="Phone"
              type="tel"
              placeholder="Enter phone number..."
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
            />

            <Input
              label="Company"
              placeholder="Enter company name..."
              value={newContact.company}
              onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
            />

            <Input
              label="Position"
              placeholder="Enter job position..."
              value={newContact.position}
              onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsNewContactModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreateContact}>
                Create Contact
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Delete Contact"
          size="sm"
        >
          <div className="space-y-4">
            <p className={cn('text-[15px]', textColor)}>
              Are you sure you want to delete{' '}
              <span className="font-semibold">{selectedContact?.name}</span>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </PageWrapper>
  );
};

export default ContactsPage;

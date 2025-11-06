import PageWrapper from '../../components/PageWrapper';
import UserList from './UserList';

/**
 * User List Page
 * Follows MainPage.jsx structure with glassmorphic design
 */
const UserListPage = () => {
  return (
    <PageWrapper title="User Management">
      <UserList />
    </PageWrapper>
  );
};

export default UserListPage;

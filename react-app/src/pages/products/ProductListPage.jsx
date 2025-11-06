import PageWrapper from '../../components/PageWrapper';
import ProductList from './ProductList';

/**
 * Product List Page
 * Follows MainPage.jsx structure with glassmorphic design
 */
const ProductListPage = () => {
  return (
    <PageWrapper title="Product Management">
      <ProductList />
    </PageWrapper>
  );
};

export default ProductListPage;

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { Card, Input, Select, Textarea, Button, Alert } from '../../components/ui';
import { Save, X, Upload } from 'lucide-react';

/**
 * Product Add/Edit Form Page
 */
const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: isEditMode ? 'Wireless Headphones Pro' : '',
    sku: isEditMode ? 'WHP-PRO-001' : '',
    category: isEditMode ? 'electronics' : '',
    price: isEditMode ? '299.99' : '',
    costPrice: isEditMode ? '150.00' : '',
    stock: isEditMode ? '45' : '',
    status: isEditMode ? 'active' : 'draft',
    description: isEditMode ? 'Premium wireless headphones with active noise cancellation.' : '',
    tags: isEditMode ? 'Wireless, Noise Cancelling, Premium' : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/products');
      }, 1500);
    }, 1000);
  };

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports' },
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'archived', label: 'Archived' },
  ];

  return (
    <PageWrapper title={isEditMode ? 'Edit Product' : 'Add New Product'}>
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {showSuccess && (
          <Alert variant="success" title="Success!">
            Product has been {isEditMode ? 'updated' : 'created'} successfully.
          </Alert>
        )}

        {/* Basic Information */}
        <Card title="Basic Information">
          <div className="space-y-4">
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g., WHP-PRO-001"
                required
              />
              <Select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categoryOptions}
                required
              />
            </div>

            <Textarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={4}
              required
            />

            <Input
              label="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Comma-separated tags"
              helperText="e.g., Wireless, Premium, New"
            />
          </div>
        </Card>

        {/* Pricing & Inventory */}
        <Card title="Pricing & Inventory">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Selling Price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
            <Input
              label="Cost Price"
              name="costPrice"
              type="number"
              step="0.01"
              value={formData.costPrice}
              onChange={handleChange}
              placeholder="0.00"
            />
            <Input
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              required
            />
          </div>
        </Card>

        {/* Images */}
        <Card title="Product Images">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border-dark rounded-[14px] p-8 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-[15px] mb-2">Drag and drop images here, or click to browse</p>
              <p className="text-[14px] opacity-70">Supports: JPG, PNG, GIF (Max 5MB)</p>
              <Button type="button" variant="outline" size="sm" className="mt-4">
                Choose Files
              </Button>
            </div>
          </div>
        </Card>

        {/* Status */}
        <Card title="Status">
          <Select
            label="Product Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={statusOptions}
            required
          />
        </Card>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            leftIcon={<Save className="w-4 h-4" />}
            loading={isLoading}
          >
            {isEditMode ? 'Update Product' : 'Create Product'}
          </Button>
          <Button
            type="button"
            variant="outline"
            leftIcon={<X className="w-4 h-4" />}
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </PageWrapper>
  );
};

export default ProductForm;

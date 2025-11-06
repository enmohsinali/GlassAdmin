import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PageWrapper from '../../components/PageWrapper';
import { Card, Badge, Button, Tabs, Tag } from '../../components/ui';
import { Edit, Trash2, ShoppingCart, Package, DollarSign, Star } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Product Details Page
 */
const ProductDetails = () => {
  const { id } = useParams();
  const { isDark } = useTheme();
  const [selectedImage, setSelectedImage] = useState(0);

  const textColor = isDark ? 'text-[#f9fafb]' : 'text-[#1a1a1a]';
  const inactiveColor = isDark ? 'text-[rgba(249,250,251,0.55)]' : 'text-[rgba(74,74,74,0.75)]';
  const bgColor = isDark ? 'bg-[rgba(146,151,179,0.13)]' : 'bg-[rgba(255,255,255,0.7)]';

  // Mock product data
  const product = {
    id: id || '1',
    name: 'Wireless Headphones Pro',
    sku: 'WHP-PRO-001',
    price: 299.99,
    stock: 45,
    category: 'Electronics',
    status: 'Active',
    rating: 4.5,
    reviews: 128,
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=600',
    ],
    specifications: {
      'Brand': 'AudioTech',
      'Model': 'WHP-PRO-001',
      'Color': 'Matte Black',
      'Connectivity': 'Bluetooth 5.0',
      'Battery Life': '30 hours',
      'Weight': '250g',
    },
    tags: ['Wireless', 'Noise Cancelling', 'Premium', 'Bluetooth'],
  };

  const tabs = [
    {
      label: 'Description',
      content: (
        <div className="space-y-4">
          <p className={`text-[15px] ${textColor}`}>{product.description}</p>

          <div>
            <h3 className={`text-[17px] font-medium mb-3 ${textColor}`}>Tags</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Tag key={index} color="blue">{tag}</Tag>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Specifications',
      content: (
        <div className="space-y-3">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-border-dark last:border-b-0">
              <span className={`text-[15px] font-medium ${textColor}`}>{key}</span>
              <span className={`text-[15px] ${inactiveColor}`}>{value}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      label: 'Reviews',
      content: (
        <div className={`text-center py-8 ${inactiveColor}`}>
          <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>Product reviews would be displayed here</p>
        </div>
      )
    }
  ];

  return (
    <PageWrapper title="Product Details">
      <div className="space-y-6 mt-6">
        {/* Product Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className={`text-[24px] font-medium mb-2 ${textColor}`}>{product.name}</h2>
            <div className="flex items-center gap-2">
              <Badge color={product.status === 'Active' ? 'green' : 'red'}>
                {product.status}
              </Badge>
              <Badge color="gray">{product.category}</Badge>
              <Badge color="blue">SKU: {product.sku}</Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" size="sm" leftIcon={<Edit className="w-4 h-4" />}>
              Edit
            </Button>
            <Button variant="outline" size="sm" leftIcon={<Trash2 className="w-4 h-4" />}>
              Delete
            </Button>
          </div>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Images */}
          <Card className="lg:col-span-1">
            {/* Main Image */}
            <div className={`aspect-square rounded-[14px] overflow-hidden mb-4 ${bgColor}`}>
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-[14px] overflow-hidden border-2 transition-all ease-[0.3s] ${
                    selectedImage === index
                      ? 'border-[#3a6df0]'
                      : 'border-transparent hover:border-[rgba(58,109,240,0.5)]'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </Card>

          {/* Product Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price & Stock */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(58,109,240,0.15)] flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-[#3a6df0]" />
                  </div>
                  <div>
                    <div className={`text-[14px] ${inactiveColor}`}>Price</div>
                    <div className={`text-[20px] font-medium ${textColor}`}>${product.price}</div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(59,240,131,0.15)] flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary-green" />
                  </div>
                  <div>
                    <div className={`text-[14px] ${inactiveColor}`}>In Stock</div>
                    <div className={`text-[20px] font-medium ${textColor}`}>{product.stock} units</div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(255,189,46,0.15)] flex items-center justify-center">
                    <Star className="w-5 h-5 text-[#ffbd2e]" />
                  </div>
                  <div>
                    <div className={`text-[14px] ${inactiveColor}`}>Rating</div>
                    <div className={`text-[20px] font-medium ${textColor}`}>{product.rating} ({product.reviews})</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetails;

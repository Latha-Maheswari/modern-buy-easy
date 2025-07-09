
import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Filter, Grid, List, Star, Heart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

const ProductListing = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const searchQuery = searchParams.get('q');
  const title = searchQuery ? `Search: "${searchQuery}"` : `${category?.charAt(0).toUpperCase()}${category?.slice(1)}`;

  // Mock products data
  const products = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 99.99,
      originalPrice: 149.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      rating: 4.5,
      reviews: 234,
      inStock: true,
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      rating: 4.8,
      reviews: 456,
      inStock: true,
    },
    {
      id: '3',
      name: 'Professional Laptop Backpack',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      rating: 4.3,
      reviews: 123,
      inStock: false,
    },
    {
      id: '4',
      name: 'Premium Coffee Maker',
      price: 79.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1559056199-641b071db55a?w=400',
      rating: 4.6,
      reviews: 189,
      inStock: true,
    },
    {
      id: '5',
      name: 'Eco-Friendly Yoga Mat',
      price: 24.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      rating: 4.4,
      reviews: 78,
      inStock: true,
    },
    {
      id: '6',
      name: 'Wireless Charging Pad',
      price: 29.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400',
      rating: 4.2,
      reviews: 95,
      inStock: true,
    },
  ];

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success('Added to cart!');
  };

  const ProductCard = ({ product }: { product: any }) => (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className={viewMode === 'grid' ? 'p-3' : 'p-3'}>
        <div className={viewMode === 'grid' ? '' : 'flex space-x-3'}>
          <div className={`relative ${viewMode === 'grid' ? 'mb-3' : 'w-24 h-24 flex-shrink-0'}`}>
            <img
              src={product.image}
              alt={product.name}
              className={`object-cover rounded-lg ${
                viewMode === 'grid' ? 'w-full h-40' : 'w-full h-full'
              }`}
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
            >
              <Heart className="h-4 w-4" />
            </Button>
            {!product.inStock && (
              <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className={`font-medium mb-1 ${viewMode === 'grid' ? 'text-sm' : ''}`}>
              {product.name}
            </h3>
            
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">
                {product.rating} ({product.reviews})
              </span>
            </div>
            
            <div className={`flex items-center ${viewMode === 'grid' ? 'justify-between' : 'justify-between mt-2'}`}>
              <div>
                <span className="font-semibold text-blue-600">${product.price}</span>
                <span className="text-xs text-gray-500 line-through ml-1">
                  ${product.originalPrice}
                </span>
              </div>
              <Button
                size="sm"
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300"
              >
                {product.inStock ? 'Add' : 'Unavailable'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{products.length} products found</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="p-4">
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-2 gap-3' 
            : 'space-y-3'
        }>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProductListing;

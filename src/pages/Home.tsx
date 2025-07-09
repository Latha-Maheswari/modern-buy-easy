
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Heart, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';

const Home = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Electronics', icon: '📱', color: 'bg-blue-100 text-blue-800' },
    { name: 'Fashion', icon: '👕', color: 'bg-pink-100 text-pink-800' },
    { name: 'Home', icon: '🏠', color: 'bg-green-100 text-green-800' },
    { name: 'Sports', icon: '⚽', color: 'bg-orange-100 text-orange-800' },
    { name: 'Books', icon: '📚', color: 'bg-purple-100 text-purple-800' },
    { name: 'Beauty', icon: '💄', color: 'bg-red-100 text-red-800' },
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Wireless Headphones',
      price: 99.99,
      originalPrice: 149.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      rating: 4.5,
      reviews: 234,
    },
    {
      id: '2',
      name: 'Smart Watch',
      price: 199.99,
      originalPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      rating: 4.8,
      reviews: 456,
    },
    {
      id: '3',
      name: 'Laptop Backpack',
      price: 49.99,
      originalPrice: 79.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      rating: 4.3,
      reviews: 123,
    },
  ];

  const dailyDeals = [
    {
      id: '4',
      name: 'Coffee Maker',
      price: 79.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1559056199-641b071db55a?w=400',
      rating: 4.6,
      discount: '38% OFF',
    },
    {
      id: '5',
      name: 'Yoga Mat',
      price: 24.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      rating: 4.4,
      discount: '50% OFF',
    },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/category/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} size="sm" className="bg-orange-500 hover:bg-orange-600">
            Search
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Categories</h2>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/category/${category.name.toLowerCase()}`)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <p className="text-sm font-medium">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Featured Products</h2>
          <Button variant="ghost" size="sm" className="text-blue-600">
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="flex-shrink-0 w-48 cursor-pointer">
              <CardContent className="p-3">
                <div className="relative mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg"
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="font-medium text-sm mb-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-blue-600">${product.price}</span>
                    <span className="text-xs text-gray-500 line-through ml-1">
                      ${product.originalPrice}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                    className="bg-orange-500 hover:bg-orange-600 text-xs"
                  >
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Deals */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">Daily Deals</h2>
        <div className="space-y-3">
          {dailyDeals.map((product) => (
            <Card key={product.id} className="cursor-pointer">
              <CardContent className="p-3">
                <div className="flex space-x-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                      <Badge variant="destructive" className="text-xs">
                        {product.discount}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="font-semibold text-lg text-blue-600">
                          ${product.price}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;

import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import WishlistButton from '../components/WishlistButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Filter, Grid, List, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'sonner';
import { getProductsByCategory, searchProducts, products } from '../data/products';

const ProductListing = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const searchQuery = searchParams.get('q');
  
  // Map route categories to actual category names
  const categoryMap: { [key: string]: string } = {
    'makeup-beauty': 'Makeup & Beauty',
    'electronics': 'Electronics',
    'home-decor': 'Home Decor',
    'gym-fitness': 'Gym & Fitness',
    'bags': 'Bags',
    'books': 'Books'
  };

  const actualCategory = category ? categoryMap[category] || category : undefined;
  const title = searchQuery 
    ? `Search: "${searchQuery}"` 
    : actualCategory 
    ? actualCategory
    : 'All Products';

  // Get products based on category or search
  let displayProducts = [];
  if (searchQuery) {
    displayProducts = searchProducts(searchQuery);
  } else if (actualCategory) {
    displayProducts = getProductsByCategory(actualCategory);
  } else {
    displayProducts = products;
  }

  // Sort products
  const sortedProducts = [...displayProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

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
            <WishlistButton
              product={product}
              className="absolute top-2 right-2"
            />
            {!product.inStock && (
              <Badge variant="secondary" className="absolute bottom-2 left-2 text-xs">
                Out of Stock
              </Badge>
            )}
            {product.isNewArrival && (
              <Badge className="absolute top-2 left-2 text-xs bg-green-500">
                New
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
                <span className="font-semibold text-blue-600">₹{product.price}</span>
                <span className="text-xs text-gray-500 line-through ml-1">
                  ₹{product.originalPrice}
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
          <span>{sortedProducts.length} products found</span>
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
        {sortedProducts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No products found in this category.</p>
            <Button 
              onClick={() => navigate('/home')} 
              className="mt-4 bg-orange-500 hover:bg-orange-600"
            >
              Back to Home
            </Button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-2 gap-3' 
              : 'space-y-3'
          }>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ProductListing;

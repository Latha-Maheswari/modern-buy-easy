import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Grid, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const Categories = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'makeup-beauty',
      name: 'Makeup & Beauty',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=200&fit=crop',
      productCount: 156,
      description: 'Cosmetics, skincare, and beauty products'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop',
      productCount: 89,
      description: 'Gadgets, phones, and electronic devices'
    },
    {
      id: 'home-decor',
      name: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop',
      productCount: 203,
      description: 'Furniture, decorations, and home essentials'
    },
    {
      id: 'gym-fitness',
      name: 'Gym & Fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop',
      productCount: 67,
      description: 'Workout equipment and fitness gear'
    },
    {
      id: 'bags',
      name: 'Bags',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop',
      productCount: 45,
      description: 'Handbags, backpacks, and travel bags'
    },
    {
      id: 'books',
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop',
      productCount: 128,
      description: 'Educational, fiction, and reference books'
    },
    {
      id: 'fashion',
      name: 'Fashion & Accessories',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop',
      productCount: 234,
      description: 'Clothing, jewelry, and fashion accessories'
    },
    {
      id: 'kitchen',
      name: 'Kitchen & Dining',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
      productCount: 91,
      description: 'Cookware, appliances, and dining essentials'
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/category/all?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Categories</h1>
          </div>
          <Grid className="h-5 w-5 text-orange-600" />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
      </div>

      <div className="p-4">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-8">
            <Grid className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredCategories.map((category) => (
              <Card 
                key={category.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 overflow-hidden"
                onClick={() => handleCategoryClick(category.id)}
              >
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {category.description}
                          </p>
                          <span className="text-xs text-blue-600 font-medium">
                            {category.productCount} products
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        >
                          Browse →
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        <Card className="mt-6 bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-orange-900 mb-2">Total Product Range</h3>
            <p className="text-2xl font-bold text-orange-800 mb-1">
              {categories.reduce((total, cat) => total + cat.productCount, 0).toLocaleString()}+
            </p>
            <p className="text-sm text-orange-700">
              Products across {categories.length} categories
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Categories;